let aspectRatio = 1;
let rows = 10;
let cols = Math.floor(rows * aspectRatio);
let margin = 10;
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
}
function draw() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let tileCenter = createVector(
        margin + j * cellW + cellW / 2,
        margin + i * cellH + cellH / 2
      );
      // ellipse(tileCenter.x, tileCenter.y, 10, 10);
      // if (random() < 0.5)
      // tileHorizontalLines(tileCenter.x, tileCenter.y, cellW, cellH);
      // else arcs(tileCenter.x, tileCenter.y, cellW, cellH);

      arcs(tileCenter.x, tileCenter.y, cellW, cellH);
    }
  }
}

function tileHorizontalLines(x, y, w, h) {
  let stepSize = h / steps;
  for (let i = 0; i <= steps; i++) {
    let xStart = x - w / 2;
    let xEnd = x + w / 2;
    let yStart = y - h / 2 + i * stepSize;
    let yEnd = yStart;

    line(xStart, yStart, xEnd, yEnd);
  }
}

function arcs(x, y, w, h) {
  let corners = [
    createVector(x - w / 2, y - h / 2),
    createVector(x + w / 2, y - h / 2),
    createVector(x + w / 2, y + h / 2),
    createVector(x - w / 2, y + h / 2),
  ];
  let selectCornerIndex = Math.floor(random() * 4);
  let selectCorner = corners[selectCornerIndex];
  let startAngle = selectCornerIndex * HALF_PI;
  noFill();

  let maxR = h * 2;

  for (let i = 0; i <= steps; i++) {
    let r = map(i, 0, steps, 0, maxR);
    arc(selectCorner.x, selectCorner.y, r, r, startAngle, startAngle + HALF_PI);
  }

  if (selectCornerIndex === 0) {
    let stepSize = h / steps;
    let yStart = y - h / 2;
    let xStart = x - w / 2;
    let xEnd = x + w / 2;
    let rnd = random([0, 1]);
    if (rnd === 0) {
      for (let i = 0; i <= steps; i++) {
        let yDelta = i * stepSize;
        let xDelta = calculateX(yDelta, maxR / 2);
        let x = xStart + xDelta;
        let y = yStart + yDelta;
        line(xEnd, y, x, y);
        // ellipse(x, y, 10, 10);
      }
    } else {
      let yEnd = y + h / 2;
      for (let i = 0; i <= steps; i++) {
        let xDelta = i * stepSize;
        let yDelta = calculateY(xDelta, maxR / 2);
        let x = xStart + xDelta;
        let y = yStart + yDelta;
        line(x, y, x, yEnd);
        // ellipse(x, y, 10, 10);
      }
    }
  }

  if (selectCornerIndex === 1) {
    let stepSize = h / steps;
    let yStart = y - h / 2;
    let xStart = x + w / 2;
    let xEnd = x - w / 2;

    for (let i = 0; i <= 10; i++) {
      let yDelta = i * stepSize;
      let xDelta = calculateX(yDelta, maxR / 2);

      let x = xStart - xDelta;
      let y = yStart + yDelta;
      line(xEnd, y, x, y);
      // ellipse(x, y, 10, 10);
    }
  }

  if (selectCornerIndex === 2) {
    let stepSize = h / steps;
    let yStart = y + h / 2;
    let xStart = x + w / 2;
    let yEnd = y - h / 2;
    // ellipse(xStart, yStart, 10, 10);
    for (let i = 0; i <= 10; i++) {
      let xDelta = i * stepSize;
      let yDelta = calculateY(xDelta, maxR / 2);

      let x = xStart - xDelta;
      let y = yStart - yDelta;
      line(x, y, x, yEnd);
    }
  }
  if (selectCornerIndex === 3) {
    let stepSize = h / steps;
    let yStart = y + h / 2;
    let xStart = x - w / 2;
    let yEnd = y - h / 2;
    // ellipse(xStart, yStart, 10, 10);
    for (let i = 0; i <= 10; i++) {
      let xDelta = i * stepSize;
      let yDelta = calculateY(xDelta, maxR / 2);

      let x = xStart + xDelta;
      let y = yStart - yDelta;
      line(x, y, x, yEnd);
    }
  }
}

function calculateX(y, r) {
  let x = Math.sqrt(r * r - y * y);

  return x;
}
function calculateY(x, r) {
  let y = Math.sqrt(r * r - x * x);

  return y;
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-01.svg");
  }
}
