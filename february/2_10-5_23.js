let aspectRatio = 2480 / 3508;

let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
let cols = 17;
let rows = Math.floor(cols / aspectRatio);

let cellH, cellW, margin, effW;
let myCells = [];

let dots = [];
let subCircles = [];

function setup() {
  createCanvas(2480, 3508, SVG);

  e = new p5.Ease();
  g = new p5.Gen();
  noFill();
  noLoop();
  noStroke();
}

function draw() {
  let margin = 100;
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;
  let cell0 = createVector(margin + cellW / 2, margin + cellH / 2);
  let centerI = floor(cols / 2);
  let centerJ = floor(rows / 2);
  let centerCell = createVector(margin + effW / 2, margin + effH / 2);
  let maxD = dist(cell0.x, cell0.y, centerCell.x, centerCell.y);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let scale;
      let x = margin + i * cellW;
      let y = margin + j * cellH;
      let d = dist(x, y, centerCell.x, centerCell.y);
      scale = map(d, 0, maxD, 1.25, 0.5);
      let flip = false;
      if (d < 550) {
        flip = true;
      }
      if ((i + j) % 2 == 0) {
        fill("purple");
        if (flip) {
          fill("gold");
        }
      } else {
        scale = map(d, 0, maxD, 0.5, 1.25);
        fill("gold");
        if (flip) {
          fill("purple");
        }
      }

      ellipse(x, y, cellW * scale);
    }
  }
}

function getColor(d) {
  let c = "black";

  return c;
}

function checkOverlap(point, circles) {
  let valid = true;
  for (let i = 0; i < circles.length; i++) {
    let other = circles[i];
    let d = dist(point.x, point.y, other.x, other.y);
    if (d < other.r) valid = false;
  }
  return valid;
}
class SubCircle {
  constructor(x, y, r, clr) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.clr = clr;
  }

  draw() {
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

class Dot {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
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
