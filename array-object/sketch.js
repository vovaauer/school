// Arrays and Object Notation Assignment
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerid;
let players;
let player;
let guests;

function preload() {
  // connect to a p5party server
  partyConnect("wss://demoserver.p5party.org", "albert");
  // shared = partyLoadShared("main");
  guests = partyLoadGuestShareds();
  me = partyLoadMyShared();
  cursor = loadImage('cursor.svg');
}

function setup() {
  playerid = Math.floor(Math.random() * 100);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for (let i = 0; i < guests.length; i++) {
    const p = guests[i];
    image(cursor,p.x,p.y,32,32);
  }
  me.x = mouseX;
  me.y = mouseY;
  // let player = {
  //   x: mouseX,
  //   y: mouseY,
  //   id: playerid,
  // };
  // players.push(player);
  // for (let allplayers of players) {
  //   circle(allplayers.x,allplayers.y,playerid);
  // }
  // console.log(players);
  // for (allplayers in players) {
  //   circle(allplayers.x,allplayers.y,10);
  // }
}

function mouseClicked() {
}