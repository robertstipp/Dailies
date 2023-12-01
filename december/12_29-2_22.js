function setup() {
  createCanvas(600, 600);
  background(255);

  let origin = createVector(width / 2, height / 2 + 200);
  let fireWorkHeight = 300;
  firework(origin, fireWorkHeight);
}
function draw() {}

function firework(origin, height) {
  let base = origin.copy();
  let top = origin.copy().add(0, -height);
  let width = height / 4.75;
  let baseLeft = base.copy().add(-width, 0);
  let baseRight = base.copy().add(width, 0);
  let topLeft = top.copy().add(-width, 0);
  let topRight = top.copy().add(+width, 0);

  stroke(255);
  line(base.x, base.y, top.x, top.y);

  // baseArc

  let points = [];

  points.push(baseLeft);
  points.push(topLeft);
  for (let a = PI; a >= 0; a -= 0.01) {
    let r1 = width;
    let r2 = width / 4;

    let xPos = r1 * cos(a) + top.x;
    let yPos = r2 * sin(a) + top.y;
    points.push(createVector(xPos, yPos));
    // ellipse(xPos, yPos, 10, 10);
  }
  points.push(topRight);
  points.push(baseRight);
  for (let a = 0; a <= PI; a += 0.01) {
    let r1 = width;
    let r2 = width / 4;

    let xPos = r1 * cos(a) + base.x;
    let yPos = r2 * sin(a) + base.y;
    points.push(createVector(xPos, yPos));
    // ellipse(xPos, yPos, 10, 10);
  }

  // rightSide Shading
  for (let t = 0; t < 1; t += 0.01) {
    let shadeOrigin = p5.Vector.lerp(baseRight, topRight, t);
    let len = random(10, 20);
    let shadeEnd = shadeOrigin.copy().add(-len, 0);
    stroke(0);
    line(shadeOrigin.x, shadeOrigin.y, shadeEnd.x, shadeEnd.y);
  }

  // base
  stroke(0);
  beginShape();
  // points.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);

  //top

  let topPoints = [];
  for (let a = 0; a <= TAU; a += 0.01) {
    let r1 = width;
    let r2 = width / 4;

    let xPos = r1 * cos(a) + top.x;
    let yPos = r2 * sin(a) + top.y;
    topPoints.push(createVector(xPos, yPos));
    // ellipse(xPos, yPos, 10, 10);
    // ellipse(xPos, yPos, 10, 10);
  }

  stroke(0);
  beginShape();
  topPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);

  // fuse

  // ellipse(top.x, top.y, 10, 10);
}
