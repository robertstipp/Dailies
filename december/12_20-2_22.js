let source;
let step = 0.05;

let chunks = [];

const colors = ["#18134c", "#8200ff", "#06cdff"];
function setup() {
  createCanvas(1080, 1080);
  background(0);

  noLoop();

  source = new Source(540, 540);
}
function draw() {
  background(0);
  source.move();
  let corner0 = createVector(0, 0);
  let corner1 = createVector(width, 0);
  let corner2 = createVector(width, height);
  let corner3 = createVector(0, height);

  let corners = [corner0, corner1, corner2, corner3];

  for (let i = 0; i < corners.length; i++) {
    let corner1 = corners[i];
    let corner2 = corners[i + 1] || corners[0];

    for (let t = 0; t <= 1; t += step) {
      let interPoint = p5.Vector.lerp(corner1, corner2, t);
      stroke(255);
      let start = interPoint;
      let end = source.pos.copy();

      let u = 0;

      let inter = p5.Vector.lerp(start, end, u);

      line(end.x, end.y, inter.x, inter.y);
    }
  }
}

class Source {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.direction = 1;
    this.speed = 10;
  }
  move() {
    this.pos.x += this.speed * this.direction;
    if (this.pos.x > width) {
      this.direction = -1;
      step = random(0.05, 0.5);
    }
    if (this.pos.x < 0) {
      this.direction = 1;
      step = random(0.05, 0.5);
    }
  }
}
