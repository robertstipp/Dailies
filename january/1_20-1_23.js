function setup() {
  createCanvas(1080, 1080, SVG);

  noLoop();
}
function draw() {
  let steps = 500;
  stroke(0);
  let start = createVector(100, height / 2);
  let end = createVector(width - 100, height / 2);
  for (let i = 0; i < steps; i++) {
    let posAngle = map(i, 0, steps, 0, 2 * PI);
    let center = createVector(height / 2, width / 2);
    let pos = center.copy().add(p5.Vector.fromAngle(posAngle, 300));
    noFill();

    let angle = map(i, 0, steps, 0, 2 * PI);
    let angle2 = map(i, 0, steps, 0, 2 * PI);
    let yOff = sin(angle2) * 100;

    let r1 = 150 + sin(angle) * 100;
    let r2 = 1.1 * r1;
    ellipse(pos.x, pos.y + yOff, r1, r2);
  }
}

function keyPressed() {
  if (key == "s") {
    save("1_20-1_23.svg");
  }
}
