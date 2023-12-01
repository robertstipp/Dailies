let cols = 27;
let rows = 36;
let grid = [];
let grid2 = [];
let cellW, cellH, effW, effH;
let cellR;
let margin = 100;
let simplexNoise;
let colors = ["red", "green", "orange"];

function setup() {
  pixelDensity(1);
  createCanvas(869, 1152, SVG);
  noFill();
  noLoop();
  simplexNoise = new openSimplexNoise(Date.now());
  cellW = (width - margin * 2) / cols;
  cellH = (height - margin * 2) / rows;
  cellR = Math.sqrt((cellW * cellW) / 2 + (cellH * cellH) / 2) * 0.6;
  randomSeed(200);
}

function draw() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = margin + i * cellW;
      let y = margin + j * cellH;
      grid.push(new Cell(i, j, x, y));

      grid2.push(new Cell(i, j, x + cellW / 2, y + cellH / 2));
      // let steps = Math.floor(map(simplexNoise.noise2D(i, j), -1, 1, 0, 10));
      // let rMax = cellR;
      // for (let k = 0; k < steps; k++) {
      //   let rEff = map(k, 0, steps, 0, rMax);
      //   ellipse(x, y, rEff, rEff);
      // }
    }
  }

  grid.forEach((cell) => {
    // cell.drawWaves();
    cell.drawCircles();
  });
  grid2.forEach((cell) => {
    cell.drawCircles();
  });
}

class Cell {
  constructor(i, j, x, y) {
    this.i = i;
    this.j = j;
    this.x = x;
    this.y = y;
    this.steps = 8;
    this.prob = Array(this.steps)
      .fill(0)
      .map(() => {
        let angle = map(this.i, 0, cols, 0, TWO_PI);
        let d = dist(this.i, this.j, cols / 2, rows / 2);
        let angleOffset = map(d, 0, cols / 2, 0, 10 * TWO_PI);
        return map(sin(angle + angleOffset), -1, 1, 0, 1);
      });
    console.log(this.prob);
  }

  drawWaves() {
    let w = cellW;
    let h = cellH;
    let start = createVector(this.x - w / 2, this.y - h / 2);
    let end = createVector(this.x + w / 2, this.y + h / 2);
    let scale = 2;
    line(start.x, start.y + h / scale, start.x + w / scale, start.y);
    line(end.x - w / scale, start.y, end.x, start.y + h / scale);
    line(start.x, end.y - h / scale, start.x + w / scale, end.y);
    line(end.x - w / scale, end.y, end.x, end.y - h / scale);
  }

  drawCircles() {
    let rMax = cellR;

    for (let k = 0; k < this.steps; k++) {
      if (random() > this.prob[k]) {
        stroke(colors[0]);
      } else {
        stroke(colors[1]);
      }
      let rEff = map(k, 0, this.steps - 1, 0, rMax);
      ellipse(this.x, this.y, rEff, rEff);
    }
  }
}
