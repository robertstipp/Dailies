let simplexNoise;
function setup() {
  createCanvas(1080, 1080);
  background("#f1c550");
  simplexNoise = new openSimplexNoise(Date.now());

  // let y = 0;
  stroke(0);
  for (let y = -500; y <= height + 500; y += 10) {
    let c = lerpColor(color("black"), color("#3e065f"), y / height);
    stroke(c);
    noFill();
    let sw = map(y, -500, height + 500, 10, 1);
    strokeWeight(sw);
    let curY = y;
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let angle = map(simplexNoise.noise2D(x / 500, 1), -1, 1, -PI / 6, PI / 6);
      let len = 20;
      let y1 = curY + len * sin(angle);
      // vertex(x, y1);

      point(x, y1);
      curY = y1;
    }
    endShape();
  }
  orb(300, 300, 400, color("#f1c550"));
  orb(800, 500, 500, color("#f1c550"));
}

function orb(x, y, r, c) {
  fill(c);
  noStroke();

  ellipse(x, y, r, r);

  for (let xPos = x - r / 2; xPos <= x + r / 2; xPos += 10) {
    for (let yPos = y - r / 2; yPos <= y + r / 2; yPos += 10) {
      if (dist(x, y, xPos, yPos) <= r / 2) {
        stroke(0);
        let sw = map(simplexNoise.noise2D(xPos, yPos), -1, 1, 1, 10);
        strokeWeight(sw);
        stroke("#ea4c4c");
        point(xPos, yPos);
      }
    }
  }
}
