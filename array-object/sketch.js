// Arrays and Object Notation Assignment
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// 
// Circle code from circle demo

let playerid;
let players;
let player;
let guests;
let obstacles;

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
  playerid = Math.floor(Math.random() * 100);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  spawnBall();
  background(0);
  me.x = mouseX;
  me.y = mouseY;
  for (let someBall of ballArray) {
    // move the ball
    someBall.x+=someBall.dx;
    someBall.y+=someBall.dy;
    if (someBall.y>height || someBall.x>width || someBall.y<0 || someBall.x<0) {
      ballArray.splice(ballArray.indexOf(someBall),1);
    }
  }
  for (let someBall of ballArray) {
    // display the ball
    noStroke();
    fill(someBall.red,someBall.green,someBall.blue,someBall.alpha);
    circle(someBall.x,someBall.y,someBall.radius*2);
  }
  for (let i = 0; i < guests.length; i++) {
    const p = guests[i];
    if (!(me === p)) {
      image(cursor,p.x,p.y,34,34);
    }
  } 
}

function mouseClicked() {

}

function spawnBall() {
  let theBall = {
    x: 0,
    y: random(0,height),
    radius: random(30,70),
    dx: random(+1,+5),
    dy: random(-5,+5),
    red: random(0,255),
    green: random(0,255),
    blue: random(0,255),
    alpha: random(0,255),
  };
  ballArray.push(theBall);
}