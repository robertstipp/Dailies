function makeGrid(w, h, spacing, offset) {
  this.w = w;
  this.h = h;
  this.spacing = spacing;
  this.offset = offset;
  this.grid = [];

  this.initGrid = function () {
    for (let x = this.offset; x < this.w - this.offset; x += this.spacing) {
      row = [];
      for (let y = this.offset; y < this.h - this.offset; y += this.spacing) {
        row.push(random([1, 1, 1, 1]));
      }
      this.grid.push(row);
    }
  };

  this.display = function () {
    strokeWeight(2);
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j]) {
          point(i * this.spacing + this.offset, j * this.spacing + this.offset);
        }
      }
    }
  };
}

function spanWalker(x, y, col) {
  this.currX = x;
  this.currY = y;

  this.path = [];
  this.advance = function (grid) {
    this.path.push({ dx: this.currX, dy: this.currY });
    opts = this.getOptions(grid);
    choice = random(opts);

    this.currX = choice.dx;
    this.currY = choice.dy;
  };

  this.getOptions = function (grid) {
    options = [];

    if (this.currX > 0) {
      if (grid[this.currX - 1][this.currY]) {
        options.push({ dx: this.currX - 1, dy: this.currY });
      }
    }

    if (this.currY > 0) {
      if (grid[this.currX][this.currY - 1]) {
        options.push({ dx: this.currX, dy: this.currY - 1 });
      }
    }

    if (this.currX < grid.length - 1) {
      if (grid[this.currX + 1][this.currY]) {
        options.push({ dx: this.currX + 1, dy: this.currY });
      }
    }

    if (this.currY < grid[0].length - 1) {
      if (grid[this.currX][this.currY + 1]) {
        options.push({ dx: this.currX, dy: this.currY + 1 });
      }
    }

    return options;
  };

  this.display = function (spacing, offset) {
    for (let n = 0; n < this.path.length - 1; n++) {
      line(
        this.path[n].dx * spacing + offset,
        this.path[n].dy * spacing + offset,
        this.path[n + 1].dx * spacing + offset,
        this.path[n + 1].dy * spacing + offset
      );
    }
  };
}

function setup() {
  w = min(600, 600);
  wx = w;
  wy = w;

  createCanvas(wx, wy);

  spacing = 8;
  offset = 8;

  g = new makeGrid(wx, wy, spacing, offset);
  g.initGrid();

  r = new spanWalker(0, 0, spacing, offset);
}

function draw() {
  background(255);
  g.display();
  r.advance(g.grid);
  r.display();
}
