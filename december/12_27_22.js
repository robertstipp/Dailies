const pelletPallete = [
  "#54478c",
  "#2c699a",
  "#048ba8",
  "#0db39e",
  "#16db93",
  "#83e377",
  "#b9e769",
  "#efea5a",
  "#f1c453",
  "#f29e4c",
];
const capsulePallete = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];
function setup() {
  pixelDensity(1);
  createCanvas(1080, 1920, SVG);
  noFill();
  push();
  translate(width / 2, height / 2);
  rotate(PI / 2);
  pill(createVector(0, 0), 1200, 0, false);
  pop();
}

function pill(center, width, direction, subPill) {
  let diameter1 = width / 2;
  let diameter2 = diameter1 * 0.96;

  let leftBottom = center
    .copy()
    .add(p5.Vector.fromAngle(direction + PI / 2, +diameter1 / 2));

  let leftTop = center
    .copy()
    .add(p5.Vector.fromAngle(direction - PI / 2, diameter1 / 2));

  let leftCenter = center
    .copy()
    .add(p5.Vector.fromAngle(direction, -width / 2));

  let leftendAngle = direction + PI / 2;
  let leftstart = direction - PI / 2;

  let leftPoints = [];

  leftPoints.push(leftBottom);
  for (let a = leftstart; a <= leftendAngle; a += 0.1) {
    let pos = leftCenter.copy().add(p5.Vector.fromAngle(a, -diameter1 / 2));
    leftPoints.push(pos);
  }

  let rightCenter = center
    .copy()
    .add(p5.Vector.fromAngle(direction, width / 2));

  let rightTop = center
    .copy()
    .add(p5.Vector.fromAngle(direction + PI / 2, -diameter2 / 2));

  let rightBottom = center
    .copy()
    .add(p5.Vector.fromAngle(direction - PI / 2, -diameter2 / 2));

  let rightendAngle = direction + PI / 2;
  let rightstartAngle = direction - PI / 2;

  let rightPoints = [];
  rightPoints.push(rightTop);
  for (let a = rightstartAngle; a <= rightendAngle; a += 0.1) {
    let pos = rightCenter.copy().add(p5.Vector.fromAngle(a, diameter2 / 2));
    rightPoints.push(pos);
  }
  rightPoints.push(rightBottom);

  // full range X (Parallel to Direction)

  let leftMax = center
    .copy()
    .add(p5.Vector.fromAngle(direction, -width / 2 - diameter1 / 2));

  let rightMax = center
    .copy()
    .add(p5.Vector.fromAngle(direction, width / 2 + diameter2 / 2));

  // fullRangeY (Perpendicular to Direction)
  let topMax = center
    .copy()
    .add(p5.Vector.fromAngle(direction - PI / 2, (diameter1 / 2) * 0.85));

  let bottomMax = center
    .copy()
    .add(p5.Vector.fromAngle(direction + PI / 2, (diameter1 / 2) * 0.85));

  let topMax2 = center
    .copy()
    .add(p5.Vector.fromAngle(direction - PI / 2, (diameter2 / 2) * 0.85));

  let bottomMax2 = center
    .copy()
    .add(p5.Vector.fromAngle(direction + PI / 2, (diameter2 / 2) * 0.85));

  // randomPoint

  if (!subPill) {
    for (let i = 0; i < 3000; i++) {
      let randomPoint = createVector(
        random(leftMax.x, rightMax.x),
        random(topMax.y, bottomMax2.y)
      );
      let valid = false;
      // filter points inside the pill

      // left side
      // left arc
      stroke("white");
      if (randomPoint.x < leftMax.x + diameter1 / 2) {
        let d = dist(randomPoint.x, randomPoint.y, leftCenter.x, leftCenter.y);
        if (d < (diameter1 / 2) * 0.85) {
          valid = true;
          // ellipse(randomPoint.x, randomPoint.y, 10, 10);
        }
      }

      if (
        randomPoint.x > leftMax.x + diameter1 / 2 &&
        randomPoint.x < center.x
      ) {
        if (randomPoint.y > topMax.y && randomPoint.y < bottomMax.y) {
          valid = true;
          // ellipse(randomPoint.x, randomPoint.y, 10, 10);
        }
      }

      // right side
      if (
        randomPoint.x > center.x &&
        randomPoint.x < rightMax.x - diameter2 / 2
      ) {
        if (randomPoint.y > topMax2.y && randomPoint.y < bottomMax.y) {
          valid = true;
        }
      }

      if (randomPoint.x > rightMax.x - diameter2 / 2) {
        let d = dist(
          randomPoint.x,
          randomPoint.y,
          rightCenter.x,
          rightCenter.y
        );
        if (d < (diameter2 / 2) * 0.85) {
          valid = true;
          // ellipse(randomPoint.x, randomPoint.y, 10, 10);
        }
      }

      if (valid) {
        noFill();

        pill(randomPoint, 50, random(0, TWO_PI), true);
        // ellipse(randomPoint.x, randomPoint.y, 10, 10);
      }
    }
  }
  let capsuleColor = color(random(capsulePallete));
  if (!subPill) {
    capsuleColor.setAlpha(200);
  }

  fill(capsuleColor);
  stroke("black");

  strokeWeight(4);
  if (subPill) strokeWeight(2);

  strokeJoin(MITER);
  leftPoints.push(leftTop);
  beginShape();
  leftPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
  noFill();

  if (subPill) fill("#f2e9e4");
  beginShape();
  rightPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);

  // smile
  if (subPill) return;
  let eyeWidth = diameter1 * 0.25;
  let eyeCenter = center.copy().add(p5.Vector.fromAngle(direction, -width / 3));
  let smileCenter = center
    .copy()
    .add(p5.Vector.fromAngle(direction, -width / 4));
  noFill();

  strokeWeight(10);
  arc(
    smileCenter.x,
    smileCenter.y,
    eyeWidth,
    eyeWidth,
    direction - PI / 2,
    direction + PI / 2
  );
  noStroke();
  let pupilSizeW = eyeWidth * 1;
  let pupilSizeWHRatio = 1.3;
  let leftEye = eyeCenter
    .copy()
    .add(p5.Vector.fromAngle(direction - PI / 2, eyeWidth));
  let rightEye = eyeCenter
    .copy()
    .add(p5.Vector.fromAngle(direction + PI / 2, eyeWidth));
  push();
  stroke(0);
  ellipse(
    leftEye.x,
    leftEye.y,
    pupilSizeW,
    (pupilSizeW * 1) / pupilSizeWHRatio
  );
  ellipse(
    rightEye.x,
    rightEye.y,
    pupilSizeW,
    (pupilSizeW * 1) / pupilSizeWHRatio
  );

  pop();
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_27_22.svg");
  }
}
