let t = 0;
let birds = [];
let g, e;

let color1 = ["#e45826"];
let color2 = ["#f0a500"];
function setup() {
  createCanvas(600, 600);
  background(0);
  g = new p5.Gen();
  for (let i = 0; i < 100; i++) {
    let radius = g.random(Math.random(), "high") * 400;
    let origin = createVector(0, height / 2);

    let angle = random(TAU);
    let pos = origin.copy().add(p5.Vector.fromAngle(angle, radius));
    let size = random(10, 20);
    birds.push(new Bird(pos, size));
  }
}

function draw() {
  background(0);

  fill("orange");
  for (let y = 0; y < height; y += 10) {
    rect(0, y, width, height / 10);
  }

  fill("red");
  ellipse(width / 2, height / 2, 100);
  birds.forEach((bird) => bird.show());
  t += 0.02;
}
function bird(origin, size, tOffset, speed) {
  // body
  // head and tail
  let head = createVector(origin.x + size / 2, origin.y);
  let tail = createVector(origin.x - size / 2, origin.y);

  let bellyCP1 = createVector(origin.x + size / 6, origin.y + size / 3);
  let bellyCP2 = createVector(origin.x - size / 6, origin.y + size / 10);

  let topCp1 = createVector(origin.x + size / 6, origin.y - size / 10);
  let topCp2 = createVector(origin.x - size / 6, origin.y - size / 10);

  // body
  fill("black");
  beginShape();
  vertex(head.x, head.y);
  bezierVertex(bellyCP1.x, bellyCP1.y, bellyCP2.x, bellyCP2.y, tail.x, tail.y);
  bezierVertex(topCp2.x, topCp2.y, topCp1.x, topCp1.y, head.x, head.y);
  endShape();

  // wings
  let wingSize = map(sin(speed * (t + tOffset)), -1, 1, -size / 2, size / 2);
  let wingOrigin1 = createVector(origin.x, origin.y);
  let wingWidth = wingSize / 4;
  let curvature = wingSize / 2;
  noStroke();

  let frontWingTip = createVector(wingOrigin1.x, wingOrigin1.y + wingSize);

  let frontWingCPAngle = Math.PI / 10;
  let frontWingCP1 = wingOrigin1
    .copy()
    .add(p5.Vector.fromAngle(frontWingCPAngle + PI / 2, wingSize / 2));

  let frontWingOrigin1 = createVector(wingOrigin1.x - wingWidth, wingOrigin1.y);
  bezier(
    frontWingOrigin1.x,
    frontWingOrigin1.y,
    frontWingCP1.x,
    frontWingCP1.y,
    frontWingCP1.x,
    frontWingCP1.y,
    frontWingTip.x,
    frontWingTip.y
  );

  let wingOrigin2 = createVector(origin.x, origin.y);
  let frontWingCP2 = wingOrigin2
    .copy()
    .add(p5.Vector.fromAngle(-frontWingCPAngle + PI / 2, wingSize / 2));
  let frontWingOrigin2 = createVector(wingOrigin2.x + wingWidth, wingOrigin2.y);

  beginShape();
  vertex(frontWingOrigin1.x, frontWingOrigin1.y);
  bezierVertex(
    frontWingCP1.x,
    frontWingCP1.y,
    frontWingCP1.x,
    frontWingCP1.y,
    frontWingTip.x,
    frontWingTip.y
  );
  bezierVertex(
    frontWingCP2.x,
    frontWingCP2.y,
    frontWingCP2.x,
    frontWingCP2.y,
    frontWingOrigin2.x,
    frontWingOrigin2.y
  );
  endShape(CLOSE);
}

class Bird {
  constructor(origin, size) {
    this.origin = origin;
    this.pos = origin.copy();
    this.size = size;
    this.tOffset = random(100);
    this.flapSpeed = map(size, 20, 50, 4, 2);
    this.travelSpeed = map(size, 20, 50, 1, 3);
  }

  move() {
    this.checkBounds();
    this.pos = this.pos.copy().add([this.travelSpeed, 0]);
  }
  checkBounds() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.pos.y = random(height);
    }
  }

  show() {
    this.move();
    bird(this.pos, this.size, this.tOffset, this.flapSpeed);
  }
}
