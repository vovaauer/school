// Local Storage Demo

let numberOfClicks = 0;
let highestClick = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // only get the high score if it exists
  if (getItem("highest")) {
    highestClick = getItem("highest");
  }
}

function draw() {
  background(0);
  displayClicks();
  displayHighest();
}

function mousePressed() {
  numberOfClicks++;
  if (numberOfClicks > highestClick) {
    highestClick = numberOfClicks;
    storeItem("highest",highestClick);
  }
}

function displayClicks() {
  fill("white")
  textSize(75);
  text(numberOfClicks,100,height/2);
}

function displayHighest() {
  fill("lime")
  textSize(75);
  text(highestClick,400,height/2);
}