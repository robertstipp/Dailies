let margin = 100;
let effW, effH, cellW, cellH;
let aspectRadio = 869 / 1152;
let cols = 10;
let rows = Math.floor(cols / aspectRadio);
let grid = [];
let colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink"];
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
  sites = phylotalix(createVector(width / 2, height / 2), 3000);

  voronoiSites(sites);
  voronoi(1080, 1920, true);
  let normal = voronoiGetCells();
  // voronoiDraw(0, 0, true, false);
  cells = new Cells(normal);
  cells.draw();
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
      if (d > 100 && d < 350) {
        fill(colors[count % colors.length]);
        cell.draw();
        count++;
      }
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
}

function keyPressed() {
  if (key == "s") {
    save("2021-01-30.svg");
  }
}
