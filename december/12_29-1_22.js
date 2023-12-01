let toColor = "#FF7000";
let fromColor = "#540375";
let g, e;
let simplexNoise;

function setup() {
  createCanvas(400, 400);
  e = new p5.Ease();
  noLoop();
  simplexNoise = new openSimplexNoise(Date.now());
}
function draw() {
  background(0);
  let origin = createVector(200, 200);
  let dStep = 1;
  let maxD = 400;
  for (let d = maxD; d >= 0; d -= dStep) {
    noStroke();
    let tVal = noise(d / 100);
    let t = e.circularInOut(tVal);
    fill(lerpColor(color(fromColor), color(toColor), t));
    // ellipse(200, 200, d, d);
    ring(origin, d);
  }
}

function ring(origin, diameter) {
  for (let a = 0; a <= TAU; a += 0.01) {
    let pos = origin.copy().add(p5.Vector.fromAngle(a, diameter / 2));
    let offset = 0;
    if (diameter < 200) {
      offset = map(diameter, 200, 0, 0, PI / 2);
    }
    let tVal = noise(pos.x / 100, pos.y / 100, cos(a + offset));
    let t = tVal;
    fill(lerpColor(color(fromColor), color(toColor), t));
    ellipse(pos.x, pos.y, 5, 5);
  }
}
