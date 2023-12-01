const width = 600;
const height = 600;
const resolution = 600 * 0.05;
const rows = height / resolution;
const cols = width / resolution;

const grid = [];

const colors = ["#d25565", "#f0b775", "#f0b775", "#2e94b9"];
function setup() {
  createCanvas(600, 600);
  background(0);
  noStroke();
  noFill();
  for (let i = 0; i <= cols; i++) {
    let row = [];
    for (let j = 0; j <= rows; j++) {
      let angle = noise(i / 100, j / 100) * TAU;
      row.push(angle);
    }
    grid.push(row);
  }

  let origin = createVector(300, 300);
  for (let i = 0; i < 5000; i++) {
    // Select Starting Point
    let x = random(width);
    let y = random(height);

    let cIndex = Math.floor(map(y, 0, height, 0, colors.length));
    let c = color(colors[cIndex]);
    c.setAlpha(50);
    beginShape();
    strokeWeight(noise(x, y) * 5);
    stroke(c);
    for (let n = 0; n < 1000; n++) {
      let d = dist(x, y, origin.x, origin.y);
      if (d < 100) continue;

      vertex(x, y);
      let rowIndex = Math.floor(x / resolution);
      let colIndex = Math.floor(y / resolution);

      if (colIndex >= grid.length || colIndex < 0) break;
      if (rowIndex >= grid[0].length || rowIndex < 0) break;
      let gridAngle = grid[colIndex][rowIndex];
      let xStep = resolution * Math.cos(2 * gridAngle);
      let yStep = resolution * Math.sin(gridAngle);

      x += xStep;
      y += yStep;
      if (random() < 0.2) {
        endShape();
        beginShape();
      }
    }

    endShape();
  }
  blendMode(MULTIPLY);
}
function draw() {}
