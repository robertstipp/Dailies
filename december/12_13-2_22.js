function setup() {
  createCanvas(600, 600);
  background(0);

  let point1 = createVector(300, 200);
  let point2 = createVector(300, 400);

  ellipse(point1.x, point1.y, 5);

  ellipse(point2.x, point2.y, 5);
}
