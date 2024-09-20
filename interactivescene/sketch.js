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
}

function draw() {
  background(bg);
  x+=(tx-x)*0.02
  y+=(ty-y)*0.02
  r+=(tr-r)*0.02
  image(man,x,y,r*1.5,r);
}

function mouseWheel() {
if (true) {
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

