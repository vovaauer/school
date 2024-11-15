// Multiplayer Pacman
// Albert Auer
// 11/15/2024
//
// Extra for Experts:
// - p5.party
// - Game runs when host has minimized tab

// constants
const GRID_SIZE = 8;
const GRID_WIDTH = 28;
const GRID_HEIGHT = 31;
const POWER_PELLET_DURATION = 10000;

// global variables
let shared;
let lines;
let images;
let pellet;
let powerPellet;
let pacmap;
let pacman;
let shadow;
let speedy;
let faceQueue;
let waSound;
let kaSound;
let pacmanDeathSound;
let ghostDeathSound;
let eatPowerSound;
let soundCounter;
let powerTimer;

function preload() {
  // p5 party basics
  partyConnect("wss://demoserver.p5party.org", "albertpacman");
  shared = partyLoadShared("main");
  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();
  lines = loadStrings("1.txt");
  // loading sounds
  waSound = loadSound("assets/wa.wav");
  kaSound = loadSound("assets/ka.wav");
  eatPowerSound = loadSound("assets/eat_power.wav");
  pacmanDeathSound = loadSound("assets/pacman_death.wav");
  ghostDeathSound = loadSound("assets/ghost_death.wav");
  // loading assets
  images = {
    pacmap: loadImage("assets/pacmap.png"),
    power_pellet: loadImage("assets/power_pellet.png"),
    pellet: loadImage("assets/pellet.png"),
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
  // create canvas
  createCanvas(224, 248);
  if (partyIsHost()) {
    // setup variables as host
    shared.powered = false;
    shared.pacmanExists = false;
    shared.grid=lines.map((line) => Array.from(line));
  }
}

function draw() {
  if (!me.started) {
    // start screen
    chooseCharacter();
  }
  if (me.started) {
    // in game functions
    gridLogic();
    characterLogic();
    moveCharacter();
  }
}

function chooseCharacter() {
  const ICON_SIZE = 32;
  // text setup
  textSize(8);
  fill(255);
  stroke(0);
  textAlign(CENTER);
  background(0);
  // remove smoothing so pacman is crisp
  noSmooth();
  // pacman selection
  if (!shared.pacmanExists) {
    text('You are pacman! Click anywhere.', width/2, height/3);
    image(images.pacman.closed.right, width/2 - ICON_SIZE/2, height/2, ICON_SIZE, ICON_SIZE);
  }
  // ghost selection
  else {
    text('You are a ghost! Click a ghost.', width/2, height/2.5);
    image(images.shadow.right, width/2 - 56, height/2, ICON_SIZE, ICON_SIZE);
    image(images.speedy.right, width/2 - 24, height/2, ICON_SIZE, ICON_SIZE);
    image(images.bashful.right, width/2 + 8, height/2, ICON_SIZE, ICON_SIZE);
    image(images.pokey.right, width/2 + 40, height/2, ICON_SIZE, ICON_SIZE);
  }
}

function keyPressed() {
  // wasd movement (queueing)
  if (me.started === true) {
    if (key === "w") {
      faceQueue = `up`;
    }
    if (key === "a") {
      faceQueue = `left`;
    }
    if (key === "s") {
      faceQueue = `down`;
    }
    if (key === "d") {
      faceQueue = `right`;
    }
  }
}

function mouseClicked() {
  // start as pacman
  if (!me.started && !shared.pacmanExists) {
    shared.pacmanExists = true;
    me.character = `pacman`;
    faceQueue = `right`;
    me.facing = `right`;
    me.state = `open`;
    me.x = 111;
    me.y = 191;
    me.started = true;
  }
  // start as ghost
  if (!me.started && shared.pacmanExists) {
    if (mouseY >= height/2 && mouseY <= height/2 + 32) {
      // which ghost?
      if (mouseX >= width/2 - 56 && mouseX <= width/2 - 24) {
        setupGhost('shadow');
      }
      else if (mouseX >= width/2 - 24 && mouseX <= width/2 + 8) {
        setupGhost('speedy');
      }
      else if (mouseX >= width/2 + 8 && mouseX <= width/2 + 40) {
        setupGhost('bashful');
      }
      else if (mouseX >= width/2 + 40 && mouseX <= width/2 + 72) {
        setupGhost('pokey');
      }
    }
  }
}
// setup as ghost
function setupGhost(character) {
  me.character = character;
  faceQueue = 'up';
  me.facing = 'up';
  me.x = 111;
  me.y = 119;
  me.started = true;
  me.alive = true;
}

function characterLogic() {
  let localPacmanExists = false;
  for (let i = 0; i < guests.length; i++) {
    const p = guests[i];
    // pacman logic
    if (p.character === `pacman`) {
      localPacmanExists = true;
      image(images[p.character][p.state][p.facing], p.x-11, p.y-11);
      // kills self if close enough to ghost
      if (me.x - p.x <= 8 && me.x - p.x >= -8 && me.y - p.y <= 8 && me.y - p.y >= -8 && me.character !== `pacman` && !shared.powered && me.alive === true) {
        shared.pacmanExists = false;
      }
    }
    // ghost logic
    else {
      // kill pacman if close enough
      if (me.x - p.x <= 8 && me.x - p.x >= -8 && me.y - p.y <= 8 && me.y - p.y >= -8 && me.character === `pacman` && !shared.powered && p.alive === true) {
        shared.pacmanExists = false;
      }
      if (p.started) {
        if (p.alive) {
          // when power pellet isn't active
          if (!shared.powered) {
            image(images[p.character][p.facing], p.x-11, p.y-11);
          }
          // when power pellet is active
          else {
            image(images[`edible`][`blue`], p.x-11, p.y-11);
          }
        }
        // when ghost is dead
        else {
          image(images[`dead`][p.facing], p.x-11, p.y-11);
        }
        // ghost death logic
        if (me.x - p.x <= 8 && me.x - p.x >= -8 && me.y - p.y <= 8 && me.y - p.y >= -8 && me.character === `pacman` && shared.powered && p.alive) {
          p.alive = false;
          ghostDeathSound.play();
        }
      }
    }
  }
  // pacman left or died? end the game
  if (!localPacmanExists) {
    shared.pacmanExists = false;
  }
  if (!shared.pacmanExists) {
    endGame();
  }
}

function gridLogic() {
  let foodCount = 0;
  image(images.pacmap, 0, 0, width, height);
  // 2d array loop
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      // food space logic
      if (shared.grid[y][x] === "F") {
        image(images.pellet, x*GRID_SIZE + 3, y*GRID_SIZE + 3);
        foodCount += 1;
        if (me.character === 'pacman' && (me.x + 1) % GRID_SIZE === 0 && (me.y + 1) % GRID_SIZE === 0 && shared.grid[(me.y + 1)/GRID_SIZE - 1][(me.x + 1)/GRID_SIZE - 1] === "F") {
          shared.grid[(me.y + 1)/GRID_SIZE - 1][(me.x + 1)/GRID_SIZE - 1] = "E";
          if (soundCounter) {
            soundCounter = !soundCounter;
            waSound.play();
          }
          else {
            soundCounter = !soundCounter;
            kaSound.play();
          }
        }
      }
      // power pellet space logic 
      else if (shared.grid[y][x] === "P") {
        image(images.power_pellet, x*GRID_SIZE, y*GRID_SIZE);
        foodCount += 1;
      }
      if (me.character === 'pacman' && (me.x + 1) % GRID_SIZE === 0 && (me.y + 1) % GRID_SIZE === 0) {
        // power pellet eating logic
        if (shared.grid[(me.y + 1)/GRID_SIZE - 1][(me.x + 1)/GRID_SIZE - 1] === "P") {
          shared.powered = true;
          shared.grid[(me.y + 1)/GRID_SIZE - 1][(me.x + 1)/GRID_SIZE - 1] = "E";
          eatPowerSound.play();
          if (powerTimer) {
            clearTimeout(powerTimer);
          }
          
          powerTimer = setTimeout(() => {
            shared.powered = false;
            powerTimer = null;
          }, POWER_PELLET_DURATION);
        }
      }
    }
  }
  // if all food is eaten, end the game
  if (foodCount === 0 || !shared.pacmanExists) {
    endGame();
  }
}

function endGame() {
  pacmanDeathSound.play();
  shared.pacmanExists = false;
  // reset grid
  shared.grid=lines.map((line) => Array.from(line));
  for (let i = 0; i < guests.length; i++) {
    const p = guests[i];
    // to not affect game while in menu
    p.x = 111;
    p.y = 119;
    p.character = `shadow`;
    // reset variables
    p.alive = true;
    shared.powered = false;
    p.started = false;
  }
}

function moveCharacter() {
  let moved = false;
  // logic to change direction with queue
  if (faceQueue === `up` && !(shared.grid[Math.floor(me.y/GRID_SIZE - 1)][Math.floor(me.x/GRID_SIZE)] === `W`) && (me.x + 1) % GRID_SIZE === 0) {
    me.facing = `up`;
  }
  else if (faceQueue === `left` && !(shared.grid[Math.floor(me.y/GRID_SIZE)][Math.floor(me.x/GRID_SIZE - 1)] === `W`) && (me.y + 1) % GRID_SIZE === 0) {
    me.facing = `left`;
  }
  else if (faceQueue === `down` && !(shared.grid[Math.floor(me.y/GRID_SIZE+1)][Math.floor(me.x/GRID_SIZE)] === `W`) && (me.x + 1) % GRID_SIZE === 0) {
    me.facing = `down`;
  }
  else if (faceQueue === `right` && !(shared.grid[Math.floor(me.y/GRID_SIZE)][Math.floor(me.x/GRID_SIZE + 1)] === `W`) && (me.y + 1) % GRID_SIZE === 0) {
    me.facing = `right`;
  }
  // logic to actually move and stop when hitting a wall
  if (me.facing === `up` && !(shared.grid[Math.floor(me.y/GRID_SIZE - 1)][Math.floor(me.x/GRID_SIZE)] === `W`) && (!(shared.grid[Math.floor(me.y/GRID_SIZE-1)][Math.floor(me.x/GRID_SIZE)] === `D`) || !(me.character === `pacman`))) {
    me.y -= 1;
    moved = true;
  }
  else if (me.facing === `left` && !(shared.grid[Math.floor(me.y/GRID_SIZE)][Math.floor(me.x/GRID_SIZE - 1)] === `W`) && (!(shared.grid[Math.floor(me.y/GRID_SIZE)][Math.floor(me.x/GRID_SIZE - 1)] === `D`) || !(me.character === `pacman`))) {
    me.x -= 1;
    moved = true;
  }
  else if (me.facing === `down` && !(shared.grid[Math.floor((me.y + 1)/GRID_SIZE)][Math.floor(me.x/GRID_SIZE)] === `W`) && (!(shared.grid[Math.floor(me.y/GRID_SIZE+1)][Math.floor(me.x/GRID_SIZE)] === `D`) || !(me.character === `pacman`))) {
    me.y += 1;
    moved = true;
  }
  else if (me.facing === `right` && !(shared.grid[Math.floor(me.y/GRID_SIZE)][Math.floor((me.x + 1)/GRID_SIZE)] === `W`) && (!(shared.grid[Math.floor(me.y/GRID_SIZE)][Math.floor(me.x/GRID_SIZE + 1)] === `D`) || !(me.character === `pacman`))) {
    me.x += 1;
    moved = true;
  }
  // portal logic
  if (me.x > width + GRID_SIZE) {
    me.x = -GRID_SIZE;
  }
  else if (me.x <- GRID_SIZE) {
    me.x = width + GRID_SIZE;
  }
  // pacman opening and closing mouth logic
  if (frameCount % 4===0 && moved === true && me.character === `pacman`) {
    if (me.state === `open`) {
      me.state = `closed`;
    }
    else {
      me.state = `open`;
    }
  }
  // ghost respawn logic
  if (!me.alive && me.character !== 'pacman' && shared.grid[Math.floor(me.y/GRID_SIZE)][Math.floor(me.x/GRID_SIZE)] === "D") {
    me.alive = true;
  }
}