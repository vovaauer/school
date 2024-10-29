// Character in Grid Demo
// Albert Auer
// Oct 22, 2024


let grid;
let shouldToggleNeighbours = false;
const GRID_SIZE = 5;
let cellSize;
const OPEN_TILE = 0;
const IMPASSABLE_TILE = 1;
const PLAYER_TILE = 9;
let grass;
let pavement;
let player = {
  x:0,
  y:0,
};

function preload() {
  grass = loadImage("grass.png");
  pavement = loadImage("pavement.png");
}

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
  // add player to the grid
  grid[player.y][player.x] = PLAYER_TILE;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (windowWidth<windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  for (let y=0;y<GRID_SIZE;y++) {
    for (let x=0;x<GRID_SIZE;x++) {
      if (grid[y][x] === IMPASSABLE_TILE) {
        // fill("black");
        image(grass,cellSize*x,cellSize*y,cellSize,cellSize);
      }
      else if (grid[y][x] === OPEN_TILE) {
        // fill("white");
        image(pavement,cellSize*x,cellSize*y,cellSize,cellSize);
      }
      else if (grid[y][x] === PLAYER_TILE) {
        fill("red");
        square(cellSize*x,cellSize*y,cellSize);
      }
      // square(cellSize*x,cellSize*y,cellSize);
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
        newGrid[y].push(IMPASSABLE_TILE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
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
      newGrid[y].push(OPEN_TILE);
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
  if (key==="n") {
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }
  if (key==="w") {
    movePlayer(player.x,player.y-1);
  }
  if (key==="a") {
    movePlayer(player.x-1,player.y);
  }
  if (key==="s") {
    movePlayer(player.x,player.y+1);
  }
  if (key==="d") {
    movePlayer(player.x+1,player.y);
  }
}

function movePlayer(x,y) {
  // dont run off the screen 
  if (x>=0 && x<GRID_SIZE && y>=0 && y<GRID_SIZE && grid[y][x] === OPEN_TILE) {
    // when moving reset to an open spot
    grid[player.y][player.x] = OPEN_TILE;
    player.x = x;
    player.y = y;
    // put player in grid
    grid[player.y][player.x] = PLAYER_TILE;
  }
}

function mousePressed() {
  cols = Math.floor(mouseX/width*GRID_SIZE);
  rows = Math.floor(mouseY/height*GRID_SIZE);
  flipCell(cols,rows);
  if (shouldToggleNeighbours) {
    flipCell(cols+1,rows);
    flipCell(cols-1,rows);
    flipCell(cols,rows+1);
    flipCell(cols,rows-1);
  }
}

function flipCell (cols,rows) {
  // make sure the cell you are toggling is in the grid
  if (cols>=0 && rows>=0 && rows < GRID_SIZE && cols < GRID_SIZE) {
    if (grid[rows][cols] === IMPASSABLE_TILE) {
      grid[rows][cols] = OPEN_TILE;
    }
    else if (grid[rows][cols] === OPEN_TILE) {
      grid[rows][cols] = IMPASSABLE_TILE;
    }
  }
}