let margin = 50;
let border = 25;

const colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
function setup() {
  pixelDensity(2);
  createCanvas(600, 800);
  background("white");
  myBackground();
  noFill();
  let colorIndex = 0;
  // myArc(300, 300, 500, "navy");
  for (let radius = 80; radius <= 480; radius += 100) {
    myArc(300, 300, radius, colors[colorIndex]);
    colorIndex++;
  }
}

function draw() {}

function myArc(x, y, r, color) {
  stroke(color);
  strokeWeight(35);
  strokeCap(SQUARE);
  line(x - r / 2, height - margin, x - r / 2, y);
  arc(x, y, r, r, PI, 0);
  line(x + r / 2, height - margin, x + r / 2, y);
}

function myBackground() {
  push();
  noStroke();
  fill("#fefae0");
  rect(border, border, width - 2 * border, height - 2 * border);
  pop();
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_14-3_22.jpeg");
  }
}
