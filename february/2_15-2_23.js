let aspectRatio = 2480 / 3508;
let maxD;
let origin;
let colors = [
  "#c30010",
  "#d1001f",
  "#de0a26",
  "#ff2c2c",
  "#ff4d4d",
  "#ff6e6e",
  "#ff8f8f",
  "#ffb0b0",
];
let colorsBlue = [
  "#0700C4",
  "#0000FF",
  "#0052FF",
  "#007AFF",
  "#00A3FF",
  "#00CCFF",
];
let e, g;
let ringsArr = [];
let cols = 17;
let rows = 17;
let myTriangles = [];

function setup() {
  pixelDensity(1);
  createCanvas(1080, 1080);
  // background("black");
  e = new p5.Ease();
  g = new p5.Gen();

  noFill();

  noStroke();

  noLoop();
}

function draw() {
  background(0);
  let points = [];

  let center = createVector(width / 2, height / 2);
  origin = center.copy();
  let start = center.copy();
  points.push([center.x, center.y]);
  let steps = 10;
  for (let i = 1; i < steps; i++) {
    let prev = points[i - 1];
    let radius = map(i, 1, steps, 100, 200);
    let angle = random([PI / 2, PI, PI + PI / 2, 0]);
    let nextX = prev[0] + Math.cos(angle) * radius;
    let nextY = prev[1] + Math.sin(angle) * radius;
    points.push([nextX, nextY]);
  }
  // for (let x = 100; x < width - 100; x += 100) {
  //   for (let y = 100; y < height - 100; y += 100) {
  //     points.push([x, y]);
  //   }
  // }
  triangulate(points);
  myTriangles.forEach(
    (tri) => {
      if (tri.distance < Math.sqrt(50 * 50 + 50 * 50)) return;

      // fill(random(colorsBlue));

      tri.drawCorner();
    }

    // tri.drawCenter();
  );
}

function triangulate(vertices) {
  vertices.forEach((vertex) => point(vertex[0], vertex[1]));
  var triangles = Delaunay.triangulate(vertices);

  noFill();
  for (let i = 0; i < triangles.length; i += 3) {
    let point0 = vertices[triangles[i]];
    let point1 = vertices[triangles[i + 1]];
    let point2 = vertices[triangles[i + 2]];

    let p1 = createVector(point0[0], point0[1]);
    let p2 = createVector(point1[0], point1[1]);
    let p3 = createVector(point2[0], point2[1]);

    myTriangles.push(new Triangle(p1, p2, p3));
    // beginShape();
    // vertex(point0[0], point0[1]);
    // vertex(point1[0], point1[1]);
    // vertex(point2[0], point2[1]);
    // endShape();
  }
}
class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.center = this.findCenter();
    this.angle = atan2(this.center.y - origin.y, this.center.x - origin.x);
    this.distance = dist(this.center.x, this.center.y, origin.x, origin.y);
  }

  findCenter() {
    let centerX = (this.a.x + this.b.x + this.c.x) / 3;
    let centerY = (this.a.y + this.b.y + this.c.y) / 3;
    return createVector(centerX, centerY);
  }
  drawCenter() {
    ellipse(this.center.x, this.center.y, 10);
  }
  shift() {
    let angle = this.angle;

    if (this.angle > 0 && this.angle < PI) {
      let yPos = origin.y + this.distance * Math.sin(angle);
      let yDist = Math.abs(yPos - origin.y);
      let len = map(yDist, 0, radius, 0, 900);

      this.a = this.a.copy().add(p5.Vector.fromAngle(PI / 2).mult(len));
      this.b = this.b.copy().add(p5.Vector.fromAngle(PI / 2).mult(len));
      this.c = this.c.copy().add(p5.Vector.fromAngle(PI / 2).mult(len));
    }
  }
  drawCorner() {
    let corners = [this.a, this.b, this.c];
    stroke(255);
    for (let scale = 0.9; scale > 0.1; scale -= 0.2) {
      let scaledCorners = [];
      for (let i = 0; i < corners.length; i++) {
        let corner = corners[i];
        let scaledCorner = p5.Vector.lerp(this.center, corner, scale);

        scaledCorners.push(scaledCorner);
      }
      if (random() < 0.5) continue;
      beginShape();
      scaledCorners.forEach((corner) => {
        vertex(corner.x, corner.y);
      });
      endShape(CLOSE);
    }

    // corners.forEach((corner) => ellipse(corner.x, corner.y, 10));
  }

  draw() {
    // stroke(255);
    beginShape();
    vertex(this.a.x, this.a.y);
    vertex(this.b.x, this.b.y);
    vertex(this.c.x, this.c.y);
    endShape(CLOSE);

    // ellipse(this.center.x, this.center.y, 10, 10);
  }
}

class myTriangle {
  constructor(pos, radius) {
    this.pos = pos;
    this.radius = radius;
    this.corners = [];
  }
  draw() {
    let startAngle = random(TAU);
    let corners = [];
    for (let a = startAngle; a < startAngle + TAU; a += TAU / 3) {
      let corner = this.pos.copy().add(p5.Vector.fromAngle(a, this.radius));
      this.corners.push(corner);
    }

    stroke(255);
    // beginShape();
    // this.corners.forEach((point) => {
    //   vertex(point.x, point.y);
    // });
    // endShape(CLOSE);
  }
  drawCorner() {
    for (let scaleTriangle = 0.2; scaleTriangle < 0.9; scaleTriangle += 0.1) {
      let newCorners = [];
      for (let i = 0; i < this.corners.length; i++) {
        let selectedCorner = this.corners[i];

        let angle = atan2(
          selectedCorner.y - this.pos.y,
          selectedCorner.x - this.pos.x
        );
        let pos = this.pos
          .copy()
          .add(p5.Vector.fromAngle(angle, this.radius * scaleTriangle));

        newCorners.push(pos);
      }

      let anchorCornerIndex = random([0, 1, 2]);
      let anchorCorner = newCorners[anchorCornerIndex];
      let nextCorner = newCorners[(anchorCornerIndex + 1) % 3];
      let prevCorner = newCorners[(anchorCornerIndex + 2) % 3];

      let lineDist = random(0.5, 0.9);
      let intPrev = p5.Vector.lerp(anchorCorner, prevCorner, lineDist);
      let intNext = p5.Vector.lerp(anchorCorner, nextCorner, lineDist);
      stroke(random(colors));
      if (this.radius > 50) {
        stroke(random(colorsBlue));
      }
      strokeWeight(2);
      line(anchorCorner.x, anchorCorner.y, intNext.x, intNext.y);
      line(anchorCorner.x, anchorCorner.y, intPrev.x, intPrev.y);
    }
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.jpeg");
  }
}
