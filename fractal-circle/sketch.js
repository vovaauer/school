// fractal circle demo
// using recursion



function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
}

function draw() {
  background(220);
  recursiveCircle(mouseX,mouseY,mouseX+mouseY);
}

function recursiveCircle(x,y,radius) {
  circle(x,y,radius*2);
  if (radius > 10) {
    recursiveCircle(x-radius/2,y,radius/2);
    recursiveCircle(x+radius/2,y,radius/2);
  }
}