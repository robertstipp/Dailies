let simplexNoise;
let baseC = "#C74B50";
function setup() {
  pixelDensity(4);
  createCanvas(1080, 1080);
  background(baseC);
  simplexNoise = new openSimplexNoise(Date.now());

  noFill();
  let yStep = 20;
  let yStart = -400;
  let yEnd = height + 400;
  for (let y = yStart; y <= height + yEnd; y += yStep) {
    let sw = map(y, -400, height + 400, 1, 3);
    let xStep = map(y, -400, height + 400, 2, 1);
    strokeWeight(sw);
    beginShape();

    for (let x1 = 0; x1 <= width; x1 += xStep) {
      let angle = map(x1, 0, width, 0, 0.5 * PI);
      let yOff = 3 * Math.sin(angle) * -150;
      let y1 = y + yOff;
      if (random() < 0.1) continue;
      ellipse(x1 + random(-1, 1), y1 + random(-1, 1), 1, 1);
      // ellipse(x1, y1, 10, 10);
    }
    endShape();
    yStep = map(y, -400, height + 400, 10, 5);
  }
  for (let i = 0; i < 20; i++) {
    fallingStar(random(100, 1080), random(100, 1080), 200);
  }
  orb(300, 200, 600);
  orb(900, 540, 500);
  border(25);
}

function orb(x, y, d) {
  let r = d / 2;
  fill(baseC);
  ellipse(x, y, d, d);

  for (let i = 0; i < 100000; i++) {
    let radius = randomGaussian(0, r / 1.7);
    // let radius = random(-r * 0.9, r * 0.9);
    let angle = random(0, 2 * PI);
    fill("black");
    ellipse(x + radius * cos(angle), y + radius * sin(angle), 2, 2);
  }
}

function fallingStar(x, y, len) {
  noStroke();
  fill(baseC);
  let startPos = createVector(x, y);
  let angle = PI / 4;

  let endPos = createVector(x + -len * cos(angle), y + -len * sin(angle));
  for (let t = 0; t <= 1; t += 0.02) {
    let size = map(t, 0, 1, 10, 1);
    let point = p5.Vector.lerp(startPos, endPos, t);
    if (random() < 0.2) continue;
    ellipse(point.x, point.y, size);
  }
}

function border(thickness) {
  fill(baseC);

  rect(0, 0, width, thickness);
  rect(0, 0, thickness, height);
  rect(0, height - thickness, width, thickness);
  rect(width - thickness, 0, thickness, height);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_21_22.jpeg");
  }
}
