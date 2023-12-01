let aspectRatio = 2480 / 3508;
let maxD;
let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
let cols = 16;
let rows = 16;
let columns = [];

let cellH, cellW, margin, effW;
let myCells = [];

let dots = [];
let subCircles = [];

function setup() {
  createCanvas(1080, 2560, SVG);
  // background("black");
  e = new p5.Ease();
  g = new p5.Gen();
  noFill();
  noLoop();
  noStroke();

  // background("red");
}

function draw() {
  let margin = 100;
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;

  let cell0 = createVector(margin + cellW / 2, margin + cellH / 2);
  let canvasCenter = createVector(width / 2, height / 2);
  maxD = dist(cell0.x, cell0.y, width / 2, height / 2);
  let centerCol = floor(cols / 2);
  let centerRow = floor(rows / 2);
  stroke(0);

  let point1 = createVector(margin, margin);
  let point2 = createVector(margin + cellW / 2 + cellW / 4, margin);
  let point3 = createVector(margin + cellW / 2 + cellW, margin);

  arc(point1.x, point1.y, cellW, cellW, PI / 2, TAU);
  arc(point2.x, point2.y, cellW / 2, cellW / 2, 0, PI);
  arc(point3.x, point3.y, cellW, cellW, PI, TAU + PI / 2);
  arc(point4.x, point4.y, cellW / 2, cellW / 2, PI / 2, PI + PI / 2);
  // ellipse(point4.x, point4.y, cellW / 2, cellW / 2);
}
function spiralfy(points, fact) {
  // line(points[0].x, points[0].y, points[3].x, points[3].y);

  beginShape();
  points.forEach((p) => {
    vertex(p.x, p.y);
    // ellipse(p.x, p.y, 10);
  });
  endShape(CLOSE);
  for (let i = 3; i < 10; i++) {
    let point1 = points[i - 3];
    let point2 = points[i - 2];
    let midPoint = p5.Vector.lerp(point1, point2, fact);
    // ellipse(point1.x, point1.y, 10);
    // ellipse(point2.x, point2.y, 10);
    // ellipse(midPoint.x, midPoint.y, 10);
    points.push(midPoint);
    // break;
  }
  beginShape();
  points.forEach((p) => {
    vertex(p.x, p.y);
    // ellipse(p.x, p.y, 10);
  });
  endShape();
}
class Cell {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dFromCenter = dist(x, y, width / 2, height / 2);
    this.dInt = map(this.dFromCenter, 0, maxD, 0, 1);
    this.a = atan2(y - height / 2, x - width / 2);
    this.shifted = this.shift();
  }
  drawVec() {
    let shiftVec = this.shift();
    let size = map(this.dFromCenter, 0, maxD, 0, 100);
    line(this.x, this.y, shiftVec.x, shiftVec.y);
  }
  shift() {
    let len = e.quadraticInOut(this.dInt) * 100;
    let xVal = this.x + len * cos(this.a);
    let yVal = this.y + len * sin(this.a);
    return createVector(xVal, yVal);
  }
  draw() {
    let shiftVec = this.shift();
    let size = map(this.dFromCenter, 0, maxD, 0, 100);
    // rect(shiftVec.x, shiftVec.y, this.w, this.h);
    ellipse(shiftVec.x, shiftVec.y, 10);
    line(shiftVec.x, shiftVec.y, shiftVec.x, shiftVec.y);
  }
}
function perpSquareStep(x, y, r) {
  // square
  let squarePoints = [
    createVector(x, y),
    createVector(x + r, y),
    createVector(x + r, y + r),
    createVector(x, y + r),
  ];
  stepPolygon(squarePoints, 10);
  // shadow
}
function perpSquare(x, y, r) {
  noStroke();
  fill(random(colors));
  beginShape();
  vertex(x, y);
  vertex(x + r, y);
  vertex(x + r, y + r);
  vertex(x, y + r);
  endShape(CLOSE);

  // shadow
  fill("#000000");
  beginShape();
  vertex(x, y);
  vertex(x - r, y + r);
  vertex(x - r, y + 2 * r);
  vertex(x, y + 2 * r);
  vertex(x + r, y + r);
  vertex(x, y + r);

  endShape(CLOSE);
}

function stepPolygon(corners, steps) {
  let centerX = 0;
  let centerY = 0;

  for (let i = 0; i < corners.length; i++) {
    centerX += corners[i].x;
    centerY += corners[i].y;
  }

  centerX /= corners.length;
  centerY /= corners.length;

  for (let t = 1 / steps; t < 1 - 1 / steps; t += 1 / steps) {
    let newCorners = [];
    let testT = e.linear(t);
    for (let i = 0; i < corners.length; i++) {
      let pos = p5.Vector.lerp(
        corners[i],
        createVector(centerX, centerY),
        testT
      );
      newCorners.push(pos);
    }
    for (let i = 0; i < newCorners.length; i++) {
      let corner0 = newCorners[i];
      let corner1 = newCorners[(i + 1) % corners.length];

      line(corner0.x, corner0.y, corner1.x, corner1.y);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
    }
  }
}
function getColor(d) {
  let c = "black";

  return c;
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}
