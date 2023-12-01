let aspectRatio = 2480 / 3508;
let maxD;
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

  let triangles = 100;
  while (myTriangles.length < 400) {
    let origin = createVector(random(width), random(height));

    let size = random(10, 100);

    let valid = true;

    for (let j = 0; j < myTriangles.length; j++) {
      let otherTriangle = myTriangles[j];
      let d = dist(
        origin.x,
        origin.y,
        otherTriangle.pos.x,
        otherTriangle.pos.y
      );

      if (d < otherTriangle.radius + size) {
        valid = false;
        break;
      }
    }
    if (valid) {
      myTriangles.push(new myTriangle(origin, size));
    }
  }
  myTriangles.forEach((triangle) => {
    triangle.draw();

    triangle.drawCorner();
  });
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
