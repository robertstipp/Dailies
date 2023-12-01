let points = [];
let phyloPoints = [];
let midX;
let midY;
let distLimit;
const colors = ["#DC0000", "#FFF"];
let simplexNoise;

function setup() {
  createCanvas(1080, 1080);
  background(0);
  stroke(255);
  midX = width / 2;
  midY = height / 2;
  distLimit = width / 3;
  simplexNoise = new openSimplexNoise(Date.now());
  phylotalix(midX, midY, distLimit);
  noLoop();
}

function draw() {
  // circlePoints(width / 2, height / 2, 500);
  for (let i = 0; i < phyloPoints.length; i++) {
    let [x, y] = [phyloPoints[i].x, phyloPoints[i].y];
    flowLine(x, y, 100, 1000, width / 2);
  }
  // phylotalix(width / 2, height / 2);
}

function flowLine(x, y, steps, resolution, distLimit) {
  let curX = x;
  let curY = y;

  for (let i = 0; i < steps; i++) {
    let angle = map(
      simplexNoise.noise2D(curX / resolution, curY / resolution),
      0,
      1,
      0,
      4 * PI
    );
    let len = 0.3;
    let newX = curX + cos(angle * 10) * len;
    let newY = curY + sin(angle * 1) * len;

    let d = dist(midX, midY, newX, newY);
    if (d > distLimit) break;
    let sw = map(angle, 0, 5 * PI, 2, 3);

    strokeWeight(sw);

    line(curX, curY, newX, newY);
    // glowLines(curX, curY, newX, newY);
    curX = newX;
    curY = newY;
  }
}

function circlePoints(x, y, r) {
  for (let rad = 0; rad < r; rad += 100) {
    for (let a = 0; a < TAU; a += 0.05) {
      let xPos = x + cos(a) * rad;
      let yPos = y + sin(a) * rad;
      fill(255);
      points.push(createVector(xPos, yPos));
      ellipse(xPos, yPos, 1, 1);
    }
  }
}

function phylotalix(xOrigin, yOrigin, distLimit) {
  for (let n = 0; n < 2500; n++) {
    let angle = n * radians(137.5);

    let r = Math.pow(n, 0.75) * 1;
    let x = xOrigin + r * cos(angle);
    let y = yOrigin + r * sin(angle);

    phyloPoints.push(createVector(x, y));
    // ellipse(x, y, 4, 4);
  }
}

function glowLines(x1, y1, x2, y2) {
  const darkColor = colors[0];
  const lightColor = colors[1];
  const white = colors[2];

  stroke(darkColor);
  strokeWeight(2);
  line(x1, y1, x2, y2);
  stroke(lightColor);
  strokeWeight(1);
  line(x1, y1, x2, y2);
  stroke(white);
  strokeWeight(1);
  line(x1, y1, x2, y2);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_17_22.jpeg");
  }
}
