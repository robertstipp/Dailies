const colors = ["#ffa5b0", "#fd7e89"];
const secondColors = ["#fd7e89", "#fff798"];
function setup() {
  createCanvas(600, 600);
  background(0);
  noStroke();
  let origin = createVector(width / 2, height / 2);
  let size = 300;
  noFill();
  let sizeMax = 400;

  for (let size = sizeMax; size > 0; size -= 1) {
    let c1 = lerpColor(color(colors[0]), color(colors[1]), size / sizeMax);
    let c2 = lerpColor(
      color(secondColors[0]),
      color(secondColors[1]),
      size / sizeMax
    );

    fill(c2);
    push();

    flower(origin, size);
  }
}

function draw() {}

function flower(origin, size) {
  let r = size / 2;

  let rightSide = createVector(origin.x + r, origin.y);
  let bottomSide = createVector(origin.x, origin.y + r);
  let leftSide = createVector(origin.x - r, origin.y);
  let topSide = createVector(origin.x, origin.y - r);

  let points = [];
  for (let a = -PI / 2; a <= 0; a += 0.01) {
    let pos = bottomSide.copy().add(p5.Vector.fromAngle(a).mult(r));
    points.push(pos);
  }

  for (let a = PI / 2; a <= PI; a += 0.01) {
    let pos = rightSide.copy().add(p5.Vector.fromAngle(a).mult(r));
    points.push(pos);
  }

  for (let a = 0; a <= TAU; a += PI / 2) {
    push();

    translate(origin.x, origin.y);
    rotate(a);
    beginShape();
    points.forEach((p) => {
      vertex(p.x - origin.x, p.y - origin.y);
    });
    endShape(CLOSE);
    pop();
  }
}
