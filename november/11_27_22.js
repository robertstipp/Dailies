const colors = [
  "#f72585",
  "#b5179e",
  "#7209b7",
  "#560bad",
  "#480ca8",
  "#3a0ca3",
  "#3f37c9",
  "#4361ee",
  "#4895ef",
  "#4cc9f0",
];

function setup() {
  createCanvas(1080, 600);
  background(255);
  noStroke();
  for (let x = 100; x <= 400; x += 100) {
    shape(x, 300, 50);
  }
}

function shape(x, y, size, placement) {
  // shape1
  let point0 = createVector(x, y);
  let point1 = createVector(x, y - size);
  let point2 = createVector(x - size / 3, y - size / 3);

  // shape2
  let point3 = createVector(x + size / 3, y - size / 3);

  // shape3
  let point4 = createVector(x + size, y);

  // shape4
  let point5 = createVector(x + size / 3, y + size / 3);

  // shape5
  let point6 = createVector(x, y + size);

  // shape6
  let point7 = createVector(x - size / 3, y + size / 3);

  // shape7
  let point8 = createVector(x - size, y);

  // shape8
  let point9 = createVector(x - size / 3, y - size / 3);

  // shape9
  let point10 = createVector(x - size * (6 / 7), y - size * (6 / 7));

  // shape10
  let point11 = createVector(x + size * (6 / 7), y - size * (6 / 7));

  // shape11
  let point12 = createVector(x + size * (6 / 7), y + size * (6 / 7));

  // shape12
  let point13 = createVector(x - size * (6 / 7), y + size * (6 / 7));

  // shape13
  let point14 = createVector(x + size, y - size);
  // stroke(255);

  // shape1
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point1.x, point1.y);
  vertex(point2.x, point2.y);
  endShape(CLOSE);
  // shape2
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point1.x, point1.y);
  vertex(point3.x, point3.y);
  endShape(CLOSE);

  // shape3
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point4.x, point4.y);
  vertex(point3.x, point3.y);
  endShape(CLOSE);

  // shape4
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point4.x, point4.y);
  vertex(point5.x, point5.y);
  endShape(CLOSE);

  // shape5
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point6.x, point6.y);
  vertex(point5.x, point5.y);
  endShape(CLOSE);

  // shape6
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point7.x, point7.y);
  vertex(point6.x, point6.y);
  endShape(CLOSE);

  // shape7
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point7.x, point7.y);
  vertex(point8.x, point8.y);
  endShape(CLOSE);

  // shape8
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point9.x, point9.y);
  vertex(point8.x, point8.y);
  endShape(CLOSE);

  // shape9
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point8.x, point8.y);
  vertex(point2.x, point2.y);
  vertex(point1.x, point1.y);
  vertex(point10.x, point10.y);
  endShape(CLOSE);

  // shape10
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point3.x, point3.y);
  vertex(point1.x, point1.y);
  vertex(point11.x, point11.y);
  vertex(point4.x, point4.y);
  endShape(CLOSE);

  // shape11
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point4.x, point4.y);
  vertex(point5.x, point5.y);
  vertex(point6.x, point6.y);
  vertex(point12.x, point12.y);
  endShape(CLOSE);

  // shape12
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point6.x, point6.y);
  vertex(point7.x, point7.y);
  vertex(point8.x, point8.y);
  vertex(point13.x, point13.y);
  endShape(CLOSE);

  //if top
  // shape13
  fill(setBrightness(random(colors), random(100)));
  beginShape();
  vertex(point14.x, point14.y);
  vertex(point4.x, point4.y);
  vertex(point11.x, point11.y);
  endShape();

  //shape14
  // ellipse(point14.x, point14.y, 10);
  // ellipse(point4.x, point4.y, 10);
  // ellipse(point1.x, point1.y, 10);
  // ellipse(point11.x, point11.y, 10);
}

function setBrightness(c, brightness) {
  push();

  colorMode(HSB);
  let h = hue(c);
  let s = saturation(c);

  // new color
  const newC = color(h, s, brightness);
  pop();
  return newC;
}
