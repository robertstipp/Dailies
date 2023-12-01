let simplexNoise;

const colors = ["#33040E", "#330425", "#330425", "#210433", "#140433"];

function setup() {
  pixelDensity(4);
  createCanvas(1080, 1080);
  background(0);

  simplexNoise = new openSimplexNoise(Date.now());

  for (let r = 0; r < 500; r += 10) {
    push();
    let sw = map(r, 0, 500, 1, 3);
    noFill();
    strokeWeight(sw);
    stroke("#FFF");
    ellipse(width / 2, height / 2, r, r);
    pop();
  }

  smudges();
}

function smudges() {
  for (let i = 0; i < 1000; i++) {
    let x = random(width);
    let y = random(height);

    let size = map(noise(x / 100, y / 100), 0, 1, 1, 10);
    smudge(x, y, size);
  }
}

function smudge(x, y, size) {
  let layers = Math.floor(random(3, 10));
  let c = color(random(colors));
  c.setAlpha(255);
  noStroke();
  fill(c);
  for (let theta = 0; theta < TAU; theta += TAU / layers) {
    let r = map(theta, 0, TAU, 0, size);
    push();
    translate(x, y);
    rotate(theta);
    drawShape(r);
    pop();
  }

  function drawShape(size) {
    beginShape();
    for (let a = 0; a < TAU; a += 0.1) {
      let rad = map(
        simplexNoise.noise2D(cos(a), sin(a)),
        -1,
        1,
        size / 2,
        size
      );
      let xPos = 0 + rad * Math.cos(a);
      let yPos = 0 + rad * Math.sin(a);

      vertex(xPos, yPos);
    }
    endShape();
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_14_22.jpeg");
  }
}
