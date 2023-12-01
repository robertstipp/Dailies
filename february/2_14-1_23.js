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
let img;
let arcs = [];
function preload() {
  img = loadImage("../media/female4.jpg");
}
function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  // background("black");
  e = new p5.Ease();
  g = new p5.Gen();

  noFill();
  // noLoop();
  noStroke();

  noLoop();
}

function draw() {
  let d = pixelDensity();
  let margin = 100;
  stroke(0);
  background(0);
  img.loadPixels();
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;
  let circles = 10;
  image(img, 0, 0, width, height);
  let initRadius = 0;
  for (let j = 0; j < height; j += 2) {
    let offsetX = map(sin((j / 10) * PI), 0, 10, 0, 100);
    let initPos = createVector(0, j);
    let initCirc = new Circ(initPos, initRadius, 0);

    let circs = [initCirc];

    stroke(255);
    // ellipse(initPos.x, initPos.y, initRadius * 2);
    let steps = 2000;
    let arcRow = [];
    for (let i = 1; i < steps; i++) {
      let prevCircle = circs[i - 1];
      let prevPos = prevCircle.pos;
      let prevRadius = prevCircle.r;
      let x = prevPos.x;
      let y = prevPos.y;
      if (x > img.width) break;
      if (y > img.height) break;
      let clr = get(x, y);
      let grayScale = floor((clr[0] + clr[1] + clr[2]) / 3);

      // let r = img.pixels[index + 0];
      // console.log(r);
      // let g = img.pixels[index + 1];
      // let b = img.pixels[index + 2];
      // let a = img.pixels[index + 3];

      // let grayScale = (r + g + b) / 3;
      let grayScaleInt = map(grayScale, 0, 255, 0, 1);

      let nextRadius = map(grayScale, 0, 255, 1, 2);
      nextRadius = e.quadraticOut(grayScaleInt) * 1;
      let prevAngle = prevCircle.angle;
      let angle = 0;
      let nextPos = prevPos
        .copy()
        .add(p5.Vector.fromAngle(angle, prevRadius + nextRadius));

      // arc(nextPos.x, nextPos.y, nextRadius * 2, nextRadius * 2, 0, PI);
      stroke("white");
      // ellipse(nextPos.x, nextPos.y, nextRadius * 2);
      // ellipse(prevPos.x, prevPos.y, prevCircle.r * 2);
      stroke("red");
      if (i % 2 == 0) {
        arc(
          prevPos.x,
          prevPos.y,
          prevRadius * 2,
          prevRadius * 2,
          angle,
          prevAngle + PI
        );
        arcRow.push(
          new Arc(
            prevPos.x,
            prevPos.y,
            prevRadius,
            angle,
            prevAngle + PI,
            grayScale
          )
        );
      } else {
        arc(
          prevPos.x,
          prevPos.y,
          prevRadius * 2,
          prevRadius * 2,
          prevAngle - PI,
          angle
        );
        arcRow.push(
          new Arc(
            prevPos.x,
            prevPos.y,
            prevRadius,
            prevAngle - PI,
            angle,
            grayScale
          )
        );
      }

      let nextCirc = new Circ(nextPos, nextRadius, angle);
      circs.push(nextCirc);
    }
    arcs.push(arcRow);
  }
  background(0);
  arcs.forEach((arcRow) => {
    arcRow.forEach((arc) => {
      arc.draw();
    });
  });
}
class Circ {
  constructor(pos, r, angle) {
    this.pos = pos;
    this.r = r;
    this.angle = angle;
  }
}
class Arc {
  constructor(x, y, radius, start, end, clr) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.start = start;
    this.end = end;
    this.clr = clr;
    this.clrInt = map(clr, 0, 255, 0, 1);
    this.clrVal = e.sineOut(this.clrInt);
    this.clrAngle = map(this.clrVal, 0, 1, 0, 1080);
  }
  draw() {
    if (this.clr > 100) {
      colorMode(HSB);
      stroke(this.clrAngle % 360, 255, 255);
    } else {
      colorMode(RGB);
      stroke("black");
    }

    arc(this.x, this.y, this.radius * 2, this.radius * 2, this.start, this.end);
  }
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

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.jpeg");
  }
}
