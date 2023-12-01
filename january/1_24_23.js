let cols = 27;
let rows = 36;
let grid = [];
let cellW, cellH, effW, effH;
let cellR;
let margin = 100;
let simplexNoise;
function setup() {
  pixelDensity(1);
  createCanvas(869, 1152, SVG);
  noFill();
  noLoop();
  simplexNoise = new openSimplexNoise(Date.now());
  cellW = (width - margin * 2) / cols;
  cellH = (height - margin * 2) / rows;
  cellR = Math.sqrt((cellW * cellW) / 2 + (cellH * cellH) / 2);
  randomSeed(200);
}
function draw() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid.push(new Cell(i, j));
    }
  }
  // grid.forEach((cell) => cell.draw());
  // grid.forEach((cell) => cell.drawBlue());

  grid.forEach((cell) => cell.drawOrange());
}

function keyPressed() {
  if (key == "s") {
    save("1_21_23.svg");
  }
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i * cellW + margin + (j % 2 == 0 ? cellW / 2 : 0);
    this.y = j * cellH + margin;
    this.posAngle = map(
      this.y,
      margin + cellH / 2,
      height - margin,
      0,
      4 * TAU
    );
    this.posAngleOffset = map(this.x, margin, width - margin, 0, 5 * TAU);
    this.primaryOdds = map(
      sin(this.posAngle + this.posAngleOffset),
      -1,
      1,
      0,
      1
    );
    this.steps = 6;
    this.rings = Array(this.steps)
      .fill(0)
      .map(() => {
        if (random() < this.primaryOdds) return 1;
        else return 0;
      });
  }
  draw() {
    ellipse(this.x, this.y, 10, 10);
  }
  drawBlue() {
    for (let k = 0; k < this.steps; k++) {
      if (this.rings[k] == 0) continue;
      let effR = map(k, 0, this.steps, 0, cellR / 2);
      stroke("blue");

      ellipse(this.x, this.y, effR * 2, effR * 2);
    }
  }
  drawOrange() {
    for (let k = 0; k < this.steps; k++) {
      if (this.rings[k] == 1) continue;
      let effR = map(k, 0, this.steps, 0, cellR / 2);
      stroke("orange");

      ellipse(this.x, this.y, effR * 2, effR * 2);
    }
  }
}
