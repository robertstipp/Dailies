const colors = ["#042f4b", "#fff6da", "#fbc99d", "#ed1250"];

const gridW = 600;
const gridH = 600;
const rows = 10;
const cols = 10;
const cellW = gridW / cols;
const cellH = gridH / rows;

function setup() {
  createCanvas(600, 600);
  background(100);

  for (let x = 0; x < gridW; x += cellW) {
    for (let y = 0; y < gridH; y += cellH) {
      const xPos = x + cellW / 2;
      const yPos = y + cellH / 2;
      const radius = cellW / 3;
      const origin = createVector(xPos, yPos);
      pattern(origin, radius);
      // break;
    }
    // break;
  }
}

function draw() {}

function pattern(origin, radius) {
  let noiseRadius = noise(origin.x, origin.y) * radius;
  let angleStart = noise(origin.x / 100, origin.y / 100) * TAU;
  let xOff = cellW * random() < 0.5 ? -1 : 1;
  let yOff = cellH * random() < 0.5 ? -1 : 1;
  let c = random(colors);
  beginShape();
  stroke(c);
  for (let angle = angleStart; angle <= TAU + angleStart; angle += TAU / 5) {
    let x = origin.x + noiseRadius * Math.cos(angle);
    let y = origin.y + noiseRadius * Math.sin(angle);
    noFill();

    push();
    fill(c);
    noStroke();
    ellipse(x + xOff, y + yOff, noiseRadius);
    pop();
    vertex(x, y);
  }
  endShape(CLOSE);
}
