let g;

function setup() {
  createCanvas(1080, 1080);
  g = new p5.Gen();
  background(0);
  noLoop();
}
function draw() {
  eye(createVector(540, 540), 1000);
}

function eye(origin, size) {
  noFill();
  stroke(255);
  strokeWeight(3);
  let leftCorner = origin.copy().add(-size / 2, 0);
  ellipse(leftCorner.x, leftCorner.y, 10);
  let rightCorner = origin.copy().add(size / 2, 0);
  ellipse(rightCorner.x, rightCorner.y, 10);

  // upperLid
  let upperAngle = atan2(
    rightCorner.y - leftCorner.y,
    rightCorner.x - leftCorner.x
  );

  let upperinnerOffset = PI / 4;
  let upperinnerLen = leftCorner.dist(rightCorner) / 2;
  let upperouterOffset = PI / 4;
  let upperlen = leftCorner.dist(rightCorner) / 2;

  let upperLidCp1 = leftCorner
    .copy()
    .add(p5.Vector.fromAngle(upperAngle - upperinnerOffset, upperinnerLen));

  let upperLidCp2 = rightCorner
    .copy()
    .add(p5.Vector.fromAngle(upperAngle + upperouterOffset, -upperlen));

  let steps = 100;
  // for (let i = 0; i <= steps / 2; i++) {
  //   let x1 = bezierPoint(
  //     leftCorner.x,
  //     upperLidCp1.x,
  //     upperLidCp2.x,
  //     rightCorner.x,
  //     i / steps
  //   );

  //   let y1 = bezierPoint(
  //     leftCorner.y,
  //     upperLidCp1.y,
  //     upperLidCp2.y,
  //     rightCorner.y,
  //     i / steps
  //   );

  //   let x2 = bezierPoint(
  //     leftCorner.x,
  //     upperLidCp1.x,
  //     upperLidCp2.x,
  //     rightCorner.x,
  //     (steps - i) / steps
  //   );

  //   let y2 = bezierPoint(
  //     leftCorner.y,
  //     upperLidCp1.y,
  //     upperLidCp2.y,
  //     rightCorner.y,
  //     (steps - i) / steps
  //   );

  //   line(x1, y1, x2, y2);
  // }

  // lowerLid
  let lowerAngle = atan2(
    leftCorner.y - rightCorner.y,
    leftCorner.x - rightCorner.x
  );
  let lowerinnerOffset = PI / 4 - PI;
  let lowerinnerLen = leftCorner.dist(rightCorner) / 2;
  let lowerouterOffset = PI / 4 + PI / 2;
  let lowerlen = leftCorner.dist(rightCorner) / 2;
  let lowerLidCp1 = leftCorner
    .copy()
    .add(p5.Vector.fromAngle(lowerAngle + lowerinnerOffset, lowerinnerLen));
  let lowerLidCp2 = rightCorner
    .copy()
    .add(p5.Vector.fromAngle(lowerAngle + lowerouterOffset, -lowerlen));

  for (let i = 0; i <= steps / 2; i++) {
    let upperx1 = bezierPoint(
      leftCorner.x,
      upperLidCp1.x,
      upperLidCp2.x,
      rightCorner.x,
      i / steps
    );

    let uppery1 = bezierPoint(
      leftCorner.y,
      upperLidCp1.y,
      upperLidCp2.y,
      rightCorner.y,
      i / steps
    );

    let upperx2 = bezierPoint(
      leftCorner.x,
      upperLidCp1.x,
      upperLidCp2.x,
      rightCorner.x,
      (steps - i) / steps
    );

    let uppery2 = bezierPoint(
      leftCorner.y,
      upperLidCp1.y,
      upperLidCp2.y,
      rightCorner.y,
      (steps - i) / steps
    );

    let lowerx1 = bezierPoint(
      leftCorner.x,
      lowerLidCp1.x,
      lowerLidCp2.x,
      rightCorner.x,
      i / steps
    );

    let lowery1 = bezierPoint(
      leftCorner.y,
      lowerLidCp1.y,
      lowerLidCp2.y,
      rightCorner.y,
      i / steps
    );

    let lowerx2 = bezierPoint(
      leftCorner.x,
      lowerLidCp1.x,
      lowerLidCp2.x,
      rightCorner.x,
      (steps - i) / steps
    );

    let lowery2 = bezierPoint(
      leftCorner.y,
      lowerLidCp1.y,
      lowerLidCp2.y,
      rightCorner.y,
      (steps - i) / steps
    );
    let vertstripes = 100;
    for (let j = 0; j < vertstripes; j++) {
      if (random() > 0.5) continue;
      let upper1Point = createVector(upperx1, uppery1);
      let upper2Point = createVector(upperx2, uppery2);
      let lower1Point = createVector(lowerx1, lowery1);
      let lower2Point = createVector(lowerx2, lowery2);

      let spot1 = p5.Vector.lerp(upper1Point, lower1Point, j / vertstripes);
      point(spot1.x, spot1.y);
      let spot2 = p5.Vector.lerp(upper2Point, lower2Point, j / vertstripes);
      point(spot2.x, spot2.y);
    }
    // line(upperx1, uppery1, upperx2, uppery2);
    // line(lowerx1, lowery1, lowerx2, lowery2);

    // line(upperx1, uppery1, lowerx1, lowery1);
    // line(upperx2, uppery2, lowerx2, lowery2);
  }

  // iris
  let irisSize = size / 2;
  noStroke();
  fill("black");

  ellipse(origin.x, origin.y, irisSize);
  let eyeDots = 100000;
  for (let i = 0; i < eyeDots; i++) {
    let r = map(
      g.random(Math.random(), "even"),
      0,
      1,
      irisSize / 5,
      irisSize / 2
    );
    let angle = map(g.random(Math.random(), "even"), 0, 1, 0, TAU);
    let x = origin.x + r * cos(angle);
    let y = origin.y + r * sin(angle);
    let start = origin.copy();
    let end = createVector(x, y);
    let steps = 5;

    stroke("#19a337");
    point(x, y);
    // for (let u = 0; u <= steps; u++) {
    //   let spot = p5.Vector.lerp(start, end, u / steps);
    //   let spotSize = map(u, 0, steps, 0, 5);
    //   strokeWeight(3);

    //   // line(origin.x, origin.y, spot.x, spot.y);
    //   point(spot.x, spot.y);
    // }
  }

  // pupil
  let pupilSize = irisSize / 2;
  stroke(255);
  fill(0);
  // ellipse(origin.x, origin.y, pupilSize);
}
