// Image Demo
// Sep 23, 2024
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let spongebob;

function preload() {
  spongebob = loadImage("spongebob.svg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(spongebob,mouseX,mouseY,spongebob.height/2,spongebob.width/2)
}
