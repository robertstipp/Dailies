function setup() {
  pixelDensity(2);
  createCanvas(600, 600);
  background("#fff5de");
  let r = 10;
  let angle = PI / 2;
  let angleStep = PI / 14;
  while (r < 205) {
    shapeLines(300, 300, r, r * 1.4, angle);
    r *= 1.01;
    angle += angleStep;
  }
}
function draw() {}

function shapeLines(x, y, r1, r2, angle) {
  let x0 = x;
  let y0 = y;

  let x1 = x0 + r1 * Math.cos(angle);
  let y1 = y0 + r1 * Math.sin(angle);

  let x2 = x0 + r2 * Math.cos(angle);
  let y2 = y0 + r2 * Math.sin(angle);

  stroke("#9b72aa");
  strokeWeight(5);
  line(x0, y0, x2, y2);
  strokeWeight(6);
  stroke("#3c5186");
  line(x0, y0, x1, y1);
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_13_22.jpeg");
  }
}
