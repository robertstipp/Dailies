let cells = [];
let simplexNoise;
let t = 0;
let e;
function setup() {
  createCanvas(1080, 1080, SVG);
  background(0);
  noFill();
  e = new p5.Ease();
  simplexNoise = new openSimplexNoise(Date.now());
  stroke(255);

  noLoop();
}

function draw() {
  background(0);
  let orgin = createVector(width / 2, height / 2);
  let size = height / 4;
  recursiveHexagon(orgin.x, orgin.y, 3, size);
  // t += 0.01;
  // for (let i = 0; i < cells.length; i++) {
  //   cells[i].display();
  // }
}

function drawHexagon(cX, cY, r) {
  let corners = [];
  beginShape();
  for (let a = TAU / 12; a < TAU + TAU / 12; a += TAU / 6) {
    var x1 = cX + r * cos(a);
    var y1 = cY + r * sin(a);

    vertex(x1, y1);
  }
  endShape(CLOSE);

  let angles = [-PI / 6, PI / 2, PI / 2 + (2 * PI) / 3];
  let d = dist(cX, cY, width / 2, height / 2);
  let int = map(d, 0, 400, 1, 0);
  let ints = e.smoothStep(int) * 10;
  angles.forEach((angle) => {
    let startPoint = createVector(cX, cY);
    let endPoint = startPoint
      .copy()
      .add(p5.Vector.fromAngle(angle + (2 * PI) / 3, r));

    for (let i = 0; i < ints; i++) {
      let point0 = p5.Vector.lerp(startPoint, endPoint, i / 10);
      let point2 = point0.copy().add(p5.Vector.fromAngle(angle, r));

      line(point0.x, point0.y, point2.x, point2.y);

      // ellipse(point2.x, point2.y, 10);
    }
  });
  // stepPolygon(corners, 2);
}

function recursiveHexagon(cX, cY, depth, r) {
  if (depth == 0) {
    if (dist(cX, cY, width / 2, height / 2) > 400) return;
    cells.push(new HexCell(cX, cY));

    // let numHexagons = map(
    //   simplexNoise.noise2D(cX / 1000, cY / 100),
    //   -1,
    //   1,
    //   1,
    //   5
    // );
    drawHexagon(cX, cY, r);
    // for (let i = 1; i < numHexagons; i++) {
    //   let scale = map(i, 0, numHexagons, 0, 1);
    // }
  } else {
    recursiveHexagon(cX, cY, depth - 1, r / 2);
    for (let a = 0; a < TAU; a += TAU / 6) {
      var x = cX + r * cos(a);
      var y = cY + r * sin(a);

      if (depth > 0) {
        recursiveHexagon(x, y, depth - 1, r / 2);
      }
    }
  }
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
      i === 1 ? strokeWeight(1) : strokeWeight(1);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
    }
  }
}

class HexCell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
  }

  findNeighbors() {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] == this) continue;
      let d = dist(this.x, this.y, cells[i].x, cells[i].y);
      if (d < 50) {
        this.neighbors.push(cells[i]);
        line(this.x, this.y, cells[i].x, cells[i].y);
      }
    }
  }
  display() {
    stroke(255);
    this.findNeighbors();
    console.log(this.neighbors.length);
    ellipse(this.x, this.y, 10);
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-01-23.svg");
  }
}
