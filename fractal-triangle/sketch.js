// serpinsky triangle
// recursion

let depth = 0;
let theColors = ["red","green","blue"];

let initalTriangle = [
  {x:800, y:0},
  {x:0, y:765},
  {x:1600, y:765},
];

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // background(220);
  recursiveTriangle(initalTriangle, depth);
}

function recursiveTriangle(points, depth) {
  fill(theColors[depth]);
  triangle(points[0].x,points[0].y,
    points[1].x,points[1].y,
    points[2].x,points[2].y);
  if (depth === 0) {
    recursiveTriangle(midpoint(points[0],points[1]),
      midpoint(points[1],points[2]),
      midpoint(points[2],points[0]), depth-1);
    depth+=1;
  }
}

function midpoint(point1,point2) {
  let midX = (point1.x+point2.x)/2;
  let midY = (point1.y+point2.y)/2;
  return {x: midX, y: midY};
}

function mousePressed() {
  if (depth<5) {
    depth++; 
  }
}