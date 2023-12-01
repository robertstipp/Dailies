let scale = 10;
let resolution = 0.05;

function setup() {
  createCanvas(600, 600);
  background(255);
  noStroke();

  for (let x = 100; x < width - 100; x += 100) {
    for (let y = 100; y < height - 100; y += 100) {
      for (let i = 0; i < 10; i++) {
        drawBlob(createVector(x, y));
      }
    }
  }
}
function draw() {}

function drawBlob(origin) {
  this.origin = origin;
  this.c = color("red");
  this.r = noise(origin.x, origin.y) * 100;
  this.c.setAlpha(random(50));
  this.angleStart = random(TAU);
  fill(this.c);

  beginShape();
  for (
    let angle = this.angleStart;
    angle < TAU + this.angleStart;
    angle += 0.5
  ) {
    let rOffset = random(-1, 1) * scale;

    let x = origin.x + (this.r + rOffset) * Math.cos(angle);
    let y = origin.y + (this.r + rOffset) * Math.sin(angle);
    vertex(x, y);
  }
  endShape(close);
}
