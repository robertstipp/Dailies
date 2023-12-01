let light = "#FFF6C3";
let dark = "#FFDB89";
function setup() {
  createCanvas(600, 600);
  background(255);
  noLoop();
}

function draw() {
  for (let y = -200; y < 500; y += 1) {
    drawShape(0, y);
  }
}

function drawShape(x, y) {
  let angle = PI / 6;
  let angle2 = angle - PI / 2;
  let len = 300;
  let len1 = 100;
  let point0 = createVector(x, y);
  let point1 = createVector(
    point0.x + len * Math.cos(angle),
    point0.y + len * Math.sin(angle)
  );
  stroke(light);
  line(point0.x, point0.y, point1.x, point1.y);
  let point2 = createVector(
    point1.x + len1 * Math.cos(angle2),
    point1.y + len1 * Math.sin(angle2)
  );
  stroke(dark);
  line(point1.x, point1.y, point2.x, point2.y);
  let point3 = createVector(
    point2.x + len * Math.cos(angle),
    point2.y + len * Math.sin(angle)
  );

  stroke(light);
  line(point2.x, point2.y, point3.x, point3.y);
  // ellipse(point0.x, point0.y, 10, 10);
  // ellipse(point1.x, point1.y, 10, 10);
  // ellipse(point2.x, point2.y, 10, 10);
  // ellipse(point3.x, point3.y, 10, 10);

  let points = [point0, point1, point2, point3];
  noFill();
  stroke(255);
  beginShape();
  points.forEach((p) => {
    vertex(p.x, p.y);
  });
  endShape();
}
