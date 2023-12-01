function setup() {
  createCanvas(600, 600);
  background(0);
  for (let radius = 5; radius <= 500; radius += 20) {
    myArc(300, 300, radius);
    myArc(300, 300, radius + 6);
    myArc(300, 300, radius + 12);
  }
}
function draw() {}

function myArc(x, y, r) {
  noFill();
  strokeWeight(2);
  stroke("blue");
=
  beginShape();
  vertex(x + r, 0);
  for (let angle = 0; angle <= PI; angle += 0.01) {
    let xPos = x + r * Math.cos(angle);
    let yPos = y + r * Math.sin(angle);
    vertex(xPos, yPos);
  }
  vertex(x - r, 0);
  endShape();
}
