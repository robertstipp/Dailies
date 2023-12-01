const red = "#F23545";

function setup() {
  createCanvas(600, 800);
  background(0);
  stroke(255);

  for (let y = 300; y <= 400; y += 100) {
    for (let i = 0; i < 10; i++) {
      cube(random(width), y, 50, 100);
    }
  }
}
function draw() {}

function cube(x, y, size, height) {
  fill(changeBrightness(red, 800));
  beginShape();
  vertex(x, y);
  vertex(x - size * 1.5, y + size);
  vertex(x, y + 2 * size);
  vertex(x + size * 1.5, y + size);
  endShape(CLOSE);

  fill(changeBrightness(red, 50));

  beginShape();
  vertex(x - size * 1.5, y + size);
  vertex(x - size * 1.5, y + 3 * size + height);
  vertex(x, y + 4 * size + height);
  vertex(x, y + 2 * size);
  endShape(CLOSE);

  fill(changeBrightness(red, 100));

  beginShape();
  vertex(x + size * 1.5, y + size);
  vertex(x + size * 1.5, y + 3 * size + height);
  vertex(x, y + 4 * size + height);
  vertex(x, y + 2 * size);
  endShape(CLOSE);
}

function changeBrightness(c, b) {
  colorMode(HSB);

  const h = hue(c);
  const s = saturation(c);
  const br = brightness(c);

  return color(h, s, b);
}
