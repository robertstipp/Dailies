function setup() {
  createCanvas(1080, 1080, SVG);
  noFill();
  noLoop();
}
function draw() {
  let origin = createVector(width / 2, height / 2);
  let angleSteps = 17;
  for (let a = 0; a < TAU; a += TAU / angleSteps) {
    let r1 = 0;
    let r2 = 500;
    let r3 = 250;
    let r4 = 350;
    let start = origin.copy().add(p5.Vector.fromAngle(a, r1));
    let end = origin.copy().add(p5.Vector.fromAngle(a, r2));

    let cp1, cp2;

    cp1 = origin.copy().add(p5.Vector.fromAngle(a + 1, r3));
    cp2 = origin.copy().add(p5.Vector.fromAngle(a - 0.2, r4));

    let steps = 80;
    for (let i = 0; i < steps; i++) {
      let posX = bezierPoint(start.x, cp1.x, cp2.x, end.x, i / steps);
      let posY = bezierPoint(start.y, cp1.y, cp2.y, end.y, i / steps);
      let angle = map(i, 0, steps, 0, PI);

      let size = Math.abs(sin(angle) * 70);

      ellipse(posX, posY, size);
    }
  }
}

function keyPressed() {
  if (key == "s") {
    save("1_21_23.svg");
  }
}
