let cols = 30;
let rows = 30;

let cellW, cellH;

let grid = [];

let noiseScale = 0.01;

let t = 0;

// let colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];
const colors = [
  "#f72585",
  "#b5179e",
  "#7209b7",
  "#560bad",
  "#480ca8",
  "#3a0ca3",
  "#3f37c9",
  "#4361ee",
  "#4895ef",
  " #4cc9f0",
];
let shapes = [rect1, rect2, circle1, circle2];

function setup() {
  createCanvas(600, 600);
  background(0);
  noStroke();
  rectMode(CENTER);
  // Define Grid
  cellW = width / cols;
  cellH = height / rows;

  for (let x = 0; x <= width; x += cellW) {
    for (let y = 0; y <= height; y += cellH) {
      grid.push(new Cell(x, y));
    }
  }
}
function draw() {
  background(0);
  // grid.forEach((c) => c.show());

  drawHexagon(300, 300, 10, 6);
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    let noiseVal = noise(this.x * noiseScale, this.y * noiseScale, t / 100);
    let colorIndex = Math.floor(map(noiseVal, 0, 1, 0, colors.length));
    let shapeIndex = Math.floor(map(noiseVal, 0, 1, 0, shapes.length));

    fill(colors[colorIndex]);
    shapes[shapeIndex](this.x, this.y);
    // ellipse(this.x, this.y, cellW, cellH);
  }
}

function rect1(x, y) {
  rect(x, y, 5);
}

function rect2(x, y) {
  rect(x, y, 20);
}

function circle1(x, y) {
  ellipse(x, y, 10);
}

function circle2(x, y) {
  ellipse(x, y, 20);
}

function drawHexagon(centerX, centerY, radius, numSides) {
  beginShape();
  for (let a = 0; a < TAU; a += TAU / numSides) {
    let x = centerX + radius * Math.cos(a);
    let y = centerX + radius * Math.sin(a);
    vertex(x, y);
  }

  endShape(CLOSE);
}
