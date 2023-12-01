const colors = ["#b6ffea", "#fce2ae", "#ffb3b3", "#ffdcf7"];

function setup() {
  createCanvas(600, 600);
  background(30);
  noStroke();
  for (let yStart = 0; yStart <= height + 300; yStart += 5) {
    let yOff = yStart;
    let cycles = int(random(5));
    let maxSteps = int(random(100));
    let step = 0;
    for (let x = 0; x <= width; x += 10) {
      step++;
      let angle = map(x, 0, width, 0, cycles * TAU);
      let y = 10 * Math.sin(angle);

      yOff -= 5;

      if (y + yOff < 0) break;
      if (step > maxSteps) break;

      let circleR = map(step, 1, maxSteps, 1, 10);

      if (random() < 0.5) {
        let colorsIndex = Math.floor(map(x, 0, width, 0, colors.length - 1));
        noStroke();
        fill(colors[colorsIndex]);
      } else if (random() > 0.9) {
        noFill();
        stroke(255);
      } else {
        noStroke();
        fill(255);
      }

      ellipse(x, y + yOff, circleR);
    }
  }
}

function draw() {}
