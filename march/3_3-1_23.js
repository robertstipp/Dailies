let a = Math.random() * 6 - 3;
let b = Math.random() * 6 - 3;
let c = Math.random() * 6 - 3;
let d = Math.random() * 6 - 3;

// a = 1.4;
// b = 1.56;
// c = 1.4;
// d = -6.56;

let x = 0.1;
let y = 0.1;

let xNext, yNext;
let xScreen, yScreen;
let xScreenPrev, yScreenPrev;

let grid = [];

let startAngle = Math.random() * 360;

let totalLoops = 0;
let loopsPerFrame = 1000;
let frames = 20;

function setup() {
  createCanvas(800, 800);
  background(0);
  // noLoop();
  grid = Array(width)
    .fill()
    .map(() => Array(height).fill(0));

  colorMode(HSB);
  // noLoop();
}
function draw() {
  for (let i = 0; i < 8000; i++) {
    xNext = d * sin(a * x) - sin(y * b);
    yNext = c * cos(x * a) + cos(y * b);
    xScreenPrev = map(x, -4, 4, 0, width - 1, true);
    yScreenPrev = map(y, -4, 4, 0, height - 1, true);
    x = xNext;
    y = yNext;

    xScreen = round(map(x, -4, 4, 0, width - 1, true));
    yScreen = round(map(y, -4, 4, 0, height - 1, true));

    grid[xScreen][yScreen] += 0.1;
    let colorAngle = constrain(grid[xScreen][yScreen], 0, 360);
    stroke((colorAngle + startAngle) % 360, 100, 100, 0.001);
    if (x !== 0.1 && y !== 0.1) {
      let curr = createVector(xScreen, yScreen);
      let prev = createVector(xScreenPrev, yScreenPrev);
      let diff = p5.Vector.sub(curr, prev);
      let distance = diff.mag();
      let angle = diff.heading();
      let mapD = constrain(map(distance, 0, 800, 0, 360), 0, 360);
      let mapA = map(angle, -PI, PI, 0, 100);

      stroke(mapD % 360, 100, 100, 0.1);
      point(xScreenPrev, yScreenPrev);

      // line(xScreenPrev, yScreenPrev, xScreen, yScreen);
    }

    // point(xScreen, yScreen);
  }
  textSize(10);
  fill(0);
  noStroke();
  rect(0, 0, 200, 50);
  fill(255);
  text(`Points: ${(frameCount * loopsPerFrame) / 1_000_000}million`, 10, 30);
  text(`A: ${a.toFixed(4)}`, 10, 40);
  text(`B: ${b.toFixed(4)}`, 10, 50);
  text(`C: ${c.toFixed(4)}`, 10, 60);
  text(`D: ${d.toFixed(4)}`, 10, 70);
}

function keyPressed() {
  if (key == "s") {
    let title = `A: ${a.toFixed(4)}, B: ${b.toFixed(4)}, C: ${c.toFixed(
      4
    )}, D: ${d.toFixed(4)}`;
    save(title + ".png");
  }
}
