function setup() {
  createCanvas(1080, 1080);
  background(0);

  let origin = createVector(width / 2, height / 2);

  ellipse(origin.x, origin.y, 10, 10);

  for (let startAngle = 0; startAngle < TAU; startAngle += PI / 3) {
    let curAngle = startAngle;
    let point;
    for (let r = 0; r < 200; r += 1) {
      let angleMult = TAU * 10;
      let angle = map(r, 0, 1000, curAngle, angleMult + curAngle);
      point = createVector(
        origin.x + r * cos(angle),
        origin.y + r * sin(angle)
      );
      ellipse(point.x, point.y, 10, 10);
    }
    let angle = p5.Vector.sub(point, origin).heading() + PI;
    let finalPoint = createVector(
      point.x - 100 * cos(angle),
      point.y - 100 * sin(angle)
    );
    stroke(255);
    line(point.x, point.y, finalPoint.x, finalPoint.y);
  }
}
function draw() {}
