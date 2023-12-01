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
  let topLeftCorner = createVector(margin, margin);
  let topRightCorner = createVector(width - margin, margin);
  let bottomLeftCorner = createVector(margin, height - margin);
  let bottomRightCorner = createVector(width - margin, height - margin);

  stroke(0);

  let effDia = width - 2 * margin;
  // ellipse(canvasCenter.x, canvasCenter.y, effDia);
  // rect(margin, margin, effDia, effDia);
  let steps = 128;
  for (let a = 0; a < steps; a++) {
    let angle = (a * TWO_PI) / steps;
    let maxEffR = effDia / 2;
    let aMod = a % (steps / 4);
    let aModAngle = map(aMod, 0, steps / 32, 0, PI);
    let pos = canvasCenter
      .copy()
      .add(p5.Vector.fromAngle(angle, Math.abs(sin(aModAngle)) * maxEffR));
    if (
      a === 0 ||
      a == floor(steps / 4) ||
      a == floor(steps / 2) ||
      a == floor((steps * 3) / 4)
    ) {
      line(canvasCenter.x, canvasCenter.y, pos.x, pos.y);
      continue;
    }
    let chosenCorner;
    if (a < floor(steps / 4)) {
      chosenCorner = bottomRightCorner;
    } else if (a < floor(steps / 2)) {
      chosenCorner = bottomLeftCorner;
    } else if (a < floor((steps * 3) / 4)) {
      chosenCorner = topLeftCorner;
    } else {
      chosenCorner = topRightCorner;
    }
    let points = [chosenCorner, pos, canvasCenter];
    beginShape();
    points.forEach((p) => {
      vertex(p.x, p.y);
    });
    endShape();
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
