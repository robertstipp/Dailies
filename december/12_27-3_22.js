function setup() {
  createCanvas(1080, 1920);
  background(0);

  let origin = createVector(width / 2, height / 2);
  noFill();
  stroke(255);
  let dotSize = 10;

  let innerDiameter = 400;

  for (let x = 0; x <= width; x += 50) {
    curvedLine(origin, x, innerDiameter);
  }
}

function curvedLine(origin, x, innerDiameter) {
  if (x === origin.x) return;
  let bottomY = origin.y + innerDiameter / 2;
  let topY = origin.y - innerDiameter / 2;

  let bottomAngle = atan2(bottomY - origin.y, x - origin.x);
  let topAngle = atan2(topY - origin.y, x - origin.x) + TAU;

  if (x > origin.x) {
    let bottomAngle = atan2(bottomY - origin.y, x - origin.x);
    let topAngle = atan2(topY - origin.y, x - origin.x) + TAU;
  }

  let d = dist(origin.x, origin.y, x, bottomY);
  let pos = origin.copy().add(p5.Vector.fromAngle(bottomAngle, d));
  let pos2 = origin.copy().add(p5.Vector.fromAngle(topAngle, d));

  // ellipse(x, bottomY, 10);

  let points = [];
  points.push(createVector(x, height));

  if (x < origin.x) {
    for (let a = bottomAngle; a < topAngle; a += 0.01) {
      let x = origin.x + d * cos(a);
      let y = origin.y + d * sin(a);
      let pos = createVector(x, y);
      points.push(pos);
    }
  }
  if (x > origin.x) {
    for (let a = bottomAngle; a > topAngle - TAU; a -= 0.01) {
      let x = origin.x + d * cos(a);
      let y = origin.y + d * sin(a);
      let pos = createVector(x, y);
      points.push(pos);
    }
  }

  points.push(createVector(x, 0));
  strokeWeight(map(d, innerDiameter, width, 2, 1));
  strokeJoin(ROUND);
  beginShape();
  ellipse(x, 0, 10);
  points.forEach((p) => vertex(p.x, p.y));
  endShape();
}
