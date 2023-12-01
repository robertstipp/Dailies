let a = 0;
function setup() {
  createCanvas(540, 960);
  noStroke();
  // colorMode(HSB);
  fill(0, 15, 20);
}
function draw() {
  background(255);
  let x = width + 100;
  let dia = 50;
  let num = 70;

  translate(width / 2, height / 2);
  for (let angle = 0; angle < 360; angle += 22.5) {
    rotate(radians(angle));
    push();
    for (let i = 0; i < num; i++) {
      scale(0.95);
      rotate(radians(a));
      ellipse(x, 0, dia, dia);
    }
    pop();

    push();
    for (let i = 0; i < num; i++) {
      scale(0.95);
      rotate(radians(-a));
      ellipse(x, 0, dia, dia);
    }
    pop();
  }

  a += 0.04;
}
