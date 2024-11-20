// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnPoint(width/2,height/2);
}

function draw() {
  background(0);
  // move and draw lines
  for (let point of points) {
    point.update(point)
  }
  // draw circles after so they show up on top
  for (let point of points) {
    point.display();
  }
}

function mousePressed() {
  for (let i = 0;i<9;i++) {
    spawnPoint(mouseX,mouseY);
  }
  spawnPoint(mouseX,mouseY);
}

function spawnPoint(x,y) {
  let somePoint = new MovingPoint(x,y);
  points.push(somePoint);
}

class MovingPoint {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.color = color(random(255),random(255),random(255));
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.reach = 150;
    this.MINRADIUS = 15;
    this.MAXRADIUS = 50;
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x,this.y,this.radius*2);
  }

  update(point) {
    point.move();
    point.wrapAroundScreen();
    point.connectTo(points);
    point.adjustSizeWithMouse();
  }

  adjustSizeWithMouse() {
    let mouseDistance = dist(this.x,this.y,mouseX,mouseY);
    if (mouseDistance < this.reach) {
      let theSize = map(mouseDistance, 0, this.reach, this.MAXRADIUS, this.MINRADIUS)
      this.radius = theSize;
    }
    else {
      this.radius = this.MINRADIUS;
    }
  }

  move() {
    // pick random direction of movement
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // scale to movement speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    // move point
    this.x += this.dx;
    this.y += this.dy;

    //
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAroundScreen() {
    if (this.x > width + this.radius) {
      this.x = -this.radius;
    }
    if (this.x < -this.radius) {
      this.x = width + this.radius;
    }
    if (this.y > height + this.radius) {
      this.y = -this.radius;
    }
    if (this.y < -this.radius) {
      this.y = height + this.radius;
    }
  }
  connectTo(pointsArray) {
    for (let otherPoint of pointsArray) {
      if (this !== otherPoint) {
        let pointDistance = dist(this.x,this.y,otherPoint.x,otherPoint.y);
        if (pointDistance < this.reach) {
          stroke(this.color);
          line(this.x,this.y,otherPoint.x,otherPoint.y);
        }
      }
    }
  }
}