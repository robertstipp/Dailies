const colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];

function setup() {
  createCanvas(600, 800);
  background("black");

  brokenCircle(300, 300, 100, colors[2]);
}
function draw() {}

function brokenCircle(x, y, r, color) {
  let start = (noise(x / 1000, y / 1000) * PI) / 2;
  // let stop = map(noise(x / 1000, y / 1000), 0, 1, start, TAU);
  let stop = start + PI / 2;
  let angleOff = TAU / 30;
  let start2 = stop + angleOff;
  let stop2 = start - angleOff;
  stroke(color);
  strokeWeight(10);
  noFill();
  beginShape();
  for (let angle = start; angle <= stop; angle += 0.01) {
    let xPos = x + r * Math.cos(angle);
    let yPos = y + r * Math.sin(angle);
    vertex(xPos, yPos);
  }
  endShape(CLOSE);

  beginShape();
  for (let angle = start2; angle <= stop2 + TAU; angle += 0.01) {
    let xPos = x + r * Math.cos(angle);
    let yPos = y + r * Math.sin(angle);
    vertex(xPos, yPos);
  }
  endShape(CLOSE);
}
