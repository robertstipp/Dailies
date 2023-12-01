let g;
let origin;
let size;
let bug;
let bugs = [];
let target;
function setup() {
  createCanvas(600, 600);
  background("pink");
  origin = createVector(300, 300);
  size = 200;
  g = new p5.Gen();
  for (let i = 0; i < 10; i++) {
    bugs.push(new Bug(createVector(random(width), random(height)), 10));
  }
  let bugOrigin = createVector(400, 400);
  bug = new Bug(bugOrigin, 10);
}
function draw() {
  background("pink");
  eye(origin, size);
  target = bugs[bugs.length - 1].pos;
  laser(origin, target);

  bugs.forEach((bug) => {
    bug.draw();
    bug.move();
    bug.hurt();
    bug.kill();
  });

  bug.move();
  // bug.hurt();
  bug.draw();
}

function eye(origin, size) {
  noFill();
  stroke(255);
  strokeWeight(3);
  let leftCorner = origin.copy().add(-size / 2, 0);
  // ellipse(leftCorner.x, leftCorner.y, 10);
  let rightCorner = origin.copy().add(size / 2, 0);
  // ellipse(rightCorner.x, rightCorner.y, 10);

  // upperLid
  let upperAngle = atan2(
    rightCorner.y - leftCorner.y,
    rightCorner.x - leftCorner.x
  );

  let upperinnerOffset = PI / 4;
  let upperinnerLen = leftCorner.dist(rightCorner) / 2;
  let upperouterOffset = PI / 4;
  let upperlen = leftCorner.dist(rightCorner) / 2;

  let upperLidCp1 = leftCorner
    .copy()
    .add(p5.Vector.fromAngle(upperAngle - upperinnerOffset, upperinnerLen));

  let upperLidCp2 = rightCorner
    .copy()
    .add(p5.Vector.fromAngle(upperAngle + upperouterOffset, -upperlen));

  let steps = 100;
  // for (let i = 0; i <= steps / 2; i++) {
  //   let x1 = bezierPoint(
  //     leftCorner.x,
  //     upperLidCp1.x,
  //     upperLidCp2.x,
  //     rightCorner.x,
  //     i / steps
  //   );

  //   let y1 = bezierPoint(
  //     leftCorner.y,
  //     upperLidCp1.y,
  //     upperLidCp2.y,
  //     rightCorner.y,
  //     i / steps
  //   );

  //   let x2 = bezierPoint(
  //     leftCorner.x,
  //     upperLidCp1.x,
  //     upperLidCp2.x,
  //     rightCorner.x,
  //     (steps - i) / steps
  //   );

  //   let y2 = bezierPoint(
  //     leftCorner.y,
  //     upperLidCp1.y,
  //     upperLidCp2.y,
  //     rightCorner.y,
  //     (steps - i) / steps
  //   );

  //   line(x1, y1, x2, y2);
  // }

  // lowerLid
  let lowerAngle = atan2(
    leftCorner.y - rightCorner.y,
    leftCorner.x - rightCorner.x
  );
  let lowerinnerOffset = PI / 4 - PI;
  let lowerinnerLen = leftCorner.dist(rightCorner) / 2;
  let lowerouterOffset = PI / 4 + PI / 2;
  let lowerlen = leftCorner.dist(rightCorner) / 2;
  let lowerLidCp1 = leftCorner
    .copy()
    .add(p5.Vector.fromAngle(lowerAngle + lowerinnerOffset, lowerinnerLen));
  let lowerLidCp2 = rightCorner
    .copy()
    .add(p5.Vector.fromAngle(lowerAngle + lowerouterOffset, -lowerlen));

  for (let i = 0; i <= steps / 2; i++) {
    let upperx1 = bezierPoint(
      leftCorner.x,
      upperLidCp1.x,
      upperLidCp2.x,
      rightCorner.x,
      i / steps
    );

    let uppery1 = bezierPoint(
      leftCorner.y,
      upperLidCp1.y,
      upperLidCp2.y,
      rightCorner.y,
      i / steps
    );

    let upperx2 = bezierPoint(
      leftCorner.x,
      upperLidCp1.x,
      upperLidCp2.x,
      rightCorner.x,
      (steps - i) / steps
    );

    let uppery2 = bezierPoint(
      leftCorner.y,
      upperLidCp1.y,
      upperLidCp2.y,
      rightCorner.y,
      (steps - i) / steps
    );

    let lowerx1 = bezierPoint(
      leftCorner.x,
      lowerLidCp1.x,
      lowerLidCp2.x,
      rightCorner.x,
      i / steps
    );

    let lowery1 = bezierPoint(
      leftCorner.y,
      lowerLidCp1.y,
      lowerLidCp2.y,
      rightCorner.y,
      i / steps
    );

    let lowerx2 = bezierPoint(
      leftCorner.x,
      lowerLidCp1.x,
      lowerLidCp2.x,
      rightCorner.x,
      (steps - i) / steps
    );

    let lowery2 = bezierPoint(
      leftCorner.y,
      lowerLidCp1.y,
      lowerLidCp2.y,
      rightCorner.y,
      (steps - i) / steps
    );
    let vertstripes = 100;
    // for (let j = 0; j < vertstripes; j++) {
    //   if (random() > 0.5) continue;
    //   let upper1Point = createVector(upperx1, uppery1);
    //   let upper2Point = createVector(upperx2, uppery2);
    //   let lower1Point = createVector(lowerx1, lowery1);
    //   let lower2Point = createVector(lowerx2, lowery2);

    //   let spot1 = p5.Vector.lerp(upper1Point, lower1Point, j / vertstripes);
    //   point(spot1.x, spot1.y);
    //   let spot2 = p5.Vector.lerp(upper2Point, lower2Point, j / vertstripes);
    //   point(spot2.x, spot2.y);
    // }
    // line(upperx1, uppery1, upperx2, uppery2);
    // line(lowerx1, lowery1, lowerx2, lowery2);

    // line(upperx1, uppery1, lowerx1, lowery1);
    // line(upperx2, uppery2, lowerx2, lowery2);
  }

  beginShape();
  vertex(leftCorner.x, leftCorner.y);
  bezierVertex(
    upperLidCp1.x,
    upperLidCp1.y,
    upperLidCp2.x,
    upperLidCp2.y,
    rightCorner.x,
    rightCorner.y
  );
  bezierVertex(
    lowerLidCp2.x,
    lowerLidCp2.y,
    lowerLidCp1.x,
    lowerLidCp1.y,
    leftCorner.x,
    leftCorner.y
  );
  endShape();

  // iris
  let irisSize = size / 2;
  noStroke();
  fill("black");

  fill("#19a337");
  ellipse(origin.x, origin.y, irisSize);
  let eyeDots = 1000;
  // for (let i = 0; i < eyeDots; i++) {
  //   let r = map(
  //     g.random(Math.random(), "even"),
  //     0,
  //     1,
  //     irisSize / 5,
  //     irisSize / 2
  //   );
  //   let angle = map(g.random(Math.random(), "even"), 0, 1, 0, TAU);
  //   let x = origin.x + r * cos(angle);
  //   let y = origin.y + r * sin(angle);
  //   let start = origin.copy();
  //   let end = createVector(x, y);
  //   let steps = 5;

  //   stroke("#19a337");
  //   point(x, y);
  //   // for (let u = 0; u <= steps; u++) {
  //   //   let spot = p5.Vector.lerp(start, end, u / steps);
  //   //   let spotSize = map(u, 0, steps, 0, 5);
  //   //   strokeWeight(3);

  //   //   // line(origin.x, origin.y, spot.x, spot.y);
  //   //   point(spot.x, spot.y);
  //   // }
  // }

  // pupil
  let pupilSize = irisSize / 2;
  noStroke();
  fill(0);
  ellipse(origin.x, origin.y, pupilSize);
}

function laser(origin, target) {
  stroke("red");
  strokeWeight(1);
  let direction = atan2(target.y - origin.y, target.x - origin.x);
  let distance = dist(origin.x, origin.y, target.x, target.y);
  let cpAngleOffset = PI / 5;
  let len = distance / 10;
  let cp1 = origin
    .copy()
    .add(p5.Vector.fromAngle(direction + cpAngleOffset, len));
  noFill();
  bezier(origin.x, origin.y, cp1.x, cp1.y, cp1.x, cp1.y, target.x, target.y);

  let cp2 = origin
    .copy()
    .add(p5.Vector.fromAngle(direction - cpAngleOffset, len));
  bezier(origin.x, origin.y, cp2.x, cp2.y, cp2.x, cp2.y, target.x, target.y);
  // ellipse(cp2.x, cp2.y, 10);
  // ellipse(cp1.x, cp1.y, 10);
  let steps = 50;
  for (let j = 0; j < steps; j++) {
    let r = 25;
    let angle = map(j, 0, steps, 0, TAU);
    let x = origin.x + r * cos(angle);
    let y = origin.y + r * sin(angle);

    line(x, y, target.x, target.y);

    // line(leftX, leftY, target.x, target.y);
  }

  line(origin.x, origin.y, target.x, target.y);
}

class Bug {
  constructor(origin, size) {
    this.origin = origin;
    this.pos = origin.copy();
    this.size = size;
    this.life = 200;
  }

  move() {
    this.pos.x += random(-1, 1);
    this.pos.y += random(-1, 1);
  }
  hurt() {
    if (target === this.pos) this.life--;
  }
  kill() {
    if (this.life <= 0) {
      this.pos = this.origin.copy();
      bugs.pop();
    }
  }

  draw() {
    noStroke();
    fill("white");
    let effSize = map(this.life, 0, 60, 0, this.size);

    spider(this.pos.x, this.pos.y, effSize);
  }
}

function acquireTarget() {
  let minDistance = Infinity;
  let minTarget = null;
  bugs.forEach((bug) => {
    let d = dist(bug.pos.x, bug.pos.y, origin.x, origin.y);
    if (d < minDistance) {
      minDistance = d;
      minTarget = bug.pos;
    }
  });
  return minTarget;
}

function spider(x, y, size) {
  legs(x, y, size);
  ellipse(x, y, size);
  // eyes
  spidereyes(
    noise(x - size / 4, x + size / 4) + x,
    noise(y - size / 4, y + size / 4) + y,
    size
  );
}

function spidereyes(x, y, size) {
  push();
  fill("white");
  spidereye(x, y, size / 3);
  spidereye(x + size / 3.5, y, size / 3);
  pop();
}

function spidereye(x, y, size) {
  push();
  fill("white");
  ellipse(x, y, size);
  spidereyeball(x, y, size / 3);
  pop();
}

function spidereyeball(x, y, size) {
  push();
  fill("black");
  let xOff = random([-1, 1]) * random(size / 2);
  let yOff = random([-1, 1]) * random(size / 2);
  ellipse(x + xOff, y + yOff, size);
  pop();
}
function legs(x, y, size) {
  push();
  stroke(0);
  strokeWeight(size / 100);
  for (let angle = 0; angle <= TAU; angle += TAU / 80) {
    let radius = random(size / 2, size);
    let xPos = x + radius * cos(angle);
    let yPos = y + radius * sin(angle);
    line(x, y, xPos, yPos);
  }
  pop();
}
