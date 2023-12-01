let e, g;
let cellSize = 5;
function setup() {
  createCanvas(400, 400);
  background("#cf1b1b");
  e = new p5.Ease();
  g = new p5.Gen();
  noLoop();
  noStroke();
  let grid = new Grid();
  grid.init();

  for (let i = 0; i < 100; i++) {
    let startY = random(0, height);
    let maxAmplitude = random(100, 200);
    let angleOffSet = random(0, 2 * Math.PI);
    strokeWeight(5);
    stroke(255);
    noFill();
    beginShape();
    for (let x = 0; x <= width; x += 1) {
      // ellipse(x, height / 2, 10, 10);
      let angle = map(x, 0, width, 0, 2 * Math.PI);

      let y =
        startY +
        Math.sin(angle + angleOffSet) *
          noise(x / 1000, startY / 100) *
          maxAmplitude;
      let col = Math.floor(x / cellSize);
      let row = Math.floor(y / cellSize);
      if (row < 0 || row >= grid.rows || col < 0 || col >= grid.cols) {
        continue;
      }
      push();

      vertex(x, y);
      // ellipse(x, y, 5, 5);
      pop();

      let cell = grid.grid[col][row].encounters++;
    }
    endShape();
  }

  grid.show();
}
function draw() {}

class Grid {
  constructor() {
    this.rows = width / cellSize;
    this.cols = height / cellSize;
    this.cellSize = cellSize;
    this.grid = [];
  }

  init() {
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new Cell(i, j));
      }
      this.grid.push(row);
    }
  }
  show() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let pos = createVector(i * this.cellSize, j * this.cellSize);
        let size = constrain(
          map(this.grid[i][j].encounters, 0, 40, 5, 1),
          1,
          5
        );
        noStroke();

        fill("black");
        ellipse(pos.x, pos.y, size);
      }
    }
  }
}

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    this.encounters = 0;
  }
}
