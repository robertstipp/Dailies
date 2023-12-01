function setup() {
  createCanvas(600, 600);
  background(0);
  // ellipse(300, 300, 10);

  const myPoly = poly(createVector(300, 300), 100);
  noFill();
  stroke(255);
  beginShape();
  myPoly.forEach((v) => vertex(v.x, v.y));
  endShape(CLOSE);

  for (let i = 0; i < 1000; i++) {
    const myPoint = createVector(random(width), random(height));
    pointInPoly(myPoly, myPoint) ? stroke("red") : stroke("green");
    ellipse(myPoint.x, myPoint.y, 10);
  }
}
function draw() {}

function poly(origin, size) {
  const vertices = [];
  let maxPoints = 100;
  for (let i = 0; i < maxPoints; i++) {
    const angle = map(i, 0, maxPoints, 0, TWO_PI);
    const x = origin.x + cos(angle) * size;
    const y = origin.y + sin(angle) * size;
    vertices.push(createVector(x, y));
  }

  let allPoints = [];
  let leftOrigin = createVector(origin.x - size, origin.y);
  ellipse(leftOrigin.x, leftOrigin.y, 10);
  for (let a = PI / 2; a < PI + PI / 2; a += 0.01) {
    let pos = leftOrigin.copy().add(p5.Vector.fromAngle(a, size));
    noStroke();
    allPoints.push(pos);
    // ellipse(pos.x, pos.y, 10);
  }

  let rightOrigin = createVector(origin.x + size, origin.y);

  for (let a = -PI / 2; a < PI / 2; a += 0.01) {
    let pos = rightOrigin.copy().add(p5.Vector.fromAngle(a, size));
    allPoints.push(pos);
  }
  noFill();
  stroke(255);
  beginShape();

  allPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
  return allPoints;
}

function pointInPoly(verts, pt) {
  let c = false;
  for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
    if (
      verts[i].y > pt.y != verts[j].y > pt.y &&
      pt.x <
        ((verts[j].x - verts[i].x) * (pt.y - verts[i].y)) /
          (verts[j].y - verts[i].y) +
          verts[i].x
    )
      c = !c;
  }
  return c;
}
