let t = 0;
let factor = 1;
let pos = 0;
let simplex;
// User-modifiable global variables.
var myNickname = "glitch";
var nFramesInLoop = 60;
var bEnableExport = true;

// Other global variables you don't need to touch.
var nElapsedFrames;
var bRecording;
var theCanvas;

function setup() {
  createCanvas(400, 400);
  bRecording = false;
  nElapsedFrames = 0;
  background(0);
  colorMode(HSB, 360, 100, 100, 100);
  simplex = new openSimplexNoise(random(42));
}

function draw() {
  // Compute a percentage (0...1) representing where we are in the loop.
  var percentCompleteFraction = 0;
  if (bRecording) {
    percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
  } else {
    percentCompleteFraction =
      float(frameCount % nFramesInLoop) / float(nFramesInLoop);
  }

  // Render the design, based on that percentage.
  // This function renderMyDesign() is the one for you to change.
  renderMyDesign(percentCompleteFraction);

  // If we're recording the output, save the frame to a file.
  // Note that the output images may be 2x large if you have a Retina mac.
  // You can compile these frames into an animated GIF using a tool like:
  if (bRecording && bEnableExport) {
    var frameOutputFilename =
      myNickname + "_frame_" + nf(nElapsedFrames, 4) + ".png";
    print("Saving output image: " + frameOutputFilename);
    saveCanvas(theCanvas, frameOutputFilename, "png");
    nElapsedFrames++;

    if (nElapsedFrames >= nFramesInLoop) {
      bRecording = false;
    }
  }
}

function keyTyped() {
  if (bEnableExport) {
    if (key === "f" || key === "F") {
      bRecording = true;
      nElapsedFrames = 0;
    }
  }
}
function renderMyDesign(percent) {
  background(0);
  // for (let y = 0; y <= height; y += 4) {
  //   for (let x = 0; x <= width; x += 4) {
  //     let selectVal = noise(y / 10) < 0.5 ? 0 : 1;
  //     let selectNoise = [noise, simplex.noise2D][selectVal];
  //     let aOff = selectNoise((y + pos) / 100, t / 100, factor * 100) * TAU;
  //     let a = map(x, 0, width, 0, TAU);
  //     let h = map(sin(a + aOff), -1, 1, 0, 360);
  //     let c = color(h, 100, 100, 100);
  //     strokeWeight(1);
  //     stroke(c);
  //     let len = 2;
  //     let start = createVector(x, y);
  //     let end = createVector(x, y + len);

  //     line(start.x, start.y, end.x, end.y);
  //   }
  // }
  // t += 1;

  // pos++;
  let origin = createVector(width / 2, height / 2);
  tv(origin, 300);
  t += 0.01;
  if (t % random([11, 23, 37]) === 0) {
    factor = random(1000);
  }
  pos += 0.01;
  // lips(origin, 200);
}

function tv(origin, width) {
  let verticalSteps = 300;
  let horizontalSteps = 400;
  let [upperpoints, lowerpoints] = lips(origin, 200);
  let dotSize = 1;
  let height = (width * 3) / 4;
  let bottomLeft = origin.copy().add([-width / 2, height / 2]);
  let bottomRight = origin.copy().add([width / 2, height / 2]);
  let topLeft = origin.copy().add([-width / 2, -height / 2]);
  let topRight = origin.copy().add([width / 2, -height / 2]);

  let leftCp1AngleOffset = PI / 6;
  let leftCp2AngleOffset = PI / 6;
  let leftCp1Len = 10;
  let leftCp2Len = 10;
  stroke(255);
  noFill();
  let leftCp1 = bottomLeft
    .copy()
    .add(p5.Vector.fromAngle(leftCp1AngleOffset + PI).mult(leftCp1Len));

  let leftCp2 = topLeft
    .copy()
    .add(p5.Vector.fromAngle(-leftCp2AngleOffset + PI).mult(leftCp2Len));

  // bezier(
  //   bottomLeft.x,
  //   bottomLeft.y,
  //   leftCp1.x,
  //   leftCp1.y,
  //   leftCp2.x,
  //   leftCp2.y,
  //   topLeft.x,
  //   topLeft.y
  // );

  let rightCp1AngleOffset = PI / 6;
  let rightCp2AngleOffset = PI / 6;

  let rightCp1Len = 10;
  let rightCp2Len = 10;

  let rightCp1 = bottomRight
    .copy()
    .add(p5.Vector.fromAngle(-rightCp1AngleOffset).mult(rightCp1Len));

  let rightCp2 = topRight
    .copy()
    .add(p5.Vector.fromAngle(rightCp2AngleOffset).mult(rightCp2Len));

  // bezier(
  //   bottomRight.x,
  //   bottomRight.y,
  //   rightCp1.x,
  //   rightCp1.y,
  //   rightCp2.x,
  //   rightCp2.y,
  //   topRight.x,
  //   topRight.y
  // );

  let topCp1AngleOffset = PI / 6;
  let topCp2AngleOffset = PI / 6;
  let topCp1Len = 10;
  let topCp2Len = 10;

  let topCp1 = topLeft
    .copy()
    .add(p5.Vector.fromAngle(topCp1AngleOffset - PI / 2).mult(topCp1Len));

  let topCp2 = topRight
    .copy()
    .add(p5.Vector.fromAngle(-topCp2AngleOffset - PI / 2).mult(topCp2Len));

  // bezier(
  //   topLeft.x,
  //   topLeft.y,
  //   topCp1.x,
  //   topCp1.y,
  //   topCp2.x,
  //   topCp2.y,
  //   topRight.x,
  //   topRight.y
  // );

  let bottomCp1AngleOffset = PI / 6;
  let bottomCp2AngleOffset = PI / 6;
  let bottomCp1Len = 10;
  let bottomCp2Len = 10;

  let bottomCp1 = bottomLeft
    .copy()
    .add(
      p5.Vector.fromAngle(-bottomCp1AngleOffset + PI / 2).mult(bottomCp1Len)
    );

  let bottomCp2 = bottomRight
    .copy()
    .add(p5.Vector.fromAngle(bottomCp2AngleOffset + PI / 2).mult(bottomCp2Len));

  // bezier(
  //   bottomLeft.x,
  //   bottomLeft.y,
  //   bottomCp1.x,
  //   bottomCp1.y,
  //   bottomCp2.x,
  //   bottomCp2.y,
  //   bottomRight.x,
  //   bottomRight.y
  // );

  let steps = verticalSteps;
  for (let i = 0; i <= steps; i++) {
    let leftSideX = bezierPoint(
      bottomLeft.x,
      leftCp1.x,
      leftCp2.x,
      topLeft.x,
      i / steps
    );
    let leftSideY = bezierPoint(
      bottomLeft.y,
      leftCp1.y,
      leftCp2.y,
      topLeft.y,
      i / steps
    );

    let rightSideX = bezierPoint(
      bottomRight.x,
      rightCp1.x,
      rightCp2.x,
      topRight.x,
      i / steps
    );

    let rightSideY = bezierPoint(
      bottomRight.y,
      rightCp1.y,
      rightCp2.y,
      topRight.y,
      i / steps
    );

    let leftSide = createVector(leftSideX, leftSideY);
    let rightSide = createVector(rightSideX, rightSideY);

    let cp1AngleOffset = map(i, 0, steps, PI / 6, -PI / 6);
    let cp2AngleOffset = map(i, 0, steps, PI / 6, -PI / 6);

    let cp1Len = 20;
    let cp2Len = 20;

    let cp1 = leftSide
      .copy()
      .add(p5.Vector.fromAngle(cp1AngleOffset).mult(cp1Len));
    let cp2 = rightSide
      .copy()
      .add(p5.Vector.fromAngle(-cp2AngleOffset + PI).mult(cp2Len));

    // bezier(
    //   leftSideX,
    //   leftSideY,
    //   cp1.x,
    //   cp1.y,
    //   cp2.x,
    //   cp2.y,
    //   rightSideX,
    //   rightSideY
    // );
    let sideSteps = horizontalSteps;
    for (let j = 0; j <= sideSteps; j++) {
      let x = bezierPoint(leftSideX, cp1.x, cp2.x, rightSideX, j / sideSteps);
      let y = bezierPoint(leftSideY, cp1.y, cp2.y, rightSideY, j / sideSteps);
      let p = createVector(x, y);

      let selectVal = noise(p.y / 10) < 0.5 ? 1 : 0;
      let colorVal = noise(p.y / 1, t, factor) < 0.75 ? 1 : 0;
      let selectNoise = [noise, simplex.noise2D][selectVal];
      let width = p5.Vector.dist(leftSide, rightSide);
      let d = p5.Vector.dist(leftSide, p);
      let colorAngle = map(d, 0, width, 0, TAU);
      let colorAngleOffSet = selectNoise((p.y + pos) / 100, t, factor) * TAU;
      let h = map(sin(colorAngle + colorAngleOffSet), -1, 1, 0, 360);
      let c;
      if (colorVal) {
        colorMode(HSB);
        c = color(h, 100, 100, 100);
      } else {
        colorMode(RGB);

        c = color(map(h, 0, 360, 0, 255));
      }

      let distFromCenter = p5.Vector.dist(origin, p);
      if (pointInPoly(upperpoints, p)) {
        c = color((h + 180) % 360, 100, 100, 100);
      }
      if (pointInPoly(lowerpoints, p)) {
        c = color((h + 270) % 360, 100, 100, 100);
      }
      push();
      noStroke();
      fill(c);
      ellipse(p.x, p.y, dotSize);
      pop();
    }
  }

  // beginShape();
  // vertex(bottomLeft.x, bottomLeft.y);
  // bezierVertex(
  //   leftCp1.x,
  //   leftCp1.y,
  //   leftCp2.x,
  //   leftCp2.y,
  //   topLeft.x,
  //   topLeft.y
  // );
  // bezierVertex(topCp1.x, topCp1.y, topCp2.x, topCp2.y, topRight.x, topRight.y);

  // bezierVertex(
  //   rightCp2.x,
  //   rightCp2.y,
  //   rightCp1.x,
  //   rightCp1.y,
  //   bottomRight.x,
  //   bottomRight.y
  // );

  // bezierVertex(
  //   bottomCp2.x,
  //   bottomCp2.y,
  //   bottomCp1.x,
  //   bottomCp1.y,
  //   bottomLeft.x,
  //   bottomLeft.y
  // );
  // endShape();
}

function lips(origin, lipWidth) {
  let leftCorner = origin.copy().add(-lipWidth / 2, 0);
  // ellipse(leftCorner.x, leftCorner.y, 10, 10);
  let rightCorner = origin.copy().add(lipWidth / 2, 0);
  // ellipse(rightCorner.x, rightCorner.y, 10, 10);

  let bottomAngleOffset = PI / 10;
  let cp1Angle = PI / 10;
  let cp1Len = lipWidth / 4;

  let cp2Angle = PI + PI / 10;
  let cp2Len = lipWidth / 3;
  let cp2 = origin.copy().add(p5.Vector.fromAngle(cp2Angle).mult(cp2Len));

  let cp1 = leftCorner.copy().add(p5.Vector.fromAngle(cp1Angle).mult(cp1Len));

  stroke(255);
  noFill();
  // bottomupperleft
  // bezier(
  //   leftCorner.x,
  //   leftCorner.y,
  //   cp1.x,
  //   cp1.y,
  //   cp2.x,
  //   cp2.y,
  //   origin.x,
  //   origin.y
  // );

  let cp3Angle = -PI / 10;
  let cp3Len = lipWidth / 3;
  let cp3 = origin.copy().add(p5.Vector.fromAngle(cp3Angle).mult(cp3Len));

  let cp4Angle = -PI - PI / 10;
  let cp4Len = lipWidth / 4;
  let cp4 = rightCorner.copy().add(p5.Vector.fromAngle(cp4Angle).mult(cp4Len));
  // ellipse(cp4.x, cp4.y, 10, 10);

  // ellipse(cp3.x, cp3.y, 10, 10);
  // bottomupperright
  // bezier(
  //   origin.x,
  //   origin.y,
  //   cp3.x,
  //   cp3.y,
  //   cp4.x,
  //   cp4.y,
  //   rightCorner.x,
  //   rightCorner.y
  // );

  // bottomlower

  let bottomMid = origin.copy().add(0, lipWidth / 4);

  let cp5Angle = PI / 4;
  let cp5Len = lipWidth / 4;
  let cp5 = leftCorner.copy().add(p5.Vector.fromAngle(cp5Angle).mult(cp5Len));

  let cp6Angle = PI;
  let cp6Len = lipWidth / 4;
  let cp6 = bottomMid.copy().add(p5.Vector.fromAngle(cp6Angle).mult(cp6Len));

  // bezier(
  //   leftCorner.x,
  //   leftCorner.y,
  //   cp5.x,
  //   cp5.y,
  //   cp6.x,
  //   cp6.y,
  //   bottomMid.x,
  //   bottomMid.y
  // );

  let cp7Angle = PI - PI / 4;
  let cp7Len = lipWidth / 4;
  let cp7 = rightCorner.copy().add(p5.Vector.fromAngle(cp7Angle).mult(cp7Len));

  let cp8Angle = 0;
  let cp8Len = lipWidth / 4;
  let cp8 = bottomMid.copy().add(p5.Vector.fromAngle(cp8Angle).mult(cp8Len));

  // bezier(
  //   bottomMid.x,
  //   bottomMid.y,
  //   cp8.x,
  //   cp8.y,
  //   cp7.x,
  //   cp7.y,
  //   rightCorner.x,
  //   rightCorner.y
  // );

  let lowerpoints = [];

  let maxPoints = 100;
  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(leftCorner.x, cp1.x, cp2.x, origin.x, t);
    let y = bezierPoint(leftCorner.y, cp1.y, cp2.y, origin.y, t);
    // ellipse(x, y, 10, 10);
    lowerpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(origin.x, cp3.x, cp4.x, rightCorner.x, t);
    let y = bezierPoint(origin.y, cp3.y, cp4.y, rightCorner.y, t);
    // ellipse(x, y, 10, 10);
    lowerpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(rightCorner.x, cp7.x, cp8.x, bottomMid.x, t);
    let y = bezierPoint(rightCorner.y, cp7.y, cp8.y, bottomMid.y, t);
    // ellipse(x, y, 10, 10);
    lowerpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(bottomMid.x, cp6.x, cp5.x, leftCorner.x, t);
    let y = bezierPoint(bottomMid.y, cp6.y, cp5.y, leftCorner.y, t);
    // ellipse(x, y, 10, 10);
    lowerpoints.push(createVector(x, y));
  }

  // beginShape();
  // lowerpoints.forEach((p) => {
  //   vertex(p.x, p.y);
  // });
  // endShape();

  // beginShape();
  // vertex(leftCorner.x, leftCorner.y);
  // bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, origin.x, origin.y);
  // bezierVertex(cp3.x, cp3.y, cp4.x, cp4.y, rightCorner.x, rightCorner.y);
  // bezierVertex(cp7.x, cp7.y, cp8.x, cp8.y, bottomMid.x, bottomMid.y);
  // bezierVertex(cp6.x, cp6.y, cp5.x, cp5.y, leftCorner.x, leftCorner.y);
  // endShape(CLOSE);

  let upperMid = origin.copy().add(0, -lipWidth / 5);
  // ellipse(upperMid.x, upperMid.y, 10, 10);

  let cp9Angle = -PI / 4;
  let cp9Len = lipWidth / 4;
  let cp9 = leftCorner.copy().add(p5.Vector.fromAngle(cp9Angle).mult(cp9Len));
  // ellipse(cp9.x, cp9.y, 10, 10);

  let cp10Angle = -PI / 2 - PI / 4;
  let cp10Len = lipWidth / 4;
  let cp10 = upperMid.copy().add(p5.Vector.fromAngle(cp10Angle).mult(cp10Len));
  // ellipse(cp10.x, cp10.y, 10, 10);
  // bezier(
  //   leftCorner.x,
  //   leftCorner.y,
  //   cp9.x,
  //   cp9.y,
  //   cp10.x,
  //   cp10.y,
  //   upperMid.x,
  //   upperMid.y
  // );

  let cp11Angle = -PI / 2 + PI / 4;
  let cp11Len = lipWidth / 4;
  let cp11 = upperMid.copy().add(p5.Vector.fromAngle(cp11Angle).mult(cp11Len));
  // ellipse(cp11.x, cp11.y, 10, 10);

  let cp12Angle = -PI + PI / 4;
  let cp12Len = lipWidth / 4;
  let cp12 = rightCorner
    .copy()
    .add(p5.Vector.fromAngle(cp12Angle).mult(cp12Len));
  // ellipse(cp12.x, cp12.y, 10, 10);
  // bezier(
  //   upperMid.x,
  //   upperMid.y,
  //   cp11.x,
  //   cp11.y,
  //   cp12.x,
  //   cp12.y,
  //   rightCorner.x,
  //   rightCorner.y
  // );

  let upperpoints = [];
  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(leftCorner.x, cp9.x, cp10.x, upperMid.x, t);
    let y = bezierPoint(leftCorner.y, cp9.y, cp10.y, upperMid.y, t);
    // ellipse(x, y, 10, 10);
    upperpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(upperMid.x, cp11.x, cp12.x, rightCorner.x, t);
    let y = bezierPoint(upperMid.y, cp11.y, cp12.y, rightCorner.y, t);
    // ellipse(x, y, 10, 10);
    upperpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(rightCorner.x, cp4.x, cp3.x, origin.x, t);
    let y = bezierPoint(rightCorner.y, cp4.y, cp3.y, origin.y, t);
    // ellipse(x, y, 10, 10);
    upperpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(origin.x, cp2.x, cp1.x, leftCorner.x, t);
    let y = bezierPoint(origin.y, cp2.y, cp1.y, leftCorner.y, t);
    // ellipse(x, y, 10, 10);
    upperpoints.push(createVector(x, y));
  }

  // beginShape();
  // upperpoints.forEach((p) => {
  //   vertex(p.x, p.y);
  // });
  // endShape();

  for (let i = 0; i < 600; i++) {
    let x = random(origin.x - lipWidth / 1.2, origin.x + lipWidth / 1.2);
    let y = random(origin.y - lipWidth / 2, origin.y + lipWidth / 2);
    let pt = createVector(x, y);
    // ellipse(x, y, 10, 10);
    // if (pointInPoly(upperpoints, pt) || pointInPoly(lowerpoints, pt))
    //   ellipse(x, y, 10, 10);
  }

  return [upperpoints, lowerpoints];
}

function pointInPoly(verts, pt) {
  let c = false;
  for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
    if (
      verts[i].y > pt.y != verts[j].y > pt.y &&
      pt.x <
        ((verts[j].x - verts[i].x) * (pt.y - verts[i].y)) /
          (verts[j].y - verts[i].y) +
          verts[i].x
    )
      c = !c;
  }
  return c;
}
