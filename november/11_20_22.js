const color1 = "#F2784B";
const color2 = "#F2BA52";
const color3 = "#F2A766";

const blue1 = ["#0962ea", "#0e7cf4", "#0aa0f6"];

function setup() {
  createCanvas(600, 600);
  stripedBackground();
  sun(200, 200, 200);
  push();
  strokeWeight(10);
  stroke(100);
  line(0, 300, width, 300);
  pop();
  for (let y = 300; y <= 350; y += 10) {
    for (let x = 0; x <= width; x += 10) {
      noStroke();
      fill(random(200, 255));
      rect(x, y, 10);
    }
  }

  for (let y = 360; y <= height; y += 5) {
    for (let x = 0; x <= width; x += 5) {
      let noiseRes = map(y, 360, height, 10, 500);
      let colorIndex = Math.floor(
        map(noise(x / noiseRes, y / 10), 0, 1, 0, blue1.length)
      );

      let c = color(blue1[colorIndex]);
      noStroke();
      fill(c);
      rect(x, y, 5);
    }
  }
  push();
  strokeWeight(5);
  stroke(100);
  line(0, 360, width, 360);
  pop();
}

function draw() {}

function sun(x, y, r) {
  noStroke();
  let grad = drawingContext.createLinearGradient(x, y - r, x, y + r);
  grad.addColorStop(0, color1);
  grad.addColorStop(0.5, color2);
  grad.addColorStop(1, color3);

  drawingContext.save();
  drawingContext.fillStyle = grad;
  ellipse(x, y, r);
  drawingContext.restore();
}

function stripedBackground() {
  push();
  for (let y = 0; y < 300; y += 10) {
    stroke(color1);
    if (random() < 0.2) {
      stroke(color2);
      line(0, y + 5, width, y + 5);
    } else if (random() < 0.5) {
      stroke(color3);
      line(0, y + 7.5, width, y + 7.5);
    }

    line(0, y, width, y);
  }
  pop();
}
