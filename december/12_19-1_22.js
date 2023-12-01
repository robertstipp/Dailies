let vanishingPoint;
let size = 20;
function setup() {
  createCanvas(600, 600);
  background(0);

  vanishingPoint = createVector(width / 2, height / 2);

  ellipse(vanishingPoint.x, vanishingPoint.y, 10, 10);

  let mySquare = new Square(
    random(200, width - 200),
    random(200, height - 200),
    size,
    size
  );
  mySquare.show();
}

class Square {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.points = [
      createVector(this.x, this.y),
      createVector(this.x + this.w, this.y),
      createVector(this.x + this.w, this.y + this.h),
      createVector(this.x, this.y + this.h),
    ];
  }
  show() {
    this.shadow();
    stroke(255);
    noFill();
    beginShape();
    this.points.forEach((point) => {
      vertex(point.x, point.y);
    });
    endShape(CLOSE);
    // rect(this.x, this.y, this.w, this.h);
  }

  shadow() {
    let shadow = createVector(this.x, this.y);

    let angle = atan2(shadow.y - vanishingPoint.y, shadow.x - vanishingPoint.x);
    let distance =
      dist(shadow.x, shadow.y, vanishingPoint.x, vanishingPoint.y) *
      (size / 50);
    shadow.add(distance * Math.cos(angle), distance * Math.sin(angle));
    rect(shadow.x, shadow.y, this.w, this.h);

    // origin

    let points = [
      createVector(shadow.x, shadow.y),
      createVector(shadow.x + this.w, shadow.y),
      createVector(shadow.x + this.w, shadow.y + this.h),
      createVector(shadow.x, shadow.y + this.h),
    ];

    stroke(255);
    noFill();
    beginShape();
    points.forEach((point) => {
      vertex(point.x, point.y);
    });
    endShape(CLOSE);
    this.points.push(...points);
  }
}
