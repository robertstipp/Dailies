const colors = ["#FFF", "#000", "#0924bb", "#f95416", "#7b4e36", "#f3cc93"];
let orange = "#f95416";
let black = "#000";
let white = "#FFF";
function setup() {
  createCanvas(600, 600);
  background(0);

  for (let x = 0; x <= width; x += 20) {
    stroke(random(colors));
    strokeWeight(10);
    line(x, 0, x, height);
  }
  for (let y = 0; y <= height; y += 20) {
    stroke(random(colors));
    strokeWeight(5);
    line(0, y, width, y);
  }
}
function draw() {}

function pill(center, pillWidth) {
  let diameter1 = pillWidth / 2;
  let diameter2 = diameter1 * 0.96;
  let ratioLR = random(0.5, 1.5);
  strokeJoin(ROUND);
  strokeWeight(2);
  stroke(0);

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
  fill("#f2e9e4");
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
  rightPoints.push(rightBottom);
  fill(random(colors));
  beginShape();
  rightPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
}
