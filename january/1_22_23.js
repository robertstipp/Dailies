let cols = 20;
let rows = 25;
let cellW, cellH, effW, effH;
let margin = 100;

let grid = [];
function setup() {
  createCanvas(900, 1125, SVG);
  noFill();
  noLoop();

  effW = width - margin * 2;
  effH = height - 2 * margin;
  cellW = effW / cols;
  cellH = effH / rows;
  stroke(0);
}
function draw() {
  grid = new Grid(cols, rows);
  grid.init();
  grid.selectNeighbors();
  console.log(grid);
  grid.draw();
}

class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.grid = [];
  }

  init() {
    for (let i = 0; i < this.cols; i++) {
      let col = [];
      for (let j = 0; j < this.rows; j++) {
        col.push(new Cell(i, j));
      }
      this.grid.push(col);
    }
  }
  selectNeighbors() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].findNeighbors();
      }
    }
  }

  draw() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].draw();
        this.grid[i][j].drawCircs();
      }
    }

    // for (let i = 0; i < this.cols; i++) {
    //   for (let j = 0; j < this.rows; j++) {
    //     // this.grid[i][j].draw();
    //     this.grid[i][j].drawCircs();
    //   }
    // }
  }
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = margin + i * cellW;
    this.y = margin + j * cellH;
    this.corners = this.selectCorners();
    this.cornerOpts = [
      createVector(this.x - cellW / 2, this.y - cellH / 2),
      createVector(this.x + cellW / 2, this.y - cellH / 2),
      createVector(this.x + cellW / 2, this.y + cellH / 2),
      createVector(this.x - cellW / 2, this.y + cellH / 2),
    ];
    this.neighbors = [];
  }

  selectCorners() {
    let selected = [];

    for (let i = 0; i < 2; i++) {
      let k = floor(random(4));

      selected.push(k);
    }
    return selected;
  }

  findNeighbors() {
    let neighborOpts = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (let i = 0; i < neighborOpts.length; i++) {
      if (this.i + neighborOpts[i][0] < 0) continue;
      if (this.i + neighborOpts[i][0] >= cols) continue;
      if (this.j + neighborOpts[i][1] < 0) continue;
      if (this.j + neighborOpts[i][1] >= rows) continue;
      let neighbor =
        grid.grid[this.i + neighborOpts[i][0]][this.j + neighborOpts[i][1]];
      this.neighbors.push(neighbor);
    }
  }

  draw() {
    for (let i = 0; i < 4; i++) {
      let selectCorner = this.corners[0];
      if (this.corners.includes(i)) {
        let corner = this.cornerOpts[i];
        let startAngle = (i * PI) / 2;
        let endAngle = startAngle + PI / 2;
        arc(corner.x, corner.y, cellW, cellH, startAngle, endAngle);
        // line(this.x, this.y, this.x + cellW, this.y + cellH);
      } else {
        // let corner = this.cornerOpts[i];
        // if (random() < 1) {
        //   let start = createVector(this.x, this.y);
        //   let end = createVector(corner.x, corner.y);
        //   let pos = p5.Vector.lerp(start, end, 0.5);
        //   if (random() < 0.5) {
        //     ellipse(pos.x, pos.y, cellW / 4, cellH / 4);
        //   } else {
        //     line(start.x, start.y, end.x, end.y);
        //   }
        // }
      }
    }

    // ellipse(this.x + cellW / 2, this.y + cellH / 2, cellW / 4, cellH / 4);
    // rect(this.x, this.y, cellW, cellH);
  }
  drawCircs() {
    for (let i = 0; i < 4; i++) {
      let selectCorner = this.corners[0];
      if (this.corners.includes(i)) {
        let corner = this.cornerOpts[i];
        let startAngle = (i * PI) / 2;
        let endAngle = startAngle + PI / 2;
        // arc(corner.x, corner.y, cellW, cellH, startAngle, endAngle);
        // line(this.x, this.y, this.x + cellW, this.y + cellH);
      } else {
        let corner = this.cornerOpts[i];
        if (random() < 1) {
          let steps = 10;
          for (let i = 0; i < steps; i++) {
            let start = createVector(this.x, this.y);
            let step = i / steps;
            let end = createVector(corner.x, corner.y);
            let pos = p5.Vector.lerp(start, end, step);
            if (random() < 1) {
              ellipse(pos.x, pos.y, cellW / 10, cellH / 10);
            }
          }
        }
      }
    }
  }
}

function keyPressed() {
  if (key == "s") {
    save("1_21_23.svg");
  }
}
