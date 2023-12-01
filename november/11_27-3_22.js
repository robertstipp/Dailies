function setup() {
  createCanvas(600, 600);
  background(255);
  colorMode(HSB);

  for (let x = 150; x <= 500; x += 150) {
    for (let y = 150; y <= 500; y += 150) {
      noStroke();
      circles(x, y, 100);
    }
  }
}
function draw() {}

function randomColor() {
  let hue = Math.floor(random(360));
  let saturation = Math.floor(100);
  let brightness = 60;
  let c = color(hue, saturation, brightness);
  c.setAlpha(0.7);
  return c;
}

function circles(x, y, r) {
  let c1 = randomColor();
  let c2 = randomColor();

  fill(c1);
  ellipse(x - r / 6, y, r);
  fill(c2);
  ellipse(x + r / 6, y, r);
  stroke(255);
  noFill();
}
