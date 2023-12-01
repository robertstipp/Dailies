const gridBase = "#FFF6C3";
const cellShadow = "#FFDB89";
const cellBase = "#DC0000";

let numRows = 20;
let numCols = 20;
let cellW, cellH;

const grid = Array(numRows)
  .fill()
  .map(() => Array(numCols).fill(0));

function setup() {
  createCanvas(600, 600);
  background(255);
  cellW = width / numCols;
  cellH = height / numRows;

  // setupGrid
  buildGrid();
  showGrid();
}

function buildGrid() {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  console.log(grid);
}

function showGrid() {
  for (let i = 0; i < numRows - 1; i++) {
    for (let j = 0; j < numCols; j++) {
      const shadowCell = grid[i][j];
      const baseCell = grid[i + 1][j];
      fill(gridBase);
      if (grid[i][j].val > 0) grid[i][j].show();
      if (baseCell) {
        fill(cellShadow);
        shadowCell.show();
      }
    }
  }
  for (let i = 1; i < numRows - 1; i++) {
    for (let j = 1; j < numCols - 1; j++) {
      fill(gridBase);
      // if (grid[i][j].val > 0) grid[i][j].show();
      fill(cellBase);
      if (grid[i][j].val > 0.5) grid[i][j].show();
    }
  }
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i * cellW;
    this.y = j * cellH;
    this.w = cellW;
    this.h = cellH;
    this.color = color("black");
    this.val = random();
  }

  show() {
    stroke(255);
    rect(this.x, this.y, this.w, this.h);
  }
}
