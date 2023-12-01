let aspectRatio = 1;

let colors = ["red", "blue", "yellow"];
let e, g;
let ringsArr = [];
let cols = 30;
let rows = 60;
let cellH, cellW, margin, effW;

function setup() {
  createCanvas(1080, 2160, SVG);
  e = new p5.Ease();
  g = new p5.Gen();
  noFill();
  noLoop();
}

function draw() {
  margin = 100;
  effW = width - 2 * margin;
  effH = height - 2 * margin;
  cellW = effW / cols;
  cellH = cellW;
  let x0 = margin + cellW / 2;
  let y0 = margin + cellH / 2;
  // ellipse(x0, y0, cellW, cellH);

  noStroke();
  let midAngle1 = PI + PI / 4;

  let startAngle2 = -PI / 4;
  let midAngle2 = PI / 4;
  let endAngle2 = startAngle2 + PI;
  let center = createVector(width / 2, height / 2);
  let maxD = dist(x0, y0, width / 2, height / 2);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = margin + i * cellW;
      let y = margin + j * cellH;

      let mid = createVector(x + cellW / 2, y + cellH / 2);
      let d = dist(center.x, center.y, mid.x, mid.y);
      let angleRange = map(d, 0, maxD, 0, PI / 2);
      let angleRange2 = PI / 2 - angleRange;
      let startAngle1 = midAngle1 - angleRange;
      let endAngle1 = midAngle1 + angleRange;

      let startAngle2 = midAngle2 - angleRange2;
      let endAngle2 = midAngle2 + angleRange2;
      let c = random(colors);

      fill("red");
      rectMode(CENTER);
      let scaleX = map(d, 0, maxD, 1, 0);
      let w = cellW * scaleX;
      let h = cellH * scaleX;
      rect(mid.x, mid.y, w, h);
      rectMode(CORNERS);
      let rectCorners = [];
      rectCorners.push(createVector(mid.x - w / 2, mid.y - h / 2));
      rectCorners.push(createVector(mid.x + w / 2, mid.y + h / 2));
      rectCorners.push(createVector(mid.x - w / 2, mid.y + h / 2));
      rectCorners.push(createVector(mid.x + w / 2, mid.y - h / 2));
      // arc(mid.x, mid.y, cellW, cellH, startAngle1, endAngle1);
      fill("black");
      rect(rectCorners[0].x, rectCorners[0].y, x, y);
      rect(rectCorners[1].x, rectCorners[1].y, x + cellW, y + cellH);
      rect(rectCorners[2].x, rectCorners[2].y, x, y + cellH);
      rect(rectCorners[3].x, rectCorners[3].y, x + cellW, y);
      noFill();

      // rect(mid.x, mid.y, cellW, cellH);
      // arc(mid.x, mid.y, cellW, cellH, startAngle2, endAngle2);
    }
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}
