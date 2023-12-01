const dots = [];

function setup() {
  createCanvas(600, 600);
  background(0);
  noStroke();
  const dot = new Dot(300, 300);
  console.log(dot);
  for (let r = 20; r >= 1; r -= 0.5) {
    let angleStep = map(r, 20, 1, 0.05, 0.1);
    for (let angle = 0; angle <= 2 * PI; angle += angleStep) {
      let xOff = r * (16 * Math.pow(Math.sin(angle), 3));
      let yOff =
        r *
        (13 * Math.cos(angle) -
          5 * Math.cos(2 * angle) -
          2 * Math.cos(3 * angle) -
          Math.cos(4 * angle));
      // if (xOff < 20 && xOff > -20 && random() < 0.8) continue;
      dots.push(new Dot(xOff, -yOff));
      // ellipse(300 + xOff, 300 + yOff, 10);
    }
  }
}

function draw() {
  background(0, 10);
  dots.forEach((dot) => dot.show());
}

class Dot {
  constructor(x, y) {
    this.xOrigin = x;
    this.yOrigin = y;
    this.x = x;
    this.y = y;
    this.color = 255;
    this.g = random(80, 100);
    this.colorMax = 255;
    this.fallSpeed = random();
    this.colorSpeed = map(this.fallSpeed, 0, 1, 1, 2);
    this.fallMax = 100;
  }

  fall() {
    if (this.y >= this.yOrigin + this.fallMax) {
      this.y = this.yOrigin;
    }
    this.y += this.fallSpeed;
  }

  wiggle() {
    noise(this.y, this.x) < 0.5 ? (this.x -= 0.1) : (this.x += 0.1);
  }

  fade() {
    if (this.color <= 0) this.color = 255;

    this.color -= this.colorSpeed;
    this.g -= this.colorSpeed;
    fill(this.color, this.g, this.g);
  }

  show() {
    this.fall();
    this.wiggle();
    this.fade();
    ellipse(300 + this.x, 300 + this.y, 5);
  }
}
