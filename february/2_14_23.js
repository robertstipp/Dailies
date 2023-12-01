let aspectRatio = 2480 / 3508;
let maxD;
let colors = [
  "#c30010",
  "#d1001f",
  "#de0a26",
  "#ff2c2c",
  "#ff4d4d",
  "#ff6e6e",
  "#ff8f8f",
  "#ffb0b0",
];
let e, g;
let ringsArr = [];
let cols = 17;
let rows = 17;
let columns = [];
let myHearts = [];
let cellH, cellW, margin, effW;
let myCells = [];
let diameter;
let dots = [];
let subCircles = [];
let pointsWithin = [];
let sortedTop = [];
let count = 0;
function setup() {
  createCanvas(1080, 1080, SVG);
  // background("black");
  e = new p5.Ease();
  g = new p5.Gen();

  noFill();
  // noLoop();
  noStroke();
  let heartPos = createVector(width / 2, (height * 2) / 4);
  let hearts = 20;
  let centerHeart = heart(width / 2, height / 2, 20);
  while (myHearts.length < hearts) {
    let x = random(0, width);
    let y = random(0, 200);
    diameter = 20;
    let valid = true;
    for (let j = 0; j < myHearts.length; j++) {
      let other = myHearts[j];
      let d = dist(x, y, other.x, other.y);
      if (d < diameter) {
        valid = false;
        break;
      }
    }
    if (valid) {
      let newHeart = new Heart(x, y, 0.5, 0);
      myHearts.push(newHeart);
    }
  }
  // noLoop();
  // background("red");
  stroke(255);
  let points = heart(width / 2, height / 2, 20);
  points.forEach((p) => {
    // ellipse(p.x, p.y, 10, 10);
  });

  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      let inHeart = pointInPoly(centerHeart, createVector(x, y));
      if (inHeart) {
        let d = dist(x, y, width / 2, height / 2);
        let angle = atan2(y - height / 2, x - width / 2);
        pointsWithin.push(createVector(x, y));
        // ellipse(x, y, 5, 5);
      }
    }
  }
  sortedTop = pointsWithin.sort((a, b) => {
    return a.y - b.y;
  });
  background(0);

  // noLoop();
}

function draw() {
  let margin = 100;

  let effW = width - margin * 2;
  let effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;

  // sortedTop.forEach((p) => {
  //   ellipse(p.x, p.y, 5, 5);
  // });
  stroke(255);
  let cell = sortedTop[count];
  text("o", cell.x, cell.y);
  // ellipse(cell.x, cell.y, 5);
  count += 1;
}

class Heart {
  constructor(x, y, size, i) {
    this.x = x;
    this.y = y;
    this.size = 1;
    this.scaleFactor = size;
    this.points = heart(this.x, this.y, this.size);
    this.direction = 1;
    this.color = ["red", "pink", "purple", "white"];
    this.colorIndex = floor(random(this.color.length));
    this.startAngle = (i * TAU) / 20;
  }
  draw() {
    // stroke(this.color[this.colorIndex]);
    push();
    translate(this.x, this.y);
    scale(this.scaleFactor);
    this.drawPoints();
    pop();
    // heart(this.x, this.y, this.size);
  }
  drawPoints() {
    stroke("white");

    beginShape();
    this.points.forEach((p) => {
      vertex(p.x, p.y);
    });
    endShape();
  }
  rotate() {
    stroke("red");
    push();
    translate(this.x, this.y);
    rotate(frameCount / 100 + this.startAngle);
    drawHeart(0, 0, this.size);
    pop();
  }
  grow() {
    this.scaleFactor += 0.01 * this.direction;
    if (this.scaleFactor > 1.5) {
      this.scaleFactor = 0;
    }
  }
}
function heart(x, y, size) {
  let rad = size;
  let points = [];
  beginShape();
  for (let angle = 0; angle <= TAU; angle += 0.01) {
    let xPos = x + rad * 16 * pow(sin(angle), 3);
    let yPos =
      y -
      rad *
        (13 * cos(angle) -
          5 * cos(2 * angle) -
          2 * cos(3 * angle) -
          cos(4 * angle));
    points.push(createVector(xPos, yPos));
    // vertex(xPos, yPos);
    // ellipse(xPos, yPos, 10, 10);
  }
  // endShape();
  return points;
}

function drawHeart(x, y, size) {
  push();
  translate(x, y);
  scale(size);
  beginShape();
  vertex(0, -50);
  bezierVertex(40, -80, 90, -40, 0, 20);
  bezierVertex(-90, -40, -40, -80, 0, -50);
  endShape(CLOSE);
  pop();
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
    save("2021-02-23.jpeg");
  }
}
function pointInPoly(verts, pt) {
  let c = false;
  for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
    if (
      verts[i].y > pt.y != verts[j].y > pt.y &&
      pt.x <
        ((verts[j].x - verts[i].x) * (pt.y - verts[i].y)) /
          (verts[j].y - verts[i].y) +
          verts[i].x
    )
      c = !c;
  }
  return c;
}
