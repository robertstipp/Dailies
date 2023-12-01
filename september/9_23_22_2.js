let leftX = 100;
let rightX = 500;
let topY = 100;
let bottomY = 500;
let resolution = 600 * 0.01;
let numCols = (rightX - leftX) / resolution;
let numRows = (bottomY - topY) / resolution;
let defaultAngle = Math.PI / 4;
let grid = [];

// starting point x = 500, y =100

function setup() {
  createCanvas(600, 600);
  noFill();
  background("#fff4e3");
  for (let i = 0; i < numCols; i++) {
    let row = [];
    for (let j = 0; j < numRows; j++) {
      let x = leftX + j * resolution;
      let y = topY + i * resolution;
      let angle = noise(i / 100, j / 100) * Math.PI;
      // ellipse(x, y, 3);
      row.push(angle);
      // line(x, y, x + 3 * cos(angle), y + 3 * sin(angle));
    }
    grid.push(row);
  }

  for (let i = 0; i < 1000; i++) {
    let x = random(leftX, rightX);
    let y = random(bottomY, topY);
    let originX = x;
    let originY = y;
    // ellipse(x, y, 10);
    beginShape();
    push();
    stroke("#5d5d5a");

    for (let n = 0; n < 100; n++) {
      vertex(x, y);
      let xOff = x - leftX;
      let yOff = y - topY;
      let columnIndex = Math.floor(xOff / resolution);
      let rowIndex = Math.floor(yOff / resolution);
      if (columnIndex >= grid.length || columnIndex < 0) break;
      if (rowIndex >= grid[0].length || rowIndex < 0) break;
      let gridAngle = grid[columnIndex][rowIndex];
      let xStep = 6 * Math.cos(gridAngle);
      let yStep = 6 * Math.sin(gridAngle);
      // ellipse(x, y, 10);
      x = x + xStep;
      y = y + yStep;
    }
    endShape();
    pop();
    push();
  }
}

function draw() {}

class Cell {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  show() {
    ellipse(this.x, this.y);
  }
}
