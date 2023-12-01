let angle = 0;
function setup() {
  createCanvas(540, 960);
  noStroke();
  fill(0, 15, 20);
}
function draw() {
  background(255);

  let x = width;
  let dia = 50;
  let num = 100;

  translate(width / 2, height / 2);
  for (let a = 0; a < 360; a += 22.5) {
    push();
    rotate(radians(a));
    for (let i = 0; i < num; i++) {
      scale(0.95);
      rotate(radians(angle));
      ellipse(x, 0, dia, dia);
    }
    pop();

    push();
    rotate(radians(a));
    for (let i = 0; i < num; i++) {
      scale(0.95);
      rotate(radians(-angle));
      ellipse(x, 0, dia, dia);
    }
    pop();
  }

  angle += 0.01;
  console.log(frameRate());
}
