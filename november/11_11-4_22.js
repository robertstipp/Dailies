const dots = [];
let t = 0;
function setup() {
  createCanvas(600, 600);
  background("#fef8dd");
  let angle = 0;
  let r = 0;
  while (r < 300) {
    let x = 300 + r * Math.cos(angle);
    let y = 300 + r * Math.sin(angle);
    // ellipse(x, y, 10);
    dots.push(new Dot(x, y));
    r += 0.5;

    angle += map(r, 0, 300, 0, PI / 5);
    // break;
  }

  dots.forEach((dot) => dot.display());
  dots.forEach((dot) => dot.connect());
}

function draw() {}

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  connect() {
    dots.forEach((dot) => {
      if (dot !== this) {
        let distance = dist(this.x, this.y, dot.x, dot.y);
        if (distance > 40 && distance < 80) {
          stroke(0);
          strokeWeight(map(distance, 20, 50, 0, 0.2));
          line(this.x, this.y, dot.x, dot.y);
        }
      }
    });
  }

  display() {
    noStroke();
    fill(0);
    ellipse(this.x, this.y, 10);
  }
}
