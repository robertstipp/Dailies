function setup() {
  createCanvas(600, 600);
  background(200);
  noStroke();

  let x = 0;

  while (x < width - 20) {
    drawBand(x + 20, x + 100, 0, height);
    x += random(100);
  }

  let y = 0;
  while (y < height - 20) {
    drawBand(0, width, y + 20, y + 100);
    y += random(100);
  }

  let origin = createVector(300, 300);
  drawSquare(origin, 100);
}

function drawBand(xStart, xStop, yStart, yStop) {
  for (let i = 0; i < 10000; i++) {
    let x = random(xStart, xStop);
    let y = random(yStart, yStop);
    if (x > 250 && x < 350 && y > 250 && y < 350) {
      fill(255, 0, 0);
    } else {
      fill(0);
    }
    if (noise(x / 100, y / 100) < noise(y)) {
      ellipse(x, y, 4);
    }
  }
}

function drawSquare(origin, radius) {
  this.startAngle = PI / 4;
  stroke(255);
  strokeWeight(5);
  noFill();
  beginShape();

  for (
    let angle = this.startAngle;
    angle < TAU + this.startAngle;
    angle += PI / 2
  ) {
    let x = origin.x + radius * Math.cos(angle);
    let y = origin.y + radius * Math.sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}
