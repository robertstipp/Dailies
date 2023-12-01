let curvey;

const rainDrops = [];
function setup() {
  createCanvas(600, 600);
  background(0);

  let origin = createVector(width / 2, height / 2);
  let angle = -PI / 2;
  let length = 100;

  curvey = new Curvey(origin, length, angle);

  for (let i = 0; i < 100; i++) {
    let origin = createVector(random(width), random(height));
    let angle = -PI / 2;
    let length = random(10, 20);
    rainDrops.push(new Curvey(origin, length, angle));
  }
}
function draw() {
  // background(0);

  rainDrops.forEach((drop) => {
    drop.update();
    drop.display();
  });
}

// function curvey(origin, length, direction) {
//   let base = origin.copy();
//   let top = base.copy().add(p5.Vector.fromAngle(direction, length));
//   let cp = base.copy().add(p5.Vector.fromAngle(random(TAU), length / 2));
//   ellipse(base.x, base.y, 10, 10);
//   ellipse(cp.x, cp.y, 10, 10);
//   ellipse(top.x, top.y, 10, 10);
//   stroke(255);
//   noFill();
//   bezier(base.x, base.y, cp.x, cp.y, cp.x, cp.y, top.x, top.y);
// }

class Curvey {
  constructor(origin, length, direction) {
    this.origin = origin;
    this.length = length;
    this.direction = direction;
    this.angle = random(TAU);
    this.base = origin.copy();
    this.top = this.base.copy().add(p5.Vector.fromAngle(direction, length));
    this.cp = this.base.copy().add(p5.Vector.fromAngle(this.angle, length / 2));
    this.maxSteps = TAU / 0.01;
    this.curStep = 0;
  }

  update() {
    if (this.curStep > this.maxSteps) {
      return;
    }
    this.curStep++;
    this.angle += 0.01 % TAU;

    this.cp = this.base
      .copy()
      .add(p5.Vector.fromAngle(this.angle, this.length / 2));
  }

  display() {
    stroke(255);
    noFill();
    bezier(
      this.base.x,
      this.base.y,
      this.cp.x,
      this.cp.y,
      this.cp.x,
      this.cp.y,
      this.top.x,
      this.top.y
    );
  }
}
