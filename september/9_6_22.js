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
}

g = new makeGrid(600, 600, 8, 8);
g.initGrid();
console.log(g);
