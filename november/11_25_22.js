function setup() {
  createCanvas(600, 800);
  background(0);
  stroke(255);
  const vanishingPoint = createVector(100, 500);

  // ellipse(vanishingPoint.x, vanishingPoint.y, 10);
  passage(vanishingPoint.x, vanishingPoint.y);
  for (let i = 0; i <= 100; i++) {
    let x = random(width / 2, width);
    let y = random(height);

    let d = dist(x, y, vanishingPoint.x, vanishingPoint.y);
    let scl = map(d, 0, 300, 0, 20);

    ellipse(x, y, scl);

    line(x, y, vanishingPoint.x, vanishingPoint.y);
  }
}

function draw() {}

function passage(x, y) {
  fill(255);
  let r = 20;
  rectMode(CENTER);
  rect(x, y, r, r);
  arc(x, y - r / 2, r, r, PI, 0);
}
