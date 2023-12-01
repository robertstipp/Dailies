function setup() {
  createCanvas(600, 600);
  background(0);

  band();
}
function draw() {}

function band() {
  stroke(255);
  for (let x = 100; x < 500; x += 10) {
    let y1 = 200;
    let y2 = 400;
    let y3 = 200 + lerp(y1 / 2, y2 / 2, Math.sin(map(x, 100, 500, 0, 2 * PI)));
    ellipse(x, y1, 10);
    ellipse(x, y2, 10);
    ellipse(x, y3, 10);
    line(x, y1, x, y2);
  }
}
