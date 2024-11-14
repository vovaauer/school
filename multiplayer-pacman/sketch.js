// Multiplayer Pacman
// Albert Auer
// 11/15/2024
//
// Extra for Experts:
// - p5.party
// - Game runs when host has minimized tab

let shared;
let character = {};
let lines;
let images;
let pacmap;
let pacman;
let shadow;
let speedy;
let started = false;
let faceQueue;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "albertpacman");
  shared = partyLoadShared("main");
  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();
  lines = loadStrings("1.txt");

  images = {
    pacmap: loadImage("assets/pacmap.png"),
    pacman: {
      up: loadImage("assets/pacman_2.png"),
      left: loadImage("assets/pacman_2.png"),
      down: loadImage("assets/pacman_2.png"),
      right: loadImage("assets/pacman_2.png"),
    },
    shadow: {
      up: loadImage("assets/shadow_right.png"),
      left: loadImage("assets/shadow_right.png"),
      down: loadImage("assets/shadow_right.png"),
      right: loadImage("assets/shadow_right.png"),
    },
    speedy: {
      up: loadImage("assets/shadow_right.png"),
      left: loadImage("assets/shadow_right.png"),
      down: loadImage("assets/shadow_right.png"),
      right: loadImage("assets/shadow_right.png"),
    },
  };
}

function setup() {
  noSmooth();
  noStroke();
  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(4);
  textAlign(CENTER);
  createCanvas(224, 248);
  // 28x31 or 224x248
  if (partyIsHost()) {
    shared.pacmanExists=false;
    shared.grid=lines;
  }
}

function draw() {
  if (!started) {
    chooseCharacter();
  }
  if (started) {
    displayGrid();
    displayCharacters();
    moveCharacter();
  }
}

function chooseCharacter() {
  background(0);
  if (!shared.pacmanExists) {
    text('You are pacman! Click enter.',width/2,height/2);
    image(images.pacman.right,width/2,height/2);
  }
  else {
    text('You are a ghost! Click a ghost to start.',width/2,height/2);
    image(images.shadow.right,width/2,height/2);
  }
}

function keyPressed() {
  if (!started && key==="Enter" && !shared.pacmanExists) {
    shared.pacmanExists=true;
    me.character=`pacman`;
    faceQueue=`right`;
    me.facing=`right`;
    me.x=112;
    me.y=188;
    started = true;
  }

  if (started === true) {
    if (key==="w") {
      faceQueue=`up`;
    }
    if (key==="a") {
      faceQueue=`left`;
    }
    if (key==="s") {
      faceQueue=`down`;
    }
    if (key==="d") {
      faceQueue=`right`;
    }
  }
}

function mouseClicked() {
  if (!started && shared.pacmanExists) {
    // if (mouseX >= width/2 && mouseX <= width/2 + images.shadow.right && mouseY >= height/2 && mouseY <= height/2 + images.shadow.right) {
    if (true) {
      me.character=`shadow`;
      faceQueue=`up`;
      me.facing=`up`;
      me.x=112;
      me.y=188;
      started = true;
    }
  }
}

function displayCharacters() {
  for (let i = 0; i < guests.length; i++) {
    const p = guests[i];
    image(images[p.character][p.facing],p.x-11,p.y-11,16,16);
  }
}

function displayGrid() {
  fill(248,176,144)
  image(images.pacmap,0,0,width,height);
  for (let y=0;y<31;y++) {
    for (let x=0;x<28;x++) {
      if (shared.grid[y][x] === "F") {
        square(x*8+3,y*8+3,3);
      }
      else if (shared.grid[y][x] === "P") {
        ellipse(x*8+4,y*8+4,2);
      }
    }
  }
}

function moveCharacter() {
  if (faceQueue===`up` && !(shared.grid[Math.floor(me.y/8-1)][Math.floor(me.x/8)]===`W`)) {
    me.facing=`up`
  }
  if ((y+1)%8=0) {
    if (faceQueue===`left` && !(shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8-1)]===`W`)) {
      me.facing=`left`
    }
  }
  if (faceQueue===`down` && !(shared.grid[Math.floor(me.y/8+1)][Math.floor(me.x/8)]===`W`)) {
    me.facing=`down`
  }
  if (faceQueue===`right` && !(shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8+1)]===`W`)) {
    me.facing=`right`
  }
  if (me.facing === `up` && !(shared.grid[Math.floor(me.y/8-1)][Math.floor(me.x/8)]===`W`) && (!(shared.grid[Math.floor(me.y/8-1)][Math.floor(me.x/8)]===`D`) || !(me.character===`pacman`))) {
    me.y-=1
  }
  else if (me.facing === `left` && !(shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8-1)]===`W`) && (!(shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8-1)]===`D`) || !(me.character===`pacman`))) {
    me.x-=1
  }
  else if (me.facing === `down` && !(shared.grid[Math.floor(me.y/8+1)][Math.floor(me.x/8)]===`W`) && (!(shared.grid[Math.floor(me.y/8+1)][Math.floor(me.x/8)]===`D`) || !(me.character===`pacman`))) {
    me.y+=1
  }
  else if (me.facing === `right` && !(shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8+1)]===`W`) && (!(shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8+1)]===`D`) || !(me.character===`pacman`))) {
    me.x+=1
  }
  if (me.x>width+8) {
    me.x=-8
  }
  else if (me.x<-8) {
    me.x=width+8
  }
}