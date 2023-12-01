let e, g;
let grid = [];
let rows = 10;
let cols = 10;
function setup() {
  pixelDensity(1);
  createCanvas(869, 1152, SVG);
  noFill();
  // background(0);
  noLoop();
  e = new p5.Ease();
  g = new p5.Gen();
}
function draw() {
  let origin = createVector(width / 2, height / 2);
  for (let r = 300; r < 320; r += 1) {
    beginShape();
    for (let a = 0; a < 20 * TAU; a += 0.1) {
      let rEff = map(a, 0, 10 * TAU, 0, r);
      let pos = origin
        .copy()
        .add(p5.Vector.fromAngle(a, rEff))
        .add(p5.Vector.fromAngle(40 * a, rEff / 10));
      vertex(pos.x, pos.y);
    }
    endShape();
  }
}

function keyPressed() {
  if (key == "s") {
    save();
  }
}
