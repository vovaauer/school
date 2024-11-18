// fireworks oop

const NUMBER_OF_PARTICLES_PER_CLICK = 100;

class Particle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.size = 5;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }
  
  display() {
    fill(this.r,this.g,this.b,this.opacity);
    circle(this.x,this.y,this.size);
  }
  
  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.opacity --;
  }

  isDead() {
    return this.opacity <= 0;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

let theFireworks = [];


function draw() {
  background(0);
  for (let firework of theFireworks) {
    if (firework.isDead()) {
      theFireworks.splice(theFireworks.indexOf(firework),0);
    }
    firework.update();
    firework.display();
  }
}

function mousePressed() {
  for (let i = 0; i < NUMBER_OF_PARTICLES_PER_CLICK; i++) {
    let someParticle = new Particle(mouseX,mouseY);
    theFireworks.push(someParticle);
  }
}