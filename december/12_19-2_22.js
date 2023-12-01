let simplexNoise;

let maxSteps = 40;
let stepRes = 1.1;
let cols = 10;
let rows = 10;
function setup() {
  createCanvas(1080, 1080);
  background(0);
  fill("red");

  let midX = width / 2;
  let midY = height / 2;

  let w = (width - 100) / cols;
  let h = (height - 100) / rows;
  noFill();
  stroke(255);
  strokeWeight(1);
  rectMode(CENTER);

  let start = createVector(100, 100);
  let end = createVector(width - 50, height - 50);
  let source = createVector(random(width), random(height));
  let maxDist = dist(start.x, start.y, end.x, end.y);
  let minDist = 0;
  for (let x = start.x; x <= end.x; x += w) {
    for (let y = start.y; y <= end.y; y += h) {
      let distSteps = map(
        dist(x, y, start.x, start.y),
        minDist,
        maxDist,
        0,
        maxSteps
      );

      let noiseSteps = map(noise(x, y), 0, 1, 0, maxSteps);

      recursiveRect(x, y, w, h, distSteps);
    }
  }
}

function recursiveRect(x, y, w, h, depth) {
  if (depth < 1) return;

  rect(x, y, w, h);

  recursiveRect(x, y, w / stepRes, h / stepRes, depth - 1);
}
