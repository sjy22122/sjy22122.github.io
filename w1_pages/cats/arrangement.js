/*
 * This program draws your arrangement of faces on the canvas.
 */

const canvasWidth = 960;
const canvasHeight = 500;
let curRandomSeed = 0;

let lastSwapTime = 0;
const millisPerSwap = 5000;

function setup () {
  // create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  curRandomSeed = int(focusedRandom(0, 1000));

  // rotation in degrees
  angleMode(DEGREES);
}

function changeRandomSeed() {
  curRandomSeed = curRandomSeed + 1;
  lastSwapTime = millis();
}

// global variables for colors
const bg_color1 = [225, 206, 187];


function mouseClicked() {
  changeRandomSeed();
}

function lantern(){
  
  fill(0);
  rect(-50, -80, 100, 10);
  rect(-50, 50, 100, 10);

  fill('#BF2604');
  beginShape();
  vertex(-50, -75);
  bezierVertex(-70, -33, -70, 13, -50, 55);
  vertex(-50, 55);
  vertex(50, 55);
  bezierVertex( 70, 13, 70, -33, 50, -75);
  vertex(-50, -75);
  endShape();

}


function draw () {
  if(millis() > lastSwapTime + millisPerSwap) {
    changeRandomSeed();
  }

  // reset the random number generator each time draw is called
  resetFocusedRandom(curRandomSeed);
  let wood1 = '#F2E2CE'; //light wood 
  let wood2 = '#BFA380'; //dark wood
  let wood3 = '#A6896F'; 
  let wood4 = '#734C36'; //dark

  // clear screen
  background(bg_color1);
  fill(wood1);
  rect(0,0,canvasWidth,canvasHeight);
  noStroke();
  

  fill(wood3);
  strokeWeight(2);
  stroke(wood1);
  rect(0,0,canvasWidth/7,canvasHeight);
  rect((canvasWidth*6)/7,0,canvasWidth/7,canvasHeight);

  let rect_width = canvasWidth/28;
  fill(wood4);
  noStroke();
  rect(0, 0, rect_width, canvasHeight);
  rect(rect_width*2, 0, rect_width, canvasHeight);
  rect(rect_width*24, 0, rect_width, canvasHeight);
  rect(rect_width*26, 0, rect_width, canvasHeight);

  noStroke();
  fill(wood3);
  rect(canvasWidth/7,canvasHeight/4-11,canvasWidth*5/7,10);
  rect(canvasWidth/7,canvasHeight*2/4-11,canvasWidth*5/7,10);
  rect(canvasWidth/7,canvasHeight*3/4-11,canvasWidth*5/7,10);
  rect(canvasWidth/7,canvasHeight-11,canvasWidth*5/7,10);
  
  /*perspective shape (fail)*/
  /*
  stroke(wood2);
  line((canvasWidth/7)+(canvasWidth*5/7)*0.05, (canvasHeight/4)*0.75, canvasWidth/7, canvasHeight/4-11);
  line(canvasWidth*6/7, canvasHeight/4-11, (canvasWidth/7)+(canvasWidth*5/7)*0.05+((canvasWidth*5/7)*0.9), (canvasHeight/4)*0.75);

  line((canvasWidth/7), canvasHeight*2/4-11, (canvasWidth/7)+(canvasWidth*5/7)*0.05, (canvasHeight/4)*1.75);
  line(canvasWidth*6/7, canvasHeight*2/4-11, (canvasWidth/7)+(canvasWidth*5/7)*0.05 +((canvasWidth*5/7)*0.9), (canvasHeight/4)*1.75);

  line((canvasWidth/7), canvasHeight*3/4-11, (canvasWidth/7)+(canvasWidth*5/7)*0.05, (canvasHeight/4)*2.75);
  line(canvasWidth*6/7, canvasHeight*3/4-11, (canvasWidth/7)+(canvasWidth*5/7)*0.05 +((canvasWidth*5/7)*0.9), (canvasHeight/4)*2.75);

  line((canvasWidth/7), canvasHeight-11, (canvasWidth/7)+(canvasWidth*5/7)*0.05, (canvasHeight/4)*3.75);
  line(canvasWidth*6/7, canvasHeight-11, (canvasWidth/7)+(canvasWidth*5/7)*0.05 +((canvasWidth*5/7)*0.9), (canvasHeight/4)*3.75);

  

  rect((canvasWidth/7)+(canvasWidth*5/7)*0.05,(canvasHeight/4)*0.05,(canvasWidth*5/7)*0.9,(canvasHeight/4)*0.7);
  rect((canvasWidth/7)+(canvasWidth*5/7)*0.05,(canvasHeight/4)*1.05,(canvasWidth*5/7)*0.9,(canvasHeight/4)*0.7);
  rect((canvasWidth/7)+(canvasWidth*5/7)*0.05,(canvasHeight/4)*2.05,(canvasWidth*5/7)*0.9,(canvasHeight/4)*0.7);
  rect((canvasWidth/7)+(canvasWidth*5/7)*0.05,(canvasHeight/4)*3.05,(canvasWidth*5/7)*0.9,(canvasHeight/4)*0.7);
  */
  /*draw lantern*/
  /*
  push();
  noStroke();
  translate(canvasWidth/14,canvasHeight/9);
  scale(0.5);
  lantern();
  pop();
  push();
  translate(canvasWidth*13/14,canvasHeight/9);
  scale(0.5);
  lantern();
  pop();*/
  
  // draw a 5x4 grid of faces
  let w = canvasWidth / 7;
  let h = canvasHeight / 4;
  for(let i=0; i<4; i++) {
    for(let j=0; j<7; j++) {
      let y = h/2 + h*i;
      let x = w/2 + w*j;
      if ((i >= 0) && (j!=0) &&(j!=6)) {
        let catWidth = focusedRandom(0,100);
        let eyeTypeRandom = focusedRandom(0,100);
        let eyeDistanceRandom = focusedRandom(0,100);
        let eyeEllipseRandom = focusedRandom(0,100);
        let earvalue = focusedRandom(0,100);
        let facePatternRandom = focusedRandom(0,100);
        let eyecolourRandom = focusedRandom(0,100);
        let bodyColorRandom = focusedRandom(0,100);
        let carpetColorRandom = focusedRandom(0,100);

        let eyecolour = int(map(eyecolourRandom, 0, 100, 1, 5));
        let bodyColor = int(map(bodyColorRandom, 0, 100, 1, 11));
        let carpet = int(map(carpetColorRandom, 0, 100, 1, 5));
        let facePattern = int(map(facePatternRandom, 0, 100, 1, 4));
        let earvalueX = map(earvalue, 0, 100, 4, 5);
        let earvalueY = map(earvalue, 0, 100, 9.5, 8);
        let earLineValueX = map(earvalue, 0, 100, 0, 0.3);
        let earLineValueY = map(earvalue, 0, 100, 9, 7.6);
        let tail = int(random(1,3));
        let eye_type = int(map(eyeTypeRandom, 0, 100, 1, 4));
        let eye_distance = map(eyeDistanceRandom, 0, 100, 0, 1.5);

        push();
        translate(x, y);
        scale(w/25, h/25);
        drawFace1(catWidth,eye_type,eye_distance,tail,eyeEllipseRandom,eyecolour,
          earvalueX,earvalueY,earLineValueX,earLineValueY,facePattern,bodyColor,carpet);
        pop();
      }
    }
    }
  }

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
