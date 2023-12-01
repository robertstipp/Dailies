let wideStroke = 1;
let narrowStroke = 1;
let size = 50;
function setup() {
  createCanvas(1080, 1080, SVG);

  noLoop();
  noFill();
  stroke(0);
}
function draw() {
  let yStep = Math.sin(PI / 3) * size;
  let xStep = Math.cos(PI / 3) * size * 2 + size * 2;
  let count = 0;

  for (let y = 100; y <= height - 100; y += yStep) {
    let xOff = 0;
    if (count % 2 === 0) {
      xOff = size + Math.cos(PI / 3) * size;
    }
    for (let x = 100; x <= width - 100; x += xStep) {
      let origin = createVector(x + xOff, y);
      hexagon(origin, size);
    }
    count++;
  }
}

function hexagon(origin, size) {
  beginShape();
  for (let a = 0; a < TAU; a += TAU / 6) {
    let pos = origin.copy().add(p5.Vector.fromAngle(a, size));
    vertex(pos.x, pos.y);
  }

  let angles = [0, (2 * PI) / 3, (4 * PI) / 3];
  for (let a of angles) {
    let corner1 = a;
    let corner2 = a + PI / 3;
    let corner3 = a + (2 * PI) / 3;
    let cornerPos = origin.copy();
    let corner1Pos = origin.copy().add(p5.Vector.fromAngle(corner1, size));
    let corner2Pos = origin.copy().add(p5.Vector.fromAngle(corner2, size));
    let corner3Pos = origin.copy().add(p5.Vector.fromAngle(corner3, size));

    let corners = [cornerPos, corner1Pos, corner2Pos, corner3Pos];
    let steps = noise(cornerPos.x / 100, cornerPos.y) * 10;
    stepPolygon(corners, steps);
  }
  endShape();
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

function keyPressed() {
  if (key === "s") {
    save();
  }
}
