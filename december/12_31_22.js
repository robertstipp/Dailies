let e, g;

function setup() {
  createCanvas(1080, 1920);
  background(0);

  noFill();
  noLoop();
  e = new p5.Ease();
  g = new p5.Gen();
}
function draw() {
  let vPoint = createVector(width / 2, height / 3);

  ellipse(vPoint.x, vPoint.y, 10, 10);

  let roofLeft = createVector(-500, 0);
  let roofRight = createVector(1080 + 500, 0);
  stroke(200);
  // roof
  let steps = 100;
  for (let i = steps; i > 0; i--) {
    let tVal = map(i, 0, steps, 0, 1);
    let t = e.quadraticIn(tVal);
    let leftSide = p5.Vector.lerp(roofLeft, vPoint, 1 - t);
    let rightSide = p5.Vector.lerp(roofRight, vPoint, 1 - t);
    // line(leftSide.x, leftSide.y, rightSide.x, rightSide.y);

    jitterLine(leftSide, rightSide);
  }

  // floor
  let floorSteps = 500;
  let floorLeft = createVector(-100, height + 200);
  let floorRight = createVector(width + 100, height + 200);
  for (let i = floorSteps; i > 0; i--) {
    let tVal = map(i, 0, floorSteps, 0, 1);
    let t = e.quadraticIn(tVal);
    let leftSide = p5.Vector.lerp(floorLeft, vPoint, 1 - t);
    let rightSide = p5.Vector.lerp(floorRight, vPoint, 1 - t);
    // line(leftSide.x, leftSide.y, rightSide.x, rightSide.y);

    jitterLine(leftSide, rightSide);
  }

  // leftLedgeSide

  let leftLedgeSteps = 200;

  let leftLedgeLeft = createVector(0, height * 0.75);

  for (let i = leftLedgeSteps; i > 0; i--) {
    let tVal = map(i, 0, leftLedgeSteps, 0, 1);
    let t = e.quadraticIn(tVal);
    let leftLedgeTop = p5.Vector.lerp(leftLedgeLeft, vPoint, 1 - t);
    let leftLedgeBottom = p5.Vector.lerp(floorLeft, vPoint, 1 - t);
    // line(leftLedgeTop.x, leftLedgeTop.y, leftLedgeBottom.x, leftLedgeBottom.y);

    jitterLine(leftLedgeTop, leftLedgeBottom);
  }

  let leftWallBase = createVector(-500, height * 0.75);

  for (let i = leftLedgeSteps; i > 0; i--) {
    let tVal = map(i, 0, leftLedgeSteps, 0, 1);
    let t = e.quadraticIn(tVal);
    let leftWallTop = p5.Vector.lerp(leftWallBase, vPoint, 1 - t);
    let leftWallBottom = p5.Vector.lerp(leftLedgeLeft, vPoint, 1 - t);
    // ellipse(leftWallTop.x, leftWallTop.y, 10, 10);
    // ellipse(leftWallBottom.x, leftWallBottom.y, 10, 10);

    // line(leftWallTop.x, leftWallTop.y, leftWallBottom.x, leftWallBottom.y);

    jitterLine(leftWallTop, leftWallBottom);
  }
  let leftWallSteps = 230;
  for (let i = leftWallSteps; i > 0; i--) {
    let tVal = map(i, 0, leftWallSteps, 0, 1);
    let t = e.quadraticIn(tVal);
    let leftWallTop = p5.Vector.lerp(leftWallBase, vPoint, 1 - t);
    let leftWallBottom = p5.Vector.lerp(leftLedgeLeft, vPoint, 1 - t);
    let leftSide = p5.Vector.lerp(roofLeft, vPoint, 1 - t);
    // ellipse(leftWallBottom.x, leftWallBottom.y, 10, 10);
    // ellipse(leftSide.x, leftSide.y, 10, 10);
    // line(leftWallTop.x, leftWallTop.y, leftSide.x, leftSide.y);

    jitterLine(leftWallTop, leftSide);
  }

  // rightLedgeSide
  let rightLedgeSteps = 230;
  let rightLedgeRight = createVector(width, height * 0.75);
  for (let i = rightLedgeSteps; i > 0; i--) {
    let tVal = map(i, 0, rightLedgeSteps, 0, 1);
    let t = e.quadraticIn(tVal);
    let rightLedgeTop = p5.Vector.lerp(rightLedgeRight, vPoint, 1 - t);
    let rightLedgeBottom = p5.Vector.lerp(floorRight, vPoint, 1 - t);
    // line(
    //   rightLedgeTop.x,
    //   rightLedgeTop.y,
    //   rightLedgeBottom.x,
    //   rightLedgeBottom.y
    // );
    jitterLine(rightLedgeTop, rightLedgeBottom);
  }

  let rightWallBase = createVector(width + 500, height * 0.75);
  for (let i = rightLedgeSteps; i > 0; i--) {
    let tVal = map(i, 0, rightLedgeSteps, 0, 1);
    let t = e.quadraticIn(tVal);
    let rightWallTop = p5.Vector.lerp(rightWallBase, vPoint, 1 - t);
    let rightWallBottom = p5.Vector.lerp(rightLedgeRight, vPoint, 1 - t);
    // line(rightWallTop.x, rightWallTop.y, rightWallBottom.x, rightWallBottom.y);

    jitterLine(rightWallTop, rightWallBottom);
  }
  let rightWallSteps = 230;
  for (let i = rightWallSteps; i > 0; i--) {
    let tVal = map(i, 0, rightWallSteps, 0, 1);
    let t = e.quadraticIn(tVal);
    let rightWallTop = p5.Vector.lerp(rightWallBase, vPoint, 1 - t);
    let rightWallBottom = p5.Vector.lerp(rightLedgeRight, vPoint, 1 - t);
    let rightSide = p5.Vector.lerp(roofRight, vPoint, 1 - t);
    // line(rightWallTop.x, rightWallTop.y, rightSide.x, rightSide.y);

    jitterLine(rightWallTop, rightSide);
  }

  for (let i = 0; i < 100; i++) {
    let t = random(0.1, 0.9);

    let size = map(e.quadraticIn(t), 0.1, 0.9, 2, 30);
    let leftSide = p5.Vector.lerp(floorLeft, vPoint, 1 - t);
    let rightSide = p5.Vector.lerp(floorRight, vPoint, 1 - t);

    let xPos = random(leftSide.x, rightSide.x);
    let yPos = random(leftSide.y, rightSide.y);
    let base = createVector(xPos, yPos);
    push();
    stroke(0);
    person(base, size);
    pop();
  }

  for (let i = 0; i < 100; i++) {
    let t = random(0.1, 0.9);

    let size = map(e.quadraticIn(t), 0.1, 0.9, 2, 22);
    let leftWallTop = p5.Vector.lerp(leftWallBase, vPoint, 1 - t);
    let leftWallBottom = p5.Vector.lerp(leftLedgeLeft, vPoint, 1 - t);

    let xPos = random(leftWallTop.x, leftWallBottom.x);
    let yPos = random(leftWallTop.y, leftWallBottom.y);
    let base = createVector(xPos, yPos);
    push();
    stroke(0);
    person(base, size);
    pop();
  }

  for (let i = 0; i < 100; i++) {
    let t = random(0.1, 0.9);

    let size = map(e.quadraticIn(t), 0.1, 0.9, 4, 22);
    let rightWallTop = p5.Vector.lerp(rightWallBase, vPoint, 1 - t);
    let rightWallBottom = p5.Vector.lerp(rightLedgeRight, vPoint, 1 - t);

    let xPos = random(rightWallTop.x, rightWallBottom.x);
    let yPos = random(rightWallTop.y, rightWallBottom.y);
    let base = createVector(xPos, yPos);
    push();
    stroke(0);
    person(base, size);
    pop();
  }
}

function jitterLine(point1, point2, stroke = 1, steps = 300) {
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let pos = p5.Vector.lerp(point1, point2, i / steps);
    let jitter = createVector(random(-stroke, stroke), random(-stroke, stroke));
    pos.add(jitter);

    vertex(pos.x, pos.y);
  }
  endShape();
}

function person(base, headSize) {
  let headPos = createVector(base.x, base.y - headSize * 7);
  let bodyPos = createVector(base.x, base.y - headSize * 3);
  let feetPos = base.copy();
  // ellipse(headPos.x, headPos.y, headSize * 2, headSize * 2);
  ellipse(feetPos.x, feetPos.y, headSize, headSize);

  // head
  for (let i = 0; i < 60; i++) {
    let angle1 = random(0, TWO_PI);
    let angle2 = random(angle1 + PI * 0.8, angle1 + PI * 1.2);
    let r1 = headSize;
    let r2 = headSize * 1.5;
    let pos1x = headPos.x + r1 * cos(angle1);
    let pos1y = headPos.y + r2 * sin(angle1);
    let pos2x = headPos.x + r1 * cos(angle2);
    let pos2y = headPos.y + r2 * sin(angle2);
    let pos1 = createVector(pos1x, pos1y);
    let pos2 = createVector(pos2x, pos2y);
    jitterLine(pos1, pos2, 1, 10);
  }
  let bodySize = headSize * 3;
  // body
  for (let i = 0; i < 60; i++) {
    let angle1 = random(0, TWO_PI);
    let angle2 = random(angle1 + PI * 0.8, angle1 + PI * 1.2);
    let r1 = bodySize / 4;
    let r2 = bodySize;
    let pos1x = bodyPos.x + r1 * cos(angle1);
    let pos1y = bodyPos.y + r2 * sin(angle1);
    let pos2x = bodyPos.x + r1 * cos(angle2);
    let pos2y = bodyPos.y + r2 * sin(angle2);
    let pos1 = createVector(pos1x, pos1y);
    let pos2 = createVector(pos2x, pos2y);
    jitterLine(pos1, pos2, 1, 10);
  }

  // legs
}

function keyPressed() {
  if (keyCode == 83) {
    save("12_5_22.jpg");
  }
}
