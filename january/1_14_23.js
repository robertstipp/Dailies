let g, e;
let margin = 100;
let distance;
let pos;
function setup() {
  pixelDensity(1);
  createCanvas(650, 900, SVG);
  noFill();
  noLoop();
  stroke(0);
  g = new p5.Gen();
  let origin = createVector(width / 2, height / 2);
  let size = 50;
  // voronoiOrb(origin, size);

  for (let i = 0; i < 3; i++) {
    let x = g.random(Math.random(), "even") * width;
    let y = g.random(Math.random(), "even") * height;
    let origin = createVector(x, y);
    let size = g.random(Math.random(), "high") * 100;
    voronoiOrb(origin, size);
  }
}
function draw() {}

function voronoiOrb(origin, size) {
  let sites = [];
  distance = size;
  pos = origin;
  for (let i = 0; i < 500; i++) {
    let angle = g.random(Math.random(), "even") * TWO_PI;
    let radius = g.random(Math.random(), "high") * size;
    let pos = origin.copy().add(p5.Vector.fromAngle(angle).mult(radius));
    sites.push([pos.x, pos.y]);
  }
  voronoiSites(sites);
  voronoi(650, 900, true);
  let normal = voronoiGetCells();
  filtered = filterCells(normal);
  cells = makeVector(filtered);
  cells.forEach((cell) => drawVectorCells(cell));
  voronoiClearSites();
}

function drawVectorCells(cell) {
  beginShape();
  for (let i = 0; i < cell.length; i++) {
    let vert = cell[i];

    vertex(vert.x, vert.y);
  }
  endShape(CLOSE);
  if (random() < 0.5) return;
  // stepPolygon(cell, 2);
}
function makeVector(cells) {
  let resCells = [];
  for (let i = 0; i < cells.length; i++) {
    let vectors = [];
    let vertices = cells[i];
    for (let j = 0; j < vertices.length; j++) {
      const [x, y] = vertices[j];
      vectors.push(createVector(x, y));
    }
    resCells.push(vectors);
  }
  return resCells;
}
function filterCells(cells) {
  let filtered = [];
  for (let i = 0; i < cells.length; i++) {
    let validCell = true;
    let vertices = cells[i];
    for (let j = 0; j < vertices.length; j++) {
      const [x, y] = vertices[j];
      let d = dist(x, y, pos.x, pos.y);
      if (x < 0 || x > width || y < 0 || y > height || d > distance) {
        validCell = false;
        break;
      }
    }
    if (validCell) {
      filtered.push(vertices);
    }
  }
  return filtered;
}

function drawCell(cell) {
  beginShape();
  for (let i = 0; i < cell.length; i++) {
    let vert = cell[i];
    const [x, y] = vert;
    vertex(x, y);
  }
  endShape(CLOSE);
}
