function setup() {
  createCanvas(400, 400);
  background(0);

  let point1 = createVector(random(width), random(height));
  let point2 = createVector(random(width), random(height));

  let point3 = createVector(random(width), random(height));
  let point4 = createVector(random(width), random(height));

  ellipse(point1.x, point1.y, 10);
  ellipse(point2.x, point2.y, 10);
  stroke(255);
  line(point1.x, point1.y, point2.x, point2.y);

  ellipse(point3.x, point3.y, 10);
  ellipse(point4.x, point4.y, 10);
  stroke(255);
  line(point3.x, point3.y, point4.x, point4.y);

  let intersect = createVector(
    intersect_point(point1, point2, point3, point4)[0],
    intersect_point(point1, point2, point3, point4)[1]
  );

  fill("red");

  let d1 = dist(point1.x, point1.y, intersect.x, intersect.y);
  let d2 = dist(point3.x, point3.y, intersect.x, intersect.y);

  let len1 = dist(point1.x, point1.y, point2.x, point2.y);
  let len2 = dist(point3.x, point3.y, point4.x, point4.y);

  let a1 = Math.floor(atan2(point2.y - point1.y, point2.x - point1.x));
  let a1Intersect = Math.floor(
    atan2(intersect.y - point1.y, intersect.x - point1.x)
  );

  let a2 = Math.floor(atan2(point4.y - point3.y, point4.x - point3.x));
  let a2Intersect = Math.floor(
    atan2(intersect.y - point3.y, intersect.x - point3.x)
  );

  let tempPoint = point1.copy().add(p5.Vector.fromAngle(a1, len1 / 2));

  if (d1 <= len1 && d2 <= len2 && a1Intersect == a1 && a2Intersect == a2) {
    ellipse(intersect.x, intersect.y, 10);
  }
  fill("green");
  ellipse(point1.x, point1.y, 10);
}
function draw() {}

function intersect_point(pos1, pos2, pos3, pos4) {
  const point1 = [pos1.x, pos1.y];
  const point2 = [pos2.x, pos2.y];
  const point3 = [pos3.x, pos3.y];
  const point4 = [pos4.x, pos4.y];

  const ua =
    ((point4[0] - point3[0]) * (point1[1] - point3[1]) -
      (point4[1] - point3[1]) * (point1[0] - point3[0])) /
    ((point4[1] - point3[1]) * (point2[0] - point1[0]) -
      (point4[0] - point3[0]) * (point2[1] - point1[1]));

  const ub =
    ((point2[0] - point1[0]) * (point1[1] - point3[1]) -
      (point2[1] - point1[1]) * (point1[0] - point3[0])) /
    ((point4[1] - point3[1]) * (point2[0] - point1[0]) -
      (point4[0] - point3[0]) * (point2[1] - point1[1]));

  const x = point1[0] + ua * (point2[0] - point1[0]);
  const y = point1[1] + ua * (point2[1] - point1[1]);

  return [x, y];
}
