const colors = ["#FDDA0D", "#50C878", "#FFA700", "#E34234"];
const circleColors = ["#0047AB"];

function setup() {
  createCanvas(1080, 1920);
  background(255);
  let mainAngle = random(-PI / 8, PI / 8) + PI / 2;

  let spanLen = 1700;
  let spanHLen = spanLen / 2;
  let center = createVector(width / 2, height / 2);

  let base = center.copy().add(p5.Vector.fromAngle(mainAngle, spanHLen));
  let top = center.copy().add(p5.Vector.fromAngle(mainAngle, -spanHLen));

  let steps = 10;
  let numCircles = 3;
  for (let i = 0; i <= steps; i++) {
    if (Math.random() > 0.2) continue;
    let pos = p5.Vector.lerp(base, top, i / steps);
    let len = random(50, 100);
    let subBase = pos.copy().add(p5.Vector.fromAngle(mainAngle + PI / 2, len));
    let subTop = pos.copy().add(p5.Vector.fromAngle(mainAngle - PI / 2, len));
    let subInt = Math.random(1);
    let subPos = p5.Vector.lerp(subBase, subTop, subInt);
    noStroke();
    fill(random(circleColors));
    let size = map(i, 0, steps, width / 5, width / 2);
    ellipse(subPos.x, subPos.y, size);
  }

  steps = 10;
  for (let i = 0; i <= steps; i++) {
    let pos = p5.Vector.lerp(base, top, i / steps);
    let len = random(width / 6, width / 3);
    let subBase = pos.copy().add(p5.Vector.fromAngle(mainAngle + PI / 2, len));
    let subTop = pos.copy().add(p5.Vector.fromAngle(mainAngle - PI / 2, len));
    let subInt = Math.random(1);
    let subPos = p5.Vector.lerp(subBase, subTop, subInt);

    rectMode(CENTER);
    push();
    translate(subPos);
    shearX(random(-PI / 8, PI / 8));
    noStroke();
    fill(random(colors));
    rotate(random([0, PI / 2, PI, (PI * 3) / 2]));
    noiseRect(0, 0, random(100, 300), random(100, 300), 0.1);
    pop();
  }
  // push();
  // translate(center);
  // shearX(PI / 8);
  // noiseRect(0, 0, 100, 100, 0.1);
  // pop();
}
function draw() {}

function noiseRect(x, y, w, h, noiseScale) {
  let bottomLeft = createVector(x - w / 2, y + h / 2);
  let topLeft = createVector(x - w / 2, y - h / 2);
  let topRight = createVector(x + w / 2, y - h / 2);
  let bottomRight = createVector(x + w / 2, y + h / 2);

  corners = [bottomLeft, topLeft, topRight, bottomRight];
  let randomOffset = 1;

  push();
  beginShape();
  corners.forEach((corner) => {
    corner.add([
      random(-randomOffset, randomOffset),
      random(-randomOffset, randomOffset),
    ]);

    vertex(corner.x, corner.y);
    // ellipse(corner.x, corner.y, 5);
  });
  endShape(CLOSE);
  pop();
}
