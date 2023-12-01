let spacing = 100;

function setup() {
  createCanvas(1080, 1080);
  background("blue");

  let center = createVector(width / 2, height / 2);
  let size = 57;

  let count = 0;
  for (let y = -spacing; y <= height + spacing; y += spacing) {
    for (let x = -spacing; x <= width + spacing; x += spacing) {
      let center = createVector(x, y);
      if (count % 2 == 0) {
        center.x += spacing / 2;
      }
      hexagon(center, size);
    }
    count++;
  }
}
function draw() {}

function hexagon(center, size) {
  // style
  noFill();
  stroke(255);

  let numVertices = 6;
  let spacing = TAU / numVertices;
  let start = 0 + spacing / 2;
  strokeWeight(2);
  fill("red");
  beginShape();

  for (let a = start; a < TAU + start; a += spacing) {
    let v = p5.Vector.fromAngle(a, size);
    v.add(center);
    vertex(v.x, v.y);
  }
  endShape(CLOSE);
  noFill();
  ellipse(center.x, center.y, size * 4, size * 4);
  strokeWeight(3);
  line(center.x, center.y, center.x + size, center.y);
  line(center.x, center.y, center.x, center.y + size);
  line(center.x, center.y, center.x - size, center.y);
  line(center.x, center.y, center.x, center.y - size);
}
function keyPressed() {
  if (keyCode == 83) {
    save("1_2_23.jpg");
  }
}
