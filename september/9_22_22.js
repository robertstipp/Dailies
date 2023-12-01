let xOff = 50;
let yOff = 50;
let spacing = 5;
let rez = 0.005;
const grid = [];

const colors = ["#606c38", "#283618", "#fefae0", "#dda15e", "#bc6c25"];

function setup() {
  createCanvas(600, 600);
  createGrid();
  noStroke();

  grid.forEach((row) => {
    row.forEach((cell) => {
      if (cell.d > 100) {
        fill(cell.c);
        dashedLine(cell.x, cell.y, cell.vec.x, cell.vec.y);
      }
    });
  });

  grid.forEach((row) => {
    row.forEach((cell) => {
      if (cell.d < 100) {
        fill(cell.c);
        dashedLine(cell.x, cell.y, cell.vec.x, cell.vec.y);

        for (let i = 0; i < 10; i++) {
          let xOff = random([-10, 10]);
          let yOff = random([-10, 10]);
          let c = color("#e76f51");
          c.setAlpha(random(100));
          fill(c);
          dashedLine(cell.x + xOff, cell.y + yOff, cell.vec.x, cell.vec.y);
        }
      }
    });
  });
}
function draw() {}

class GridAngle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = dist(this.x, this.y, 300, 300);

    this.angle =
      this.d > 100 ? noise(x * rez, y * rez) * TAU : random([PI / 4, -PI / 4]);
    this.mag = this.d > 100 ? 10 : random(-10, 10);
    this.vec = createVector(
      this.x + this.mag * Math.cos(this.angle),
      this.y + this.mag * Math.sin(this.angle)
    );
    this.c = this.d > 100 ? color(0) : color("#e9c46a");
  }
}

function createGrid() {
  for (let x = xOff; x < width - xOff; x += spacing) {
    let row = [];
    for (let y = yOff; y < height - yOff; y += spacing) {
      row.push(new GridAngle(x, y));
    }
    grid.push(row);
  }
}

function dashedLine(x1, y1, x2, y2) {
  for (let i = 0; i < 1; i += 0.1) {
    let x = lerp(x1, x2, i);
    let y = lerp(y1, y2, i);
    if (random() < 0.5) {
      ellipse(x, y, 2);
    }
  }
}
