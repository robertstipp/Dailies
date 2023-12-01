let spacing = 10;
let resolution = 0.001;
let grid;
let simplexNoise;
let len = 1;

const colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];

function setup() {
  pixelDensity(4);
  createCanvas(1080, 1080);
  simplexNoise = new openSimplexNoise(Date.now());

  grid = new Grid(1080, 1080);
  background("#f2e9e4");
  grid.init();
  // grid.display();
  // for (let i = 0; i < 100; i++) {
  //   push();
  //   noFill();

  //   flowLine();
  //   pop();
  // }

  for (let x = 0; x < width; x += 100) {
    for (let y = 0; y < height; y += 100) {
      push();
      translate(x, y);

      pill(0, 0, 300, 0, false);
      pop();
    }
  }
  fill("#f2e9e4");
  noStroke();
  border(20);
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
    this.angle = map(
      simplexNoise.noise3D(this.x * resolution, this.y * resolution, d * 0.001),
      -1,
      1,
      0,
      TAU
    );
  }
}

function flowLine() {
  let startingPoint = random(random(grid.grid));

  let curX = startingPoint.x;
  let curY = startingPoint.y;
  let curAngle = startingPoint.angle;

  beginShape();

  for (let t = 0; t < 1000; t++) {
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
    if (t % 200 === 0) {
      push();
      translate(curX, curY);
      rotate(curAngle);
      if (curX == 0 || curY == 0) {
        break;
      }
      pill(
        createVector(0, 0),
        map(
          p5.Vector.dist(
            createVector(curX, curY),
            createVector(width / 2, height / 2)
          ),
          0,
          width,
          100,
          50
        )
      );

      pop();
    }

    curX = nextX;
    curY = nextY;
  }
  endShape();
}

function pill(center, pillWidth) {
  let diameter1 = pillWidth / 2;
  let diameter2 = diameter1 * 0.96;
  let ratioLR = random(0.5, 1.5);
  strokeJoin(ROUND);
  strokeWeight(2);
  stroke(0);

  // left Points
  let leftPoints = [];
  let leftTop = createVector(center.x, center.y - diameter1 / 2);
  let leftBottom = createVector(center.x, center.y + diameter1 / 2);

  let leftArcOrigin = createVector(
    center.x - (pillWidth / 2) * ratioLR,
    center.y
  );
  let leftAngleStart = PI / 2;
  let leftAngleStop = PI + PI / 2;
  leftPoints.push(leftBottom);
  for (let a = leftAngleStart; a <= leftAngleStop; a += 0.01) {
    let pos = leftArcOrigin.copy().add(p5.Vector.fromAngle(a, diameter1 / 2));
    leftPoints.push(pos);
  }
  leftPoints.push(leftTop);
  fill("#f2e9e4");
  beginShape();
  leftPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);

  // right Points
  let rightPoints = [];
  let rightTop = createVector(center.x, center.y - diameter2 / 2);
  let rightBottom = createVector(center.x, center.y + diameter2 / 2);

  let rightArcOrigin = createVector(
    center.x + ((pillWidth / 2) * 1) / ratioLR,
    center.y
  );
  let rightAngleStart = -PI / 2;
  let rightAngleStop = PI / 2;
  rightPoints.push(rightTop);
  for (let a = rightAngleStart; a <= rightAngleStop; a += 0.01) {
    let pos = rightArcOrigin.copy().add(p5.Vector.fromAngle(a, diameter2 / 2));
    rightPoints.push(pos);
  }
  rightPoints.push(rightBottom);
  fill(random(colors));
  beginShape();
  rightPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_25_22.jpeg");
  }
}

function border(margin) {
  rect(0, 0, width, margin);
  rect(0, 0, margin, height);
  rect(width - margin, 0, margin, height);
  rect(0, height - margin, width, margin);
}
