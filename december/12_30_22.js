let v, t;

function setup() {
  createCanvas(400, 400);
  background(0);
  v = new Vehicle(width / 2, height / 2);
  t = new Target(random(width), random(height));
  console.log(t);
  // noLoop();
}
function draw() {
  // background(0);
  // t.show();
  fill("red");

  v.seek(t);
  if (v.arrive(t)) {
    t = new Target(random(width), random(height));
  }

  v.update();
  v.show();
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 1;
    this.maxForce = 0.25;
    this.r = 4;
  }

  seek(target) {
    let force = p5.Vector.sub(target.pos, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }

  arrive(target) {
    let desired = p5.Vector.sub(target.pos, this.pos);
    let d = desired.mag();
    let speed = this.maxSpeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);

    if (d < 10) {
      this.pos = target.pos.copy();
      this.vel.mult(0);
      return true;
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(255);
    strokeWeight(8);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

class Target {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }

  show() {
    stroke(255);
    strokeWeight(8);
    ellipse(this.pos.x, this.pos.y, 4);
  }
}
