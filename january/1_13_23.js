let resolution = 0.01;
let margin = 100;
let len = 1;
let hexRadius = 20;
let filtered;
let cells = [];
let narrowStroke = 1;
let wideStroke = 1;
let distance = 200;
let g, e;
function setup() {
  pixelDensity(1);
  createCanvas(650, 900, SVG);
  noFill();
  noLoop();
  stroke(0);
  rectMode(CENTER);
  g = new p5.Gen();
  // voronoiRndSites(1000, 10);

  let origin = createVector(width / 2, height / 2);
  let sites = [];
  for (let i = 0; i < 2000; i++) {
    let angle = g.random(Math.random(), "even") * TWO_PI;
    let radius = g.random(Math.random(), "high") * distance;

    let pos = origin.copy().add(p5.Vector.fromAngle(angle).mult(radius));
    // ellipse(pos.x, pos.y, 2);
    sites.push([pos.x, pos.y]);
  }

  // for (
  //   let x = margin;
  //   x < width - margin;
  //   x += map(noise(x / 10), 0, 1, 10, 60)
  // ) {
  //   for (
  //     let y = margin;
  //     y < height - margin;
  //     y += map(noise(y / 10), 0, 1, 10, 60)
  //   ) {
  //     let angle = atan2(y - height / 2, x - width / 2);
  //     let d = dist(x, y, width / 2, height);
  //     let xOff = map(noise(x, angle, d), 0, 1, -10, 10);
  //     let yOff = map(noise(y / 1000, angle, d), 0, 1, -10, 10);
  //     sites.push([x + xOff, y + yOff]);
  //   }
  // }

  voronoiSites(sites);
  voronoi(650, 900, true);
  let normal = voronoiGetCells();
  // normal.forEach((cell) => drawCell(cell));
  filtered = filterCells(normal);
  cells = makeVector(filtered);
}

function draw() {
  // filtered.forEach((cell) => drawCell(cell));
  cells.forEach((cell) => drawVectorCells(cell));
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
      let d = dist(x, y, width / 2, height / 2);
      if (
        x < margin ||
        x > width - margin ||
        y < margin ||
        y > height - margin
        // d > distance
      ) {
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

class Cell {
  constructor() {
    this.vertices = [];
  }
}

function flowLine(origin, steps) {
  let curX = origin.x;
  let curY = origin.y;
  beginShape();
  for (let i = 0; i < steps; i++) {
    let d = dist(curX, curY, width / 2, height / 2);
    let angle = map(
      noise(curX * resolution, curY * resolution),
      0,
      1,
      0,
      d < 100 ? 10 * TAU : TAU
    );

    vertex(curX, curY);
    curX += len * cos(angle);
    curY += len * sin(angle);

    if (
      curX < margin ||
      curX > width - margin ||
      curY < margin ||
      curY > height - margin
      // d < 100
    ) {
      break;
    }
  }
  endShape();
}

function shapeShifter(origin, size, vertices) {
  let numVertices = vertices;
  beginShape();
  for (let a = 0; a < TAU; a += TAU / numVertices) {
    let pos = origin.copy().add(p5.Vector.fromAngle(a).mult(size));
    vertex(pos.x, pos.y);
  }
  endShape(CLOSE);
}

function recursiveRect(x, y, w, h, depth) {
  if (depth > 0) {
    let r = random(0, 1);
    if (r < 0.5) {
      recursiveRect(x, y, w / 2, h, depth - 1);
      recursiveRect(x + w / 2, y, w / 2, h, depth - 1);
    } else {
      recursiveRect(x, y, w, h / 2, depth - 1);
      recursiveRect(x, y + h / 2, w, h / 2, depth - 1);
    }
  } else {
    rect(x, y, w, h);
  }
}

function recursiveTriangle(x, y, w, h, depth) {
  if (depth > 0) {
    let r = random(0, 1);
    if (r < 0.5) {
      recursiveTriangle(x, y, w / 2, h, depth - 1);
      recursiveTriangle(x + w / 2, y, w / 2, h, depth - 1);
    } else {
      recursiveTriangle(x, y, w, h / 2, depth - 1);
      recursiveTriangle(x, y + h / 2, w, h / 2, depth - 1);
    }
  } else {
    triangle(x, y, x + w, y, x + w / 2, y + h);
  }
}

function recursiveSquare(x, y, w, h, depth) {
  if (depth < 1) return;
  rect(x, y, w, h);
  let r = random(1, 1.2);
  recursiveSquare(x, y, w / r, h / r, depth - 1);
}

function recursiveHexagon(x, y, size, depth) {
  if (depth < 1) return;
  hexagon(x, y, size);
  let r = 1.2;
  recursiveHexagon(x, y, size / r, depth - 1);
}

function hexagon(x, y, size) {
  let numVertices = 6;
  let startAngle = PI / 6;
  beginShape();
  for (let i = 0; i < numVertices; i++) {
    let angle = startAngle + (TWO_PI / numVertices) * i;
    let px = x + cos(angle) * size;
    let py = y + sin(angle) * size;
    vertex(px, py);
  }
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

  for (let t = 0; t < 1; t += 1 / steps) {
    let newCorners = [];

    for (let i = 0; i < corners.length; i++) {
      let pos = p5.Vector.lerp(corners[i], createVector(centerX, centerY), t);
      newCorners.push(pos);
    }
    for (let i = 0; i < newCorners.length; i++) {
      let corner0 = newCorners[i];
      let corner1 = newCorners[(i + 1) % corners.length];
      i === 1 ? strokeWeight(wideStroke) : strokeWeight(narrowStroke);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
    }
  }
}

function keyPressed() {
  if (keyCode == 83) {
    save("1_13_23.svg");
  }
}
