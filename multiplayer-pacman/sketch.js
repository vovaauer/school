// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const GRID_SIZE = 8;

let shared;
let character = {};

function preload() {
  partyConnect("wss://demoserver.p5party.org", "albertpacman");
  shared = partyLoadShared("main");
  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();

}

function setup() {
  noSmooth();
  noStroke();
  createCanvas(windowWidth, windowHeight); 
  if (partyIsHost()) {
    generateRandomGrid(GRID_SIZE,GRID_SIZE);
  }
}

function generateRandomGrid(cols,rows) {
  for (let y=0;y<cols;y++) {
    shared.grid.push([]);
    for (let x=0;x<rows;x++) {
      if (random(0,100)<50) {
        if (true) {
          shared.grid[y].push("wall");
        }
        else {
          shared.grid[y].push("food");
        }
      }
      else if (random(0,100)<95){
        shared.grid[y].push("food");
      }
      else {
        shared.grid[y].push("power");
      }
    }
  }
}

function draw() {
  displayGrid();
}

function displayGrid() {
  for (let y=0;y<GRID_SIZE;y++) {
    for (let x=0;x<GRID_SIZE;x++) {
      if (shared.grid[y][x] === "wall") {
        fill("blue");
        square(height/GRID_SIZE*x,height/GRID_SIZE*y,height/GRID_SIZE);
      }
      else if (shared.grid[y][x] === "food") {
        fill("black");
        square(height/GRID_SIZE*x,height/GRID_SIZE*y,height/GRID_SIZE);
        fill("white");
        circle(height/GRID_SIZE*x+GRID_SIZE,height/GRID_SIZE*y+GRID_SIZE,GRID_SIZE/2);
      }
      else if (shared.grid[y][x] === "power") {
        fill("black");
        square(height/GRID_SIZE*x,height/GRID_SIZE*y,height/GRID_SIZE);
        fill("white");
        circle(height/GRID_SIZE*x+GRID_SIZE,height/GRID_SIZE*y+GRID_SIZE,GRID_SIZE);
      }
    }
  }
}

function keyPressed() {

}