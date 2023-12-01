let margin = 100;
let effW, effH, cellW, cellH;
let aspectRadio = 869 / 1152;
let cols = 10;
let rows = Math.floor(cols / aspectRadio);
let grid = [];
let e, g;
function setup() {
  createCanvas(869, 1152, SVG);
  e = new p5.Ease();
  effW = width - 2 * margin;
  effH = height - 2 * margin;
  cellW = effW / cols;
  cellH = effH / rows;
  noFill();
  noLoop();
}
function draw() {
  phylotalix(createVector(width / 2, height / 2), 3000);
}

function phylotalix(origin, size) {
  for (let n = 100; n < size; n++) {
    let angle = n * radians(137.5);

    let r = Math.pow(n, 0.75) * 1;

    let pos = createVector(
      origin.x + r * cos(angle),
      origin.y + r * sin(angle)
    );

    fill(0);
    let a = atan2(pos.y - origin.y, pos.x - origin.x);
    let sizeAngle = map(n, 100, size, 0, 10 * TAU);
    let szInt = map(sin(sizeAngle), -1, 1, 0.5, 1);
    let max = map(n, 100, size, 5, 10);
    let sz = e.elasticInOut(szInt) * max;
    // arrow(pos, a, sz);
    // ellipse(pos.x, pos.y, sz, sz);
    noFill();
    myLine(pos, a + PI / 2 + random(PI), sz * 2);
    // arc(pos.x, pos.y, sz * 3, sz * 3, a, a + PI / 2);
  }
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

function myLine(origin, angle, size) {
  push();
  translate(origin.x, origin.y);
  rotate(angle);
  line(0, 0, 0, -size);
  pop();
}

class Cell {
  constructor(x, y, shape, size) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.size = size;
  }

  drawCircle() {
    ellipse(this.x, this.y, this.size, this.size);
  }
  drawRect() {
    rectMode(CENTER);
    rect(this.x, this.y, this.size);
  }
  drawArrow() {
    let angles = [0, PI / 2, PI, (3 * PI) / 2];
    let angle = random(angles);
    arrow(createVector(this.x, this.y), angle, this.size * 0.7);
  }
  drawStart() {}
}

function keyPressed() {
  if (key == "s") {
    save("2021-01-30.svg");
  }
}
