// Walker oop demo

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

let luc;
let michael;

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  luc = new Walker(width/2,width/2,"red");
  michael = new Walker(width/2,width/2,"blue");
}

function draw() {
  luc.move();
  michael.move();
  luc.display();
  michael.display();
}
