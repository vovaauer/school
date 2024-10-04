// Generative Art
// Albert Auer
// Oct 4, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



const TILE_SIZE = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  let tileArray = [];
  for (let y=0;y<height;y+=TILE_SIZE) {
    for (let x=0;x<width;x+=TILE_SIZE) {
      let someTile = spawnTile(x,y);
      tileArray.push(someTile);
    }
  }
  // display tile
  for (let myTile of tileArray) {
    fill(random(255),random(255),random(255));
    stroke(random(255),random(255),random(255));
    line(myTile.x1,myTile.y1,myTile.x2,myTile.y2);
  }
}

function spawnTile(x,y) {
  let tile;
  let choice = random(100);
  if (choice < 50) {
  // negative slope
    tile = {
      x1: x-TILE_SIZE/2,
      y1: y-TILE_SIZE/2,
      x2: x+TILE_SIZE/2,
      y2: y+TILE_SIZE/2,
    };
  }
  else {
  // negative slope
    tile = {
      x1: x-TILE_SIZE/2,
      y1: y+TILE_SIZE/2,
      x2: x+TILE_SIZE/2,
      y2: y-TILE_SIZE/2,
    };
  }
  return tile;
}
