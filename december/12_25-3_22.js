function setup() {
  createCanvas(1080, 1080);
  background(0);

  let origin = createVector(width / 2, height / 2);
  bgStripes();
  sun(origin, 700);
}
function draw() {}

function sun(origin, diameter) {
  fill("black");
  stroke(255);
  ellipse(origin.x, origin.y, diameter, diameter);
}

function bgStripes() {
  for (let x = 0; x < width; x += 10) {
    stroke(255);
    line(x, 0, x, height);
  }
}
