let aspectRatio = 2480 / 3508;

let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
let cols = 4;
let rows = 4;

let cellH, cellW, margin, effW;
let myCells = [];

let dots = [];
let subCircles = [];

function setup() {
  createCanvas(1080, 1080, SVG);
  // background("black");
  e = new p5.Ease();
  g = new p5.Gen();
  noFill();
  noLoop();
  noStroke();
}

function draw() {
  let margin = 100;
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;

  let cell0 = createVector(margin + cellW / 2, margin + cellH / 2);
  let centerI = floor(cols / 2);
  let centerJ = floor(rows / 2);
  let centerCell = createVector(margin + effW / 2, margin + effH / 2);
  let maxD = dist(cell0.x, cell0.y, width / 2, height / 2);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = margin + i * cellW;
      let y = margin + j * cellH;
      let mid = createVector(x + cellW / 2, y + cellH / 2);
      let d = dist(mid.x, mid.y, centerCell.x, centerCell.y);
      stroke("black");
      let topMid = createVector(x + cellW / 2, y);
      let bottomMid = createVector(x + cellW / 2, y + cellH);
      let leftMid = createVector(x, y + cellH / 2);
      let rightMid = createVector(x + cellW, y + cellH / 2);
      // rect(x, y, cellW, cellH);

      let start, end;

      let steps = 20;
      if ((i + j) % 2 == 0) {
        for (let i = 0; i <= steps; i++) {
          let middlePoint = p5.Vector.lerp(topMid, bottomMid, i / steps);
          let start = createVector(x, y + cellH / 2);
          let end = createVector(x + cellW, y + cellH / 2);

          let points = [start, middlePoint, end];
          beginShape();
          for (let p of points) {
            vertex(p.x, p.y);
          }
          endShape();
        }
      } else {
        for (let i = 0; i <= steps; i++) {
          let start = createVector(x + cellW / 2, y);
          let end = createVector(x + cellW / 2, y + cellH);
          let middlePoint = p5.Vector.lerp(leftMid, rightMid, i / steps);
          let points = [start, middlePoint, end];
          beginShape();
          for (let p of points) {
            vertex(p.x, p.y);
          }
          endShape();
        }
      }
    }
  }
  let steps = 10;
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let x = margin + i * cellW;
      let y = margin + j * cellH;
      let leftCorer = createVector(x, y);
      let rightCorner = createVector(x + cellW, y + cellH);
      let bottomLeftCorner = createVector(x, y + cellH);
      let topRightCorner = createVector(x + cellW, y);
      let topMid = createVector(x + cellW / 2, y);
      let bottomMid = createVector(x + cellW / 2, y + cellH);
      let leftMid = createVector(x, y + cellH / 2);
      let rightMid = createVector(x + cellW, y + cellH / 2);
      for (let k = 0; k <= steps; k++) {
        let point2 = p5.Vector.lerp(leftMid, topMid, k / steps);
        line(x, y, point2.x, point2.y);
      }
    }
  }
}

function getColor(d) {
  let c = "black";

  return c;
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}
