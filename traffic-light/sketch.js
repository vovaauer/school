// Traffic Light Starter Code
// Albert Auer
// Sep 24, 2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

const GREEN_LIGHT_DURATION = 3000;
const YELLOW_LIGHT_DURATION = 1000;
const RED_LIGHT_DURATION = 4000;
const TOTAL_DURATION = GREEN_LIGHT_DURATION + YELLOW_LIGHT_DURATION + RED_LIGHT_DURATION;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);
  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
  if (millis()%TOTAL_DURATION<GREEN_LIGHT_DURATION) {
    fill(0,255,0);
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  if (millis()%TOTAL_DURATION>=GREEN_LIGHT_DURATION && millis()%TOTAL_DURATION<=YELLOW_LIGHT_DURATION+GREEN_LIGHT_DURATION) {
    fill(255,255,0);
    ellipse(width/2, height/2, 50, 50); //middle
  }
  if (millis()%TOTAL_DURATION>YELLOW_LIGHT_DURATION+GREEN_LIGHT_DURATION) {
    fill(255,0,0);
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
}