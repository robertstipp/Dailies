let cols = 20;
let rows = 20;
let xSpacing, ySpacing;
let xOff, yOff;
let effWidth, effHeight;
let margin = 100;
let e, g;
let t = 0;

let paths = [];
function setup() {
  createCanvas(1080, 1080);
  background(0);

  e = new p5.Ease();
  effWidth = width - margin * 2;
  effHeight = height - margin * 2;

  xSpacing = effWidth / cols;
  ySpacing = effHeight / rows;
  xOff = xSpacing / 2;
  yOff = ySpacing / 2;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = margin + xOff + i * xSpacing;
      let y = margin + yOff + j * ySpacing;
      paths.push(new CirclePath(i, j, x, y));
    }
  }
}
function draw() {
  background(0, 10);
  stroke(255);
  noFill();
  // let diameter = 200;
  // let radius = 50;
  // // circle1
  // let origin1 = createVector(width / 2, height / 4);
  // ellipse(origin1.x, origin1.y, diameter);
  // let circle1Pos = origin1.copy().add(p5.Vector.fromAngle(t, diameter / 2));
  // ellipse(circle1Pos.x, circle1Pos.y, 20);

  // // circle2
  // let origin2 = createVector(width / 4, height / 2);
  // ellipse(origin2.x, origin2.y, diameter);
  // let circle2Pos = origin2.copy().add(p5.Vector.fromAngle(2 * t, diameter / 2));
  // ellipse(circle2Pos.x, circle2Pos.y, 20);
  // // circle3
  // let origin3 = createVector(width / 2, height / 2);
  // ellipse(origin3.x, origin3.y, 20, 20);
  // let circle3X = circle1Pos.x;
  // let circle3Y = circle2Pos.y;
  // ellipse(circle3X, circle3Y, 20, 20);
  // paths.forEach((path) => path.drawPath());
  paths.forEach((path) => path.draw());
  t += 0.01;
}

class CirclePath {
  constructor(i, j, x, y) {
    this.i = i + 1;
    this.j = j + 1;
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y);
    this.diameter = xSpacing;
    this.radius = xSpacing / 2;
  }

  move() {
    let xPos = this.x + cos(this.i * t) * this.radius;
    let yPos = this.y + sin(this.j * t) * this.radius;
    this.pos = createVector(xPos, yPos);
  }

  drawPath() {
    stroke(255, 1);
    beginShape();
    for (let a = 0; a <= TAU; a += 0.01) {
      let xPos = this.x + cos(this.i * a) * this.radius;
      let yPos = this.y + sin(this.j * a) * this.radius;
      let pos = createVector(xPos, yPos);
      vertex(pos.x, pos.y);
      // ellipse(pos.x, pos.y, 1);
    }
    endShape();
  }

  draw() {
    this.move();
    noStroke();
    // ellipse(this.x, this.y, xSpacing);
    colorMode(HSB, 100);
    let c = color(((this.i + this.j) * 10) % 100, 100, 100);
    fill(c);
    ellipse(this.pos.x, this.pos.y, 10);
  }
}
