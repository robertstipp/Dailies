let rows = 20;
let cols = (rows * 3) / 4;
let cellW, cellH, effW, effH;
let margin = 100;
let grid;

function setup() {
  pixelDensity(1);
  createCanvas(869, 1152, SVG);
  noFill();
  noLoop();

  stroke(0);
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;
}
function draw() {
  background(255);
  grid = new Grid(rows, cols, cellW, cellH);
  grid.init();
  grid.draw();
}

function keyPressed() {
  if (key == "s") {
    save("1_21_23.svg");
  }
}

class Grid {
  constructor(row, col, cellW, cellH) {
    this.row = row;
    this.col = col;
    this.cellW = cellW;
    this.cellH = cellH;
    this.grid = [];
  }

  init() {
    for (let i = 0; i < this.row; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.col; j++) {
        let x = margin + j * this.cellW;
        let y = margin + i * this.cellH;
        this.grid[i][j] = new Cell(i, j, x, y);
      }
    }
  }

  draw() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.grid[i][j].draw();
      }
    }
  }
}

class Cell {
  constructor(i, j, x, y) {
    this.i = i;
    this.j = j;
    this.x = x;
    this.y = y;
    this.w = cellW;
    this.h = cellH;
    this.center = createVector(x + cellW / 2, y + cellH / 2);
  }

  draw() {
    push();
    translate(this.center.x, this.center.y);

    let steps = 50;
    for (let i = 0; i < steps; i++) {
      let r = map(i, 0, steps, 0, this.w);

      let angleStart = noise(i) * 4 * TAU;
      let arcOptions = [QUARTER_PI, HALF_PI, PI, PI + QUARTER_PI];
      let arcOption = random(arcOptions);
      arc(0, 0, r, r, angleStart, angleStart + arcOption);
    }
    pop();
  }
}
