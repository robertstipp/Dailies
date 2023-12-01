const colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
function setup() {
  createCanvas(600, 600);

  let midX = width / 2;
  for (let x = 0; x <= width; x += 20) {
    let d = Math.abs(x - midX);
    let angle = map(d, 0, 300, 0, PI);
    let top = Math.sin(angle) * height;
    let topC = constrain(top, 20, height - 50);
    let prob = map(d, 0, 300, 0, 1);
    if (random() < prob) continue;
    tower(x, topC, 20);
  }
}

function draw() {}

function tower(x, top, width) {
  // line(x, height, x, top);

  noStroke();

  let c = color(random(colors));
  let lightSide = darken(c, 100);

  let darkSide = darken(c, 25);
  fill(lightSide);
  beginShape();
  vertex(x, height);
  vertex(x, top);
  vertex(x + width / 2, top + width / 2);
  vertex(x + width / 2, height);
  endShape(CLOSE);

  //darkside
  fill(darkSide);
  beginShape();
  vertex(x + width / 2, height);
  vertex(x + width / 2, top + width / 2);
  vertex(x + width, top);
  vertex(x + width, height);
  endShape(CLOSE);

  beginShape();
  vertex(x, top);
  vertex(x + width / 2, top - width / 2);
  vertex(x + width, top);
  vertex(x + width / 2, top + width / 2);
  endShape();
}

function darken(clr, bri) {
  let c = color(clr);
  colorMode(HSB);

  const h = hue(c);
  const s = saturation(c);
  const b = brightness(c);

  return color(h, s, bri);
}
