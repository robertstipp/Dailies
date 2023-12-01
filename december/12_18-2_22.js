const colors = ["#850000", "#DC0000", "#FFF"];
const yellow = ["#F49D1A", "#FFE15D", "#FAF8F1"];
function setup() {
  pixelDensity(8);
  createCanvas(1080, 1080);
  background(0);

  noFill();
  const points = [];

  for (let size = 100; size <= 900; size += 100) {
    points.push(...lerpDiam(540, 540, size));
  }

  // points.push(...innerEllipse(540, 540, 310));
  // points.push(...innerEllipse(540, 540, 100));
  // points.push(...innerEllipse(540, 540, 50));

  strokeWeight(3);
  let distanceLimit = 100;
  stroke(yellow[0]);
  connectPoints(points, distanceLimit);
  strokeWeight(2);
  stroke(yellow[1]);
  connectPoints(points, distanceLimit);
  strokeWeight(1);
  stroke(yellow[2]);
  connectPoints(points, distanceLimit);
  ellipsePoints(points);
}

function lerpDiam(x, y, size) {
  let point0 = createVector(x, y - size);
  let point1 = createVector(x + size / 2, y);
  let point2 = createVector(x, y + size);
  let point3 = createVector(x - size / 2, y);

  let corners = [point0, point1, point2, point3];

  let points = [];
  for (let i = 0; i < corners.length; i++) {
    let corner0 = corners[i];
    let corner1 = corners[(i + 1) % corners.length];

    for (let j = 0; j < 1; j += 0.1) {
      let point = p5.Vector.lerp(corner0, corner1, j);
      points.push(point);
    }
  }

  beginShape();
  for (let i = 0; i < points.length; i++) {
    let xPos = points[i].x;
    let yPos = points[i].y;

    // ellipse(xPos, yPos, 10, 10);
  }
  endShape(CLOSE);
  return points;
}

function connectPoints(points, targetDist) {
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i == j) continue;
      let d = dist(points[i].x, points[i].y, points[j].x, points[j].y);
      if (d < targetDist) {
        line(points[i].x, points[i].y, points[j].x, points[j].y);
      }
    }
  }
}

function ellipsePoints(points) {
  points.forEach((point) => ellipse(point.x, point.y, 0));
}

function innerEllipse(x, y, size) {
  let points = [];
  for (let a = 0; a < TAU; a += 0.1) {
    let xPos = x + size * cos(a);
    let yPos = y + size * sin(a);

    points.push(createVector(xPos, yPos));
  }
  return points;
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_17_22.jpeg");
  }
}
