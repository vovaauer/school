// Bouncing ball demo
// Albert Auer
// October 3, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let someBall of ballArray) {
    // move the ball
    someBall.dy+=1;
    someBall.x+=someBall.dx;
    someBall.y+=someBall.dy;
    if (!someBall.y<height) {
      someBall.dy+=1;
    }
    // display the ball
    noStroke();
    fill(someBall.red,someBall.green,someBall.blue,someBall.alpha);
    circle(someBall.x,someBall.y,someBall.radius*2);
    // bounce the ball
    if (someBall.x < someBall.radius || someBall.x > width-someBall.radius) {
      someBall.dx = someBall.dx*-1;
    }
    if (someBall.y < someBall.radius || someBall.y > height-someBall.radius) {
      someBall.dy = someBall.dy*-1;
    }
  }
}

function mousePressed() {
  spawnBall(mouseX,mouseY);
}

function spawnBall(theX, theY) {
  let theBall = {
    x: theX,
    y: theY,
    radius: random(30,70),
    dx: random(-5,+5),
    dy: random(-5,+5),
    red: random(0,255),
    green: random(0,255),
    blue: random(0,255),
    alpha: random(0,255),
  };
  ballArray.push(theBall);
}