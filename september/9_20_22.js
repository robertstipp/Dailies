const color1 = "#658525";
const color2 = "#092a35";
const color3 = "#cfee91";

const boundaries = [];
function setup() {
  createCanvas(600, 600);
  background(200);
  noStroke();

  // ellipse(300, 300, 300);

  boundaries.push(
    new Boundary(random(100, 150), random(100, 150), 150, random(150))
  );
  boundaries.push(
    new Boundary(random(100, 150), random(100, 150), random(150), random(150))
  );

  for (let i = 0; i < 3000; i++) {
    let r = random(0, 150);
    let angle = random(TAU);

    let x = 300 + r * Math.cos(angle);
    let y = 300 + r * Math.sin(angle);
    let d = dist(300, 300, x, y);

    boundaries.forEach((boundary) => {
      if (boundary.checkWithin(x, y)) {
        boundary.addColor();
        ellipse(x, y, 5);
      }
    });

    ellipse(x, y, 5);
  }
}
function draw() {}

class Boundary {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.c = random([color1, color2, color3]);
  }

  checkWithin(x, y) {
    return (
      x > this.x && x < this.x + width && y > this.y && y < this.y + height
    );
  }

  addColor() {
    fill(this.c);
  }
}
