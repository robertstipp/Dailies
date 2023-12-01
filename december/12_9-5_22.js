let m = 20;
let n = 4;

function setup() {
  createCanvas(1000, 1200);
  background(255);
  let stepX = (width - 200) / m;
  let stepY = (height - 200) / n;
  for (let x = 200 - stepX; x <= 900; x += stepX) {
    for (let y = 50; y <= 900; y += stepY) {
      trapezoid(x, y, stepX * 0.6, stepY * 0.9);
    }
  }
}

function trapezoid(x, y, w, h) {
  let topXoff1 = random(-w / 4, w / 4);
  let topXoff2 = random((w * 3) / 4, (w * 5) / 4);

  let bottomXoff1 = random(-w / 4, w / 4);
  let bottomXoff2 = random((w * 3) / 4, (w * 5) / 4);
  fill(0);
  push();
  translate(x, y);
  beginShape();

  vertex(topXoff1, 0);
  vertex(topXoff2, 0);
  vertex(bottomXoff2, h);
  vertex(bottomXoff1, h);

  endShape(CLOSE);
  pop();
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_9_22.jpeg");
  }
}
