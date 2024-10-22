// Grid Demo
// Albert Auer
// Oct 22, 2024

// If hardcoding the grid, use something like this:
// let grid = [[1,0,1,0],
//         [0,0,1,1],
//         [1,1,1,0],
//         [0,1,1,0]];

let grid;

const GRID_SIZE = 4;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (windowWidth<windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;

  grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  for (let y=0;y<GRID_SIZE;y++) {
    for (let x=0;x<GRID_SIZE;x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x] === 0) {
        fill("white");
      }
      square(cellSize*x,cellSize*y,cellSize);
    }
  }
}

function generateRandomGrid(cols,rows) {
  let newGrid = [];
  for (let y=0;y<cols;y++) {
    newGrid.push([]);
    for (let x=0;x<rows;x++) {
      // choose either 0 or 1 50% of the time
      if (random(0,100)<50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols,rows) {
  let newGrid = [];
  for (let y=0;y<cols;y++) {
    newGrid.push([]);
    for (let x=0;x<rows;x++) {
      // choose 0
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function keyPressed() {
  if (key==="r") {
    grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
  }
  if (key==="e") {
    grid = generateEmptyGrid(GRID_SIZE,GRID_SIZE);
  }
}

function mousePressed() {
  cols = mouseX/width*GRID_SIZE;
}