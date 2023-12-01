let aspectRatio = 2480 / 3508;

let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
let cols = 2;
let rows = 2;

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
  let canvasCenter = createVector(width / 2, height / 2);
  let maxD = dist(cell0.x, cell0.y, width / 2, height / 2);
  let centerCol = floor(cols / 2);
  let centerRow = floor(rows / 2);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cellPos = createVector(margin + i * cellW, margin + j * cellH);
      let topLeft = cellPos.copy();
      let topRight = cellPos.copy().add(createVector(cellW, 0));
      let bottomLeft = cellPos.copy().add(createVector(0, cellH));
      let bottomRight = cellPos.copy().add(createVector(cellW, cellH));
      let corners = [topLeft, topRight, bottomRight, bottomLeft];

      stroke(0);
      let steps = 30;
      if (i === j) {
        for (let k = 0; k <= 30; k++) {
          let int1 = e.quadraticIn(k / steps);
          let int2 = e.quadraticOut(k / steps);

          let topX = lerp(topLeft.x, topRight.x, int1);
          let bottomX = lerp(bottomLeft.x, bottomRight.x, int2);
          let leftY = lerp(topLeft.y, bottomLeft.y, int1);
          let rightY = lerp(topRight.y, bottomRight.y, int2);
          line(topX, topLeft.y, bottomX, bottomLeft.y);
          line(topLeft.x, leftY, topRight.x, rightY);
        }
      } else {
        for (let k = 0; k <= 30; k++) {
          let int1 = e.quadraticIn(k / steps);
          let int2 = e.quadraticOut(k / steps);
          let topX = lerp(topRight.x, topLeft.x, int1);
          let bottomX = lerp(bottomRight.x, bottomLeft.x, int2);
          let leftY = lerp(bottomLeft.y, topLeft.y, int1);
          let rightY = lerp(bottomRight.y, topRight.y, int2);
          line(topX, topLeft.y, bottomX, bottomLeft.y);
          line(topLeft.x, leftY, topRight.x, rightY);
        }
      }
    }
  }

  // ellipse(canvasCenter.x, canvasCenter.y, width / 2);
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
