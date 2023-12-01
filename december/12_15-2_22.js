let simplexNoise;

function setup() {
  createCanvas(600, 600);
  background(255);
  stroke(0);
  strokeWeight(1);
  simplexNoise = new openSimplexNoise(Date.now());
  noFill();
  for (let r = 10; r < 500; r += 10) {
    beginShape();

    for (let a = 0; a <= TAU; a += 0.01) {
      let resolution = map(r, 10, 400, 1000, 10);

      let xPos = width / 3 + r * cos(a);
      let yPos = height / 3 + r * sin(a);

      let xOff = map(
        simplexNoise.noise2D(cos(a) / 100, r / resolution),
        -1,
        1,
        -r / 3,
        r / 3
      );

      vertex(xPos + xOff, yPos);
    }
    endShape();
  }
}
