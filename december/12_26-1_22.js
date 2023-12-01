function setup() {
  createCanvas(1080, 1080);
  background(0);

  stroke(255);
  let origin = createVector(width / 2, height / 2);
  let highLight = createVector(width / 2 + 500, height / 2 - 500);
  let diameter = 1000;
  noFill();

  ellipse(origin.x, origin.y, 1000);

  for (let a = 0; a <= TAU; a += TAU / 100) {
    let pos = origin.copy().add(p5.Vector.fromAngle(a, diameter / 2));
    let angle = atan2(pos.y - origin.y, pos.x - origin.x);
    let len = dist(pos.x, pos.y, highLight.x, highLight.y) / 5;
    let end = pos.copy().add(p5.Vector.fromAngle(angle, -len));

    line(pos.x, pos.y, end.x, end.y);

    for (let i = 0; i <= 5; i++) {
      let spot = p5.Vector.lerp(pos, end, i / 5);
      ellipse(spot.x, spot.y, 10);
    }
  }
}
function draw() {}
