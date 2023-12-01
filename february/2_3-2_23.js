let aspectRatio = 1;
let rows = 21;
let cols = Math.floor(rows * aspectRatio);
let margin = 100;
let steps = 4;
let effW, effH, cellW, cellH;
let colors = ["red", "yellow", "blue"];
function setup() {
  createCanvas(1080, 1080, SVG);
  // background(0);
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;
  noLoop();
  noFill();
  stroke(0);
  // background("red");
}
function draw() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      //square 1
      rectMode(CENTER);
      let x = margin + j * cellW + cellW * 0.5;
      let y = margin + i * cellH + cellH * 0.5;
      let w, h;
      if ((i + 1 * rows + j) % 2 == 0) {
        fill("yellow");
        w = cellW * 0.65;
        h = cellH * 1.15;
        rect(x, y, w, h);
      } else {
        fill("blue");
        w = cellW * 1.15;
        h = cellH * 0.65;
        ellipse(x, y, 10, 10);
        // rect(x, y, w, h);
        // lines(x, y, w, h, steps, "h");
      }
    }
  }
}

function lines(x, y, w, h, steps, direction) {
  ellipse(x, y, 10, 10);
  let startX = x - w / 2;
  let startY = y - h / 2;
  let endX = x + w / 2;
  let endY = y + h / 2;
  ellipse(startX, startY, 10, 10);
  ellipse(endX, endY, 10, 10);

  for (let i = 0; i < steps; i++) {
    if (direction == "h") {
      let x1 = startX;
      let x2 = startX + w;
      let yOff = startY + (i * h) / steps;
      let y1 = startY + yOff;
      let y2 = startY + yOff;
      line(x1, y1, x2, y2);
    }
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}
