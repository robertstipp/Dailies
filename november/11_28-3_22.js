function setup() {
  createCanvas(600, 600);
  background(0);
  noFill();
  stroke(255);
  strokeWeight(3);
  ellipse(300, 300, 300);
  line(300 - 150, 300, 300 + 150, 300);
  arc(300, 300, 100, 100, PI, TAU);

  for (let angle = PI; angle <= TAU + 0.1; angle += PI / 6) {
    let innerR = 100 / 2;
    let outerR = 300 / 2;

    let innerX = 300 + innerR * Math.cos(angle);
    let outerX = 300 + outerR * Math.cos(angle);

    let innerY = 300 + innerR * Math.sin(angle);
    let outerY = 300 + outerR * Math.sin(angle);

    line(innerX, innerY, outerX, outerY);
  }
  // ellipse(300, 300, 100);
}
function draw() {}
