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
let faceQueue;

let powerTimer

function preload() {
  partyConnect("wss://demoserver.p5party.org", "albertpacman");
  shared = partyLoadShared("main");
  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();
  lines = loadStrings("1.txt");
  images = {
    pacmap: loadImage("assets/pacmap.png"),
    pacman: {
      open: {
        up: loadImage("assets/pacman_open_up.png"),
        left: loadImage("assets/pacman_open_left.png"),
        down: loadImage("assets/pacman_open_down.png"),
        right: loadImage("assets/pacman_open_right.png"),
      },
      closed: {
        up: loadImage("assets/pacman_closed_up.png"),
        left: loadImage("assets/pacman_closed_left.png"),
        down: loadImage("assets/pacman_closed_down.png"),
        right: loadImage("assets/pacman_closed_right.png"),
      },
    },
    shadow: {
      up: loadImage("assets/shadow_up.png"),
      left: loadImage("assets/shadow_left.png"),
      down: loadImage("assets/shadow_down.png"),
      right: loadImage("assets/shadow_right.png"),
    },
    speedy: {
      up: loadImage("assets/speedy_right.png"),
      left: loadImage("assets/speedy_right.png"),
      down: loadImage("assets/speedy_right.png"),
      right: loadImage("assets/speedy_right.png"),
    },
    bashful: {
      up: loadImage("assets/bashful_right.png"),
      left: loadImage("assets/bashful_right.png"),
      down: loadImage("assets/bashful_right.png"),
      right: loadImage("assets/bashful_right.png"),
    },
    pokey: {
      up: loadImage("assets/pokey_right.png"),
      left: loadImage("assets/pokey_right.png"),
      down: loadImage("assets/pokey_right.png"),
      right: loadImage("assets/pokey_right.png"),
    },
    edible: {
      white: loadImage("assets/shadow_right.png"),
      blue: loadImage("assets/edible_blue.png"),
    },
    dead: {
      up: loadImage("assets/dead_up.png"),
      left: loadImage("assets/dead_left.png"),
      down: loadImage("assets/dead_down.png"),
      right: loadImage("assets/dead_right.png"),
    },
  };
}

function setup() {
  strokeWeight(4);
  noSmooth();
  noStroke();
  createCanvas(224, 248);
  // 28x31 or 224x248
  me.started=false;
  me.alive=true
  if (partyIsHost()) {
    shared.powered=false
    shared.pacmanExists=false;
    shared.grid=lines.map((line) => Array.from(line));
  }
}

function draw() {
  if (!me.started) {
    chooseCharacter();
  }
  if (me.started) {
    gridLogic();
    characterLogic();
    moveCharacter();
  }
}

function chooseCharacter() {
  textSize(10);
  fill(255);
  stroke(0);
  textAlign(CENTER);
  background(0);
  noSmooth();
  if (!shared.pacmanExists) {
    text('You are pacman! Click enter.',width/2,height/3);
    image(images.pacman.closed.right,width/2-32,height/2,32,32);
  }
  else {
    text('You are a ghost! Click a ghost.',width/2,height/2.5 );
    image(images.shadow.right,width/2-56,height/2,32,32);
    image(images.speedy.right,width/2-24,height/2,32,32);
    image(images.bashful.right,width/2+8,height/2,32,32);
    image(images.pokey.right,width/2+40,height/2,32,32);
  }
}

function keyPressed() {
  if (!me.started && key==="Enter" && !shared.pacmanExists) {
    shared.pacmanExists=true;
    me.character=`pacman`;
    faceQueue=`right`;
    me.facing=`right`;
    me.state=`open`;
    me.x=111;
    me.y=191;
    me.started = true;
  }

  if (me.started === true) {
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
  if (!me.started && shared.pacmanExists) {
    if (mouseY >= height/2 && mouseY <= height/2 + 32) {
      if (mouseX >= width/2-56 && mouseX <= width/2-24) {
        setupGhost('shadow');
      }
      else if (mouseX >= width/2-24 && mouseX <= width/2+8) {
        setupGhost('speedy');
      }
      else if (mouseX >= width/2+8 && mouseX <= width/2+40) {
        setupGhost('bashful');
      }
      else if (mouseX >= width/2+40 && mouseX <= width/2+72) {
        setupGhost('pokey');
      }
    }
  }
}
function setupGhost(character) {
  me.character=character
  faceQueue = 'up';
  me.facing = 'up';
  me.x = 111;
  me.y = 119;
  me.started = true;
  me.alive = true;
}

function characterLogic() {
  for (let i = 0; i < guests.length; i++) {
    const p = guests[i];
    if (p.character===`pacman`) {
      image(images[p.character][p.state][p.facing],p.x-11,p.y-11);
      if (((me.x-p.x<=8 && me.x-p.x>=-8) && (me.y-p.y<=8 && me.y-p.y>=-8)) && me.character!==`pacman` && !shared.powered && me.alive===true) {
        shared.pacmanExists=false;
      }
    }
    else {
      if (((me.x-p.x<=8 && me.x-p.x>=-8) && (me.y-p.y<=8 && me.y-p.y>=-8)) && me.character==`pacman` && !shared.powered && p.alive===true) {
        shared.pacmanExists=false;
      }
      if (p.started) {
        if (p.alive) {
          if (!shared.powered) {
            image(images[p.character][p.facing],p.x-11,p.y-11);
          }
        else {
          image(images[`edible`][`blue`],p.x-11,p.y-11);
        }
        }
          else {
            image(images[`dead`][p.facing],p.x-11,p.y-11);
          }
        if (((me.x-p.x<=8 && me.x-p.x>=-8) && (me.y-p.y<=8 && me.y-p.y>=-8)) && me.character==`pacman` && shared.powered) {
          p.alive=false
        }
      }
    }
  }
  if (!shared.pacmanExists) {
    endGame()
  }
}

function gridLogic() {
  let foodCount = 0;
  fill(248,176,144);
  image(images.pacmap,0,0,width,height);
  for (let y=0;y<31;y++) {
    for (let x=0;x<28;x++) {
      if (shared.grid[y][x] === "F") {
        square(x*8+3,y*8+3,3);
        foodCount+=1
        if (me.character === 'pacman' && (me.x+1)%8 === 0 && (me.y+1)%8 === 0) {
          shared.grid[(me.y+1)/8-1][(me.x+1)/8-1] = "E"
        }
      }
      else if (shared.grid[y][x] === "P") {
        ellipse(x*8+4,y*8+4,7);
        foodCount+=1
      }
      if (me.character === 'pacman' && (me.x+1)%8 === 0 && (me.y+1)%8 === 0) {
        if (shared.grid[(me.y+1)/8-1][(me.x+1)/8-1] === "P") {
          shared.powered = true;
          shared.grid[(me.y+1)/8-1][(me.x+1)/8-1] = "E";
          
          if (powerTimer) {
            clearTimeout(powerTimer);
          }
          
          powerTimer = setTimeout(() => {
            shared.powered = false;
            powerTimer = null;
          }, 10000);
        }
      }
    }
  }
  if (foodCount===0 || !shared.pacmanExists) {
    endGame()
  }
}

function endGame() {
  me.alive=true
  shared.powered=false;
  me.started=false
  shared.pacmanExists=false;
  shared.grid=lines.map((line) => Array.from(line));
}

function moveCharacter() {
  let moved=false
  if (faceQueue===`up` && !(shared.grid[Math.floor(me.y/8-1)][Math.floor(me.x/8)]===`W`) && (me.x+1)%8===0) {
    me.facing=`up`;
  }
  else if (faceQueue===`left` && !(shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8-1)]===`W`) && (me.y+1)%8===0) {
    me.facing=`left`;
  }
  else if (faceQueue===`down` && !(shared.grid[Math.floor(me.y/8+1)][Math.floor(me.x/8)]===`W`) && (me.x+1)%8===0) {
    me.facing=`down`;
  }
  else if (faceQueue===`right` && !(shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8+1)]===`W`) && (me.y+1)%8===0) {
    me.facing=`right`;
  }
  if (me.character===`pacman`||!shared.powered||frameCount%2===0)
  if (me.facing === `up` && !(shared.grid[Math.floor(me.y/8-1)][Math.floor(me.x/8)]===`W`) && (!(shared.grid[Math.floor(me.y/8-1)][Math.floor(me.x/8)]===`D`) || !(me.character===`pacman`))) {
    me.y-=1;
    moved=true
  }
  else if (me.facing === `left` && !(shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8-1)]===`W`) && (!(shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8-1)]===`D`) || !(me.character===`pacman`))) {
    me.x-=1;
    moved=true
  }
  else if (me.facing === `down` && !(shared.grid[Math.floor((me.y+1)/8)][Math.floor(me.x/8)]===`W`) && (!(shared.grid[Math.floor(me.y/8+1)][Math.floor(me.x/8)]===`D`) || !(me.character===`pacman`))) {
    me.y+=1;
    moved=true
  }
  else if (me.facing === `right` && !(shared.grid[Math.floor(me.y/8)][Math.floor((me.x+1)/8)]===`W`) && (!(shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8+1)]===`D`) || !(me.character===`pacman`))) {
    me.x+=1;
    moved=true
  }
  if (me.x>width+8) {
    me.x=-8;
  }
  else if (me.x<-8) {
    me.x=width+8;
  }
  if (frameCount%4===0 && moved===true && me.character===`pacman`) {
    if (me.state===`open`)
      me.state=`closed`
    else {
      me.state=`open`
    }
  }
  if (!me.alive && me.character !== 'pacman' && shared.grid[Math.floor(me.y/8)][Math.floor(me.x/8)] === "D") {
    me.alive = true;
  }
}