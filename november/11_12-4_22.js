const colors = ["#3d5a80", "#98c1d9", "#ee6c4d", "#293241"];

function setup() {
  createCanvas(600, 600);
  pixelDensity(2);
  background("#fff9e0");
  rectMode(CENTER);
  // rect(300, 300, 100, 100, 20, 0, 0, 0);
  const grid = new Grid(100, 500, 100, 600);
  console.log(grid);
  grid.cells.forEach((cell) => cell.display());
}

function draw() {}

class Grid {
  constructor(startX, stopX, startY, stopY) {
    this.cells = [];

    let size = 100;
    for (let x = startX; x <= stopX; x += 120) {
      for (let y = startY; y <= stopY; y += 120) {
        let shape = "M";

        if (x === startX && y === startY) {
          shape = "TL";
        }
        if (x === stopX && y === stopY) {
          shape = "BR";
        }
        if (x === stopX && y === startY) {
          shape = "TR";
        }
        if (x === startX && y === stopY) {
          shape = "BL";
        }

        if (x === startX && y !== startY && y !== stopY) {
          shape = "L";
        }
        if (x === stopX && y !== startY && y !== stopY) {
          shape = "R";
        }
        if (x !== startX && x !== stopX && y === startY) {
          shape = "T";
        }
        if (x !== startX && x !== stopX && y === stopY) {
          shape = "B";
        }

        this.cells.push(new Cell(x, y, size, 15, shape));
      }
    }
  }
}

class Cell {
  constructor(xPos, yPos, size, edgeRadius, shape) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.shape = shape;
    this.edgeRadius = edgeRadius;
    this.c = random(colors);
  }

  display() {
    noStroke();
    fill(this.c);
    if (this.shape === "TL") {
      rect(
        this.xPos,
        this.yPos,
        this.size,
        this.size,
        this.edgeRadius,
        0,
        this.edgeRadius,
        0
      );
    }
    if (this.shape === "BL") {
      rect(
        this.xPos,
        this.yPos,
        this.size,
        this.size,
        0,
        this.edgeRadius,
        0,
        this.edgeRadius
      );
    }
    if (this.shape === "TR") {
      rect(
        this.xPos,
        this.yPos,
        this.size,
        this.size,
        0,
        this.edgeRadius,
        0,
        this.edgeRadius
      );
    }
    if (this.shape === "BR") {
      rect(
        this.xPos,
        this.yPos,
        this.size,
        this.size,
        this.edgeRadius,
        0,
        this.edgeRadius,
        0
      );
    }
    if (this.shape === "T") {
      rect(
        this.xPos,
        this.yPos,
        this.size,
        this.size,
        0,
        0,
        this.edgeRadius,
        this.edgeRadius
      );
    }
    if (this.shape === "L") {
      rect(
        this.xPos,
        this.yPos,
        this.size,
        this.size,
        0,
        this.edgeRadius,
        this.edgeRadius,
        0
      );
    }
    if (this.shape === "R") {
      rect(
        this.xPos,
        this.yPos,
        this.size,
        this.size,
        this.edgeRadius,
        0,
        0,
        this.edgeRadius
      );
    }
    if (this.shape === "B") {
      rect(
        this.xPos,
        this.yPos,
        this.size,
        this.size,
        this.edgeRadius,
        this.edgeRadius,
        0,
        0
      );
    }
    if (this.shape === "M") {
      rect(this.xPos, this.yPos, this.size, this.size, 0, 0, 0, 0);
    }
  }
}
