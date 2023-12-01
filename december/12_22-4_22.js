function setup() {
  createCanvas(400, 400);
  background(20);
  fill("black");
  ellipse(200, 200, 300, 300);
  noFill();
  fill("yellow");
  noStroke();
  for (let x = 0; x <= width; x += 10) {
    for (let y = 00; y <= height; y += 10) {
      let maxDist = 300;
      let d = dist(x, y, 200, 200);
      let sizeMap = map(d, 50, maxDist, 0, 1);
      let size = circleSize(sizeMap);
      if (d > 400) continue;
      ellipse(x, y, size, size);
    }
  }
  filter(BLUR, 1.2);
}

function circleSize(x) {
  let a = 12.12477;
  let b = 0.3311592;
  let c = 0.1372203;
  let y = a * Math.exp(-Math.pow(x - b, 2) / (2 * Math.pow(c, 2)));
  return y;
}
