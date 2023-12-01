let e, g;

function setup() {
  createCanvas(600, 600);
  background(0);
  e = new p5.Ease();
  for (let x = 0; x < width / 2; x += 20) {
    let period = 100;

    waveyLine(x, 10, period);
  }
  let origin = createVector(width / 2, height / 2);
  orb(origin, 300);
}
function draw() {}

function waveyLine(startX, amp, period) {
  noFill();
  stroke(255);
  beginShape();

  for (let y = 0; y < height; y += 1) {
    let x = startX + amp * sin((y / period) * TWO_PI);
    vertex(x, y);

    // ellipse(x, y, 2);
  }
  endShape();
}

function orb(origin, size) {
  fill("black");
  ellipse(origin.x, origin.y, size);

  for (let y = origin.y - size / 2; y < origin.y + size / 2; y += 10) {
    let angle = asin((2 * (y - origin.y)) / size);

    let x = origin.x - (size / 2) * cos(angle);
    let endX = map(sin(angle), -1, 1, origin.x, x);
    stroke("white");

    line(endX, y, x, y);

    // ellipse(x, y, 2);
  }
}
