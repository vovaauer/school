// Arrays and Object Notation Assignment
// Albert Auer
// 10/21/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// p5.party multilplayer
//
// Circle code from circle demo

let playerid;
let guests;
let shared;
let cursor;

function preload() {
  // connect to a p5party server
  partyConnect("wss://demoserver.p5party.org", "albertau");
  shared = partyLoadShared("main");
  guests = partyLoadGuestShareds();
  me = partyLoadMyShared();
  cursor = loadImage('cursor.svg')
}

function setup() {
  if (partyIsHost()) {
    // setup variables as host
    shared.width = windowWidth
    shared.height = windowHeight
    shared.objects = [];
    shared.graves = []
    shared.difficulty = 1;
  }
  // setup as guest and host
  createCanvas(shared.width, shared.height);
  me.alive = true;
}

function draw() {
  // draw loop to run functions
  background(0);
  spawnBalls();
  playerLogic();
  killLogic();
  moveBalls();
  displayBalls();
  displayGraves();
  displayDeathScreen();
}

function displayDeathScreen() {
  // displays death screen if player is dead
  if (!me.alive) {
    textAlign(CENTER, TOP);
    fill(255, 0, 0);
    textSize(32);
    text("You died, you will respawn when everyone else dies", width / 2, 50);
  }
}

function playerLogic() {
  // sets player's x and y coordinates
  me.x = mouseX;
  me.y = mouseY;
  // host logic
  if (partyIsHost()) {
    // reset logic, if everyone is dead
    let allDead = true;
    for (let guest of guests) {
      if (guest.alive) {
        allDead = false;
        break;
      }
    }
    if (allDead) {
      shared.difficulty = 1
      shared.objects = []
      shared.graves = []
      for (let i = 0; i < guests.length; i++) {
        const p = guests[i];
        p.alive = true
      }
    }
  }
  for (let i = 0; i < guests.length; i++) {
    // display players
    const p = guests[i];
    if (!(me === p)) {
      if (p.alive) {
        image(cursor,p.x,p.y,34,34);
      }
    }
  }
}

function killLogic() {
  // host logic for when player dies
  if (partyIsHost()) {
    for (let i = 0; i < guests.length; i++) {
        const p = guests[i];
      for (let theBall of shared.objects) {
        if ((dist(theBall.x,theBall.y,p.x,p.y) < theBall.radius) && p.alive) {
          p.alive = false;
          playerGrave(p.x,p.y);
          shared.objects.splice(shared.objects.indexOf(theBall),1);
          break;
        }
      }
    }
  }
  // client logic for when player dies
  for (let theBall of shared.objects) {
    if (dist(theBall.x,theBall.y,mouseX,mouseY) < theBall.radius) {
      if (me.alive) {
        playerGrave(mouseX,mouseY);
      }
      me.alive = false;
    }
  }
}

function moveBalls() {
  // host logic for ball movement
  if (partyIsHost()) {
    for (let someBall of shared.objects) {
      someBall.x+=someBall.dx;
      someBall.y+=someBall.dy;
      if ((someBall.y>height+someBall.radius || someBall.x>width +someBall.radius|| someBall.y<-someBall.radius || someBall.x<-someBall.radius) && partyIsHost()) {
        shared.objects.splice(shared.objects.indexOf(someBall),1);
      }
    }
  }
}

function displayBalls() {
  // clients displaying the balls
  for (let someBall of shared.objects) {
    noStroke();
    fill(someBall.red,someBall.green,someBall.blue,someBall.alpha);
    circle(someBall.x,someBall.y,someBall.radius*2);
  }
}


function displayGraves() {
  // clients display player graves
  for (let theGrave of shared.graves) {
    // display graves
    fill("red");
    circle(theGrave.x,theGrave.y,13);
  }
}

function spawnBalls() {
  // host logic for creating balls
  if (frameCount%120===0 && partyIsHost())  {
    for (let i = 0; i < shared.difficulty; i++) {
      // create the ball
      let theBall = {
        x: 0,
        y: random(0,height),
        radius: random(+shared.difficulty*10,+shared.difficulty*25),
        dx: random(+shared.difficulty*2,+shared.difficulty*5),
        dy: random(-shared.difficulty,+shared.difficulty),
        red: random(127,255),
        green: random(127,255),
        blue: random(127,255),
        alpha: random(127,255),
      };
      // push the ball
      shared.objects.push(theBall);
    }
    // increase difficulty over time
    shared.difficulty+=0.25
  }
}

function playerGrave(px,py) {
  // grave creation
  let theGrave = {
    x: px,
    y: py,
  };
  shared.graves.push(theGrave);
}