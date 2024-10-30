// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const GRID_SIZE = 32;

let shared;
let pacmap;
let pacgrid;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "albertpacman");
  shared = partyLoadShared("main");
  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();
  pacmap = loadImage("pacmap.png");
  pacman_2 = loadImage("pacman_2.png");

}

function setup() {
  noSmooth();
  createCanvas(448, 496);
}

function draw() {
  displayGame();
}

function displayGame() {
  image(pacmap,0,0,448,496);
}

function keyPressed() {

}