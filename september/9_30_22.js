function setup() {
  createCanvas(600, 600);
  background(255);
}
function draw() {}

class Horizon {
  constructor() {
    this.points = [];
    for (let x = 0; x <= width; x + 10) {
      this.points.push(x);
    }
  }
}
