// Arrays and Object Notation Assignment
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player = {x: 0, y: 0, color: "red"};
let players = [];

function preload() {
  // connect to a p5party server
  partyConnect("wss://demoserver.p5party.org", "albert");
  
  // tell p5.party to sync the pos object
  pos = partyLoadShared("pos", pos);
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  pos.x = mouseX;
  pos.y = mouseY;
  for (player of players) {
    ellipse(player.x, player.y, 100, 100);
  }
}

