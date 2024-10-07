// Terrain generation demo

let terrain = [];
const NUMBER_OF_RECS = 2000;
let theWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  theWidth = width/NUMBER_OF_RECS;
  generateTerrain();
}

function draw() {
  background(255);
  noStroke();
  fill(noise(),noise(),noise())
  for (let someRect of terrain){
    rect(someRect.x,someRect.y,someRect.w,someRect.h);
  }
}

function generateTerrain() {
  for (let x = 0;x<width;x+=theWidth) {
    let someRect = spawnRectangle(x,height*noise(x/width),theWidth);
    terrain.push(someRect);
  }
}

function spawnRectangle(leftSide,rectHeight,rectWidth) {
  let theRect = {
    x: leftSide,
    y: height-rectHeight,
    w: rectWidth,
    h: rectHeight,
  };
  return theRect;
}