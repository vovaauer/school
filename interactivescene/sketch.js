// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 250
let y = 275
let r = 200
let tx = x
let ty = y
let tr = r

function setup() {
  createCanvas(windowWidth, windowHeight);
  man = loadImage('man.webp');
  bg = loadImage('background.webp');
  console.log(x,y)
}

function draw() {
  background(bg);
  x+=(tx-x)*0.1
  y+=(ty-y)*0.1
  r+=(tr-r)*0.1
  image(man,x,y,r*1.5,r);
}

function mouseWheel() {
  if (x<)
  if (event.delta > 0) {
    tx+=-10
    ty+=-5
    tr+=20
  }
  if (event.delta < 0) {
    tx-=-10
    ty-=-5
    tr-=20
  }
}

function characterAction() {
  
}

