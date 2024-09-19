// Square moving around screen
// Albert Auer
// 9/19/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x = 200
let y = 200
let radius = 250
let speed = 10

function preload() {
  luigi = loadImage('Luigi.webp');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(0);
  image(luigi,x,y,radius,radius)
  move();
}

function move() {
  if (y > 0) {
    if (keyIsDown(87) === true) {
      y -= speed;
    }
  }
  else {
    y = 0
  }
  if (x > 0) {
    if (keyIsDown(65) === true) {
      x -= speed;
    }
  }
  else {
    x = 0
  }
  if (y < windowHeight*0.9-radius) {
    if (keyIsDown(83) === true) {
      y += speed;
    }
  }
  else {
    y = windowHeight*0.9-radius
  }
  if (x < windowWidth*0.9-radius) {
    if (keyIsDown(68) === true) {
      x += speed;
    }
  }
  else {
    x = windowWidth*0.9-radius
  }
}