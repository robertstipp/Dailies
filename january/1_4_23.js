let len = 10;
let simplexNoise;
let grid;
let spacing = 10;
let resolution = 0.001;
const colors = ["#fdff00", "#e54890", "#74d6d0", "#eeaece", "#f6e265"];

function setup() {
  createCanvas(1080, 1080);
  background(200);
  simplexNoise = new openSimplexNoise(Date.now());
  grid = new Grid(1080, 1080);
  grid.init();
  for (let i = 0; i < 1000; i++) {
    push();
    noFill();

    flowLine();
    pop();
  }
  grid.display();
}

function draw() {}

class Grid {
  constructor(width, height) {
    this.rows = height / spacing + 16;
    this.cols = width / spacing + 16;
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
  getMaxVisits() {
    let max = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.grid[i][j];
        if (cell.visits > max) {
          max = cell.visits;
        }
      }
    }
    return max;
  }

  findNearestEqualVisits(cell) {
    let minDist = Infinity;
    let minCell = null;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (cell.x === this.grid[i][j].x && cell.y === this.grid[i][j].y)
          continue;
        let otherCell = this.grid[i][j];
        if (otherCell.visits === cell.visits) {
          let d = dist(cell.x, cell.y, otherCell.x, otherCell.y);
          if (d < minDist) {
            minDist = d;
            minCell = otherCell;
          }
        }
      }
    }
    stroke(random(colors));
    line(cell.x, cell.y, minCell.x, minCell.y);
    return minCell ? minCell : cell;
  }

  display() {
    let max = this.getMaxVisits();
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.grid[i][j];
        stroke(0);
        let size = map(cell.visits, 0, max, 1, 10);
        strokeWeight(size);
        this.findNearestEqualVisits(cell);
        push();

        if (cell.visits > 0) {
          // ellipse(cell.x, cell.y, size);
        }
        pop();
      }
    }
  }
}

class Cell {
  constructor(x, y) {
    let startX = -spacing * 8;
    let startY = -spacing * 8;
    this.x = x * spacing + startX;
    this.y = y * spacing + startY;
    let d = dist(this.x, this.y, width / 2, height / 2);
    this.angle = map(
      simplexNoise.noise3D(this.x * resolution, this.y * resolution, d * 0.001),
      -1,
      1,
      0,
      TAU
    );
    this.visits = 0;
  }
}

function flowLine() {
  let startingPoint = random(random(grid.grid));
  // ellipse(startingPoint.x, startingPoint.y, 5, 5);
  let curX = startingPoint.x;
  let curY = startingPoint.y;
  let curAngle = startingPoint.angle;

  beginShape();

  for (let t = 0; t < 10; t++) {
    let nextX = curX + cos(curAngle) * len;
    let nextY = curY + sin(curAngle) * len;

    let nextRow = floor(nextX / spacing);
    let nextCol = floor(nextY / spacing);
    if (
      nextRow <= 0 ||
      nextRow >= grid.rows ||
      nextCol <= 0 ||
      nextCol >= grid.cols
    ) {
      break;
    }
    let nextCell = grid.grid[nextRow][nextCol];
    let nextAngle = nextCell.angle;

    let angleDiff = nextAngle - curAngle;
    curAngle += angleDiff * 0.5;

    if (curX < 1 && nextY < 1) break;
    if (t % 10 === 0) {
      nextCell.visits++;
      // fill("white");
      // ellipse(nextX, nextY, 5, 5);
    }

    curX = nextX;
    curY = nextY;
  }
  endShape();
}
