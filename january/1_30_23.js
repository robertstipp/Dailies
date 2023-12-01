let margin = 100;
let effW, effH, cellW, cellH;
let aspectRadio = 869 / 1152;
let cols = 10;
let rows = Math.floor(cols / aspectRadio);
let grid = [];
function setup() {
  createCanvas(869, 1152, SVG);

  effW = width - 2 * margin;
  effH = height - 2 * margin;
  cellW = effW / cols;
  cellH = effH / rows;
  noFill();
  noLoop();
}
function draw() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = margin + i * cellW;
      let y = margin + j * cellH;
      let w = cellW;
      let h = cellH;
      let size = cellW * 0.9;
      let r = random(1);
      let shape = random(["circle", "arrow", "rect"]);
      let cell = new Cell(x, y, shape, size);
      grid.push(cell);
      // if (r < 0.5) {
      //   rectMode(CENTER);
      //   rect(x, y, size);
      // } else if (r < 0.75) {
      //   ellipse(x, y, size, size);
      // } else {
      //   let angles = [0, PI / 2, PI, (3 * PI) / 2];
      //   let angle = random(angles);
      //   arrow(createVector(x, y), angle, cellW * 0.7);
      // }
    }
  }
  grid.forEach((cell) => {
    if (cell.shape === "circle") cell.drawCircle();
  });
  grid.forEach((cell) => {
    if (cell.shape === "rect") cell.drawRect();
  });
  grid.forEach((cell) => {
    if (cell.shape === "arrow") cell.drawArrow();
  });
}

function arrow(origin, angle, size) {
  push();
  translate(origin.x, origin.y);
  rotate(angle);
  line(0, size / 2, 0, -size / 2);
  line(0, -size / 2, -size / 4, -5);
  line(0, -size / 2, size / 4, -5);
  pop();
}

class Cell {
  constructor(x, y, shape, size) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.size = size;
  }

  drawCircle() {
    ellipse(this.x, this.y, this.size, this.size);
  }
  drawRect() {
    rectMode(CENTER);
    rect(this.x, this.y, this.size);
  }
  drawArrow() {
    let angles = [0, PI / 2, PI, (3 * PI) / 2];
    let angle = random(angles);
    arrow(createVector(this.x, this.y), angle, this.size * 0.7);
  }
  drawStart() {}
}

function keyPressed() {
  if (key == "s") {
    save("2021-01-30.svg");
  }
}
