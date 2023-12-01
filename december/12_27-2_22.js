let spacing = 1;
let resolution = 0.001;
let grid;
let simplexNoise;
let len = 10;

const pelletPallete = [
  "#54478c",
  "#2c699a",
  "#048ba8",
  "#0db39e",
  "#16db93",
  "#83e377",
  "#b9e769",
  "#efea5a",
  "#f1c453",
  "#f29e4c",
];
const capsulePallete = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];
function setup() {
  pixelDensity(4);
  createCanvas(1080, 1080);

  simplexNoise = new openSimplexNoise(Date.now());
  w = width / spacing;
  h = height / spacing;
  background(0);
  stroke(255);
  simplexNoise = new openSimplexNoise(Date.now());

  grid = new Grid(1080, 1080);
  background("#f2e9e4");
  grid.init();

  let origin = createVector(width / 2, height / 2);
  let pillWidth = 500;
  let direction = 0;

  for (let i = 0; i < 200; i++) {
    let pos = origin
      .copy()
      .add(p5.Vector.fromAngle(random(PI, TAU), random(0, pillWidth / 2.4)));
    flowLine(pos);
  }

  brokenPill(origin, pillWidth, direction);
  fill("#f2e9e4");
  noStroke();
  border(20);
}

function brokenPill(origin, width, direction) {
  let breakAngle = PI / 3;
  let splitRadius = width / 2.5;
  let diameter1 = width / 2;
  let diameter2 = diameter1 * 0.96;
  let rightOrigin = origin
    .copy()
    .add(p5.Vector.fromAngle(direction - breakAngle, splitRadius));

  let leftOrigin = origin
    .copy()
    .add(p5.Vector.fromAngle(direction + breakAngle, -splitRadius));
  fill("black");

  let leftStartTop = leftOrigin
    .copy()
    .add(p5.Vector.fromAngle(direction + breakAngle - PI / 2, diameter1 / 2));

  let leftStartBottom = leftOrigin
    .copy()
    .add(p5.Vector.fromAngle(direction + breakAngle - PI / 2, -diameter1 / 2));

  let leftArcOrigin = origin
    .copy()
    .add(p5.Vector.fromAngle(direction + breakAngle, -width));

  let leftStartAngle = direction + breakAngle + PI / 2;
  let leftEndAngle = direction + breakAngle + PI + PI / 2;

  let leftPoints = [];
  leftPoints.push(leftStartBottom);
  for (let a = leftStartAngle; a <= leftEndAngle; a += 0.1) {
    let pos = leftArcOrigin.copy().add(p5.Vector.fromAngle(a, diameter1 / 2));
    leftPoints.push(pos);
  }
  leftPoints.push(leftStartTop);

  let rightStartTop = rightOrigin
    .copy()
    .add(p5.Vector.fromAngle(direction - breakAngle + PI / 2, -diameter2 / 2));

  let rightStartBottom = rightOrigin
    .copy()
    .add(p5.Vector.fromAngle(direction - breakAngle + PI / 2, diameter2 / 2));

  let rightArcOrigin = origin
    .copy()
    .add(p5.Vector.fromAngle(direction - breakAngle, width));

  let rightStartAngle = direction - breakAngle - PI / 2;
  let rightEndAngle = direction - breakAngle + PI / 2;

  let rightPoints = [];
  rightPoints.push(rightStartTop);
  for (let a = rightStartAngle; a <= rightEndAngle; a += 0.1) {
    let pos = rightArcOrigin.copy().add(p5.Vector.fromAngle(a, diameter2 / 2));

    rightPoints.push(pos);
    // break;
  }
  rightPoints.push(rightStartBottom);

  strokeWeight(3);
  stroke(0);
  strokeJoin(ROUND);
  fill(random(capsulePallete));
  beginShape();
  leftPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
  fill(random(capsulePallete));
  beginShape();
  rightPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
}

class Grid {
  constructor(width, height) {
    this.rows = height / spacing + 8;
    this.cols = width / spacing + 8;
    this.grid = [];
  }

  init() {
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new Cell(i, j));
      }
      this.grid.push(row);
    }
  }

  display() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let cell = this.grid[i][j];
        push();
        translate(cell.x, cell.y);
        rotate(cell.angle);
        line(0, 0, len, 0);
        pop();
      }
    }
  }
}

class Cell {
  constructor(x, y) {
    let startX = -spacing * 8;
    let startY = -spacing * 8;
    this.x = x * spacing + startX;
    this.y = y * spacing + startY;
    let d = dist(this.x, this.y, width / 2, height / 2);
    let maxD = dist(0, 0, width / 2, height / 2);

    let lowBound = map(d, 0, maxD, PI / 4, -PI / 2);

    let upperBound = map(d, 0, maxD, PI - PI / 4, (3 * PI) / 2);

    this.angle = map(
      simplexNoise.noise3D(this.x * resolution, this.y * resolution, d * 0.001),
      -1,
      1,
      0,
      PI
    );
  }
}

function flowLine(origin) {
  let startRow = floor(origin.x / spacing);
  let startCol = floor(origin.y / spacing);
  startingPoint = grid.grid[startRow][startCol];

  let curX = startingPoint.x;
  let curY = startingPoint.y;
  let curAngle = startingPoint.angle;

  beginShape();

  for (let t = 0; t < 200; t++) {
    let nextX = curX + cos(curAngle) * len;
    let nextY = curY + sin(curAngle) * len;

    let nextRow = floor(nextX / spacing);
    let nextCol = floor(nextY / spacing);
    if (
      nextRow <= 0 ||
      nextRow >= grid.rows ||
      nextCol <= 0 ||
      nextCol >= grid.cols
    ) {
      break;
    }
    let nextCell = grid.grid[nextRow][nextCol];
    let nextAngle = nextCell.angle;

    let angleDiff = nextAngle - curAngle;
    curAngle += angleDiff * 0.5;

    if (curX < 1 && nextY < 1) break;
    if (t % Math.floor(random(10, 20)) === 0)
      pill(createVector(curX, curY), 50, curAngle, true);

    curX = nextX;
    curY = nextY;
  }
  endShape();
}

function pill(center, width, direction, subPill) {
  let diameter1 = width / 2;
  let diameter2 = diameter1 * 0.96;

  let leftBottom = center
    .copy()
    .add(p5.Vector.fromAngle(direction + PI / 2, +diameter1 / 2));

  let leftTop = center
    .copy()
    .add(p5.Vector.fromAngle(direction - PI / 2, diameter1 / 2));

  let leftCenter = center
    .copy()
    .add(p5.Vector.fromAngle(direction, -width / 2));

  let leftendAngle = direction + PI / 2;
  let leftstart = direction - PI / 2;

  let leftPoints = [];

  leftPoints.push(leftBottom);
  for (let a = leftstart; a <= leftendAngle; a += 0.1) {
    let pos = leftCenter.copy().add(p5.Vector.fromAngle(a, -diameter1 / 2));
    leftPoints.push(pos);
  }

  let rightCenter = center
    .copy()
    .add(p5.Vector.fromAngle(direction, width / 2));

  let rightTop = center
    .copy()
    .add(p5.Vector.fromAngle(direction + PI / 2, -diameter2 / 2));

  let rightBottom = center
    .copy()
    .add(p5.Vector.fromAngle(direction - PI / 2, -diameter2 / 2));

  let rightendAngle = direction + PI / 2;
  let rightstartAngle = direction - PI / 2;

  let rightPoints = [];
  rightPoints.push(rightTop);
  for (let a = rightstartAngle; a <= rightendAngle; a += 0.1) {
    let pos = rightCenter.copy().add(p5.Vector.fromAngle(a, diameter2 / 2));
    rightPoints.push(pos);
  }
  rightPoints.push(rightBottom);

  // full range X (Parallel to Direction)

  let leftMax = center
    .copy()
    .add(p5.Vector.fromAngle(direction, -width / 2 - diameter1 / 2));

  let rightMax = center
    .copy()
    .add(p5.Vector.fromAngle(direction, width / 2 + diameter2 / 2));

  // fullRangeY (Perpendicular to Direction)
  let topMax = center
    .copy()
    .add(p5.Vector.fromAngle(direction - PI / 2, (diameter1 / 2) * 0.85));

  let bottomMax = center
    .copy()
    .add(p5.Vector.fromAngle(direction + PI / 2, (diameter1 / 2) * 0.85));

  let topMax2 = center
    .copy()
    .add(p5.Vector.fromAngle(direction - PI / 2, (diameter2 / 2) * 0.85));

  let bottomMax2 = center
    .copy()
    .add(p5.Vector.fromAngle(direction + PI / 2, (diameter2 / 2) * 0.85));

  // randomPoint

  if (!subPill) {
    for (let i = 0; i < 3000; i++) {
      let randomPoint = createVector(
        random(leftMax.x, rightMax.x),
        random(topMax.y, bottomMax2.y)
      );
      let valid = false;
      // filter points inside the pill

      // left side
      // left arc
      stroke("white");
      if (randomPoint.x < leftMax.x + diameter1 / 2) {
        let d = dist(randomPoint.x, randomPoint.y, leftCenter.x, leftCenter.y);
        if (d < (diameter1 / 2) * 0.85) {
          valid = true;
          // ellipse(randomPoint.x, randomPoint.y, 10, 10);
        }
      }

      if (
        randomPoint.x > leftMax.x + diameter1 / 2 &&
        randomPoint.x < center.x
      ) {
        if (randomPoint.y > topMax.y && randomPoint.y < bottomMax.y) {
          valid = true;
          // ellipse(randomPoint.x, randomPoint.y, 10, 10);
        }
      }

      // right side
      if (
        randomPoint.x > center.x &&
        randomPoint.x < rightMax.x - diameter2 / 2
      ) {
        if (randomPoint.y > topMax2.y && randomPoint.y < bottomMax.y) {
          valid = true;
        }
      }

      if (randomPoint.x > rightMax.x - diameter2 / 2) {
        let d = dist(
          randomPoint.x,
          randomPoint.y,
          rightCenter.x,
          rightCenter.y
        );
        if (d < (diameter2 / 2) * 0.85) {
          valid = true;
          // ellipse(randomPoint.x, randomPoint.y, 10, 10);
        }
      }

      if (valid) {
        fill(random(pelletPallete));
        console.log(randomPoint);
        pill(randomPoint, 50, random(0, TWO_PI), true);
        // ellipse(randomPoint.x, randomPoint.y, 10, 10);
      }
    }
  }
  let capsuleColor = color(random(capsulePallete));
  if (!subPill) {
    capsuleColor.setAlpha(200);
  }

  fill(capsuleColor);
  stroke("black");

  strokeWeight(4);
  if (subPill) strokeWeight(2);

  strokeJoin(MITER);
  leftPoints.push(leftTop);
  beginShape();
  leftPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
  noFill();

  if (subPill) fill("#f2e9e4");
  beginShape();
  rightPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);

  // smile
  if (subPill) return;
  let eyeWidth = diameter1 * 0.25;
  let eyeCenter = center.copy().add(p5.Vector.fromAngle(direction, -width / 3));
  let smileCenter = center
    .copy()
    .add(p5.Vector.fromAngle(direction, -width / 4));
  noFill();

  strokeWeight(10);
  arc(
    smileCenter.x,
    smileCenter.y,
    eyeWidth,
    eyeWidth,
    direction - PI / 2,
    direction + PI / 2
  );
  noStroke();
  let pupilSizeW = eyeWidth * 1;
  let pupilSizeWHRatio = 1.3;
  let leftEye = eyeCenter
    .copy()
    .add(p5.Vector.fromAngle(direction - PI / 2, eyeWidth));
  let rightEye = eyeCenter
    .copy()
    .add(p5.Vector.fromAngle(direction + PI / 2, eyeWidth));
  push();
  fill("black");
  ellipse(
    leftEye.x,
    leftEye.y,
    pupilSizeW,
    (pupilSizeW * 1) / pupilSizeWHRatio
  );
  ellipse(
    rightEye.x,
    rightEye.y,
    pupilSizeW,
    (pupilSizeW * 1) / pupilSizeWHRatio
  );
  pop();
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_27_22.jpeg");
  }
}

function border(margin) {
  rect(0, 0, width, margin);
  rect(0, 0, margin, height);
  rect(width - margin, 0, margin, height);
  rect(0, height - margin, width, margin);
}
