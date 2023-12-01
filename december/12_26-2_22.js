let w, h;
let spacing = 10;
let len = 1;
let grid = [];
let resolution = 0.1;
const colors = ["#fe4a49", "#2ab7ca", "#fed766", "#e6e6ea", "#f4f4f8"];
function setup() {
  createCanvas(400, 400);
  w = width / spacing;
  h = height / spacing;
  background(0);
  stroke(255);
  grid = new Grid(400, 400);
  grid.initGrid();
  grid.displayGrid();
  console.log(grid);

  for (let i = 0; i < 10; i++) {
    flowLine();
  }
}

class Cell {
  constructor(x, y) {
    let startX = -spacing * 4;
    let startY = -spacing * 4;
    this.x = startX + x * spacing;
    this.y = startY + y * spacing;
    this.angle = noise(x * resolution, y * resolution) * TAU;
  }
}

class Grid {
  constructor(width, height) {
    this.rows = height / spacing + 8;
    this.cols = width / spacing + 8;
    this.grid = [];
  }

  initGrid() {
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new Cell(i, j));
      }
      this.grid.push(row);
    }
  }

  displayGrid() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.grid[i][j];
        push();
        translate(cell.x, cell.y);
        rotate(cell.angle);
        line(0, 0, spacing, 0);
        pop();
      }
    }
  }
}

function flowLine() {
  let startingPoint = random(random(grid.grid));
  let curX = startingPoint.x;
  let curY = startingPoint.y;
  let curAngle = startingPoint.angle;

  noFill();

  beginShape();
  vertex(curX, curY);
  for (let t = 0; t < 10; t++) {
    let vec = createVector(curX, curY).add(p5.Vector.fromAngle(curAngle, len));
    let tempPoint = vec.copy().add(p5.Vector.fromAngle(curAngle, spacing));
    let nextPoint;
    let minDistance = Infinity;
    for (let i = 0; i < grid.grid.length; i++) {
      for (let j = 0; j < grid.grid[i].length; j++) {
        let cell = grid.grid[i][j];
        let distance = dist(tempPoint.x, tempPoint.y, cell.x, cell.y);
        if (distance < minDistance) {
          minDistance = distance;
          nextPoint = cell;
        }
      }
    }
    // curveVertex(nextPoint.x, nextPoint.y);
    strokeWeight(5);

    smudge(createVector(nextPoint.x, nextPoint.y), nextPoint.angle);
    // ellipse(nextPoint.x, nextPoint.y, 5, 5);
    // line(curX, curY, nextPoint.x, nextPoint.y);
    curX = nextPoint.x;
    curY = nextPoint.y;
    curAngle = nextPoint.angle;
  }
  endShape();
}

function smudge(point, direction) {
  let c = random(colors);
  fill(c);
  for (let i = 0; i < 100; i++) {
    let angle = direction;
    let rad = random(5);
    let pos = point.copy().add(p5.Vector.fromAngle(angle, rad));
    let size = map(i, 0, 100, 5, 0);
    pos.add(random([-1, 1]), random([-1, 1]));
    noStroke();
    ellipse(pos.x, pos.y, size);
  }
}
