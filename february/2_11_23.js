let aspectRatio = 2480 / 3508;

let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
let cols = 9;
let rows = 9;

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
  let maxD = dist(cell0.x, cell0.y, centerCell.x, centerCell.y);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = margin + i * cellW;
      let y = margin + j * cellH;
      let mid = createVector(x + cellW / 2, y + cellH / 2);

      let gap = TAU / 17;
      //black arc
      let iAng = map(i, 0, cols - 1, 0, TAU);
      let jAng = map(j, 0, rows - 1, 0, TAU);
      let startAngle1 = iAng + jAng;
      let endAngle1 = startAngle1 + PI;
      fill("gold");
      arc(
        mid.x,
        mid.y,
        cellW * 0.9,
        cellH * 0.9,
        startAngle1,
        endAngle1,
        CLOSE
      );
      fill("silver");
      arc(
        mid.x,
        mid.y,
        cellW * 0.9,
        cellH * 0.9,
        endAngle1 + gap,
        startAngle1 - gap + TAU,

        CLOSE
      );
      // ellipse(mid.x, mid.y, cellW * 0.9);

      // red arc
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
