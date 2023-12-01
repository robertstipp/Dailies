let cols = 4;
let rows = 6;
let margin = 100;
let effW, effH, cellW, cellH;

function setup() {
  pixelDensity(1);
  createCanvas(888, 1215, SVG);
  effW = width - margin * 2;
  effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;
  noFill();
  noLoop();
  stroke(0);
}
function draw() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = margin + cellW * i;
      let y = margin + cellH * j;
      let w = cellW;
      let h = cellH;
      let r = random(1);
      if (r < 0.5) {
        recursiveRect(x, y, w, 10);
      } else {
        // ellipse(x + w / 2, y + h / 2, w, h);
      }
    }
  }
}
