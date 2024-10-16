// Arrays and Object Notation Assignment
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// 
// Circle code from circle demo

let players;
let player;
let guests;
let obstacles;
let difficulty = 0;

let ballArray = [];

function preload() {
  // connect to a p5party server
  partyConnect("wss://demoserver.p5party.org", "albert");
  // shared = partyLoadShared("main");
  guests = partyLoadGuestShareds();
  me = partyLoadMyShared();
  obstacles = partyLoadObstaclesShared();
  cursor = loadImage('cursor.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let i = 0; i < guests.length; i++) {
    const p = guests[i];
    if (!(me === p)) {
      image(cursor,p.x,p.y,34,34);
    }
  }
  me.x = mouseX;
  me.y = mouseY;
  for (let someBall of ballArray) {
    // move the ball
    someBall.x+=someBall.dx;
    someBall.y+=someBall.dy;
    // display the ball
    noStroke();
    fill(someBall.red,someBall.green,someBall.blue,someBall.alpha);
    circle(someBall.x,someBall.y,someBall.radius*2);
  }
  if (partyIsHost()) {
    difficulty+=1;
    if (difficulty%10 === 0) {
      spawnBall();
    }
  }
}

function mouseClicked() {

}

function spawnBall() {
  let theBall = {
    x: 0-100,
    y: random(0,height),
    radius: random(30,70),
    dx: random(+1,+5),
    dy: random(-1,+1),
    red: random(63,255),
    green: random(63,255),
    blue: random(63,255),
    alpha: random(63,255),
  };
  ballArray.push(theBall);
}