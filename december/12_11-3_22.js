let startX, stopX, startY, stopY;

let margin = 100;
function setup() {
  createCanvas(1080, 1080);
  startX = margin;
  stopX = width - margin;
  startY = margin;
  stopY = height - margin;
  background(0);
  stroke(255);
  strokeWeight(5);
  noFill();
  for (let y = startY; y <= stopY; y += 40) {
    horizLine(y, 10);
  }
}

function horizLine(yPos, step) {
  beginShape();

  for (let x = startX; x <= stopX; x += step) {
    let maxDisp = map(x * yPos, startX * startY, stopX * stopY, 0, 10);
    let angle = map(x, startX, stopX, 0, 10 * TAU);

    let yOff = Math.sin(angle) * maxDisp;
    curveVertex(x, yPos + yOff);
  }
  endShape();
}
