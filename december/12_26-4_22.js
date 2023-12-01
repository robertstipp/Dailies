const colors = [
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

function setup() {
  createCanvas(1080, 1080);
  background(0);
  let center = createVector(540, height / 2);
  let pillWidth = 100;

  pill(center, pillWidth);
}

function pill(center, pillWidth) {
  let diameter1 = pillWidth / 2;
  let diameter2 = diameter1 * 0.96;
  let ratioLR = random(0.5, 1.5);
  strokeJoin(ROUND);
  strokeWeight(3);
  stroke(255);

  // left Points
  let leftPoints = [];
  let leftTop = createVector(center.x, center.y - diameter1 / 2);
  let leftBottom = createVector(center.x, center.y + diameter1 / 2);

  let leftArcOrigin = createVector(
    center.x - (pillWidth / 2) * ratioLR,
    center.y
  );
  let leftAngleStart = PI / 2;
  let leftAngleStop = PI + PI / 2;
  leftPoints.push(leftBottom);
  for (let a = leftAngleStart; a <= leftAngleStop; a += 0.01) {
    let pos = leftArcOrigin.copy().add(p5.Vector.fromAngle(a, diameter1 / 2));
    leftPoints.push(pos);
  }
  leftPoints.push(leftTop);

  fill(random(colors));

  beginShape();
  leftPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);

  // right Points
  let rightPoints = [];
  let rightTop = createVector(center.x, center.y - diameter2 / 2);
  let rightBottom = createVector(center.x, center.y + diameter2 / 2);

  let rightArcOrigin = createVector(
    center.x + ((pillWidth / 2) * 1) / ratioLR,
    center.y
  );
  let rightAngleStart = -PI / 2;
  let rightAngleStop = PI / 2;
  rightPoints.push(rightTop);
  for (let a = rightAngleStart; a <= rightAngleStop; a += 0.01) {
    let pos = rightArcOrigin.copy().add(p5.Vector.fromAngle(a, diameter2 / 2));
    rightPoints.push(pos);
  }
  fill(random(colors));
  rightPoints.push(rightBottom);
  beginShape();
  rightPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
}
