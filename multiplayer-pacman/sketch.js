// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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
    generateGrid(28,31);
    shared.pacmanExists=false;
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
    displayCharacters();
  }
}

function chooseCharacter() {
  background(0);
  if (!shared.pacmanExists) {
    text('You are pacman! Click enter.',width/2,height/2);
    image(pacman,width/2,height/2);
  }
  else {
    text('You are a ghost! Click a ghost to start.',width/2,height/2);
    image(shadow,width/2,height/2);
  }
}

function keyPressed() {
  if (!started && key==="Enter" && !shared.pacmanExists) {
    shared.pacmanExists=true;
    me.character="pacman";
    started = true;
  }
}

function mouseClicked() {
  if (!started && shared.pacmanExists) {
    if (mouseX >= width/2 && mouseX <= width/2 + shadow.width && mouseY >= height/2 && mouseY <= height/2 + shadow.height) {
      me.character="shadow";
      started = true;
    }
  }
}

function displayCharacters() {
  for (let i = 0; i < guests.length; i++) {
    const p = guests[i];
    image(`${p.character}`,p.x,p.y,34,34);
  }
}

function displayGrid() {
  image(pacmap,0,0,width,height);
  for (let y=0;y<31;y++) {
    for (let x=0;x<28;x++) {
      if (shared.grid[y][x] === "P") {
        fill("blue");
        square(width/28*x,height/31*y,height/28);
      }
    }
  }
}