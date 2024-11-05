// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const GRID_SIZE = 20;

let shared;
let character = {};
let lines;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "albertpacman");
  shared = partyLoadShared("main");
  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();
  lines = loadStrings("1.txt");
}

function setup() {
  noSmooth();
  noStroke();
  createCanvas(windowWidth, windowHeight); 
  if (partyIsHost()) {
    generateGrid(GRID_SIZE,GRID_SIZE);
  }
}

function generateGrid(cols,rows) {
  shared.grid=[];
  for (let y=0;y<cols;y++) {
    shared.grid.push([]);
    for (let x=0;x<rows;x++) {
      shared.grid.push(lines[y][x]);
    }
  }
}

function checkNeighbours(y,x) {
  let neighbours = 0;
  if (shared.grid[y-1][x-1]==="wall") {
    neighbours+=1;
  }
  return neighbours>1;
}


function draw() {
  displayGrid();
}

function displayGrid() {
  background(0);
  for (let y=0;y<GRID_SIZE;y++) {
    for (let x=0;x<GRID_SIZE;x++) {
      if (shared.grid[y][x] === "wall") {
        fill("blue");
        square(height/GRID_SIZE*x,height/GRID_SIZE*y,height/GRID_SIZE);
      }
      else if (shared.grid[y][x] === "food") {
        fill("white");
        circle(height/GRID_SIZE*x+GRID_SIZE,height/GRID_SIZE*y+GRID_SIZE,GRID_SIZE/2);
      }
      else if (shared.grid[y][x] === "power") {
        fill("white");
        circle(height/GRID_SIZE*x+GRID_SIZE,height/GRID_SIZE*y+GRID_SIZE,GRID_SIZE);
      }
    }
  }
}

function keyPressed() {

}