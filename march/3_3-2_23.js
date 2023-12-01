let cols = 10;
let rows = 10;
let chars = Array(26)
  .fill(0)
  .map((_, i) => String.fromCharCode(65 + i));
let cellW, cellH;
function setup() {
  createCanvas(400, 400);
  cellW = width / cols;
  cellH = height / rows;
  background(0);
  noLoop();
}
function draw() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW;
      let y = j * cellH;
      fill(0);
      stroke(0);
      rect(x, y, cellW, cellH);
    }
  }
}
