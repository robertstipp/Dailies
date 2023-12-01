function setup() {
  createCanvas(600, 600);
  background(0);

  let startX = 300;
  let startY = 100;

  let endY = 500;
  stroke(255);

  for (let endX = 100; endX < 600; endX += 60) {
    dropFall(startX, startY, endX, endY, 100);
  }
}

function dropFall(startX, startY, endX, endY, steps, resolution) {
  const start = createVector(startX, startY);
  const end = createVector(endX, endY);
  strokeWeight(5);
  let maxOff = p5.Vector.dist(start, end) / 10;
  noFill();
  beginShape();
  for (let t = 0; t <= 1; t += 1 / steps) {
    const p = p5.Vector.lerp(start, end, t);
    let angle = map(t, 0, 1, 0, PI);
    let xOff = map(noise(p.x / 100), 0, 1, -maxOff, maxOff);
    let yOff = map(noise(p.y / 100), 0, 1, -maxOff, maxOff);
    // ellipse(p.x + sin(angle) * xOff, p.y + sin(angle) * yOff, 10, 10);
    curveVertex(p.x + sin(angle) * xOff, p.y + sin(angle) * yOff);
  }
  endShape();
}
