let lines = [];
function setup() {
  createCanvas(400, 400);
  background(0);
  let source = createVector(200, 200);
  let point0 = createVector(0, 200);

  let corners = [
    createVector(0, 0),
    createVector(width, 0),
    createVector(width, height),
    createVector(0, height),
  ];
  stroke(255);
  let count = 0;
  for (let i = 0; i < corners.length; i++) {
    strokeWeight(3);
    let corner1 = corners[i];
    let corner2 = corners[(i + 1) % corners.length];
    let distance = p5.Vector.dist(corner1, corner2);
    let stepDistance = 10;
    let steps = distance / stepDistance;

    for (let j = 0; j < 1; j += 1 / steps) {
      let points = [];
      let inter = p5.Vector.lerp(corner1, corner2, j);
      let angle = p5.Vector.sub(inter, source).heading();
      // ellipse(inter.x, inter.y, 10, 10);
      // points.push(inter);
      let midPoint = p5.Vector.lerp(source, inter, 0.5);
      points.push(inter);
      // ellipse(midPoint.x, midPoint.y, 10, 10);
      let distance = p5.Vector.dist(midPoint, source);
      for (let r = distance; r > 0; r -= 0.5) {
        angle -= TAU / 400;
        let x = source.x + r * cos(angle);
        let y = source.y + r * sin(angle);
        ellipse(x, y, 1, 1);
        points.push(createVector(x, y));
      }
      noFill();
      stroke(0);
      if (count % 2 == 0) stroke(255);
      beginShape();
      points.forEach((p) => vertex(p.x, p.y));
      endShape();
      count++;
    }
  }
}
