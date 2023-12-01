function setup() {
  createCanvas(600, 600);
  background(0);
  stroke(255);
  noFill();
  star(createVector(300, 300), 300);
}

function star(origin, size) {
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
    let steps = 30;
    for (let u = 0; u <= steps; u++) {
      let x = bezierPoint(p1.x, cp1.x, cp2.x, p2.x, u / steps);
      let y = bezierPoint(p1.y, cp1.y, cp2.y, p2.y, u / steps);

      let vSteps = 10;
      for (let v = 0; v <= vSteps; v++) {
        let spotPoint = p5.Vector.lerp(origin, createVector(x, y), v / vSteps);
        if (random() < 0.1) continue;
        strokeWeight(random(1, 5));
        point(spotPoint.x, spotPoint.y);
      }
    }
  }
}
