let t = 0;
let margin = 100;

function setup() {
  createCanvas(600, 600);

  for (let x = margin; x <= width - margin; x += 100) {
    for (let y = margin; y <= height - margin; y += 100) {
      drawRing(createVector(x, y), random(25, 100));
    }
  }
}
function draw() {}

function drawRing(origin, radius) {
  let d = dist(origin.x, origin.y, 300, 300);

  const originOffsetSclX = map(noise(d), 0, 1, -100, 100);
  const originOffsetSclY = map(noise(d), 0, 1, -100, 100);

  const originOffset = createVector(originOffsetSclX, originOffsetSclY);
  origin.add(originOffset);

  const offsetSclX = noise(d) * 100;
  const offsetSclY = noise(d) * 100;

  beginShape();
  for (let angle = 0; angle < TAU; angle += 0.01) {
    let x = origin.x + radius * Math.cos(angle);
    let y = origin.y + radius * Math.sin(angle);

    let xOffset = noise(x, y) * offsetSclX;
    let yOffset = noise(x, y) * offsetSclY;
    vertex(x + xOffset, y + yOffset);

    if (random() < 0.5) {
      endShape();
      strokeWeight(noise(sin(angle), cos(angle)) * 10);
      beginShape();
    }
  }
  endShape();
}
