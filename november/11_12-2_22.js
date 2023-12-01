function setup() {
  createCanvas(600, 700);

  pixelDensity(3);
  background("#fff9e0");
  barBackground();

  circleShape();
}

function draw() {}

function barBackground() {
  let margin = 50;
  let barHeight = 10;
  fill("#313848");
  for (let y = margin; y <= height - margin; y += barHeight * 2) {
    rect(margin, y, width - 2 * margin, barHeight);
  }
}
function circleShape() {
  let c = color("#ff6600");
  noStroke();
  fill(c);
  ellipse(300, 300, 300);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_22_22.jpeg");
  }
}
