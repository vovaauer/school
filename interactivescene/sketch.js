// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x
let y
let r
let tx
let ty
let tr

function setup() {
  createCanvas(windowWidth, windowHeight);
  man = loadImage('man.webp');
  bg = loadImage('background.webp');
  r = height/3
  x = width/2-r/1.35
  y = height/2-r/6
  tx = x
  ty = y
  tr = r
  music = loadSound()
}

function draw() {
  background(bg);
  x+=(tx-x)*0.07
  y+=(ty-y)*0.07
  r+=(tr-r)*0.07
  image(man,x,y,r*1.5,r);
  if (keyIsDown(UP_ARROW)) {
    if (tr>height/3) {
      tx-=-width/17.5/400*r/100
      ty-=-width/50/400*r/100
      tr-=width/10/400*r/100
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    tx+=-width/17.5/400*r/100
    ty+=-width/50/400*r/100
    tr+=width/10/400*r/100
  }
}

function mouseWheel() {
  if (tr>height/3) {
    if (event.delta < 0) {
      tx-=-width/17.5
      ty-=-width/50
      tr-=width/10
    }
  }
  if (event.delta > 0) {
    tx+=-width/17.5
    ty+=-width/50
    tr+=width/10
    }
}


function characterAction() {
  
}

