let e;

function setup() {
  createCanvas(1080, 1920);
  background(0);

  e = new p5.Ease();

  stroke(255);
  for (let y = 100; y < height; y += 100) {
    for (let x = 100; x < width; x += 100) {
      let base = createVector(x, y);
      tree(base, 10, random(100, 200));
    }
  }
}

function tree(base, width, height) {
  fill(255);
  let top = createVector(base.x, base.y - height);
  let stumpWidth = width * 1.2;
  let stumpHeight = height * 0.05;
  // let baseLeft
  let stumpBaseLeft = createVector(base.x - stumpWidth / 2, base.y);

  let stumpTopLeft = createVector(
    base.x - width / 2,
    stumpBaseLeft.y - stumpHeight
  );

  let stumpLeftangle = atan2(
    stumpTopLeft.y - stumpBaseLeft.y,
    stumpTopLeft.x - stumpBaseLeft.x
  );
  let stumpLeftLen =
    dist(stumpTopLeft.x, stumpTopLeft.y, stumpBaseLeft.x, stumpBaseLeft.y) / 5;

  let stumpLeftOffset = PI / 9;

  let stumpLeftCp1 = stumpBaseLeft
    .copy()
    .add(
      p5.Vector.fromAngle(stumpLeftangle + stumpLeftOffset, stumpLeftLen / 2)
    );

  let stumpLeftCp2 = stumpTopLeft
    .copy()
    .add(
      p5.Vector.fromAngle(stumpLeftangle - stumpLeftOffset, -stumpLeftLen / 2)
    );

  let stumpBaseRight = createVector(base.x + stumpWidth / 2, base.y);
  let stumpTopRight = createVector(
    base.x + width / 2,
    stumpBaseLeft.y - stumpHeight
  );

  let stumpRightangle = atan2(
    stumpTopRight.y - stumpBaseRight.y,
    stumpTopRight.x - stumpBaseRight.x
  );

  let stumpRightLen =
    dist(stumpTopRight.x, stumpTopRight.y, stumpBaseRight.x, stumpBaseRight.y) /
    5;

  let stumpRightOffset = -PI / 9;

  let stumpRightCp1 = stumpBaseRight
    .copy()
    .add(
      p5.Vector.fromAngle(stumpRightangle + stumpRightOffset, stumpRightLen / 2)
    );
  let stumpRightCp2 = stumpTopRight
    .copy()
    .add(
      p5.Vector.fromAngle(
        stumpRightangle - stumpRightOffset,
        -stumpRightLen / 2
      )
    );

  let topLeft = createVector(base.x - width / 2, base.y - height);
  let topRight = createVector(base.x + width / 2, base.y - height);

  fill(255);
  beginShape();
  vertex(base.x, base.y);
  vertex(stumpBaseLeft.x, stumpBaseLeft.y);
  bezierVertex(
    stumpLeftCp1.x,
    stumpLeftCp1.y,
    stumpLeftCp2.x,
    stumpLeftCp2.y,
    stumpTopLeft.x,
    stumpTopLeft.y
  );
  vertex(topLeft.x, topLeft.y);
  vertex(topRight.x, topRight.y);
  vertex(stumpTopRight.x, stumpTopRight.y);
  bezierVertex(
    stumpRightCp2.x,
    stumpRightCp2.y,
    stumpRightCp1.x,
    stumpRightCp1.y,
    stumpBaseRight.x,
    stumpBaseRight.y
  );
  endShape(CLOSE);

  let maxCanopyWidth = height / 2;
  let minCanopyWidth = height / 10;
  for (let i = 0; i <= 20; i++) {
    if (i < 4) continue;
    let branchNode = p5.Vector.lerp(base, top, i / 20);
    // let canopyWidth = map(i, 0, 10, maxCanopyWidth, minCanopyWidth);
    let canopyWidth = map(
      e.smoothStep(i / 20),
      0,
      1,
      maxCanopyWidth,
      minCanopyWidth
    );

    let branchLeft = createVector(branchNode.x - canopyWidth / 2, branchNode.y);
    let branchRight = createVector(
      branchNode.x + canopyWidth / 2,
      branchNode.y
    );

    let max = map(i, 0, 20, 300, 40);
    let needleWidth = map(i, 0, 20, height / 15, height / 20);
    for (let j = 0; j < max; j++) {
      let needleNode = p5.Vector.lerp(branchLeft, branchRight, j / max);
      let direction = atan2(
        needleNode.y - branchNode.y,
        needleNode.x - branchNode.x
      );
      let angleOffset = direction + random(-PI / 2, PI / 2);
      if ((direction = 0)) angle;
      needleNode.add(p5.Vector.fromAngle(random(TAU), random(-5, 5)));
      if (random() < 0.8) continue;
      pineNeedles(needleNode, needleWidth, angleOffset, false);
    }
  }

  for (let i = 0; i < 10; i++) {
    pineNeedles(
      top.copy().sub(0, -10),
      height / 20,
      random(PI + PI / 3, TAU - PI / 3, false)
    );
  }
}

function pineNeedles(base, size, direction, subBranch) {
  let end = base.copy().add(p5.Vector.fromAngle(direction, size));
  line(base.x, base.y, end.x, end.y);

  if (subBranch) return;
  for (let i = 0; i <= 100; i++) {
    if (i > 0) {
      let point = p5.Vector.lerp(base, end, i / 100);
      let subBranchSize = size * 0.5;
      let subBranchDirection = direction + random(-PI / 4, PI / 4);

      pineNeedles(point, subBranchSize, subBranchDirection, true);
    }
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_25_22.jpeg");
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_25_22.jpeg");
  }
}
