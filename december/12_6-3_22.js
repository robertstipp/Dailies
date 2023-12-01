function setup() {
  createCanvas(600, 600);

  let origin = createVector(300, 300);
  background(0);
  stroke(255);

  noFill();
  for (let y = 10; y <= 590; y += 3) {
    beginShape();
    for (let x = 10; x <= 590; x += 0.1) {
      let d = dist(x, y, origin.x, origin.y);
      if (d < 150) {
        let angle = map(d - 150, 0, -150, 0, PI);
        let yOff = map(Math.sin(angle), 0, 1, 0, -10);
        vertex(x, y + yOff);
      }

      // ellipse(x, y, 10);
    }
    endShape();
  }
}
