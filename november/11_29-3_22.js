function setup() {
  createCanvas(600, 600);
  background(0);

  let origin = createVector(300, 300);
  let src = createVector(300, 450);
  let cp = createVector(300, 350);
  noFill();
  stroke(255);
  // ellipse(origin.x, origin.y, 10);
  // ellipse(origin.x, origin.y, 300);
  strokeWeight(3);
  stroke("gold");
  for (let angle = PI; angle <= TAU; angle += PI / 20) {
    let x = origin.x + 150 * Math.cos(angle);
    let y = origin.y + 150 * Math.sin(angle);
    // ellipse(x, y, 10);
    bezier(src.x, src.y, cp.x, cp.y, cp.x, cp.y, x, y);
  }
  line(origin.x + 150, origin.y, origin.x + 150, origin.y + 50);
  for (let y = 20; y < 50; y += 20) {
    bezier(src.x, src.y, cp.x, cp.y, cp.x, cp.y, origin.x + 150, origin.y + y);
  }
  arc(origin.x, origin.y, 300, 300, PI, TAU);
  arc(origin.x + 150, origin.y + 200, 300, 300, PI, TAU);
}
