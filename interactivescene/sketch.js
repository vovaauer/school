// Virtual Insanity Interactive Scene
// Albert Auer
// October 1, 2024
//
// Extra for Experts:
// - using the mouse wheel as input
// - uses p5.sound to play music rate

// Setting all variables
let x;
let y;
let r;
let tx;
let ty;
let tr;
let music;
let place = 0;
let tplace = 0;
let ttplace = 0;
let bg;
let man;
let started = false;
let startbg;
let frozen = false;
let playspeed = 0;

// Load the music
function preload() {
  music = loadSound("music.mp3");
}

// Set additional variables, and create the canvas
function setup() {
  music = loadSound("music.mp3");
  createCanvas(windowWidth, windowHeight);
  man = loadImage("man.webp");
  bg = loadImage("background.webp");
  startbg = loadImage("startbg.png");
  r = height/3;
  x = width/2-r/1.35;
  y = height/2-r/6;
  tx = x;
  ty = y;
  tr = r;
}

// Draw loop links to functions
function draw() {
  displayImages();
  if (started) {
    musicRate();
    arrowKeySlider();
    smoothVariableChange();
  }
}

// Use the scroll wheel to move the man and change the music speed
function mouseWheel(event) {
  if (started){
    if (tr>height/3) {
      if (event.delta < 0) {
        ttplace-=20;
        tx+=width/17.5/600*r/5;
        ty+=width/50/600*r/5;
        tr+=-width/10/600*r/5;
      }
    }
    if (event.delta > 0) {
      ttplace+=20;
      tx-=width/17.5/600*r/5;
      ty-=width/50/600*r/5;
      tr-=-width/10/600*r/5;
    }
  }
}

// Start the scene
function mouseClicked() {
  if (!started){
    started = true;
    music.loop();
    music.rate(0);
  }
}

// Display the man, background, and start screen
function displayImages() {
  background(bg);
  if (started) {
    image(man,x,y,r*1.5,r);
  }
  else {
    background(startbg);
  }
}

// Change the variables so the scrolling and music speed changes are gradual
function smoothVariableChange() {
  x+=(tx-x)*0.04;
  y+=(ty-y)*0.04;
  r+=(tr-r)*0.04;
  place+=(tplace-place)*0.02;
  tplace+=(ttplace-tplace)*0.02;
}

// Use the up and down arrow keys to move the man and change the music speed
function arrowKeySlider() {
  if (started){
    if (keyIsDown(UP_ARROW)) {
      if (tr>height/3) {
        place+=1;
        tx-=-width/17.5/600*r/100;
        ty-=-width/50/600*r/100;
        tr-=width/10/600*r/100;
      }
    }
    if (keyIsDown(DOWN_ARROW)) {
      place-=1;
      tx+=-width/17.5/600*r/100;
      ty+=-width/50/600*r/100;
      tr+=width/
      10/600*r/100;
    }
  }
}

// Freeze the music when space is pressed
function keyPressed (event){
  if (key === " ") {
    frozen = !frozen;
  }
}

// Change the speed of the music, unless the speed is frozen, and 
function musicRate() {
  if (!frozen) {
    playspeed = (tplace-place)/50;  
  }
  music.rate(playspeed);
}