// note: canvasWidth and canvasHeight will be defined before this script runs

const num_across = 9; //num of horizontal grids //Row
const num_down = 10; //num of vertical grids //Column

const cell_width = canvasWidth / num_across;
const cell_height = canvasHeight / num_down;

let x_grid_locations = [];
let y_grid_locations = [];

//random function
let random_size = [];
let random_rotate = [];
let random_colour = [];
let background_colour = 255;

//animation
const buffersPerFrame = 5;
let anchors = [];
const frameMax = 300; //speed of animation
let recording = false;
let gifRecorder = null;

const max_frames = 150;
const e = new p5.Ease();
let current_frame = 0;
let rect_size = canvasHeight / 6;



/* helper function */
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/* 
   getNoiseValue arguments:
   x: current grid location across
   y: current grid location down
   loop: can be any value from 0-1 and will loop
   name: the "name" of the lookup table. probably change this each time.
   min/max: the minimum and maximum of the value to return
   smoothness: 1 means elements are not related. larger numbers cause groupings.
*/

function getNoiseValue(x, y, loop, name, min, max, smoothness) {
  let hashNumber = name.hashCode();
  let xoff = cos(2*PI*loop);
  let yoff = sin(2*PI*loop);
  let noiseVal = noise(xoff + x / smoothness, yoff + y / smoothness, (0 + hashNumber));
  return map(noiseVal, 0, 1, min, max);
}

function storeGridPoints(param1, param2) {
  x_grid_locations = new Array(num_across+1); 
  y_grid_locations = new Array(num_down+1);

  for (let i = 0; i < num_across+1; i++) {
    let x = map(i, 0, num_across, 0, width);
    x_grid_locations[i] = x;
  }  
  for (let i = 0; i < num_down+1; i++) {
    let y = map(i, 0, num_down, 0, height);
    y_grid_locations[i] = y;
  }
  for (let i = 0; i < (num_down/2)*4; i++) {
    let rs = random(0.2,0.7);
    random_size[i] = rs;
  }
  for (let i = 0; i < (num_down/2)*4; i++) {
    let rr = random(0,360);
    random_rotate[i] = rr;
  }
  for (let i = 0; i < (num_down/2)*4; i++) {
    let rc = random([0,128,255]);
    random_colour[i] = rc;
  }
}

function setup () {
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');
  background(background_colour);

  anchors.push([7.75*cell_width/18, 11.5*cell_height/16]); //up
  anchors.push([7.75*cell_width/18, 12.5*cell_height/16]); //down
  anchors.push([7.25*cell_width/18, 12*cell_height/16]); //left
  anchors.push([8.25*cell_width/18, 12*cell_height/16]); //right

  storeGridPoints();
  
}

function mousePressed() {
  if(recording == false) {
    recording = true;
    gifRecorder = new p5recorder(frameMax, "wallpaper.gif", 25, 0, buffersPerFrame);
  }
}

function drawTentacles(min,max,x,y,colour,c,s){
  scale(s);
  //draw the tentcales(6 pairs)
  noStroke();
  fill(c);
  // [1]A
  //line(x, y-100, x, y-200);
  //left
  beginShape();
  curveVertex(x, y - 100);
  curveVertex(x, y - 100);
  curveVertex(x - max, y - 140);
  curveVertex(x - min, y - 160);
  curveVertex(x - max, y - 180);
  curveVertex(x - min, y - 200);
  curveVertex(x, y - 200);
  curveVertex(x, y - 200);
  endShape();
  //right
  beginShape();
  curveVertex(x-0.1, y-100);
  curveVertex(x-0.1, y-100);
  curveVertex(x-0.1+max, y-140);
  curveVertex(x-0.1+min, y-160);
  curveVertex(x-0.1+max, y-180);
  curveVertex(x-0.1+min, y-200);
  curveVertex(x-0.1, y-200);
  curveVertex(x-0.1, y-200);
  endShape();
  // [1]B
  //line(x, y+100, x, y+160);
  //left
  beginShape();
  curveVertex(x, y+100);
  curveVertex(x, y+100);
  curveVertex(x-max, y+100);
  curveVertex(x-min, y+120);
  curveVertex(x-max, y+140);
  curveVertex(x-min, y+160);
  curveVertex(x, y+160);
  curveVertex(x, y+160);
  endShape();
  //right
  beginShape();
  curveVertex(x-0.1, y+100);
  curveVertex(x-0.1, y+100);
  curveVertex(x-0.1+max, y+100);
  curveVertex(x-0.1+min, y+120);
  curveVertex(x-0.1+max, y+140);
  curveVertex(x-0.1+min, y+160);
  curveVertex(x-0.1, y+160);
  curveVertex(x-0.1, y+160);
  endShape();
  // [2]A
  //line(x-100, y-20, x-250, y-20);
  //up
  beginShape();
  curveVertex(x-100, y-20);
  curveVertex(x-100, y-20);
  curveVertex(x-120, (y-20)-max);
  curveVertex(x-140, (y-20)-min);
  curveVertex(x-160, (y-20)-max);
  curveVertex(x-180, (y-20)-min);
  curveVertex(x-200, (y-20)-max);
  curveVertex(x-220, (y-20)-min);
  curveVertex(x-240, (y-20)-max);
  curveVertex(x-250, (y-20)-min);
  curveVertex(x-250, y-20);
  curveVertex(x-250, y-20);
  endShape();
  //down
  beginShape();
  curveVertex(x-100, y-20-0.3);
  curveVertex(x-100, y-20-0.3);
  curveVertex(x-120, (y-20-0.3)+max);
  curveVertex(x-140, (y-20-0.3)+min);
  curveVertex(x-160, (y-20-0.3)+max);
  curveVertex(x-180, (y-20-0.3)+min);
  curveVertex(x-200, (y-20-0.3)+max);
  curveVertex(x-220, (y-20-0.3)+min);
  curveVertex(x-240, (y-20-0.3)+max);
  curveVertex(x-250, (y-20-0.3)+min);
  curveVertex(x-250, y-20-0.3);
  curveVertex(x-250, y-20-0.3);
  endShape();
  // [2]B
  //line(x+100, y-20, x+250, y-20);
  //up
  beginShape();
  curveVertex(x+80, y-20);
  curveVertex(x+80, y-20);
  curveVertex(x+120, (y-20)-max);
  curveVertex(x+140, (y-20)-min);
  curveVertex(x+160, (y-20)-max);
  curveVertex(x+180, (y-20)-min);
  curveVertex(x+200, (y-20)-max);
  curveVertex(x+220, (y-20)-min);
  curveVertex(x+240, (y-20)-max);
  curveVertex(x+250, (y-20)-min);
  curveVertex(x+250, y-20);
  curveVertex(x+250, y-20);
  endShape();
  //down
  beginShape();
  curveVertex(x+80, y-20-0.3);
  curveVertex(x+80, y-20-0.3);
  curveVertex(x+120, (y-20-0.3)+max);
  curveVertex(x+140, (y-20-0.3)+min);
  curveVertex(x+160, (y-20-0.3)+max);
  curveVertex(x+180, (y-20-0.3)+min);
  curveVertex(x+200, (y-20-0.3)+max);
  curveVertex(x+220, (y-20-0.3)+min);
  curveVertex(x+240, (y-20-0.3)+max);
  curveVertex(x+250, (y-20-0.3)+min);
  curveVertex(x+250, y-20-0.3);
  curveVertex(x+250, y-20-0.3);
  endShape();
  //[3]A
  //line(x+50, y-100, x+90, y-180);
  beginShape();
  curveVertex(x+50, y-100);
  curveVertex(x+50, y-100);
  curveVertex((x+60)-max, y-120);
  curveVertex((x+70)-min, y-140);
  curveVertex((x+80)-max, y-160);
  curveVertex((x+90)-min, y-180);
  curveVertex(x+90, y-180);
  curveVertex(x+90, y-180);
  endShape();
  beginShape();
  curveVertex(x+50-0.3, y-100);
  curveVertex(x+50-0.3, y-100);
  curveVertex((x+60-0.3)+max, y-120);
  curveVertex((x+70-0.3)+min, y-140);
  curveVertex((x+80-0.3)+max, y-160);
  curveVertex((x+90-0.3)+min, y-180);
  curveVertex(x+90-0.3, y-180);
  curveVertex(x+90-0.3, y-180);
  endShape();
  //[3]B
  //line(x-50, y+100, x-90, y+180);
  beginShape();
  curveVertex(x-50-0.3, y+100);
  curveVertex(x-50-0.3, y+100);
  curveVertex((x-60-0.3)+max, y+120);
  curveVertex((x-70-0.3)+min, y+140);
  curveVertex((x-80-0.3)+max, y+160);
  curveVertex((x-90-0.3)+min, y+180);
  curveVertex(x-90-0.3, y+180);
  curveVertex(x-90-0.3, y+180);
  endShape();
  beginShape();
  curveVertex(x-50, y+100);
  curveVertex(x-50, y+100);
  curveVertex((x-60)-max, y+120);
  curveVertex((x-70)-min, y+140);
  curveVertex((x-80)-max, y+160);
  curveVertex((x-90)-min, y+180);
  curveVertex(x-90, y+180);
  curveVertex(x-90, y+180);
  endShape();
  //[4]A
  //line(x+90, y-45, x+120, y-60);
  beginShape();
  curveVertex(x+90, y-45);
  curveVertex(x+90, y-45);
  curveVertex(x+100, (y-50)-max);
  curveVertex(x+110, (y-55)-min);
  curveVertex(x+120, (y-60)-max);
  curveVertex(x+130, (y-65)-min);
  curveVertex(x+130, y-65);
  curveVertex(x+130, y-65);
  endShape();
  beginShape();
  curveVertex(x+90, y-45-0.3);
  curveVertex(x+90, y-45-0.3);
  curveVertex(x+100, (y-50-0.3)+max);
  curveVertex(x+110, (y-55-0.3)+min);
  curveVertex(x+120, (y-60-0.3)+max);
  curveVertex(x+130, (y-65-0.3)+min);
  curveVertex(x+130, y-65-0.3);
  curveVertex(x+130, y-65-0.3);
  endShape();
  //[4]B
  //line(x-90, y+45, x-120, y+60);
  beginShape();
  curveVertex(x-90, y+45);
  curveVertex(x-90, y+45);
  curveVertex(x-100, (y+50)-max);
  curveVertex(x-110, (y+55)-min);
  curveVertex(x-120, (y+60)-max);
  curveVertex(x-130, (y+65)-min);
  curveVertex(x-140, (y+70)-max);
  curveVertex(x-160, (y+80)-min);
  curveVertex(x-160, y+80);
  curveVertex(x-160, y+80);
  endShape();
  beginShape();
  curveVertex(x-90, y+45-0.3);
  curveVertex(x-90, y+45-0.3);
  curveVertex(x-100, (y+50-0.3)+max);
  curveVertex(x-110, (y+55-0.3)+min);
  curveVertex(x-120, (y+60-0.3)+max);
  curveVertex(x-130, (y+65-0.3)+min);
  curveVertex(x-140, (y+70-0.3)+max);
  curveVertex(x-160, (y+80-0.3)+min);
  curveVertex(x-160, y+80-0.3);
  curveVertex(x-160, y+80-0.3);
  endShape();
  //[5]A
  //line(x-50, y-100, x-90, y-180);
  beginShape();
  curveVertex(x-50, y-100);
  curveVertex(x-50, y-100);
  curveVertex((x-60)-max, y-120);
  curveVertex((x-70)-min, y-140);
  curveVertex((x-80)-max, y-160);
  curveVertex((x-90)-min, y-180);
  curveVertex(x-90, y-180);
  curveVertex(x-90, y-180);
  endShape();
  beginShape();
  curveVertex(x-50-0.3, y-100);
  curveVertex(x-50-0.3, y-100);
  curveVertex((x-60-0.3)+max, y-120);
  curveVertex((x-70-0.3)+min, y-140);
  curveVertex((x-80-0.3)+max, y-160);
  curveVertex((x-90-0.3)+min, y-180);
  curveVertex(x-90-0.3, y-180);
  curveVertex(x-90-0.3, y-180);
  endShape();
  //[5]B
  //line(x+30, y+60, x+90, y+180);
  beginShape();
  curveVertex(x+30-0.3, y+60);
  curveVertex(x+30-0.3, y+60);
  curveVertex((x+40-0.3)+max, y+80);
  curveVertex((x+50-0.3)+min, y+100);
  curveVertex((x+60-0.3)+max, y+120);
  curveVertex((x+70-0.3)+min, y+140);
  curveVertex((x+80-0.3)+max, y+160);
  curveVertex((x+90-0.3)+min, y+180);
  curveVertex(x+90-0.3, y+180);
  curveVertex(x+90-0.3, y+180);
  endShape();
  beginShape();
  curveVertex(x+30, y+60);
  curveVertex(x+30, y+60);
  curveVertex((x+40)-max, y+80);
  curveVertex((x+50)-min, y+100);
  curveVertex((x+60)-max, y+120);
  curveVertex((x+70)-min, y+140);
  curveVertex((x+80)-max, y+160);
  curveVertex((x+90)-1, y+180);
  curveVertex(x+90, y+180);
  curveVertex(x+90, y+180);
  endShape();
  //[6]A
  //line(x-90, y-45, x-140, y-70);
  beginShape();
  curveVertex(x-90, y-45);
  curveVertex(x-90, y-45);
  curveVertex(x-100, (y-50)-max);
  curveVertex(x-110, (y-55)-min);
  curveVertex(x-120, (y-60)-max);
  curveVertex(x-130, (y-65)-min);
  curveVertex(x-140, (y-70)-min);
  curveVertex(x-140, y-70);
  curveVertex(x-140, y-70);
  endShape();
  beginShape();
  curveVertex(x-90, y-45-0.3);
  curveVertex(x-90, y-45-0.3);
  curveVertex(x-100, (y-50-0.3)+max);
  curveVertex(x-110, (y-55-0.3)+min);
  curveVertex(x-120, (y-60-0.3)+max);
  curveVertex(x-130, (y-65-0.3)+min);
  curveVertex(x-140, (y-70-0.3)+min);
  curveVertex(x-140, y-70-0.3);
  curveVertex(x-140, y-70-0.3);
  endShape();
  //[6]B
  //line(x+70, y+35, x+120, y+60);
  beginShape();
  curveVertex(x+70, y+35-0.3);
  curveVertex(x+70, y+35-0.3);
  curveVertex(x+80, (y+40-0.3)+max);
  curveVertex(x+90, (y+45-0.3)+min);
  curveVertex(x+100, (y+50-0.3)+max);
  curveVertex(x+110, (y+55-0.3)+min);
  curveVertex(x+120, (y+60-0.3)+min);
  curveVertex(x+120, y+60-0.3);
  curveVertex(x+120, y+60-0.3);
  endShape();
  beginShape();
  curveVertex(x+70, y+35);
  curveVertex(x+70, y+35);
  curveVertex(x+80, (y+40)-max);
  curveVertex(x+90, (y+45)-min);
  curveVertex(x+100, (y+50)-max);
  curveVertex(x+110, (y+55)-min);
  curveVertex(x+120, (y+60)-min);
  curveVertex(x+120, y+60);
  curveVertex(x+120, y+60);
  endShape();
}

function drawOctopus(x,y,colour,c){
  //MAIN BODY
  noStroke();
  fill(c);
  arc(x+10,y+6,254,254, -PI-0.8, PI-5, CHORD);
  ellipse(x, y-20, 200);
  fill(colour)
  ellipse(x, y, 150);
  fill(c);
  arc(x-32, y+41,150,150, PI+3, PI+4, CHORD);
  ellipse(x-3, y+31, 90);
  fill(c);
  beginShape();
  curveVertex(x+42, y+30);
  curveVertex(x+42, y+30);
  curveVertex(x+29, y+71);
  curveVertex(x-5, y+80);
  curveVertex(x-5, y+80);
  endShape();


  fill(c);
  beginShape();
  curveVertex(x+29, y+71);
  curveVertex(x+29, y+71);
  curveVertex(x+15, y+100);
  curveVertex(x-20, y+115);
  curveVertex(x-65, y+105);
  curveVertex(x-90, y+80);
  curveVertex(x-102, y+30);
  curveVertex(x-99, y-30);
  curveVertex(x-80, y-20);
  curveVertex(x-70, y+45);
  curveVertex(x-20, y+75);
  curveVertex(x-20, y+75);
  endShape();

  fill(colour);
  ellipse(x-20, y+41, 50, 60);
  //eye
  //stroke(0);
  //fill(255);
  //ellipse(x-20, y+41, 40, 25);
  /*
  fill(0);
  ellipse(x-20, y+41, 20, 20);
  */
}


function draw () {
  let steps_per_animation = frameMax;
  if (recording){
    steps_per_animation = frameMax * buffersPerFrame;
  }
  let cur_frame = frameCount % steps_per_animation;
  let cur_frac = map(cur_frame, 0, steps_per_animation, 0, 1);

  angleMode(DEGREES);
  noStroke();
  background(background_colour);

  // debug show the grid
    /*
    stroke(10);
    for (let i = 0; i < num_down; i=i+1) {
      for (let j = 0; j < num_across; j=j+1) {
        let y1 = y_grid_locations[i];
        let x1 = x_grid_locations[j];
        let y2 = y_grid_locations[i+1];
        let x2 = x_grid_locations[j+1];
        line(x1, y1, x2, y1);
        line(x1, y1, x1, y2);
      }
    }
    */

  let bbb = map(cur_frac, 0, 0.5, 0, canvasWidth*2.5); //radius of black background
  let www = map(cur_frac-0.50, 0, 0.5, 0, canvasWidth*2.5); //radius of white background
  let c1 = map(cur_frac, 0, 0.5, 0, 255);  //colour from black to white
  let c2 = map(cur_frac-0.50, 0, 0.5, 255, 0);  //colour from white to black
  let bodyColour;  //colour of pattern

  if (cur_frac <= 0.50){
    background(255);
    fill(0);
    let new_fraction1 = e.doubleCircularOgee(cur_frac, 0.5);
    let bbb_size = map(new_fraction1, 0, 0.5, 0, canvasWidth*2.5);
    ellipse(0, 0, bbb_size);
    background_colour = c1;
    bodyColour = c2;
  }else if (cur_frac > 0.50){
    background(0);
    fill(255);
    let new_fraction2 = e.doubleCircularOgee(cur_frac-0.5, 0.5);
    let www_size = map(new_fraction2, 0, 0.5, 0, canvasWidth*2.5);
    ellipse(canvasWidth, canvasHeight,www_size);
    background_colour = c2;
    bodyColour = c1;
  }

  let size = 0.01*cell_width;
  let scaleSize = 0.38;
  let ypos = cell_height * 0.5;
  
  for (let i = 0, s = 0, r = 0, c = 0; i < num_down+1; i=i+3) {
    for (let j = 1; j < num_across+1; j=j+2) {
      let y1 = y_grid_locations[i];
      let x1 = x_grid_locations[j];
      
      push();
      translate(x1,y1);
      let cur_shift_colour_dark = getNoiseValue(i, j, cur_frac, "cur_shift_colour_dark", 0, 200, 1);
      let cur_shift_colour_light = getNoiseValue(i, j, cur_frac, "cur_shift_colour_light", 200, 0, 1);

      let cur_size_large = getNoiseValue(i, j, cur_frac, "cur_size_large", 0.25, 0.4, 2);
      let cur_size_small = getNoiseValue(i, j, cur_frac, "cur_size_small", 0.4, 0.25, 2);

      let cur_shift_max_start = getNoiseValue(i, j, cur_frac, "cur_shift_max_start", 10, 5, 1); //highest point start
      let cur_shift_max_end = getNoiseValue(i, j, cur_frac, "cur_shift_max_end", 5, 10, 1); //highest point end

      let cur_shift_min_start = getNoiseValue(i, j, cur_frac, "cur_shift_min_start", 1, 5, 1);  //lowest point start
      let cur_shift_min_end = getNoiseValue(i, j, cur_frac, "cur_shift_min_end", 5, 1, 1);  //lowest point end
      
      if ((cur_frac <= 0.50) && (cur_frac >= 0.00)) {  //first half of the animation

        cur_size = map(cur_frac, 0.00, 0.50, cur_size_small, cur_size_large);
        cur_min = map(cur_frac, 0.00, 0.50, cur_shift_min_start, cur_shift_min_end);
        cur_max = map(cur_frac, 0.00, 0.50, cur_shift_max_start, cur_shift_max_end);
        cur_colour = map(cur_frac, 0.00, 0.50, cur_shift_colour_dark, cur_shift_colour_light);

      }else if ((cur_frac <= 1.00) && (cur_frac > 0.50)){  //second half of the animation
        
        cur_size = map(cur_frac-0.50, 0.00, 0.50, cur_size_large, cur_size_small);
        cur_min = map(cur_frac-0.50, 0.00, 0.50, cur_shift_min_end, cur_shift_min_start);
        cur_max = map(cur_frac-0.50, 0.00, 0.50, cur_shift_max_end, cur_shift_max_start);
        cur_colour = map(cur_frac-0.50, 0.00, 0.50, cur_shift_colour_light, cur_shift_colour_dark);

      }
      let st = size*cur_size; //scale of the pattern
      let min_t = cur_min;  //lowest point
      let max_t = cur_max;  //highest point
      let cur_c = cur_colour;  //test //colour changing
      drawTentacles(min_t,max_t,0,0,background_colour,bodyColour, st);
      pop();

      push();
      translate(x1,y1);
      scale(st);
      drawOctopus(0,0,background_colour,bodyColour);
      pop();

      s = s + 1;
      r = r + 1;
      c = c + 1;
    }
  }

  // draw the eyes
  let radius_one = 0.78 * cell_width;
  let eye_radius = 0.08 * cell_width;
  for (let i = 0; i < num_down+1; i=i+3) {
    for (let j = 0; j < num_across; j=j+2) {
      let y1 = y_grid_locations[i];
      let x1 = x_grid_locations[j];
      fill(0);
      push();
      translate(cell_width/2,-cell_height/2);

      if (cur_frac>=0) {
        if (cur_frac<=0.25){
          for(let i=0; i<1; i++) {

            let cur_anchor = anchors[i];
            let next_i = (i+1) % 4;
            let next_anchor = anchors[next_i];

            let cur_x = map(cur_frac, 0, 1, cur_anchor[0], next_anchor[0]);
            let cur_y = map(cur_frac, 0, 1, cur_anchor[1], next_anchor[1]);

            fill(0);
            ellipse(x1+cur_x, y1+cur_y, eye_radius);
            fill(255);
            ellipse(x1+cur_x, y1+cur_y, eye_radius*0.3);
            fill(0);
          }
        }
        if ((cur_frac>=0.25) && (cur_frac<=0.50)){
          for(let i=1; i<2; i++) {

            let cur_anchor = anchors[i];
            let next_i = (i+1) % 4;
            let next_anchor = anchors[next_i];

            let cur_x = map(cur_frac, 0, 1, cur_anchor[0], next_anchor[0]);
            let cur_y = map(cur_frac, 0, 1, cur_anchor[1], next_anchor[1]);

            fill(0);
            ellipse(x1+cur_x, y1+cur_y, eye_radius);
            fill(255);
            ellipse(x1+cur_x, y1+cur_y, eye_radius*0.3);
            fill(0);
          }
        }
        if ((cur_frac>=0.50) && (cur_frac<=0.75)){
          for(let i=2; i<3; i++) {
            
            let cur_anchor = anchors[i];
            let next_i = (i+1) % 4;
            let next_anchor = anchors[next_i];

            let cur_x = map(cur_frac, 0, 1, cur_anchor[0], next_anchor[0]);
            let cur_y = map(cur_frac, 0, 1, cur_anchor[1], next_anchor[1]);

            fill(0);
            ellipse(x1+cur_x, y1+cur_y, eye_radius);
            fill(255);
            ellipse(x1+cur_x, y1+cur_y, eye_radius*0.3);
            fill(0);
          }
        }
        if ((cur_frac>=0.75) && (cur_frac<=1.00)){
          for(let i=3; i<4; i++) {
            
            let cur_anchor = anchors[i];
            let next_i = (i+1) % 4;
            let next_anchor = anchors[next_i];

            let cur_x = map(cur_frac, 0, 1, cur_anchor[0], next_anchor[0]);
            let cur_y = map(cur_frac, 0, 1, cur_anchor[1], next_anchor[1]);

            fill(0);
            ellipse(x1+cur_x, y1+cur_y, eye_radius);
            fill(255);
            ellipse(x1+cur_x, y1+cur_y, eye_radius*0.3);
            fill(0);
          }
        }

      }
      pop();
    }
  }
  
if(recording) {
    gifRecorder.addBuffer();
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
