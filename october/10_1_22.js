function setup() {
  createCanvas(600, 600);
  noStroke();
  colorMode(HSB);
  background(0);
  for (let x = 100; x <= width - 100; x += 200) {
    for (let y = 100; y <= height - 100; y += 100) {
      makeCircles(x, y, 50);
    }
  }
}
function draw() {}

function makeCircles(xpos, ypos, r) {
  let spacing = 3;
  const colors = fillRandomColor();

  fillRandomColor(fill(100, 100, 100));
  ellipse(xpos - r / spacing, ypos, r);
  fillRandomColor(colors[1]);
  ellipse(xpos, ypos, r);
  fillRandomColor(colors[2]);
  ellipse(xpos + r / spacing, ypos, r);
}

function fillRandomColor() {
  const colors = [];

  let hue = int(random(360));
  let saturation = 33;
  let brightness = 33;
  for (i = 0; i < 3; i++) {
    let c = color(200, 100, 100);
    colors.push(c);
    saturation += 33;
    brightness += 33;
  }
  console.log(colors);
  return colors;
}
