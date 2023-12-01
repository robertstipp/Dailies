// const colors = ["#98ddca", "#d5ecc2", "#ffaaa7"];

const colors = ["#353535", "#3c6e71", "#ffffff", "#d9d9d9", "#ß284b63"];
function setup() {
  createCanvas(600, 600);
  background(0);
  stroke(255);
  strokeWeight(3);
  // noFill();
  // noStroke();

  for (let x = 0; x <= width; x += 10) {
    for (let y = 0; y <= height; y += 10) {
      if (noise(x, y) < 0.5) ellipse(x, y, noise(x, y) * 10);
    }
  }

  for (let yRange = height; yRange >= 100; yRange -= 100) {
    let x = 0;
    beginShape();
    fill(random(colors));
    while (x < width) {
      let y = height;
      let yStep = random(yRange);
      let xStep = random(50, 100);
      for (let increment = 0; increment < 4; increment++) {
        if (increment % 4 == 0) {
          vertex(x, y);
          y -= yStep;
        }
        if (increment % 4 == 1) {
          vertex(x, y);
          x += xStep;
        }

        if (increment % 4 == 2) {
          vertex(x, y);
          y += yStep;
        }

        if (increment % 4 == 3) {
          vertex(x, y);
          x -= 100;
        }
      }
      x += 100;
    }
    endShape();
  }
}
function draw() {}
