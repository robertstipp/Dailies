let circles = [];

const colors = ["#98ddca", "#d5ecc2", "#ffaaa7"];
function setup() {
  createCanvas(600, 600);
  background(0);

  while (circles.length < 1000) {
    let x = random(height);
    let y = random(width);
    let r = random([5, 10, 15, 30, 40, 50, 60]);

    let circle = new Circle(x, y, r);

    let overlapping = false;
    for (let j = 0; j < circles.length; j++) {
      let other = circles[j];
      let d = dist(circle.x, circle.y, other.x, other.y);
      if (d < circle.r + other.r) {
        // THEY ARE OVERLAPPING
        overlapping = true;
        break;
      }
    }

    if (!overlapping) {
      circles.push(new Circle(x, y, r));
    }
  }

  console.log(circles);

  circles.forEach((circle) => circle.show());

  // shape(300, 300, 3, 100);
}

function draw() {}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = random(colors);
    this.vertices = random([2, 3, 4, 5]);
  }
  show() {
    fill(this.c);
    shape(this.x, this.y, this.vertices, this.r);
    // ellipse(this.x, this.y, this.r * 2);
  }
}

function shape(x, y, vertices, radius) {
  let angleStart = random(TAU);
  push();
  translate(x, y);
  beginShape();
  for (
    let angle = angleStart;
    angle < TAU + angleStart;
    angle += TAU / vertices
  ) {
    let x = radius * Math.cos(angle);
    let y = radius * Math.sin(angle);
    // ellipse(x, y, 10);
    vertex(x, y);
  }
  endShape();
  pop();
}
