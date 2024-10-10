// Bubble object demo
// to see how to delete objects from the array

let theBubbles = [];
let deathLocations = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // for (let i = 0;i<5;i++) {
  //   spawnBubble();
  // }
  // create new bubble every half second
  window.setInterval(spawnBubble,0);
}

function draw() {
  background(220);
  // moveBubblesRandomly();
  moveBubblesWithNoise();
  displayBubbles();
  displayGraves();
}

function displayGraves() {
  for (let grave of deathLocations) {
    textalign(CENTER,CENTER);
    fill("black");
    text("X",grave.x,grave.y);
  }
}

function mousePressed() {
  for (let bubble of theBubbles) {
    if (clickedOnBubble(mouseX,mouseY,bubble)) {
      let theIndex = theBubble.indexOf(bubble);
      theBubbles.splice(theIndex,1);
      undertaker(mouseX,mouseY);
    }
  }
}

function undertaker(theX,theY) {
  let grave = {
    x: theX,
    y: theY,
  };
  deathLocations.push(grave);
}

function clickedOnBubble(x,y,theBubble) {
  let distanceAway = dist(x, y, theBubble.x, theBubble.y);
  return distanceAway < theBubble.radius;
}

function moveBubblesWithNoise() {
  for (let bubble of theBubbles) {
    bubble.x = noise(bubble.timeX)*width;
    bubble.y = noise(bubble.timeY)*height;
    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }

}

function moveBubblesRandomly() {
  for (let bubble of theBubbles) {
    let choice = random(0,100);
    if (choice<50){
      //move up
      bubble.y-=bubble.speed;
    }
    else if (choice<65) {
      // move down
      bubble.y+=bubble.speed;
    }
    if (choice<25) {
      // move right
      bubble.x+=bubble.speed;
    }
    else if (choice<75) {
      //move left
      bubble.x-=bubble.speed;
    }
  }
}

function displayBubbles() {
  for (let bubble of theBubbles) {
    noStroke();
    fill(bubble.r,bubble.g,bubble.b,bubble.a);
    circle(bubble.x,bubble.y,bubble.radius*2);
  }
}


function spawnBubble() {
  let someBubble = {
    x: random(0,width),
    y: height+random(0,50),
    speed: random(2,5),
    radius: random(20,50),
    r: random(255),
    g: random(255),
    b: random(255),
    a: random(255),
    timeX: random(10000000),
    timeY: random(10000000),
    deltaTime: 0.003
  };

  theBubbles.push(someBubble);
}