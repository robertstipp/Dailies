function draw() {
  createCanvas(600, 800);
  background("#404258");
  band(0, 500, 500);
  band(0, 600, 500);
}
function setup() {}

function band(x, y) {
  noFill();
  strokeWeight(80);
  stroke("red");
  let angle = PI / 6;
  let len = 200;

  let x1 = x + len * Math.cos(angle);
  let y1 = y - len * Math.sin(angle);
  let x2 = x1;
  let y2 = 0;

  let point0 = createVector(x, y);
  let point1 = createVector(x1, y1);
  let point2 = createVector(x2, y2);

  beginShape();
  vertex(point0.x, point0.y);
  vertex(point1.x, point1.y);
  vertex(point2.x, point2.y);
  endShape();
}
