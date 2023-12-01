let a = Math.random() * 6 - 3;
let b = Math.random() * 6 - 3;
let c = Math.random() * 6 - 3;
let d = Math.random() * 6 - 3;

let x = 0.1;
let y = 0.1;

let xNext, yNext;
let xScreen, yScreen;

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
}
function draw() {
  for (let i = 0; i < loopsPerFrame; i++) {
    xNext = sin(a * y) - cos(b * x);
    yNext = sin(c * x) - cos(d * y);

    x = xNext;
    y = yNext;

    xScreen = round(map(x, -2, 2, 0, width - 1, true));
    yScreen = round(map(y, -2, 2, 0, height - 1, true));

    grid[xScreen][yScreen] += 1;
    let colorAngle = constrain(grid[xScreen][yScreen], 0, 30);

    stroke((colorAngle + startAngle) % 360, 100, 100, 0.1);
    point(map(x, -2, 2, 0, width), map(y, -2, 2, 0, height));
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
