// Translate and Rotate

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);
  push(); //save transormation matrix
  translate(200,200);
  rotate(mouseX);
  fill("red");
  square(0,0,100);
  pop();
  fill("green");
  rect(width/2,height,width*2,height);
}
