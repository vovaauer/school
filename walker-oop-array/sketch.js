// Walker oop demo array

class Walker {
  constructor(x,y,theColor) {
    this.x=x;
    this.y=y;
    this.speed=8;
    this.radius=3;
    this.color=theColor;
  }

  display() {
    fill(this.color);
    square(this.x,this.y,this.radius*2);
  }

  move() {
    let choice = random(0,100);
    if (choice<25) {
      this.y-=this.speed;
    }
    else if (choice<50) {
      this.y+=this.speed;
    }
    else if (choice<75) {
      this.x-=this.speed;
    }
    else {
      this.x+=this.speed;
    }
  }
}

let walkerArray = [];

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  for (let theWalker of walkerArray) {
    theWalker.move();
    theWalker.display();
  }
}

function mousePressed() {
  let randomColor = color(random(255),random(255),random(255));
  let someWalker = new Walker(mouseX,mouseY,randomColor);
  walkerArray.push(someWalker);
}