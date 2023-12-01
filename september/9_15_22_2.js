const squares = [];

function setup() {
  createCanvas(600, 600);
  background(0);

  const square = new NoiseSquare(createVector(300, 300), 100);

  for (x = 100; x <= 500; x += 100) {
    for (y = 100; y <= 500; y += 100) {
      for (let radius = 30; radius <= 50; radius += 10) {
        squares.push(new NoiseSquare(createVector(x, y), radius));
      }
    }
  }
  squares.forEach((square) => square.show());
}
function draw() {}

class NoiseSquare {
  constructor(origin, radius) {
    this.points = [];

    for (let angle = PI / 4; angle < TAU; angle += TAU / 4) {
      let x = origin.x + radius * Math.cos(angle);
      let y = origin.y + radius * Math.sin(angle);
      let xOff = random(-2, 2);
      let yOff = random(-2, 2);
      this.points.push(createVector(x + xOff, y + yOff));
    }
  }

  show() {
    stroke(255);
    noFill();
    beginShape();
    this.points.forEach((point) => {
      vertex(point.x, point.y);
    });
    endShape(CLOSE);
  }
}
