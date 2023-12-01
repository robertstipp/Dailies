let aspectRatio = 2480 / 3508;

let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
let cols = 30;
let rows = 30;

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
      // rect(x, y, cellW, cellH);

      let r1 = cellW / 2;
      let r2 = 0;

      if ((i + j) % 2 == 0) {
        let distAngle = map(d, 0, maxD, 0, 4 * TAU);
        let posAngle = atan2(mid.y - centerCell.y, mid.x - centerCell.x);
        let factorAngle = distAngle + posAngle * 2;
        let factor = map(sin(factorAngle), -1, 1, 1, 10);
        r2 = cellW / factor;

        if (r2 > 3) {
          push();
          let colorIndex = 1;
          fill(colors[colorIndex]);
          ellipse(mid.x, mid.y, r2, r2);
          pop();
        }
      }

      for (let a = 0; a < TAU; a += PI / 2) {
        let end = createVector(mid.x + r1 * cos(a), mid.y + r1 * sin(a));
        let start = createVector(mid.x + r2 * cos(a), mid.y + r2 * sin(a));
        line(start.x, start.y, end.x, end.y);
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
