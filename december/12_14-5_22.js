let simplexnoise;

function setup() {
  createCanvas(600, 600);
  background(255);
  stroke(0);
  simplexnoise = new openSimplexNoise(Date.now());
  for (let x = 50; x < width; x += 50) {
    for (let y = 50; y < height; y += 50) {
      warpRect(x, y, 60, 40);
    }
  }
}
