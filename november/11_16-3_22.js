const myRed = "#DC3535";

function setup() {
  createCanvas(600, 800);
  background(myRed);
  brokenCircle(300, 300, 200);
  trieyeangle(100, 300, 500, 300, 100);
}

function brokenCircle(x, y, r) {
  stroke(0);
  noFill();
  for (let i = 0; i < 10; i++) {
    let startAngle = random(TAU);
    beginShape();
    for (let angle = startAngle; angle <= TAU + startAngle; angle += 0.1) {
      let rad = map(noise(startAngle, angle), 0, 1, 0.95 * r, 1.05 * r);
      let xPos = x + rad * Math.cos(angle);
      let yPos = y + rad * Math.sin(angle);
      vertex(xPos, yPos);
    }
    endShape(CLOSE);
  }
}

function trieyeangle(startX, startY, endX, endY, height) {
  let midX = lerp(startX, endX, 0.5);

  for (let midY = startY + height; midY >= startY - height; midY -= 10) {
    beginShape();
    vertex(startX, startY);
    vertex(midX, midY);

    vertex(endX, endY);
    endShape();
  }
}
