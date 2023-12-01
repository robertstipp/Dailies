let e, g;
let colors = ["gold", "black"];

let cols = 10;
let rows = 10;
let margin = 100;
let cellW, cellH, effW, effH, halfCellW, halfCellH;
let maxDist;
function setup() {
  createCanvas(1080, 1080);
  background(colors[1]);
  e = new p5.Ease();
  g = new p5.Gen();

  effW = width - margin * 2;
  effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;
  halfCellW = cellW / 2;
  halfCellH = cellH / 2;

  maxDist = 560.028;
  noFill();
  noLoop();
}

function draw() {
  stroke(colors[0]);
  rectMode(CENTER);
  let tempMax = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let xPos = margin + i * cellW + halfCellW;
      let yPos = margin + j * cellH + halfCellH;
      strokeWeight(1);
      rect(xPos, yPos, cellW, cellH);

      // line(xPos, yPos, xPos + halfCellW, yPos + halfCellH);
      // line(xPos, yPos, xPos - halfCellW, yPos + halfCellH);
      // line(xPos, yPos, xPos + halfCellW, yPos - halfCellH);
      // line(xPos, yPos, xPos - halfCellW, yPos - halfCellH);
      line(xPos, yPos, xPos, yPos + halfCellH);
      line(xPos, yPos, xPos, yPos - halfCellH);
      line(xPos, yPos, xPos + halfCellW, yPos);
      line(xPos, yPos, xPos - halfCellW, yPos);
      let d = dist(xPos, yPos, width / 2, height / 2);
      if (d > tempMax) {
        tempMax = d;
      }
      let dInt = map(d, 0, maxDist, 0, 1);
      let scale = 2;
      push();
      translate(xPos, yPos);
      fill(colors[1]);
      rotate(PI / 4);
      rect(0, 0, cellW / scale, cellH / scale);
      pop();
      push();
      fill(colors[0]);
      pop();
      if (i !== 0 && j !== 0 && i !== cols - 1 && j !== rows - 1) {
        line(xPos, yPos, xPos + halfCellW, yPos + halfCellH);
        line(xPos, yPos, xPos - halfCellW, yPos + halfCellH);
        line(xPos, yPos, xPos + halfCellW, yPos - halfCellH);
        line(xPos, yPos, xPos - halfCellW, yPos - halfCellH);
        push();
        fill(colors[1]);
        ellipse(xPos, yPos, cellW / (2 * scale), cellH / (2 * scale));
        pop();
      }
      if (i !== 0 && j !== 0) {
        push();
        fill(colors[1]);
        ellipse(
          xPos - halfCellW,
          yPos - halfCellW,
          cellW / scale,
          cellH / scale
        );
        pop();
      }
    }
  }
  rectMode(CORNER);
  rect(margin, margin, effW, effH);

  console.log(tempMax, maxDist);
}
