const colors = ["#e5f1e3", "#a3cd9e", "#529471", "#35635b"];

function setup() {
  createCanvas(600, 600);
  background(0);
  stroke(255);
  noFill();
  let strokeCount = 0;
  let angleCount = 1;
  let yStep = 100;
  for (let yInit = 100; yInit <= height - 100; yInit += yStep) {
    angleCount++;
    for (let i = 0; i < 100; i++) {
      let x = 0;
      let y = yInit;

      beginShape();
      strokeCount = (strokeCount + 1) % 4;

      while (x < width) {
        stroke(255);
        if (random() < 0.5) {
          endShape();
          beginShape();
        } else {
          vertex(x, y);
        }
        let x1 = x;
        let y1 = y;
        let xRange = map(angleCount, 1, height / 100, 60, 20);
        let x2 = x + noise(x / 100, y / 100) * xRange;
        let midX = (x1 + x2) / 2;
        let yRange = Math.abs(
          Math.cos(angleCount * map(midX, 0, width, 0, PI)) * 50
        );

        let y2 = random(yInit - yRange, yInit + yRange);
        if (x2 > width) {
          x2 = 600;
          y2 = yInit;

          vertex(x2, y2);
          break;
        }
        // line(x1, y1, x2, y2);
        x = x2;
        y = y2;
      }
      endShape();
    }
  }
}

function draw() {}
