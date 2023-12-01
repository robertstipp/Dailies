let simplexNoise;

function setup() {
  createCanvas(1080, 1080);
  background(0);
  simplexNoise = new openSimplexNoise(Date.now());
  fill(255);
  stroke(255);

  for (let r = 310; r > 0; r -= 50) {
    shape(r);
  }
}

function shape(r) {
  beginShape();
  for (let a = 0; a < TAU; a += 0.1) {
    let rad = r;
    let rad1 = rad / 2;
    let resolution = 1000;
    let xPos = 540 + rad * cos(a);
    let yPos = 540 + rad * sin(a);
    noFill();
    let xOff = map(
      simplexNoise.noise3D(xPos / resolution, yPos / resolution, cos(a)),
      0,
      1,
      rad / 2,
      rad
    );
    let yOff = map(
      simplexNoise.noise3D(xPos / resolution, yPos / resolution, cos(a)),
      0,
      1,
      rad1 / 2,
      rad1
    );
    // ellipse(xPos + xOff, yPos + yOff, 10, 10);
    vertex(xPos + xOff, yPos + yOff);
    line(xPos, yPos, xPos + xOff, yPos + yOff);
  }
  endShape(CLOSE);
}
