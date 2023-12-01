let noiseMax = 3;
function setup() {
  createCanvas(600, 800);

  sun(300, 300, 300);
}
function draw() {}

function blob(xOrigin, yOrigin, rMin, rMax, color) {
  noiseSeed(Math.floor(random(1000)));
  noStroke();
  beginShape();
  for (let angle = 0; angle <= TAU; angle += 0.1) {
    let xOff = map(Math.cos(angle), -1, 1, 0, noiseMax);
    let yOff = map(Math.sin(angle), -1, 1, 0, noiseMax);
    let r = map(noise(xOff, yOff), 0, 1, rMin, rMax);
    let x = xOrigin + r * Math.cos(angle);
    let y = yOrigin + r * Math.sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function sun(xOrigin, yOrigin, radius, color) {
  stroke(0);
  fill(255, 0, 0, 10);
  ellipse(xOrigin, yOrigin, radius);

  for (let i = 0; i < 1000; i++) {
    let angle = random(TAU);
    let r = random(1, radius / 2);
    let x = xOrigin + r * Math.cos(angle);
    let y = yOrigin + r * Math.sin(angle);
    fill(255, 0, 0, 20);
    blob(x, y, 1, 10);
  }
}
