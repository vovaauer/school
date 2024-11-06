// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const GRID_SIZE = 32;

let shared;
let character = {};
let lines;
let pacmap;
let pacman;
let shadow;
let speedy;
let started = false;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "albertpacman");
  shared = partyLoadShared("main");
  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();
  lines = loadStrings("1.txt");
  pacmap = loadImage("pacmap.png");
  pacman = loadImage("pacman_2.png");
  shadow = loadImage("shadow_right.png");
  speedy = loadImage("speedy_right.png");
}

function setup() {
  noSmooth();
  noStroke();
  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(4);
  textAlign(CENTER);
  createCanvas(560, 620); 
  if (partyIsHost()) {
    generateGrid(GRID_SIZE,GRID_SIZE);
  }
}

function generateGrid(cols,rows) {
  shared.grid=lines;
}

function draw() {
  if (!started) {
    chooseCharacter();
  }
  if (started) {
    displayGrid();
  }
}

function chooseCharacter() {
  let pacmanExists = false;
  background(0);
  for (let i = 0; i < guests.length; i++) {
    // display players
    const p = guests[i];
    if (p.character==="pacman") {
      pacmanExists = true;
    }
  }
  if (pacmanExists) {
    text('You are pacman! Click him to enter.',width/2,height/2);
    image(pacman,width/2,height/2);
  }
  else {
    text('You are a ghost! Click a ghost to start.',width/2,height/2);
    image(shadow,width/2,height/2);
  }
}

function displayGrid() {
  image(pacmap,0,0,width,height);
  for (let y=0;y<GRID_SIZE;y++) {
    for (let x=0;x<GRID_SIZE;x++) {
      if (shared.grid[y][x] === "P") {
        fill("blue");
        square(height/GRID_SIZE*x,height/GRID_SIZE*y,height/GRID_SIZE);
      }
    }
  }
}

function keyPressed() {

}