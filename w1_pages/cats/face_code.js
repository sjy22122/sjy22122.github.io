/*
 * This file should contain code that draws your faces.
 *
 * Each function takes parameters and draws a face that is within
 * the bounding box (-10, -10) to (10, 10).
 *
 * These functions are used by your final arrangement of faces as well as the face editor.
 */


function drawFace1(body_value, eye_type, eye_distance, tail_mode, 
	eyeEllipseValue,eyeColour,earvalueX,earvalueY,earLineValueX,
	earLineValueY,facePattern,body_colour,carpet_color) {
	
  let visible = 50; //white
  let visibleBlack = 50;

  /*colors*/
  let bodyColor1 = '#D98032'; //orange
  let bodyColor2 = '#8C7B65'; //light brown1
  let bodyColor3 = '#595857'; //dark gray
  let bodyColor4 = '#8C7B74'; //light brown2
  let bodyColor5 = '#656B8C'; //light blue
  let bodyColor6 = '#8C8B8B'; //gray
  let bodyColor7 = '#A69E8F'; //gray-green
  let eyeBallColor1 = '#734D3F'; //brown
  let eyeBallColor2 = '#BF7B3F'; //brown orange
  let eyeBallColor3 = '#6394BF'; //sea blue
  let eyeBallColor4 = '#F2E205'; //light yellow
  let carpetColor1 = '#274001'; //dark green
  let carpetColor2 = '#440C1D'; //dark red
  let carpetColor3 = '#F2A03D'; //dark yellow
  let carpetColor4 = '#693A66'; //dark purple
  


  /*set up color for body*/
  if (body_colour == 1){
  	bodyColour = bodyColor1;
  }
  if ((body_colour == 2) || (body_colour == 3)){
  	bodyColour = bodyColor2;
  }
  if ((body_colour == 4) || (body_colour == 5)){
  	bodyColour = bodyColor3;
  }
  if (body_colour == 6){
  	bodyColour = bodyColor4;
  }
  if (body_colour == 7){
  	bodyColour = bodyColor5;
  }
  if (body_colour == 8){
  	bodyColour = bodyColor6;
  }
  if ((body_colour == 9) || (body_colour == 10)){
  	bodyColour = bodyColor7;
  }

  /*set up color for eyeballs*/
  if (eyeColour == 1){
  	eye_centre = eyeBallColor1;
  }
  if (eyeColour == 2){
  	eye_centre = eyeBallColor2;
  }
  if (eyeColour == 3){
  	eye_centre = eyeBallColor3;
  }
  if (eyeColour == 4){
  	eye_centre = eyeBallColor4;
  }

  /*set up color for carpets*/
  if (carpet_color == 1){
  	carpetColor = carpetColor1;
  }
  if (carpet_color == 2){
  	carpetColor = carpetColor2;
  }
  if (carpet_color == 3){
  	carpetColor = carpetColor3;
  }
  if (carpet_color == 4){
  	carpetColor = carpetColor4;
  }


  /*draw carpet*/
  fill(carpetColor);
  noStroke();
  beginShape();
  vertex(7,7);
  vertex(-7,7);
  vertex(-10,10);
  vertex(10,10);
  endShape();
  fill(255,255,255,150);
  beginShape();
  vertex(6.2,7.5);
  vertex(-6.2,7.5);
  vertex(-8,9.5);
  vertex(8,9.5);
  endShape();

  noFill();
  stroke(carpetColor);
  strokeWeight(0.15);
  let j = 7;
  let gap = 19.8/(j-1);

  for(let i = 0; i < j; i++){
  	line(-9.9+(i*gap),10.1,-9.9+(i*gap),11.1);
  }
  for(let k = 0; k < j; k++){
  	noStroke();
  	fill(carpetColor);
  	ellipse(-9.9+(k*gap),11.1,0.7);
  }

  let shadow_width = map(body_value,0,100,9,14);
  fill(0,0,0, 150);
  ellipse(0, 8.2, shadow_width, 2);
  noStroke();

  /*bezier reference point*/
  //use 4 different bezier curves: top,left,bottom,right
  //bottom-width: -10 to -13/14
  /*
  //points
  fill(60);
  ellipse(2, -8.3, 0.3);
  ellipse(-2, -8.3, 0.3);
  ellipse(-2, 8.5, 0.3);
  ellipse(2, 8.5, 0.3);
  ellipse(2, -8.3, 0.3);
  ellipse(0,-8.6,0.3);
  //control point
  fill(255,0,0);
  ellipse(1, -8.7, 0.3);
  ellipse(-1, -8.7, 0.3);
  ellipse(-7, -6, 0.3); //Top1
  ellipse(-10, 7, 0.3); //bottom1
  ellipse(-1, 8.7, 0.3);
  ellipse(1, 8.7, 0.3);
  ellipse(10, 7, 0.3);  //bottom2
  ellipse(7, -6, 0.3); //Top2 7,-6
  */

  let body_width = map(body_value, 0, 100, 10, 14);
  let pattern_width1 = map(body_width, 10, 14, 5.9, 7.1);
  let pattern_width2= map(body_width, 10, 14, 6.4, 7.5);

  /*draw body shape*/
  fill(bodyColour);
  beginShape();
  vertex(2, -8.3);
  bezierVertex(1, -8.7, -1, -8.7, -2, -8.3);
  vertex(-2, -8.3);
  bezierVertex(-7, -6, -body_width, 7, -2, 8.5);
  vertex(-2, 8.5);
  bezierVertex(-1, 8.7, 1, 8.7, 2, 8.5);
  vertex(2, 8.5);
  bezierVertex(body_width, 7, 7, -6, 2, -8.3);
  endShape();
  
  
  fill(bodyColour);
  ellipse(0, 4, 7*body_width*0.1, 9);
  fill(255,255,255,visible);
  ellipse(0, 4, 7*body_width*0.1, 9);
  if (facePattern == 1){
  	fill(0,0,0,visibleBlack);
	 //left pattern
	 beginShape();
	 vertex(0,-8.6);
	 bezierVertex(0.2, -8.7, -1.5, -8.6, -2, -8.3);
	 bezierVertex(-5.8, -6.1, -pattern_width1, -2.9, -pattern_width2, -2);
	 bezierVertex(-5, -1, -2, -4, 0, -8.6);
	 endShape();
  }else if(facePattern == 2){
  	fill(0,0,0,visibleBlack);
  	//right pattern
	 beginShape();
	 vertex(0,-8.6);
	 bezierVertex(-0.2, -8.7, 1.5, -8.6, 2, -8.3);
	 bezierVertex(5.8, -6.1, pattern_width1, -2.9, pattern_width2, -2); 
	 bezierVertex(5, -1, 2, -4, 0, -8.6);
	 endShape();
  }
  
  

  /*ears*/
  fill(bodyColour);
  beginShape();
  curveVertex(-2, -8);
  curveVertex(-2, -8);
  curveVertex(-earvalueX,-earvalueY);
  curveVertex(-4, -6);
  curveVertex(-4, -6);
  endShape();
  beginShape();
  curveVertex(2, -8);
  curveVertex(2, -8);
  curveVertex(earvalueX, -earvalueY);
  curveVertex(4, -6);
  curveVertex(4, -6);
  endShape();

  fill(255,255,255,visible);
  beginShape();
  curveVertex(-2, -8);
  curveVertex(-2, -8);
  curveVertex(-earvalueX, -earvalueY);
  curveVertex(-4, -6);
  curveVertex(-4, -6);
  endShape();
  beginShape();
  curveVertex(2, -8);
  curveVertex(2, -8);
  curveVertex(earvalueX, -earvalueY);
  curveVertex(4, -6);
  curveVertex(4, -6);
  endShape();

  noFill();
  strokeWeight(0.1);
  stroke(60);
  line(-3.2-earLineValueX , -7.5, -3.8-(earLineValueX*2), -earLineValueY); 
  line(3.2+earLineValueX, -7.5, 3.8+(earLineValueX*2), -earLineValueY);

  

  /*eyes*/
  if (eye_type == 1){
  	let eye_ellipse = map(eyeEllipseValue, 0, 100, 0.5, 1.2);
  	fill(255);
	noStroke();
	beginShape();
	vertex(-3-eye_distance,-4);
	bezierVertex(-2.3-eye_distance, -4.8,-1.7-eye_distance, -4.8,-1-eye_distance,-4);
	bezierVertex(-1.7-eye_distance, -3.2,-2.3-eye_distance, -3.2,-3-eye_distance,-4);
	endShape();
	beginShape();
	vertex(3+eye_distance,-4);
	bezierVertex(2.3+eye_distance, -4.8,1.7+eye_distance, -4.8,1+eye_distance,-4);
	bezierVertex(1.7+eye_distance, -3.2,2.3+eye_distance, -3.2,3+eye_distance,-4);
	endShape();

	if (eye_ellipse<0.78){
		
		fill(0);
		ellipse(-2-eye_distance,-4, eye_ellipse, 1.2);
	    ellipse(2+eye_distance,-4, eye_ellipse, 1.2);
	}else{
		eye_ellipse = map(eyeEllipseValue, 0, 100, 0.5, 1);
		fill(0);
		strokeWeight(0.2);
		stroke(eye_centre);
		ellipse(-2-eye_distance,-4, eye_ellipse, 1);
		ellipse(2+eye_distance,-4, eye_ellipse, 1);
		noStroke();
		fill(255,255,255,200);
		ellipse(1.73+eye_distance,-4.2, 0.35, 0.35); 
		ellipse(-2.27-eye_distance,-4.2, 0.35, 0.35); 
	}
	
  }
  if (eye_type == 2){
  	let eye_ellipse = map(eyeEllipseValue, 0, 100, 0.5, 1.2);
  	fill(255);
	noStroke();
	beginShape();
	vertex(-3-eye_distance,-5);
	vertex(-1-eye_distance,-4);
	bezierVertex(-1.7-eye_distance, -2.8, -3-eye_distance, -3, -3-eye_distance,-5);
	endShape();
	beginShape();
	vertex(3+eye_distance,-5);
	vertex(1+eye_distance,-4);
	bezierVertex(1.7+eye_distance, -2.8, 3+eye_distance, -3, 3+eye_distance,-5);
	endShape();
	

	if (eye_ellipse<0.78){
		
		fill(0);
		ellipse(-2.05-eye_distance,-3.85, eye_ellipse, 1.2); 
		ellipse(2.05+eye_distance,-3.85, eye_ellipse, 1.2);
	}else{
		eye_ellipse = map(eyeEllipseValue, 0, 100, 0.5, 1);
		fill(0);
		strokeWeight(0.2);
		stroke(eye_centre);
		ellipse(-2.05-eye_distance,-3.85, eye_ellipse, 1); 
		ellipse(2.05+eye_distance,-3.85, eye_ellipse, 1);
		noStroke();
		fill(255,255,255,200);
		ellipse(1.73+eye_distance,-4.1, 0.35, 0.35);  
		ellipse(-2.27-eye_distance,-4.1, 0.35, 0.35); 
	}
  }
  if (eye_type == 3){
	noFill();
	stroke(0);
	strokeWeight(0.2);
	beginShape();
	vertex(-1-eye_distance,-3.8);
	bezierVertex(-1.5-eye_distance, -4.6, -2.5-eye_distance, -4.8, -3-eye_distance,-3.8);
	vertex(-3.35-eye_distance, -4.1);
	endShape();
	beginShape();
	vertex(1+eye_distance,-3.8);
	bezierVertex(1.5+eye_distance, -4.6, 2.5+eye_distance, -4.8, 3+eye_distance,-3.8);
	vertex(3.35+eye_distance, -4.1);
	endShape();
	fill(255);
	noStroke();
  }


  /*nose*/
  fill(0);
  ellipse(0,-3,0.8,0.5);

  /*mouth*/
  noFill();
  strokeWeight(0.1);
  stroke(255);
  beginShape();
  vertex(0,-2);
  bezierVertex(-0.5,-1, -1.5, -1, -2,-2);
  endShape();
  beginShape();
  vertex(0,-2);
  bezierVertex(0.5,-1, 1.5, -1, 2,-2);
  endShape();

  /*beard*/
  line(-3.8*body_width*0.1, -3, -5.5*body_width*0.1, -3.5);
  line(-3.8*body_width*0.1, -2.5, -6*body_width*0.1, -2.5);
  line(-3.8*body_width*0.1, -2, -5.5*body_width*0.1, -1.5);
  line(3.8*body_width*0.1, -3, 5.5*body_width*0.1, -3.5);
  line(3.8*body_width*0.1, -2.5, 6*body_width*0.1, -2.5);
  line(3.8*body_width*0.1, -2, 5.5*body_width*0.1, -1.5);

  /*legs*/
  fill(bodyColour);
  noStroke();
  beginShape();
  vertex(-0.1, 7);
  vertex(-0.1,8.5);
  bezierVertex(-0.6,9, -1.6, 9, -2.1,8.5);
  vertex(-2.1, 7);
  endShape();
  beginShape();
  vertex(0.1, 7);
  vertex(0.1,8.5);
  bezierVertex(0.6,9, 1.6, 9, 2.1,8.5);
  vertex(2.1, 7);
  endShape();

  /*tail*/
  let tailPoint = map(body_width, 10, 14, 1.0, 1.2);
  if(tail_mode == 1){
	  fill(bodyColour);
	  beginShape();
	  vertex(-5*tailPoint, 7);
	  bezierVertex(-4*tailPoint, 8, -3*tailPoint, 8, -2.5*tailPoint, 8);
	  bezierVertex(-1*tailPoint, 8, -1*tailPoint, 9.8, -1.9*tailPoint, 9.8);
	  bezierVertex(-6*tailPoint,10.5, -9.8*tailPoint, 8.5, -5*tailPoint, 7);
	  endShape();
	  fill(255,255,255,visible);
	  beginShape();
	  vertex(-5*tailPoint, 7);
	  bezierVertex(-4*tailPoint, 8, -3*tailPoint, 8, -2.5*tailPoint, 8);
	  bezierVertex(-1*tailPoint, 8, -1*tailPoint, 9.8, -1.9*tailPoint, 9.8);
	  bezierVertex(-6*tailPoint,10.5, -9.8*tailPoint, 8.5, -5*tailPoint, 7);
	  endShape();
  }else if(tail_mode == 2){
  	  fill(bodyColour);
	  beginShape();
	  vertex(5*tailPoint, 7);
	  bezierVertex(4*tailPoint, 8, 3*tailPoint, 8, 2.5*tailPoint, 8);
	  bezierVertex(1*tailPoint, 8, 1*tailPoint, 9.8, 1.9*tailPoint, 9.8);
	  bezierVertex(6*tailPoint,10.5, 9.8*tailPoint, 8.5, 5*tailPoint, 7);
	  endShape();
	  fill(255,255,255,visible);
	  beginShape();
	  vertex(5*tailPoint, 7);
	  bezierVertex(4*tailPoint, 8, 3*tailPoint, 8, 2.5*tailPoint, 8);
	  bezierVertex(1*tailPoint, 8, 1*tailPoint, 9.8, 1.9*tailPoint, 9.8);
	  bezierVertex(6*tailPoint,10.5, 9.8*tailPoint, 8.5, 5*tailPoint, 7);
	  endShape();
  }


 
}

/*
 * thinness_value ranges from 0-100 and indicates how thin the face is
 */


/*
 * tilt_value is in degrees
 * eye_value is an integer number of eyes: either 0, 1, 2, or 3
 * mouth_value is how open the mouth is and should generally range from 0.5 to 10
 */
