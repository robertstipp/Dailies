const colors = ["#7a08fa", "#a82ffc", "#c264fe", "#f8ecfd"];

const cWidth = 600;
const cHeight = 600;

function setup() {
  createCanvas(cWidth, cHeight);
  background(0);
  stroke(255);
  // noStroke();

  for (let y = 100; y <= height - 100; y += 20) {
    fill(random(colors));
    let raiseStart = map(noise(y / 100), 0, 1, 100, 300);
    let raiseEnd = map(noise(y / 100), 0, 1, 300, 400);
    let raiseHeight = 20;
    beginShape();
    for (let x = 0; x <= width; x += 2) {
      if (x >= raiseStart && x <= raiseEnd) {
        vertex(x, y - raiseHeight);
      } else {
        vertex(x, y);
      }
    }
    endShape();
  }
}
function draw() {}
