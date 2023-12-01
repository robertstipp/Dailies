let aspectRatio = 2480 / 3508;

let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
let cols = 5;
let rows = 5;

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
  // background("red");
}

function draw() {
  let margin = 100;
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;

  let cell0 = createVector(margin + cellW / 2, margin + cellH / 2);
  let maxD = dist(cell0.x, cell0.y, width / 2, height / 2);
  let centerCol = floor(cols / 2);
  let centerRow = floor(rows / 2);
  let centerCell = createVector(
    margin + centerCol * cellW + cellW / 2,
    margin + centerRow * cellH + cellH / 2
  );

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // if (i == 0 && j == 0) continue;
      // if (i == 0 && j == rows - 1) continue;
      // if (i == cols - 1 && j == 0) continue;
      // if (i == cols - 1 && j == rows - 1) continue;
      let cellPos = createVector(margin + i * cellW, margin + j * cellH);

      let cellMid = cellPos.copy().add(createVector(cellW / 2, cellH / 2));
      let d = dist(cellMid.x, cellMid.y, width / 2, height / 2);

      let a = atan2(cellMid.y - height / 2, cellMid.x - width / 2);

      let cellMidOffset = cellMid.copy().add(p5.Vector.fromAngle(a, cellW / 4));
      cellMidOffset = cellMid.copy();
      if (i == centerCol && j == centerRow) {
        cellMidOffset = cellMid.copy();
      }
      stroke(0);
      let reff = cellW;

      // rect(cellPos.x, cellPos.y, cellW, cellH);
      let rectCorners = [
        createVector(cellPos.x, cellPos.y),
        createVector(cellPos.x + cellW, cellPos.y),
        createVector(cellPos.x + cellW, cellPos.y + cellH),
        createVector(cellPos.x, cellPos.y + cellH),
      ];
      for (let k = 0; k < rectCorners.length; k++) {
        if (i == 0 && j == 0 && (k == i || k == 3)) {
          let c0 = rectCorners[0];
          let c1 = rectCorners[1];
          let c3 = rectCorners[3];
          // let c3 = rectCorners[(k + 3) % rectCorners.length];
          let corners = [c0, c1, c3];
          stepPolygon(corners, map(d, 0, maxD, 9, 3));
          continue;
        }
        if (i == 0 && j == rows - 1 && (k == 3 || k == 2)) {
          let c0 = rectCorners[0];
          let c1 = rectCorners[3];
          let c3 = rectCorners[2];
          // let c3 = rectCorners[(k + 3) % rectCorners.length];
          let corners = [c0, c1, c3];
          stepPolygon(corners, map(d, 0, maxD, 9, 3));
          continue;
        }

        if (i == cols - 1 && j == 0 && (k == 0 || k == 1)) {
          let c0 = rectCorners[0];
          let c1 = rectCorners[1];
          let c3 = rectCorners[2];
          // let c3 = rectCorners[(k + 3) % rectCorners.length];
          let corners = [c0, c1, c3];
          stepPolygon(corners, map(d, 0, maxD, 9, 3));
          continue;
        }
        if (i == cols - 1 && j == rows - 1 && (k == 1 || k == 2)) {
          let c0 = rectCorners[3];
          let c1 = rectCorners[1];
          let c3 = rectCorners[2];
          // let c3 = rectCorners[(k + 3) % rectCorners.length];
          let corners = [c0, c1, c3];
          stepPolygon(corners, map(d, 0, maxD, 9, 3));
          continue;
        }

        let c0 = rectCorners[k];
        let c1 = rectCorners[(k + 1) % rectCorners.length];
        // c2 is the center of the rect
        let c2 = cellMidOffset.copy();
        let corners = [c0, c1, c2];

        stepPolygon(corners, map(d, 0, maxD, 5, 3));
        // beginShape();
        // vertex(c0.x, c0.y);
        // vertex(c1.x, c1.y);
        // vertex(c2.x, c2.y);
        // endShape(CLOSE);
      }
    }
  }
  fill("black");
  // ellipse(cell0.x, cell0.y, cellW);
  // ellipse(width / 2, height / 2, 10);
  // ellipse(centerCell.x, centerCell.y, 10);

  let canvasCenter = createVector(width / 2, height / 2);
}
function perpSquare(x, y, r) {
  noStroke();
  fill(random(colors));
  beginShape();
  vertex(x, y);
  vertex(x + r, y);
  vertex(x + r, y + r);
  vertex(x, y + r);
  endShape(CLOSE);

  // shadow
  fill("#000000");
  beginShape();
  vertex(x, y);
  vertex(x - r, y + r);
  vertex(x - r, y + 2 * r);
  vertex(x, y + 2 * r);
  vertex(x + r, y + r);
  vertex(x, y + r);

  endShape(CLOSE);
}

function stepPolygon(corners, steps) {
  let centerX = 0;
  let centerY = 0;

  for (let i = 0; i < corners.length; i++) {
    centerX += corners[i].x;
    centerY += corners[i].y;
  }

  centerX /= corners.length;
  centerY /= corners.length;

  for (let t = 1 / steps; t < 1 - 1 / steps; t += 1 / steps) {
    let newCorners = [];
    let testT = e.cheapStep(t);
    for (let i = 0; i < corners.length; i++) {
      let pos = p5.Vector.lerp(
        corners[i],
        createVector(centerX, centerY),
        testT
      );
      newCorners.push(pos);
    }
    for (let i = 0; i < newCorners.length; i++) {
      let corner0 = newCorners[i];
      let corner1 = newCorners[(i + 1) % corners.length];

      line(corner0.x, corner0.y, corner1.x, corner1.y);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
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
