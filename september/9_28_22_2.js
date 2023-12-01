function setup() {
  createCanvas(600, 600);
  grid = new SquareGrid();
}

function draw() {
  background(0);
  grid.display();
}

class Square {
  constructor(px, py, s) {
    this.positionX = px;
    this.positionY = py;
    this.curvature = 1;
    this.size = s;
    this.c = 0;
  }

  display() {
    strokeWeight(3);

    this.size = 20 + 14 * sin(this.positionY + this.positionX + millis() / 500);
    fill(
      127.5 +
        127.5 * cos(this.positionX + sin(millis() / 5000) + millis() / 500),
      127.5 +
        127.5 * sin(this.positionY + cos(millis() / 500) + millis() / 500),
      120.5
    );

    rect(
      this.positionX - this.size / 2,
      this.positionY - this.size / 2,
      this.size,
      this.size,
      this.curvature,
      this.curvature,
      this.curvature,
      this.curvature
    );
  }
}

class SquareGrid {
  constructor() {
    this.squares = [];
    this.gridWidth = 30;
    this.gridHeight = 40;
    this.squareSize = 20;
    this.spacing = 24;
    this.positionX = width / 2 - ((this.gridWidth - 1) * this.spacing) / 2;
    this.positionY = height / 2 - ((this.gridHeight - 1) * this.spacing) / 2;
    for (let i = 0; i < this.gridWidth; i++) {
      let row = [];
      for (let j = 0; j < this.gridHeight; j++) {
        row.push(
          new Square(
            this.positionX + this.spacing * i,
            this.positionY + this.spacing * j,
            this.squareSize
          )
        );
      }
      this.squares.push(row);
    }
  }

  display() {
    for (let i = 0; i < this.gridWidth; i++) {
      for (let j = 0; j < this.gridHeight; j++) {
        this.squares[i][j].display();
      }
    }
  }
}
