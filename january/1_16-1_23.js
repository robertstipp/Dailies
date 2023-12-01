let cols = 20;
let rows = 20;
let cellWidth, cellHeight;
let margin = 100;
function setup() {
  pixelDensity(1);
  createCanvas(888, 1000, SVG);

  cellWidth = (width - 2 * margin) / cols;
  cellHeight = (height - 2 * margin) / rows;
  noFill();
  noLoop();
  rectMode(CENTER);
  stroke(0);
  for (let i = 0; i < cols; i++) {
    let xPos = margin + i * cellWidth;
    for (let j = 0; j < rows; j++) {
      let yPos = margin + j * cellHeight;
      // rect(xPos, yPos, cellWidth, cellHeight);
      dots(xPos, yPos, cellWidth, cellHeight);
    }
  }
}

function draw() {}

function dots(x, y, w, h) {
  let grid = Array(3)
    .fill()
    .map(() => Array(3).fill(0));
  for (let i = 0; i < 4; i++) {
    let row = floor(random(3));
    let col = floor(random(3));
    grid[row][col] = 1;
  }
  console.log(grid);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let xPos = x + (i * w) / 3;
      let yPos = y + (j * h) / 3;
      let cell = grid[i + 1][j + 1];
      if (cell == 1) {
        // ellipse(xPos, yPos, w / 10, h / 10);
      }
    }
  }

  beginShape();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let xPos = x + ((i - 1) * w) / 3;
      let yPos = y + ((j - 1) * h) / 3;
      if (grid[i][j] == 1) {
        vertex(xPos, yPos);
        ellipse(xPos, yPos, w / 10, h / 10);
      }
    }
  }
  endShape();
}

function keyPressed() {
  if (keyCode == 83) {
    save("1_15_23.svg");
  }
}
