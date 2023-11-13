#version 450 core


layout (location = 0) out vec4 fColour;

in vec3 col;
in vec3 nor;
in vec2 tex;
in vec3 FragPosWorldSpace;
in vec4 FragPosProjectedLightSpace;

uniform sampler2D shadowMap;
uniform sampler2D Texture;


uniform vec3 lightDirection;
uniform vec3 lightColour;
uniform vec3 lightPos;
uniform vec3 camPos;

uniform vec3 light2_Colour;
uniform vec3 light2_Pos;

float shadowOnFragment(vec4 FragPosProjectedLightSpace)
{
	vec3 ndc = FragPosProjectedLightSpace.xyz / FragPosProjectedLightSpace.w;
	vec3 ss = (ndc+1)*0.5;

	float fragDepth = ss.z;
	float litDepth = texture(shadowMap, ss.xy).r;

	vec3 Nnor = normalize(nor);
	vec3 Ntolight = normalize(-lightDirection);
	float bias = max(0.05 * (1.0 - dot(Nnor, Ntolight)), 0.005);

	float shadow = 0.f;
	shadow = fragDepth > (litDepth+bias) ? 1.0: 0.0;

	if (fragDepth > 1)
		shadow = 0.f;

	return shadow;
}

float CalculateDirectionalIllumination()
{
	float ambient = 0.1f;
	vec3 Nnor = normalize(nor);
	vec3 Nto_light = normalize(-lightDirection);
	float diffuse = max(dot(Nnor,Nto_light),0.0f);
	vec3 Nfrom_light = normalize(lightDirection);
	vec3 NrefLight = reflect(Nfrom_light, Nnor);
	vec3 camDirection = camPos - FragPosWorldSpace;
	vec3 NcamDirection = normalize(camDirection);
	float specular = pow(max(dot(NcamDirection,NrefLight),0.0f), 128);
	float shadow = shadowOnFragment(FragPosProjectedLightSpace);
	
	float phong = ambient + ((1.f-shadow) * (diffuse + specular)) ;
	
	return phong;
}

float CalculatePositionalIllumination()
{
	float ambient = 0.1f;

	vec3 Nnor = normalize(nor);
	vec3 Nto_light = normalize(light2_Pos - FragPosWorldSpace);
	float diffuse = max(dot(Nnor,Nto_light),0.0f);

	vec3 Nfrom_light = -Nto_light;
	vec3 NrefLight = reflect(Nfrom_light, Nnor);
	vec3 camDirection = camPos - FragPosWorldSpace;
	vec3 NcamDirection = normalize(camDirection);
	float specular = pow(max(dot(NcamDirection,NrefLight),0.0f), 128);

	float attC = 0.3f; //constant attenuation
	float attL = 0.05f; //linear attenuation
	float attQ = 0.02f; //quadratic attenuation
	/*
	float attC = 1.5f; //constant attenuation
	float attL = 0.05f; //linear attenuation
	float attQ = 0.02f; //quadratic attenuation
	*/
	float d = length(light2_Pos - FragPosWorldSpace);

	float attenuation = 1/(attC + (attL*d) + (attQ * pow(d,2)));

	float phong = (ambient + diffuse + specular) * attenuation;

	return phong;
}

float CalculateSpotIllumination()
{
	float ambient = 0.1f;

	vec3 Nnor = normalize(nor);
	vec3 Nto_light = normalize(lightPos - FragPosWorldSpace);
	float diffuse = max(dot(Nnor,Nto_light),0.0f);

	vec3 Nfrom_light = -Nto_light;
	vec3 NrefLight = reflect(Nfrom_light, Nnor);
	vec3 camDirection = camPos - FragPosWorldSpace;
	vec3 NcamDirection = normalize(camDirection);
	float specular = pow(max(dot(NcamDirection,NrefLight),0.0f), 128);

	float attC = 1.5f; //constant attenuation
	float attL = 0.05f; //linear attenuation
	float attQ = 0.02f; //quadratic attenuation
	float d = length(lightPos - FragPosWorldSpace);

	float attenuation = 1/(attC + (attL*d) + (attQ * pow(d,2)));

	float phi = cos(radians(15));
	vec3 NSpotDir = normalize(lightDirection);
	float theta = dot(Nfrom_light, NSpotDir);

	if (theta > phi)
	{
		float phong = (ambient + diffuse + specular) * attenuation;
		return phong;
	}
	else
	{
		float phong = ambient * attenuation;
		return phong;
	}
	
};




void main()
{
	float phong1 = CalculateDirectionalIllumination();
	float phong2 = CalculatePositionalIllumination();
	
	//vec4 texture_result = texture(Texture, tex);
	vec3 texture_colour = vec3(texture(Texture, tex).xyz);
	
	vec3 colour_afterLight1 = phong1 * lightColour;	
	vec3 colour_afterLight2 = phong2 * light2_Colour;
	

	fColour = vec4((colour_afterLight1+colour_afterLight2)*texture_colour, 1.0f);
	/*
	if (tex[0] < -1.f)
	{
		fColour = vec4(col * phong * lightColour, 1.f);
	}
	else
	{
		vec4 t = texture(Texture, tex);
		vec3 c = vec3(texture(Texture, tex).xyz);
		fColour = vec4(c * phong * light2_Colour, 1.f);	
	}
	*/
};
