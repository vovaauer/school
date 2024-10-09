// Arrays and Object Notation Assignment
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerid;
let players = [];
let player;

function preload() {
  // connect to a p5party server
  partyConnect("wss://demoserver.p5party.org", "albert");
  
  // tell p5.party to sync the pos object
  player = partyLoadShared("player", player);
}

function setup() {
  playerid = Math.floor(Math.random() * 100);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  let player = {
    x: mouseX,
    y: mouseY,
    id: playerid,
  };
  players.push(player);
  for (let allplayers of players) {
    circle(allplayers.x,allplayers.y,playerid);
  }
  console.log(players);
  // for (allplayers in players) {
  //   circle(allplayers.x,allplayers.y,10);
  // }
}

