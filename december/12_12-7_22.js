let cols = 20;
let rows = 20;

function setup() {
  createCanvas(800, 800);
  background(0);

  let cellW = width / cols;
  let cellH = height / rows;

  for (let x = 0; x <= width - cellW; x += cellW) {
    for (let y = 0; y <= height - cellH; y += cellH) {
      rect(x, y, cellW, cellH);
      shape1(x + cellW / 2, y + cellH / 2, cellW / 2);
    }
  }
}

function shape1(x, y, size) {
  push();
  noStroke();
  fill(0);
  ellipse(x, y, size);
}

function shape2(x, y, size) {
  push();
  stroke(255);
  fill(0);
  rect(x, y, size);
  pop();
}
