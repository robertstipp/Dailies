function setup() {
  createCanvas(600, 800);
  background("black");

  for (let y = 100; y <= height - 100; y += 10) {
    let point0 = createVector(100, y);
    let point1 = createVector(500, y);
    wavyLine(point0, point1);
  }
}
function draw() {}

function wavyLine(point0, point1) {
  noiseSeed(Math.floor(random(10000)));
  noFill();
  strokeWeight(3);
  stroke(255);
  const angle = atan2(point1.y - point0.y, point1.x - point0.x);
  let d = p5.Vector.dist(point0, point1);

  beginShape();

  for (let i = 0; i <= 1; i += 0.1) {
    let r = map(i, 0, 1, 0, d);
    let theta = map(noise(i), 0, 1, angle - 0.1, angle + 0.1);
    let xMid = point0.x + r * Math.cos(theta);
    let yMid = point0.y + r * Math.sin(theta);
    vertex(xMid, yMid);
  }

  endShape();
}
