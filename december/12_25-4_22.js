let red = "#BC002D";

let g;
function setup() {
  pixelDensity(2);
  createCanvas(1080, 1080);
  background(0);
  let diameter = 900;
  let diameterOrigin = createVector(width / 2, height / 2);

  g = new p5.Gen();
  fill(red);
  moon(diameterOrigin, diameter);

  noStroke();
  for (let i = 0; i < 100; i++) {
    let pos = createVector(random(width), random(height));
    floatingLeaf(pos, random(10, 15), random(TAU));
  }

  for (let angle = PI / 4; angle <= PI / 2 + PI / 4; angle += PI / 100) {
    let origin = diameterOrigin
      .copy()
      .add(p5.Vector.fromAngle(angle, diameter / 1.95));

    grassClump(origin, random(diameter * 0.125, diameter * 0.25));
  }

  let branchOrigin = createVector(width / 2 - diameter / 2, height / 2);

  branch(branchOrigin, 0, 0);
}

function draw() {}

function moon(origin, diameter) {
  ellipse(origin.x, origin.y, diameter);
}

function grassClump(origin, sizeMax) {
  for (let i = 0; i < 100; i++) {
    let size = random(0, sizeMax);
    let angle = random(PI + PI / 4, 2 * PI - PI / 4);
    grassBlade(origin, size, angle);
  }
}

function grassBlade(origin, height, direction) {
  let base = createVector(origin.x, origin.y);

  let tip = base.copy().add(p5.Vector.fromAngle(direction, height));
  // let tip = createVector(origin.x, origin.y - height);

  let angle = atan2(tip.y - base.y, tip.x - base.x);
  let angleOffSet = PI / 10;
  let len = dist(base.x, base.y, tip.x, tip.y) / 10;
  let leftCP1 = base.copy().add(p5.Vector.fromAngle(angle - angleOffSet, len));
  let leftCP2 = tip.copy().add(p5.Vector.fromAngle(angle + angleOffSet, -len));

  let rightCP1 = base.copy().add(p5.Vector.fromAngle(angle + angleOffSet, len));
  let rightCP2 = tip.copy().add(p5.Vector.fromAngle(angle - angleOffSet, -len));

  fill("black");
  noStroke();
  beginShape();
  vertex(base.x, base.y);
  bezierVertex(leftCP1.x, leftCP1.y, leftCP2.x, leftCP2.y, tip.x, tip.y);
  bezierVertex(rightCP2.x, rightCP2.y, rightCP1.x, rightCP1.y, base.x, base.y);
  endShape(CLOSE);
}

function floatingLeaf(origin, size, angle) {
  let rightCorner = origin.copy().add(p5.Vector.fromAngle(angle, size));
  let leftCorner = origin.copy().add(p5.Vector.fromAngle(angle, -size));

  let angleOffSet = random(PI / 4, PI / 2);
  let len = size;
  let cp1 = leftCorner
    .copy()
    .add(p5.Vector.fromAngle(angle - angleOffSet, len));
  let cp2 = rightCorner
    .copy()
    .add(p5.Vector.fromAngle(angle + angleOffSet, -len));

  noStroke();
  fill("black");
  beginShape();
  vertex(rightCorner.x, rightCorner.y);
  vertex(leftCorner.x, leftCorner.y);
  bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, rightCorner.x, rightCorner.y);

  endShape(CLOSE);
}

function floatingBlossom(origin, size) {
  let n = 5;
  let d = 3;
  let k = n / d;

  push();
  fill("black");
  translate(origin.x, origin.y);
  rotate(random(TAU));
  beginShape();
  for (let angle = 0; angle <= TAU * d; angle += 0.01) {
    let x = 0 + size * cos(k * angle) * cos(angle);
    let y = 0 + size * cos(k * angle) * sin(angle);

    vertex(x, y);
  }
  endShape();
  pop();
  fill("white");
  ellipse(origin.x, origin.y, size * 0.25);
}

function branch(origin, direction, steps) {
  fill("black");
  // ellipse(origin.x, origin.y, 10);
  let maxSteps = 20;
  if (steps > maxSteps) {
    floatingBlossom(origin, 20);
    return;
  }
  let angle = random(-PI / 4, PI / 4);
  let len = random(10, 40);
  let next = origin.copy().add(p5.Vector.fromAngle(direction + angle, len));
  strokeWeight(map(steps, 0, maxSteps, 30, 1));
  stroke("black");
  line(origin.x, origin.y, next.x, next.y);
  branch(next, direction + angle, steps + 1);
  if (random() < 0.15) {
    branch(next, direction + angle + random([-PI / 6, PI / 6]), steps + 1);
  }
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_25_22.jpeg");
  }
}
