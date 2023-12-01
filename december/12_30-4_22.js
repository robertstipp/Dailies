function setup() {
  createCanvas(600, 600);
  background(0);
  let rMax = 300;
  let origin = createVector(width / 2, height / 2);

  // bottom lip
  let lipWidth = 400;
  lips(origin, lipWidth);
}
function draw() {}

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

  beginShape();
  lowerpoints.forEach((p) => {
    vertex(p.x, p.y);
  });
  endShape();

  beginShape();
  vertex(leftCorner.x, leftCorner.y);
  bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, origin.x, origin.y);
  bezierVertex(cp3.x, cp3.y, cp4.x, cp4.y, rightCorner.x, rightCorner.y);
  bezierVertex(cp7.x, cp7.y, cp8.x, cp8.y, bottomMid.x, bottomMid.y);
  bezierVertex(cp6.x, cp6.y, cp5.x, cp5.y, leftCorner.x, leftCorner.y);
  endShape(CLOSE);

  let upperMid = origin.copy().add(0, -lipWidth / 5);
  ellipse(upperMid.x, upperMid.y, 10, 10);

  let cp9Angle = -PI / 4;
  let cp9Len = lipWidth / 4;
  let cp9 = leftCorner.copy().add(p5.Vector.fromAngle(cp9Angle).mult(cp9Len));
  ellipse(cp9.x, cp9.y, 10, 10);

  let cp10Angle = -PI / 2 - PI / 4;
  let cp10Len = lipWidth / 4;
  let cp10 = upperMid.copy().add(p5.Vector.fromAngle(cp10Angle).mult(cp10Len));
  ellipse(cp10.x, cp10.y, 10, 10);
  bezier(
    leftCorner.x,
    leftCorner.y,
    cp9.x,
    cp9.y,
    cp10.x,
    cp10.y,
    upperMid.x,
    upperMid.y
  );

  let cp11Angle = -PI / 2 + PI / 4;
  let cp11Len = lipWidth / 4;
  let cp11 = upperMid.copy().add(p5.Vector.fromAngle(cp11Angle).mult(cp11Len));
  ellipse(cp11.x, cp11.y, 10, 10);

  let cp12Angle = -PI + PI / 4;
  let cp12Len = lipWidth / 4;
  let cp12 = rightCorner
    .copy()
    .add(p5.Vector.fromAngle(cp12Angle).mult(cp12Len));
  ellipse(cp12.x, cp12.y, 10, 10);
  bezier(
    upperMid.x,
    upperMid.y,
    cp11.x,
    cp11.y,
    cp12.x,
    cp12.y,
    rightCorner.x,
    rightCorner.y
  );

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

  beginShape();
  upperpoints.forEach((p) => {
    vertex(p.x, p.y);
  });
  endShape();

  for (let i = 0; i < 600; i++) {
    let x = random(origin.x - lipWidth / 1.2, origin.x + lipWidth / 1.2);
    let y = random(origin.y - lipWidth / 2, origin.y + lipWidth / 2);
    let pt = createVector(x, y);
    // ellipse(x, y, 10, 10);
    if (pointInPoly(upperpoints, pt) || pointInPoly(lowerpoints, pt))
      ellipse(x, y, 10, 10);
  }

  return [upperpoints, lowerpoints];
}
