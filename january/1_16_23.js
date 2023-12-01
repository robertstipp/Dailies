let margin = 100;
let e;
function setup() {
  pixelDensity(1);
  createCanvas(888, 1000, SVG);
  noFill();
  noLoop();
  stroke(0);
  let e = new p5.Ease();
  for (let x = margin; x < width - margin; x += 100) {
    let start = createVector(x, margin);
    let end = createVector(x, height - margin);
    getPoints(start, end);
  }
}
function draw() {}
function getPoints(start, end) {
  let points = [];
  let angleOffset = map(start.x, 0, width, 0, 10 * TAU);
  for (let i = 0; i < 100; i++) {
    let pos = p5.Vector.lerp(start, end, i / 100);
    let rectSize = map(sin((i / 100) * 3 * TAU + angleOffset), -1, 1, 10, 100);
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    let angle = noise(pos.x / 1000, pos.y / 1000) * TAU;
    rotate(angle);
    rect(0, 0, rectSize);
    pop();
  }
  return points;
}

function keyPressed() {
  if (keyCode == 83) {
    save("1_2_23.svg");
  }
}
