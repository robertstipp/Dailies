let aspectRatio = 1;

let colors = ["red", "blue", "yellow"];
let e, g;
let ringsArr = [];
let cols = 16;
let rows = 16;
let cellH, cellW, margin, effW;
let myCells = [];

function setup() {
  createCanvas(1080, 1080, SVG);
  background("rect");
  e = new p5.Ease();
  g = new p5.Gen();
  noFill();
  noLoop();
}

function draw() {
  margin = 100;
  effW = width - 2 * margin;
  effH = height - 2 * margin;
  cellW = effW / cols;
  cellH = cellW;
  let x0 = margin + cellW / 2;
  let y0 = margin + cellH / 2;
  // ellipse(x0, y0, cellW, cellH);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = margin + i * cellW;
      let y = margin + j * cellH;

      // rect(x, y, cellW, cellH);
      myCells.push(new Cell(x, y, cellW, cellH, i, j));
    }
  }
  myCells.forEach((c) => {
    c.drawCells();
    c.subFillCount();

    // c.drawSubCells();
  });
}

class Cell {
  constructor(x, y, w, h, i, j) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.i = i;
    this.j = j;
    this.subCells = Math.floor(Math.abs(this.i - this.j));
  }

  drawEdges(i, j, x, y, w, h, clr) {
    let corners = [];
    corners.push(createVector(x, y));
    corners.push(createVector(x + w, y));
    corners.push(createVector(x + w, y + h));
    corners.push(createVector(x, y + h));
    if (i === 0) {
      push();
      stroke(clr);

      line(corners[0].x, corners[0].y, corners[3].x, corners[3].y);
      pop();
    }
    if (i === 3) {
      push();
      stroke(clr);

      line(corners[1].x, corners[1].y, corners[2].x, corners[2].y);
      pop();
    }

    if (j === 0) {
      push();
      stroke(clr);

      line(corners[0].x, corners[0].y, corners[1].x, corners[1].y);
      pop();
    }
    if (j === 3) {
      push();
      stroke(clr);

      line(corners[2].x, corners[2].y, corners[3].x, corners[3].y);
      pop();
    }
  }

  drawCells() {
    push();
    noFill();
    stroke("red");
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  drawSubCells() {
    let rows = 3;
    let cols = 3;
    let cellW = this.w / cols;
    let cellH = this.h / rows;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = this.x + i * cellW;
        let y = this.y + j * cellH;

        rect(x, y, cellW, cellH);
      }
    }
  }

  subFillCount() {
    let rows = 4;
    let cols = 4;
    let cellW = this.w / cols;
    let cellH = this.h / rows;
    let startCount = this.subCells;
    fill("red");
    stroke("red");
    while (startCount > 0) {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (startCount == 0) {
            fill("white");
            stroke("white");
          }
          let x = this.x + i * cellW;
          let y = this.y + j * cellH;
          rect(x, y, cellW, cellH);
          if (startCount > 0) {
            this.drawEdges(i, j, x, y, cellW, cellH, "white");
          }

          startCount--;
        }
      }
    }
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}
