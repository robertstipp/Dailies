let e, g;

function setup() {
  pixelDensity(3);
  createCanvas(1080, 1920);
  background(0);

  e = new p5.Ease();
  g = new p5.Gen();
  noLoop();
}

function draw() {
  let base = createVector(540, height + 400);
  let size = 2300;
  tree(base, size);
}

function tree(base, size) {
  const end = createVector(540, base.y - size);

  strokeWeight(10);
  stroke(255);

  let branches = 400;

  for (let i = 0; i <= branches; i++) {
    let p = p5.Vector.lerp(base, end, i / branches);
    // point(p.x, p.y);

    let branchBase = p.copy();
    let val = e.linear(i / branches, 0.2, 0.5);
    let len = map(val, 0, 1, size * 0.5, 0);
    let offset = PI / 2;
    let angle = PI / 2 - offset;
    if (i % 2 == 0) angle = PI / 2 + offset;
    let branchEnd = p.add(p5.Vector.fromAngle(angle, len));
    // ellipse(branchEnd.x, branchEnd.y, 10, 10);
    let steps = map(val, 0, 1, 200, 1);
    for (let j = 0; j <= steps; j++) {
      let p2 = p5.Vector.lerp(branchBase, branchEnd, j / steps);
      strokeWeight(g.random(Math.random(), "even") * 5);
      p2.add([random(-10, 10), random(-10, 10)]);
      point(p2.x, p2.y);
    }
  }

  for (let i = 0; i <= branches; i++) {
    let p = p5.Vector.lerp(base, end, i / branches);

    let branchBase = p.copy();
    let val = e.smoothStep(i / branches);
    let len = map(val, 0, 1, size * 0.5, 0);
    let offset = PI / 2;
    let angle = PI / 2 - offset;
    if (i % 2 == 0) angle = PI / 2 + offset;
    let branchEnd = p.add(p5.Vector.fromAngle(angle, len));
    // ellipse(branchEnd.x, branchEnd.y, 10, 10);
    let steps = map(val, 0, 1, 200, 1);
    for (let j = 0; j <= steps; j++) {
      let p2 = p5.Vector.lerp(branchBase, branchEnd, j / steps);
      p2.add([0, random(-10, 10)]);
      // if (random() < 0.5) ornament(p2, random(size * 0.01, size * 0.02));
    }
  }

  // star2(end.copy().add([0, -100]), size);
}

function star(xOrigin, yOrigin, size) {
  stroke(255);
  strokeWeight(1);
  fill("black");
  let origin = createVector(xOrigin, yOrigin);
  let longSideRadius = size;
  let shortSideRadius = longSideRadius / 1.7;
  let angle1 = 0;

  let angle2 = PI / 6;
  for (let i = 0; i < 12; i++) {
    if (i === 0) {
      angle1 = 0;
      angle2 = PI / 6;
    } else if (i % 2 !== 0) {
      angle1 += PI / 3;
    } else {
      angle2 += PI / 3;
    }

    let x1 = origin.x + longSideRadius * cos(angle1);
    let y1 = origin.y + longSideRadius * sin(angle1);
    let x2 = origin.x + shortSideRadius * cos(angle2);
    let y2 = origin.y + shortSideRadius * sin(angle2);

    let point1 = createVector(x1, y1);
    let point0 = origin;
    let point2 = createVector(x2, y2);

    let points = [point1, point0, point2];

    fill("white");
    noStroke();
    beginShape();
    points.forEach((p) => vertex(p.x, p.y));
    endShape(CLOSE);
  }
}

function ornament(point, size) {
  push();
  noStroke();
  let c = random(["red", "green", "green"]);
  fill(c);
  let effectiveSize;
  c === "red" ? (effectiveSize = size * 1.3) : (effectiveSize = size);
  ellipse(point.x, point.y, effectiveSize);
  pop();
}

function sky(startY, endY) {
  for (let x = 0; x < width; x += 2) {
    push();
    let angle = map(x, 0, width, 0, 0.5 * TWO_PI);
    let amplitude = 10;
    let y = startY + Math.sin(angle) * amplitude;
    stroke(200);
    strokeWeight(g.random(Math.random(), "gaussian") * 4);
    point(x, y);
    pop();
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_24_22.jpeg");
  }
}
function star2(origin, size) {
  fill(255);

  let angles = [0, PI / 2, PI, (3 * PI) / 2];
  let points = angles.map((a) => {
    return origin.copy().add(p5.Vector.fromAngle(a, size));
  });

  for (let i = 0; i < points.length; i++) {
    let p1 = points[i];
    let p2 = points[(i + 1) % points.length];

    let angle = atan2(p2.y - p1.y, p2.x - p1.x);
    let offset = PI / 6;
    let len = p1.dist(p2) / 2;

    let cp1 = p1.copy().add(p5.Vector.fromAngle(angle + offset, len));
    let cp2 = p2.copy().add(p5.Vector.fromAngle(angle - offset, -len));

    // bezier(p1.x, p1.y, cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y);
    let steps = 200;
    for (let u = 0; u <= steps; u++) {
      let x = bezierPoint(p1.x, cp1.x, cp2.x, p2.x, u / steps);
      let y = bezierPoint(p1.y, cp1.y, cp2.y, p2.y, u / steps);

      let vSteps = 10;
      for (let v = 0; v <= vSteps; v++) {
        let spotPoint = p5.Vector.lerp(origin, createVector(x, y), v / vSteps);

        let offSetMag = map(v, 0, vSteps, 0, 10);

        point(spotPoint.x, spotPoint.y);
      }
    }
  }
}

function snow(startY) {
  for (let x = 0; x < width; x += 2) {
    push();
    let angle = map(x, 0, width, 0, 0.5 * TWO_PI);
    let amplitude = 10;
    let y = startY + Math.sin(angle) * amplitude;
    stroke(200);
    strokeWeight(g.random(Math.random(), "gaussian") * 4);
    point(x, y);
    pop();
  }
}
