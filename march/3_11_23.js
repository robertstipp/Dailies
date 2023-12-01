let cols = 10;
let rows = 10;

let colCount = 0;
let rowCount = 0;

let cellW, cellH;

let myGrid = Array(rows)
  .fill()
  .map(() =>
    Array(cols)
      .fill()
      .map(() => Math.floor(Math.random() * 256))
  );
console.log(myGrid);

let grid = Array(200)
  .fill()
  .map(() => Math.random() * 255);

let count = 0;
function setup() {
  createCanvas(400, 400);
  background(0);
  // noLoop();
  // for (let i = 0; i < grid.length; i++) {
  //   let x = map(i, 0, grid.length, 0, width);
  //   stroke(grid[i]);
  //   line(x, 0, x, height);
  // }
  frameRate(1);
  cellW = width / cols;
  cellH = height / cols;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW;
      let y = j * cellH;
      let clr = myGrid[j][i];
      fill(clr);
      rect(x, y, cellW, cellH);
    }
  }
}
function draw() {
  let x = colCount * cellW;
  let y = rowCount * cellH;

  console.log(colCount, rowCount);

  let max = -1;

  for (let i = colCount; i < cols; i++) {
    for (let j = rowCount; j < rows; j++) {
      console.log(i, j);
      if (myGrid[j][i] > max) {
        max = myGrid[j][i];
        console.log(max);
      }
    }
  }
  let clr = max;
  fill(clr);
  rect(x, y, cellW, cellH);

  colCount++;
  if (colCount === 10) {
    rowCount++;
    colCount = 0;
  }
}
