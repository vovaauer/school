// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


const CELL_SIZE = 50;
let grid;
let rows;
let cols;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols,rows);
}

function draw() {
  background(220);
  for (y=0;y<rows;y++) {
    for (x=0;x<cols;x++) {
      if (grid[y][x] === 0) {
        fill("black");
      }
      if (grid[y][x] === 1) {
        fill("white");
      }
      square(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE);
    }
  }
}

function generateRandomGrid(rows,cols) {
  let newGrid = [];
  for (y=0;y<rows;y++) {
    newGrid.push([]);
    for (x=0;x<cols;x++) {
      if (Math.round(random(0,1))===0) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}