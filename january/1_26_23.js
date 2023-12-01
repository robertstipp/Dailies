function setup() {
  createCanvas(1080, 1080);
  background(0);
  noLoop();
}
function draw() {
  for (let x = 100; x <= width - 100; x += 50) {
    for (let y = 100; y <= height - 100; y += 100) {
      let origin = createVector(x, y);
      let h = 50;
      stroke(255);
      stickFigure(origin, h);
    }
  }
  let origin = createVector(width / 2, height / 2);

  stickFigure(origin, h);
}

function stickFigure(base, h) {
  // ellipse(base.x, base.y, 5, 5);
  let w = h * 0.5;
  let head = createVector(base.x, base.y - h);
  let waist = base.copy();
  let chest = createVector(base.x, base.y - h * 0.5);
  let legLen = h * 0.5;
  let legInt = map(base.x, 0, width, 0, 2 * PI);
  let legAngle = map(sin(legInt), -1, 1, 0.2, 0.8);

  let Lfoot = base.copy().add(p5.Vector.fromAngle(legAngle * PI, legLen));
  let Rfoot = base.copy().add(p5.Vector.fromAngle((1 - legAngle) * PI, legLen));
  let armLen = h * 0.5;
  let armInt = map(base.y, 0, height, 0, 2 * PI);
  let armAngle = map(sin(armInt), -1, 1, -0.2, 0.2);
  let LHand = chest.copy().add(p5.Vector.fromAngle(PI + PI * armAngle, armLen));
  let RHand = chest.copy().add(p5.Vector.fromAngle(-PI * armAngle, armLen));
  ellipse(head.x, head.y, h * 0.5, h * 0.5);
  // ellipse(waist.x, waist.y, 5, 5);
  // ellipse(Lfoot.x, Lfoot.y, 5, 5);
  // ellipse(Rfoot.x, Rfoot.y, 5, 5);
  // ellipse(LHand.x, LHand.y, 5, 5);
  // ellipse(RHand.x, RHand.y, 5, 5);
  // ellipse(chest.x, chest.y, 5, 5);

  line(chest.x, chest.y, base.x, base.y);
  line(waist.x, waist.y, Lfoot.x, Lfoot.y);
  line(waist.x, waist.y, Rfoot.x, Rfoot.y);
  line(chest.x, chest.y, LHand.x, LHand.y);
  line(chest.x, chest.y, RHand.x, RHand.y);
  line(head.x, head.y, chest.x, chest.y);
}
