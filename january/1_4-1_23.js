let lines = [];

const colors = ["#d1478c", "#ff7a5c", "#f7f9ff", "#53d397"];
function setup() {
  createCanvas(1080, 1080);
  background(colors[2]);

  lines = [];

  // init lines
  for (let i = 0; i < 1000; i++) {
    lines.push(new Line());
  }

  // draw lines
  lines.forEach((line) => {
    line.intersection();
    line.draw();
  });
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

class Line {
  constructor(origin, angle, len) {
    this.point1 = createVector(random(width), random(height));

    this.point2 = createVector(random(width), random(height));
    this.len = p5.Vector.dist(this.point1, this.point2);
    this.intersect = false;
    this.intersectPos = createVector(0, 0);
  }

  intersection() {
    let point1 = this.point1;
    let point2 = this.point2;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] == this) continue;
      let point3 = lines[i].point1;
      let point4 = lines[i].point2;
      let intersect = createVector(
        intersect_point(this.point1, this.point2, point3, point4)[0],
        intersect_point(this.point1, this.point2, point3, point4)[1]
      );

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
        let angle = random(TAU);
        this.intersect = true;
        this.intersectPos = intersect;
        fill(random(colors));
      }
    }
  }
  draw() {
    if (this.intersect) {
      noStroke();
      fill(colors[0]);
      ellipse(this.intersectPos.x, this.intersectPos.y, this.len / 100);
      let c = color(0, 10);
      stroke(c);
      line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
    }
  }
}
