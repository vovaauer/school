// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function preload() {
  partyConnect("wss://demoserver.p5party.org", "albertpacman");
  shared = partyLoadShared("main");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
}