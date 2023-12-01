let wideStroke = 5;
let narrowStroke = 2;
let triangleSize = 100;
let cellWidth = 100;
let cellHeight = 100;
function setup() {
  createCanvas(1080, 1920);
  background(0);

  let origin = createVector(width / 2, height / 2);
  let diamondWidth = 300;
  let diamondHeight = 400;
  stroke(255);

  diamond(origin, diamondWidth, diamondHeight);
}
function draw() {}

function diamond(origin, width, height) {
  ellipse(origin.x, origin.y, 5, 5);
  let ratioTopBottom = 0.75;
  let toprowOffset = ((-height / 2) * ratioTopBottom) / 2;
  let top = createVector(origin.x, origin.y - (height / 2) * ratioTopBottom);
  let topRowMid = createVector(origin.x, origin.y + toprowOffset);

  equilTriangle(topRowMid, width, 10);

  let topRowLeft = createVector(origin.x - width, origin.y + toprowOffset);
  let topRowRight = createVector(origin.x + width, origin.y + toprowOffset);
  equilTriangle(topRowLeft, width, 10);

  let topRowLeftMid = createVector(
    origin.x - width / 2,
    origin.y + toprowOffset
  );
  let topRowRightMid = createVector(
    origin.x + width / 2,
    origin.y + toprowOffset
  );

  push();
  translate(topRowLeftMid.x, topRowLeftMid.y - 100);
  rotate(PI);
  equilTriangle(createVector(0, 0), width, 10);
  pop();

  push();
  translate(topRowRightMid.x, topRowRightMid.y - 100);
  rotate(PI);
  equilTriangle(createVector(0, 0), width, 10);
  pop();

  equilTriangle(topRowRight, width, 10);

  let steps = 10;
  let bottomHeightOffset = 1.2;
  let bottom = createVector(
    origin.x - 20,
    origin.y + height / bottomHeightOffset
  );
  let midLeft = createVector(origin.x - width / 2 - 10, origin.y + 20);
  let farLeft = createVector(origin.x - width * 1.43, origin.y + 20);

  let points = [bottom, midLeft, farLeft];

  stepPolygon(points, steps);

  let bottom1 = createVector(
    origin.x + 20,
    origin.y + height / bottomHeightOffset
  );
  let farRight = createVector(origin.x + width * 1.43, origin.y + 20);
  let midRight = createVector(origin.x + width / 2 + 10, origin.y + 20);
  let points2 = [bottom1, midRight, farRight];
  stepPolygon(points2, steps);

  let bottom2 = createVector(origin.x, origin.y + height / bottomHeightOffset);
  let midLeft2 = createVector(origin.x - width / 2 + 20, origin.y + 20);
  let midRight2 = createVector(origin.x + width / 2 - 20, origin.y + 20);
  let points3 = [bottom2, midLeft2, midRight2];
  stepPolygon(points3, steps);
}

function equilateralTriangle(origin, size) {
  let x = origin.x;
  let y = origin.y;
  let h = (size * Math.sqrt(3)) / 2;
  triangle(x, y, x + size, y, x + size / 2, y - h);
  ellipse(x, y, 5, 5);
}

function equilTriangle(origin, size, steps) {
  let startAngle = PI / 6;
  let r = size / 2;

  for (let r = size / 2; r > 0; r -= size / steps / 2) {
    let corners = [];
    for (let a = startAngle; a < TAU; a += TAU / 3) {
      let x = origin.x + r * cos(a);
      let y = origin.y + r * sin(a);

      corners.push(createVector(x, y));
    }
    stroke(255);
    beginShape();
    for (let i = 0; i < corners.length; i++) {
      let corner0 = corners[i];
      let corner1 = corners[(i + 1) % corners.length];
      i === 1 ? strokeWeight(wideStroke) : strokeWeight(narrowStroke);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
    }
    endShape(CLOSE);
  }
}

function steppedPolygon(origin, minRadius, maxRadius, shadedSide) {
  let startAngle = PI / 4;

  let corners = [];
  let steps = random(10);
  for (let a = startAngle; a < TAU; a += TAU / 4) {
    let pos = origin
      .copy()
      .add(p5.Vector.fromAngle(a, random(minRadius, maxRadius)));

    corners.push(pos);
  }

  let centerX = 0;
  let centerY = 0;
  for (let i = 0; i < corners.length; i++) {
    centerX += corners[i].x;
    centerY += corners[i].y;
  }
  centerX /= corners.length;
  centerY /= corners.length;

  fill(255);

  for (let t = 0; t < 1; t += 1 / steps) {
    let newCorners = [];
    for (let i = 0; i < corners.length; i++) {
      let pos = p5.Vector.lerp(corners[i], createVector(centerX, centerY), t);
      newCorners.push(pos);
    }
    for (let i = 0; i < newCorners.length; i++) {
      let corner0 = newCorners[i];
      let corner1 = newCorners[(i + 1) % newCorners.length];
      stroke(255);

      i === shadedSide ? strokeWeight(wideStroke) : strokeWeight(narrowStroke);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
    }
  }
}

function stepPolygon(corners, steps) {
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
      i === 1 ? strokeWeight(wideStroke) : strokeWeight(narrowStroke);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
    }
  }
}
