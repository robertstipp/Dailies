let aspectRatio = 1;

let colors = ["red", "blue", "yellow"];
let e, g;
let ringsArr = [];
let cols = 4;
let rows = 4;
let cellH, cellW, margin, effW;
function setup() {
  createCanvas(1080, 1080, SVG);
  e = new p5.Ease();
  g = new p5.Gen();
  noFill();
  noLoop();
}

function draw() {
  margin = 100;
  effW = width - 2 * margin;
  cellW = effW / cols;
  cellH = cellW;
  let scale = 0.95;
  let size = cellW * scale;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      rectMode(CENTER);
      let x = margin + i * cellW;
      let y = margin + j * cellH;
      let mid = createVector(x + cellW / 2, y + cellH / 2);
      let c = random(colors);
      fill(c);
      let val = noise(i, j);
      if (val < 0.3) {
        rect(mid.x, mid.y, size);
      } else if (val < 0.66) {
        ellipse(mid.x, mid.y, size);
      } else {
        myTriangle(mid);
      }
    }
  }
}

function myTriangle(mid) {
  let val = Math.floor(random(0, 3));
  let w = cellW * 0.95;
  let h = cellH * 0.95;
  let points;

  let corner0 = createVector(mid.x - w / 2, mid.y - h / 2);
  let corner1 = createVector(mid.x + w / 2, mid.y - h / 2);
  let corner2 = createVector(mid.x + w / 2, mid.y + h / 2);
  let corner3 = createVector(mid.x - w / 2, mid.y + h / 2);

  if (val == 0) {
    points = [corner0, corner1, corner2];
  } else if (val == 1) {
    points = [corner1, corner2, corner3];
  } else if (val == 2) {
    points = [corner2, corner3, corner0];
  } else {
    points = [corner3, corner0, corner1];
  }
  triangle(
    points[0].x,
    points[0].y,
    points[1].x,
    points[1].y,
    points[2].x,
    points[2].y
  );
}
function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}
