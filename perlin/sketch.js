// Perlin noise ball demo

let x;
let y;
let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  time+=0.01
  x = width*noise(time);
  y = height*noise(time+10000);
  circle(x,y,50)
}
