function setup() {
  createCanvas(1080, 1080);

  background(255);
  noLoop();

  let vanishingPoint = createVector(width + 150, height / 2);
  ellipse(vanishingPoint.x, vanishingPoint.y, 10, 10);

  let shapeheight = height;

  let top = createVector(vanishingPoint.x, vanishingPoint.y - shapeheight / 2);
  let bottom = createVector(
    vanishingPoint.x,
    vanishingPoint.y + shapeheight / 2
  );
  ellipse(top.x, top.y, 10, 10);
  ellipse(bottom.x, bottom.y, 10, 10);

  let steps = 200;

  colorMode(HSB, 360, 100, 100, 100);
  let c = color(0, 0, 10);
  let countourInt = 10;

  noStroke();
  for (let j = width * 1.3; j >= 200; j -= countourInt) {
    let darkess = map(j, 200, 800, 80, 0);
    fill(0, 0, darkess);
    let shapePoints = [top];
    for (let i = 0; i < steps; i++) {
      let rightPos = p5.Vector.lerp(top, bottom, i / steps);
      let leftXOff = noise(rightPos.x, rightPos.y / 100, j / 1000) * j;
      let left = createVector(rightPos.x - leftXOff, rightPos.y);
      shapePoints.push(left);
      // ellipse(left.x, left.y, 10, 10);
    }
    shapePoints.push(bottom);

    beginShape();
    for (let i = 0; i < shapePoints.length; i++) {
      vertex(shapePoints[i].x, shapePoints[i].y);
    }
    endShape(CLOSE);
  }

  let vanishingPoint2 = createVector(-150, height / 2);
  ellipse(vanishingPoint2.x, vanishingPoint2.y, 10, 10);
  let top2 = createVector(
    vanishingPoint2.x,
    vanishingPoint2.y - shapeheight / 2
  );
  let bottom2 = createVector(
    vanishingPoint2.x,
    vanishingPoint2.y + shapeheight / 2
  );

  ellipse(top2.x, top2.y, 10, 10);
  ellipse(bottom2.x, bottom2.y, 10, 10);

  for (let j = width * 1.3; j > 200; j -= countourInt) {
    let darkess = map(j, 200, 800, 80, 20);
    fill(0, 0, darkess);
    let shapePoints = [top2];
    for (let i = 0; i < steps; i++) {
      let leftPos = p5.Vector.lerp(top2, bottom2, i / steps);
      let rightXOff = noise(leftPos.x, leftPos.y / 100, j / 1000) * j;
      let right = createVector(leftPos.x + rightXOff, leftPos.y);
      shapePoints.push(right);
      // ellipse(right.x, right.y, 10, 10);
    }
    shapePoints.push(bottom2);

    beginShape();
    for (let i = 0; i < shapePoints.length; i++) {
      vertex(shapePoints[i].x, shapePoints[i].y);
    }
    endShape(CLOSE);
  }
}
function draw() {}
