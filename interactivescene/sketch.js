// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;
let r;
let tx;
let ty;
let tr;
let music;
let place;
let tplace;
let ttplace;
let bg;
let man;

function preload(){
  music = loadSound("music.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  man = loadImage("man.webp");
  bg = loadImage("background.webp");
  r = height/3;
  x = width/2-r/1.35;
  y = height/2-r/6;
  place = 0;
  tx = x;
  ty = y;
  tr = r;
  tplace = 0;
  ttplace = 0;
  music.play();
  music.rate(0);
}

function start() {
  
}

function draw() {
  background(bg);
  x+=(tx-x)*0.04;
  y+=(ty-y)*0.04;
  r+=(tr-r)*0.04;
  place+=(tplace-place)*0.02;
  tplace+=(ttplace-tplace)*0.02;
  music.rate((tplace-place)/50);
  image(man,x,y,r*1.5,r);
  if (keyIsDown(UP_ARROW)) {
    if (tr>height/3) {
      tplace-=1;
      tx-=-width/17.5/600*r/100;
      ty-=-width/50/600*r/100;
      tr-=width/10/600*r/100;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    tplace+=1;
    tx+=-width/17.5/600*r/100;
    ty+=-width/50/600*r/100;
    tr+=width/10/600*r/100;
  }
  if (!music.isPlaying) {
    music.play();
  }
}

function mouseWheel(event) {
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


function characterAction() {
  
}

