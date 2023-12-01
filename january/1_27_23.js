let shapes = [];
let colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "yellow",
  "blue",
  "red",
  "green",
];
let levels = 5;
let midLines = 5;
function setup() {
  // Define the size of the canvas
  createCanvas(1080, 1080);
  background(0);
  stroke(255);
  noLoop();
}
function draw() {
  let leftBase = createVector(width * 0.1, height * 0.9);
  let top = createVector(width / 2, height * 0.25);
  let rightBase = createVector(width * 0.9, height * 0.9);

  // line(leftBase.x, leftBase.y, top.x, top.y);
  // line(top.x, top.y, rightBase.x, rightBase.y);
  // line(rightBase.x, rightBase.y, leftBase.x, leftBase.y);

  for (let i = 0; i < levels; i++) {
    let left = p5.Vector.lerp(leftBase, top, i / levels);
    let right = p5.Vector.lerp(rightBase, top, i / levels);
    let topLeft = p5.Vector.lerp(leftBase, top, (i + 1) / levels);
    let topRight = p5.Vector.lerp(rightBase, top, (i + 1) / levels);

    let leftBotCorner = p5.Vector.lerp(leftBase, top, i / levels);
    let leftTopCorner = p5.Vector.lerp(leftBase, top, (i + 1) / levels);
    let rightBotCorner = p5.Vector.lerp(rightBase, top, i / levels);
    let rightTopCorner = p5.Vector.lerp(rightBase, top, (i + 1) / levels);
    for (let j = 0; j < midLines; j++) {
      let tempBotLeftPoint = p5.Vector.lerp(left, right, j / midLines);
      let tempTopLeftPoint = p5.Vector.lerp(topLeft, topRight, j / midLines);
      let tempBotRightPoint = p5.Vector.lerp(left, right, (j + 1) / midLines);
      let tempTopRightPoint = p5.Vector.lerp(
        topLeft,
        topRight,
        (j + 1) / midLines
      );

      let corners = [
        tempBotLeftPoint,
        tempTopLeftPoint,
        tempTopRightPoint,
        tempBotRightPoint,
      ];
      shapes.push(new Shape(corners, j));
      noFill();
      beginShape();
      // corners.forEach((corner) => vertex(corner.x, corner.y));
      endShape(CLOSE);
    }
    // let corners = [
    //   leftBotCorner,
    //   leftTopCorner,
    //   rightTopCorner,
    //   rightBotCorner,
    // ];

    // noFill();
    // beginShape();

    // corners.forEach((corner) => vertex(corner.x, corner.y));
    // endShape(CLOSE);

    // line(topLeft.x, topLeft.y, topRight.x, topRight.y);
    // line(left.x, left.y, right.x, right.y);
    // break;
  }
  shapes.forEach((shape) => shape.draw());
}

class Shape {
  constructor(points, i) {
    this.points = points;
    this.mid = this.getMid();
    this.prop = map(this.mid.y, height * 0.3, height * 0.9, 0, 1);
    // this.color = colors[i % colors.length];
  }

  getMid() {
    let x = 0;
    let y = 0;
    this.points.forEach((point) => {
      x += point.x;
      y += point.y;
    });
    return createVector(x / this.points.length, y / this.points.length);
  }

  stepPolygon(corners, steps) {
    let centerX = 0;
    let centerY = 0;

    for (let i = 0; i < corners.length; i++) {
      centerX += corners[i].x;
      centerY += corners[i].y;
    }

    centerX /= corners.length;
    centerY /= corners.length;

    for (let t = 0; t < 1; t += 1 / steps) {
      let newCorners = [];

      for (let i = 0; i < corners.length; i++) {
        let pos = p5.Vector.lerp(corners[i], createVector(centerX, centerY), t);
        newCorners.push(pos);
      }

      for (let i = 0; i < newCorners.length; i++) {
        let corner0 = newCorners[i];
        let corner1 = newCorners[(i + 1) % corners.length];

        line(corner0.x, corner0.y, corner1.x, corner1.y);
        line(corner0.x, corner0.y, corner1.x, corner1.y);
      }
    }
  }

  draw() {
    this.stepPolygon(this.points, random(10, 20));
    // beginShape();
    // this.points.forEach((point) => vertex(point.x, point.y));
    // endShape(CLOSE);
  }
}
