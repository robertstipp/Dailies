const grid = [];

function setup() {
  pixelDensity(8);
  createCanvas(400, 400);
  noLoop();
  noFill();
  rectMode(CENTER);

  // for (let x = 0; x < width; x++) {
  //   let col = [];
  //   for (let y = 0; y < height; y++) {
  //     noStroke();
  //     let noiseVal = noise(x * 0.01, y * 0.01);
  //     let c;

  //     if (noiseVal < 0.2) {
  //       c = color(255, 0, 0);
  //     } else if (noiseVal < 0.4) {
  //       c = color(0, 255, 0);
  //     } else if (noiseVal < 0.6) {
  //       c = color(0, 0, 255);
  //     } else if (noiseVal < 0.8) {
  //       c = color(255, 255, 0);
  //     } else {
  //       c = color(255, 0, 255);
  //     }
  //     stroke(c);
  //     point(x, y);
  //     col.push(new Cell(x, y, c));
  //   }
  //   grid.push(col);
  // }
  // console.log(grid);
  const grid = new Grid();
  grid.show();
  grid.smooth();
}

function draw() {}

class Grid {
  constructor() {
    this.grid = [];
    for (let x = 0; x < width; x++) {
      let col = [];
      for (let y = 0; y < height; y++) {
        noStroke();
        let noiseVal = noise(x * 0.01, y * 0.01);
        let c;

        if (noiseVal < 0.2) {
          c = color(255, 0, 0);
        } else if (noiseVal < 0.4) {
          c = color(0, 255, 0);
        } else if (noiseVal < 0.6) {
          c = color(0, 0, 255);
        } else if (noiseVal < 0.8) {
          c = color(255, 255, 0);
        } else {
          c = color(255, 0, 255);
        }

        col.push(new Cell(x, y, c));
      }
      this.grid.push(col);
    }
  }

  smooth() {
    for (let i = 0; i < this.grid.length - 1; i++) {
      let j = 0;
      let rightNeighbor = this.grid[i + 1][j];
      let bottomNeighbor = this.grid[i][j + 1];
      let centerCell = this.grid[i][j];
      this.grid[i][j] = averageColor(
        centerCell.c,
        rightNeighbor.c,
        bottomNeighbor.c
      );
    }
  }

  show() {
    this.grid.forEach((col) => {
      col.forEach((cell) => {
        const { x, y, c } = cell;
        stroke(c);
        point(x, y);
      });
    });
  }
}

class Cell {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
  }
}
function averageColor(c1, c2, c3) {
  const r = (c1.r + c2.r + c3.r) / 3;
  const g = (c1.g + c2.g + c3.g) / 3;
  const b = (c1.b + c2.b + c3.b) / 3;
  return color(r, g, b);
}
