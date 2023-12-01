let dot;
let t = 0;
let tailLength = 200;
function setup() {
  createCanvas(400, 400);
  background(0);
  // frameRate(10);
  dot = new Dot();
}
function draw() {
  background(0);

  dot.move();
  dot.show();
  t += 0.01;
}

function mousePressed() {}

class Dot {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.pos = createVector(this.x, this.y);
    this.path = [];
  }

  move() {
    if (t !== 0) this.path.unshift(this.pos.copy());
    this.path = this.path.slice(0, tailLength);
    this.pos.x = this.x + 100 * (cos(t) + sin(noise(t)) + noise(t) * sin(t));
    this.pos.y = this.y + 100 * (sin(t) + cos(t) + cos(t));
  }

  show() {
    noStroke();

    ellipse(this.pos.x, this.pos.y, 10, 10);
    for (let i = 0; i < this.path.length; i++) {
      fill(255);
      let size = 10;
      ellipse(this.path[i].x, this.path[i].y, size);
    }
  }
}
