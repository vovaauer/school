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
let shared;

let ballArray = [];
let graveArray = [];

function preload() {
  // connect to a p5party server
  partyConnect("wss://demoserver.p5party.org", "albert");
  shared = partyLoadShared("main");
  guests = partyLoadGuestShareds();
  me = partyLoadMyShared();
  cursor = loadImage('cursor.svg');
}

function setup() {
  playerid = Math.floor(Math.random() * 100);
  createCanvas(windowWidth, windowHeight);
  me.alive = true;
  if (partyIsHost()) {
    shared.objects = [];
  }
}

function draw() {
  background(0);
  spawnBalls();
  playerLogic();
  killLogic();
  moveBalls();
  displayBalls();
  displayGraves();
}

function playerLogic() {
  me.x = mouseX;
  me.y = mouseY;
  deadPlayers = 0;
  for (let i = 0; i < guests.length; i++) {
    // display players
    const p = guests[i];
    if (!(me === p)) {
      if (p.alive) {
        image(cursor,p.x,p.y,34,34);
      }
    }
    if (p.alive === false) {
      deadPlayers+=1;
    }
    if (deadPlayers === guests.length) {
      graveArray = [];
      me.alive = true;
      shared.difficulty = 1;
      shared.objects = [];
    }
  }
}

function killLogic() {
  for (let someBall of ballArray) {
    // kill the player
    if (me.alive) {
      if (dist(someBall.x,someBall.y,mouseX,mouseY) < someBall.radius) {
        me.alive = false;
        playerGrave(mouseX,mouseY);
        // ballArray.splice(ballArray.indexOf(someBall),1);
      }
    }
  }
}

function moveBalls() {
  for (let someBall of ballArray) {
    // move the ball
    someBall.x+=someBall.dx;
    someBall.y+=someBall.dy;
    if (someBall.y>height || someBall.x>width || someBall.y<0 || someBall.x<0) {
      ballArray.splice(ballArray.indexOf(someBall),1);
    }
  }
}

function displayBalls() {
  for (let someBall of ballArray) {
    // display the ball
    noStroke();
    fill(someBall.red,someBall.green,someBall.blue,someBall.alpha);
    circle(someBall.x,someBall.y,someBall.radius*2);
  }
}


function displayGraves() {
  for (let theGrave of graveArray) {
    // display graves
    fill("red");
    circle(theGrave.x,theGrave.y,13);
  }
}

function spawnBalls() {
  if (frameCount%60===0) {
    for (let i = 0; i < shared.difficulty; i++) {
      if (partyIsHost()) {
        let theBall = {
          x: 0,
          y: random(0,height),
          radius: random(25,50),
          dx: random(+1,+10),
          dy: random(-1,+1),
          red: random(127,255),
          green: random(127,255),
          blue: random(127,255),
          alpha: random(127,255),
        };
        // ballArray.push(theBall);
        shared.objects.push(theBall);
      }
      ballArray = shared.objects;
    }
    if (partyIsHost()) {
      shared.difficulty+=1;
    }
  }
}

function playerGrave() {
  let theGrave = {
    x: mouseX,
    y: mouseY,
  };
  graveArray.push(theGrave);
  me.obstacles = graveArray;
}