const grid = [];
const leftX = 100;
const rightX = 500;
const topY = 100;
const bottomY = 500;
const resolution = 600 * 0.01;
const numCols = (rightX - leftX) / resolution;
const numRows = (bottomY - topY) / resolution;
const stepResolution = 600 * 0.001;

const colors = ["#192294", "#b7b9f4", "#5254d8", "#000278"];
let t = 0;
function setup() {
  createCanvas(600, 600);
  // background(0)
  noFill();

  let focalPoint = createVector(0, 600);

  // Grid
  for (let i = 0; i < numCols; i++) {
    let row = [];
    for (let j = 0; j < numRows; j++) {
      let x = leftX + j * resolution;
      let y = topY + i * resolution;
      let angle = atan2(y - focalPoint.y, x - focalPoint.x);
      row.push(angle);
    }
    grid.push(row);
  }
  // Boundaries
  // const boundary = new Boundary(random(leftX, rightX), random(topY, bottomY));
  // let x = boundary.start.x;
  // let y = boundary.start.y;
  // let boundH = boundary.height;
  // let boundW = boundary.width;
  // rect(x, y, boundW, boundH);

  // FlowLines
  for (let i = 0; i < 1000; i++) {
    let x = random(leftX, leftX + 100);
    let y = random(bottomY, bottomY - 100);

    beginShape();
    stroke(random(colors));

    for (let n = 0; n < 1000; n++) {
      rect(x, y, 4);

      vertex(x, y);

      let xOff = x - leftX;
      let yOff = y - topY;
      let columnIndex = Math.floor(xOff / resolution);
      let rowIndex = Math.floor(yOff / resolution);

      if (columnIndex >= grid.length || columnIndex < 0) break;
      if (rowIndex >= grid[0].length || rowIndex < 0) break;

      let gridAngle = grid[columnIndex][rowIndex];
      let xStep = stepResolution * Math.cos(gridAngle);
      let yStep = stepResolution * Math.sin(gridAngle);
      // ellipse(x, y, 10);
      x = x + xStep;
      y = y + yStep;
    }

    endShape();
  }
}
function draw() {}

class Boundary {
  constructor(startX, startY) {
    this.start = createVector(startX, startY);
    this.width = random(100, 200);
    this.height = random(100, 200);

    this.end = createVector(startX + this.width, startY + this.height);
  }

  checkWithin(x, y) {
    return (
      x > this.start.x && x < this.end.x && y > this.start.y && y < this.end.y
    );
  }
}
