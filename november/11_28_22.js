const colors = ["#3F0071", "#FB2576", "#332FD0", "#0002A1"];
function setup() {
  createCanvas(600, 600);
  background(255);

  let c = color(colors[0]);

  // reduce brightness
  noStroke();
  for (let x = 100; x <= 120; x += 2) {
    let b = map(x, 100, 120, 0, 80);
    fill(setBrightness(c, b));
    ellipse(x, 200, 100);
  }

  shape();
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

function shape(x, y, size, color) {}
