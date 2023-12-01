let g, e;
function setup() {
  createCanvas(1080, 1920);
  background(0);
  e = new p5.Ease();
  g = new p5.Gen();

  noStroke();

  let origin = createVector(width / 2, height / 2);

  for (let x = 0; x < width; x += 200) {
    for (let y = 0; y < height; y += 200) {
      let origin = createVector(x, y);
      drawShape(origin);
    }
  }
}
function draw() {}

function drawShape(origin) {
  let lenEnd = 300;
  let aEnd = random(TAU);
  let end = origin
    .copy()
    .add(createVector(lenEnd * cos(aEnd), lenEnd * sin(aEnd)));
  let lenCP = 200;

  let aCP = random(aEnd - PI / 2, aEnd + PI / 2);
  let cp = origin.copy().add(createVector(lenCP * cos(aCP), lenCP * sin(aCP)));
  let steps = 100;
  fill("#FFB100");
  for (let i = 0; i < steps; i++) {
    let t = i / steps;
    let x = bezierPoint(origin.x, cp.x, cp.x, end.x, t);
    let y = bezierPoint(origin.y, cp.y, cp.y, end.y, t);
    let size = constrain(map(i, 0, steps, 80, 20), 40, 80);
    ellipse(x, y, size);
  }
  fill("#9D3C72");
  ellipse(origin.x, origin.y, 40);
}
