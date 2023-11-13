#version 450 core

layout(location = 0) in vec4 vPos;

uniform mat4 model; //to world space
uniform mat4 projectedLightSpaceMatrix; //projected light space

void main()
{
	gl_Position = projectedLightSpaceMatrix * model * vPos;
}
