let aspectRatio = 1;
let rows = 11;
let cols = Math.floor(rows * aspectRatio);
let margin = 100;
let steps = 4;
let effW, effH, cellW, cellH;
let colors = ["red", "yellow", "blue"];
let nodes = [];
let simplexNoise;
function setup() {
  createCanvas(1080, 1080, SVG);
  // background(0);
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;
  noLoop();
  noFill();
  background("white");
  simplexNoise = new openSimplexNoise(Date.now());
  rectMode(CENTER);
  // background("red");
}
function draw() {
  let heartsArr = heart(width / 2, height / 2, 30);

  let innerPoints = [];

  for (let i = 0; i < 2000; i++) {
    let x = random(width);
    let y = random(height);
    let inHeart = pointInPoly(heartsArr, createVector(x, y));

    if (inHeart) {
      innerPoints.push(createVector(x, y));
    }
  }
  let sites = [];
  // heartsArr.forEach((v) => sites.push([v.x, v.y]));
  innerPoints.forEach((v) => sites.push([v.x, v.y]));

  voronoiSites(sites);
  voronoi(1080, 1080, true);
  let normal = voronoiGetCells();
  let cells = [];
  normal.forEach((norm) => {
    let valid = true;
    let possibleCell = new Cell(norm);

    let inHeart = pointInPoly(heartsArr, possibleCell.mid);
    if (inHeart) cells.push(new Cell(norm));
  });

  cells.forEach((cell) => {
    cell.draw();
  });
  // sites.forEach((site) => {
  //   ellipse(site[0], site[1], 10, 10);
  // });
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}

function heart(x, y, size) {
  let rad = size;
  let points = [];
  // beginShape();
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

class Cell {
  constructor(points) {
    this.points = points;
    this.vertices = [];
    this.getVertices();
    this.color = random(colors);
    this.mid = this.getMid();
  }
  getVertices() {
    this.points.forEach((point) => {
      let x = point[0];
      let y = point[1];
      this.vertices.push(createVector(x, y));
    });
  }
  getMid() {
    let midX = 0;
    let midY = 0;
    this.vertices.forEach((v) => {
      midX += v.x;
      midY += v.y;
    });
    midX /= this.vertices.length;
    midY /= this.vertices.length;
    return createVector(midX, midY);
  }
  draw() {
    fill(this.color);
    beginShape();
    this.vertices.forEach((v) => {
      vertex(v.x, v.y);
    });
    endShape(CLOSE);
  }
}
