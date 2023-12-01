let grid;

let e, g;
function setup() {
  createCanvas(1080, 1080);
  background(0);
  noStroke();
  fill(255);
  grid = new Grid(1080, 1080);
  noLoop();
  g = new p5.Gen();
  e = new p5.Ease();
}

function draw() {
  background(0);
  grid.display();
}

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rows = 10;
    this.cols = 10;
    this.cellWidth = this.width / this.cols;
    this.cellHeight = this.height / this.rows;
    this.grid = [];
    this.gridXOffset = this.cellWidth / 2;
    this.gridYOffset = this.cellHeight / 2;
    this.init();
  }

  init() {
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  display() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j] == 0) {
          noFill();
          stroke(255);
        } else {
          stroke(255);
        }
        let maxSteps = g.random(Math.random(), "high") * 10;

        recursiveEllipse(
          j * this.cellWidth + this.gridXOffset,
          i * this.cellHeight + this.gridYOffset,
          this.cellWidth,
          this.cellHeight,
          0,
          maxSteps
        );
      }
    }
  }
}

function recursiveEllipse(x, y, w, h, steps, maxSteps) {
  if (steps > maxSteps) return;
  else {
    let diameter = 100 / steps;
    ellipse(x, y, diameter);
    recursiveEllipse(x, y, w - 10, h - 10, steps + 1, maxSteps);
  }
}
