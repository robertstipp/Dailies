let boundaries = [];
let g;

let fromColor = "#EFEFEF";
let toColor = "#6a040f";
function setup() {
  createCanvas(400, 400);
  background(0);

  g = new p5.Gen();
  noFill();
  stroke(255);
  // ellipse(100, 200, 100);
  // ellipse(150, 200, 100);
  // ellipse(200, 200, 100);

  for (let i = 0; i < 10; i++) {
    let diameter = random(50, 100);
    let x = random(diameter / 2, width - diameter / 2);
    let y = random(diameter / 2, height - diameter / 2);
    boundaries.push(new CircleBoundary(x, y, diameter));
  }
  boundaries.push(new CircleBoundary(100, 200, 100));
  boundaries.push(new CircleBoundary(150, 200, 100));

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  boundaries.forEach((boundary) => {
    minX = Math.min(minX, boundary.x - boundary.dia / 2);
    maxX = Math.max(maxX, boundary.x + boundary.dia / 2);
    minY = Math.min(minY, boundary.y - boundary.dia / 2);
    maxY = Math.max(maxY, boundary.y + boundary.dia / 2);
  });

  for (let i = 0; i < 1000000; i++) {
    let x = map(g.random(Math.random(), "even"), 0, 1, minX, maxX);
    let y = map(g.random(Math.random(), "even"), 0, 1, minY, maxY);
    let spot = createVector(x, y);

    let count = 0;
    for (let boundary of boundaries) {
      if (boundary.checkBounds(spot.x, spot.y)) {
        count++;
      }
    }
    if (count === 0) continue;
    count == 2 ? stroke(255, 0, 0) : stroke(255);
    count == 2 ? fill(255, 0, 0) : fill(255);
    strokeWeight(1);
    point(spot.x, spot.y);
  }
}
function draw() {}

class CircleBoundary {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.dia = dia;
  }

  checkBounds(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d < this.dia / 2;
  }
}
