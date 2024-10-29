// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shared;
let pacmap;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "albertpacman");
  shared = partyLoadShared("main");
  pacmap = loadImage("pacmap.png");
}

function setup() {
  createCanvas(224, 248);
}

function draw() {
  image(pacmap,0,0,224,248);
}