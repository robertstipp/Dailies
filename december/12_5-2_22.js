const yellow = "#fac901";
const white = "#FAF9F6";
const blue = "#225095";
const red = "#dd0100";

const colors = [yellow, red, blue, white];
let t = 0;
function setup() {
  createCanvas(1800, 1800);
  background("beige");
  for (let x = 100; x <= 1200; x += 100) {
    let cyclesAngle = map(x, 100, 1200, 0, PI);

    let cycles = map(Math.sin(cyclesAngle), 0, 1, 5, 10);
    for (let y = 100; y <= 1800; y += 3) {
      let scaleCycles = map(y, 100, 1800, cycles, cycles * 1.2);
      let angle = map(y, 100, 1800, 0, scaleCycles * TAU);
      let radius = map(Math.sin(angle), -1, 1, 10, 100);

      stroke(0);
      push();
      noFill();
      if (y > 110) {
        fill(0);

        ellipse(x, y, 5, 5 / 4);
      }
      pop();
      let noiseC = Math.floor(noise(x / 10, y / 10) * colors.length);
      let c = colors[noiseC];

      fill(c);
      stroke(c);

      if (noise(x / 100, y / 100) < 0.5 && radius > 20) {
        ellipse(x, y, radius, radius * 0.25);
      }
    }
  }
}
function draw() {
  background("beige");
  for (let x = 100; x <= 600; x += 100) {
    let cyclesAngle = map(x, 100, 600, 0, PI);

    let cycles = map(Math.sin(cyclesAngle), 0, 1, 5, 10);
    for (let y = 100; y <= 1800; y += 3) {
      let scaleCycles = map(y, 100, 1800, cycles, cycles * 1.2);
      let angle = map(y, 100, 1800, 0, scaleCycles * TAU);
      let radius = map(Math.sin(angle), -1, 1, 10, 100);

      stroke(0);
      push();
      noFill();
      if (y > 110) {
        fill(0);

        ellipse(x, y, 5, 5 / 4);
      }
      pop();
      let noiseC = Math.floor(noise(x / 10, y / 10, t) * colors.length);
      let c = colors[noiseC];

      fill(c);
      stroke(c);

      if (noise(x / 100, y / 100) < 0.5 && radius > 20) {
        ellipse(x, y, radius, radius * 0.25);
      }
    }
  }
  t += 0.01;
}
