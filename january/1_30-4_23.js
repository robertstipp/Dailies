let margin = 100;
let effW, effH, cellW, cellH;
let aspectRadio = 869 / 1152;
let cols = 10;
let rows = Math.floor(cols / aspectRadio);
let grid = [];
let colors = ["red", "blue", "yellow"];
let numPoints = 100;
let circles = [];
function setup() {
  createCanvas(869, 1152, SVG);

  effW = width - 2 * margin;
  effH = height - 2 * margin;
  cellW = effW / cols;
  cellH = effH / rows;
  noFill();
  noLoop();
}
function draw() {
  let sites = [];
  for (let i = 0; i < numPoints; i++) {
    sites.push([random(width), random(height)]);
  }

  voronoiSites(sites);
  voronoi(869, 1152, true);
  let normal = voronoiGetCells();
  // voronoiDraw(0, 0, true, false);
  cells = new Cells(normal);
  cells.draw();

  colors.forEach((color) => {
    circles.forEach((circle) => {
      if (circle.color === color) {
        circle.draw();
      }
    });
  });
}

function phylotalix(origin, size) {
  let sites = [];
  for (let n = 100; n < size; n++) {
    let angle = n * radians(137.5);

    let r = Math.pow(n, 0.75) * 1;

    let pos = createVector(
      origin.x + r * cos(angle),
      origin.y + r * sin(angle)
    );

    fill(0);
    let a = atan2(pos.y - origin.y, pos.x - origin.x);
    // arrow(pos, a, 10);
    sites.push([pos.x, pos.y]);
  }
  return sites;
  // ellipse(origin.x, origin.y, 20, 20);
}
function arrow(origin, angle, size) {
  push();
  translate(origin.x, origin.y);
  rotate(angle);
  line(0, size / 2, 0, -size / 2);
  line(0, -size / 2, -size / 4, -size / 10);
  line(0, -size / 2, size / 4, -size / 10);
  pop();
}

class Cells {
  constructor(normal) {
    this.normal = normal;
    this.cells = [];
    this.init();
  }
  init() {
    for (let i = 0; i < this.normal.length; i++) {
      this.corners = this.normal[i];
      this.cells.push(new Cell(this.corners));
    }
  }
  draw() {
    let count = 0;
    this.cells.forEach((cell, index) => {
      let d = dist(cell.mid.x, cell.mid.y, width / 2, height / 2);

      // cell.draw();
      // cell.drawMid();
      cell.drawSpiral();
    });
  }
}

class Cell {
  constructor(corners) {
    this.corners = corners;
    this.vecCorners = [];
    this.init();
    this.mid = this.getMid();
  }

  init() {
    for (let i = 0; i < this.corners.length; i++) {
      this.vecCorners.push(
        createVector(this.corners[i][0], this.corners[i][1])
      );
    }
  }

  shrink() {
    let newCorners = [];
    for (let i = 0; i < this.vecCorners.length; i++) {
      let p1 = this.vecCorners[i];
      let p2 = this.vecCorners[(i + 1) % this.vecCorners.length];
      let mid = p5.Vector.lerp(p1, p2, 0.8);
      newCorners.push(mid);
    }
    this.vecCorners = newCorners;
  }
  getMid() {
    let mid = createVector(0, 0);
    for (let i = 0; i < this.vecCorners.length; i++) {
      mid.add(this.vecCorners[i]);
    }
    mid.div(this.vecCorners.length);
    return mid;
  }
  draw() {
    beginShape();
    for (let i = 0; i < this.vecCorners.length; i++) {
      vertex(this.vecCorners[i].x, this.vecCorners[i].y);
    }
    endShape(CLOSE);
  }

  drawMid() {
    ellipse(this.mid.x, this.mid.y, 10, 10);
  }
  drawSpiral() {
    let maxR;
    for (let r = 0; r < 400; r += 10) {
      let circlePoints = [];
      for (let a = 0; a < 360; a += 10) {
        let angle = radians(a);
        let pos = createVector(
          this.mid.x + r * cos(angle),
          this.mid.y + r * sin(angle)
        );
        circlePoints.push(pos);
      }
      let valid = true;
      circlePoints.forEach((pos) => {
        if (!pointInPoly(this.vecCorners, pos)) {
          valid = false;
        }
      });
      if (valid === true) {
        maxR = r;
      }
    }
    let startR = maxR - 10;
    circles.push(new MyCirle(this.mid, startR));
    // ellipse(this.mid.x, this.mid.y, startR * 2);
    beginShape();
    for (let r = startR; r < 300; r += 0.01) {
      let angle = r;
      let pos = createVector(
        this.mid.x + r * cos(angle),
        this.mid.y + r * sin(angle)
      );
      let cInt = Math.floor(map(this.mid.y, 0, height, 0, colors.length));
      stroke(0);
      if (pointInPoly(this.vecCorners, pos)) {
        vertex(pos.x, pos.y);
      } else {
        endShape();

        beginShape();
      }
    }
    endShape();
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-01-30.svg");
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
class MyCirle {
  constructor(pos, r) {
    this.pos = pos;
    this.r = r;
    this.color = this.getColor();
  }
  getColor() {
    let cInt = random([0, 1, 2]);

    this.color = colors[cInt];
    return this.color;
  }
  draw() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
