function setup() {
  createCanvas(400, 400);
  background(0);

  let c = color(255);
  noFill();

  strokeWeight(1);

  for (let r = 10; r < 200; r += 35) {
    let angleStep = map(r, 10, 200, TAU / 30, TAU / 100);
    let diameter = map(r, 10, 200, 10, 30);
    let c = color(255);
    for (let angle = 0; angle < TAU; angle += angleStep) {
      let x = 200 + r * cos(angle);
      let y = 200 + r * sin(angle);
      let a = atan2(y - 200, x - 200);
      for (let i = 0; i < 3; i++) {
        let radius = r + i * 2;
        let x1 = 200 + radius * cos(a);
        let y1 = 200 + radius * sin(a);
        c.setAlpha(80);
        stroke(c);
        ellipse(x1, y1, diameter, diameter);
      }
      c.setAlpha(200);
      stroke(c);
      ellipse(x, y, diameter, diameter);
    }
  }
  fill(255, 200);
  ellipse(200, 200, 50, 50);
}
