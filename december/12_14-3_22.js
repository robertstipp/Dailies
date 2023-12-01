const colors = ["#FEF4C0", "#FDB10B", "#FE8535", "#FD292F", "#B20000"];

let simplexNoise;
let maxDist;
function setup() {
  pixelDensity(4);
  createCanvas(888, 1215, SVG);

  simplexNoise = new openSimplexNoise(Date.now());
  stroke(0);
  noFill();
  strokeWeight(1);
  // noStroke();
  maxDist = dist(50, 50, width / 2, height / 2);
  let xStep = 20;
  let yStep = 20;
  for (let y = 100; y <= height - 100; y += yStep) {
    for (let x = 100; x <= width - 100; x += xStep) {
      let w = map(
        Math.abs(x - width / 2),
        0,
        width / 2 - 100,
        xStep * 0.8,
        xStep * 0.5
      );
      let h = map(
        Math.abs(y - height / 2),
        0,
        height / 2 - 100,
        yStep * 0.9,
        yStep * 0.5
      );
      w = constrain(w, xStep * 0.25, xStep * 0.75);
      h = constrain(h, yStep * 0.25, yStep * 0.75);
      warpedRect(x, y, w, h);
    }
  }
}

function warpedRect(x, y, w, h) {
  let point0 = createVector(x - w / 2, y - h / 2);
  let point1 = createVector(x + w / 2, y - h / 2);
  let point2 = createVector(x + w / 2, y + h / 2);
  let point3 = createVector(x - w / 2, y + h / 2);

  let points = [point0, point1, point2, point3];
  points = points.map(warpPoint);
  beginShape();
  points.forEach((point) => vertex(point.x, point.y));
  endShape(CLOSE);
}

function warpPoint(point) {
  let x = point.x;
  let y = point.y;
  let d = dist(x, y, width / 2, height / 2);
  let angle = map(
    simplexNoise.noise3D(x / 100, y / 100, d / 1000),
    -1,
    1,
    0,
    2 * TAU
  );
  let len = map(d, 0, maxDist, 20, 10);
  let xPos = x + cos(angle) * len;
  let yPos = y + sin(angle) * len;
  return createVector(xPos, yPos);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_14_22.svg");
  }
}
