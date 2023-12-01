let e, g;

function setup() {
  createCanvas(1080, 1080);
  background("#ffdbc5");
  noStroke();

  e = new p5.Ease();
  g = new p5.Gen();
  noLoop();
  noStroke();
}
function draw() {
  let slope = height / width;

  for (let x = 0; x <= width; x += 10) {
    let midPos = createVector(x, height - slope * x);
    for (let y = 0; y <= height; y += 10) {
      let yDist = Math.abs(y - midPos.y);
      let yDistRatio = yDist / height;
      let xDist = Math.abs(x - width / 2);
      let xDistRatio = xDist / width;
      let ySize = map(e.quinticOut(yDistRatio), 0, 1, 0, 8);
      let xSize = map(e.quinticOut(xDistRatio), 0, 1, 0, 8);

      let size = Math.sqrt(ySize * ySize + xSize * xSize);

      let c1 = "#ffdbc5";
      let c2 = "#cf1b1b";
      let c3 = lerpColor(color(c1), color(c2), yDistRatio);
      fill(c3);
      ellipse(x, y, size);
    }
  }
}
