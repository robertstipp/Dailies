let aspectRatio = 2480 / 3508;

let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
let cols = 21;
let rows = 21;

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
      let gap = TAU / 10;
      //black arc
      let offset = map(d, 0, maxD, 0, 2 * TAU);
      let dividingAngle = offset;

      let distFromCenter = -dividingAngle;
      let startAngle1 = PI / 2;
      let endAngle1 = startAngle1 + PI;

      // ellipse(mid.x, mid.y, cellW * 0.9, cellH * 0.9);

      // fill("black ");
      fill("gold");
      arc(
        mid.x,
        mid.y,
        cellW * 0.9,
        cellH * 0.9,
        dividingAngle,
        distFromCenter,
        CLOSE
      );
      fill("silver");
      arc(
        mid.x,
        mid.y,
        cellW * 0.9,
        cellH * 0.9,
        distFromCenter,
        dividingAngle + TAU,
        CLOSE
      );
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
