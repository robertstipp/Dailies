function setup() {
  createCanvas(600, 600);
  background("#8479e1");
  stroke("#b4ece3");
  let origin = createVector(width / 2, height / 2);
  let size = 50;
  noFill();

  let count = 0;
  for (let x = -size; x <= width + size; x += size * Math.sin(PI / 6) + size) {
    if (x > 200);
    for (
      let y = -size;
      y <= height + 2 * size;
      y += size * Math.cos(PI / 6) * 2
    ) {
      let origin = createVector(x, y);
      if (count % 2 == 0) {
        origin.add(0, size * Math.cos(PI / 6));
      }
      myHexagon(origin, size);
    }
    count++;
  }
}

function draw() {}

function myHexagon(origin, size) {
  push();
  translate(origin.x, origin.y);

  // noStroke();
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = (TWO_PI * i) / 6;
    let x = size * cos(angle);
    let y = size * sin(angle);

    // ellipse(x, y, size);

    let effSize = size;

    noFill();
    if (random() < 1) arc(x, y, effSize, effSize, angle, angle + PI / 2);

    // vertex(x, y);
  }
  endShape(CLOSE);

  stroke(255);
  strokeWeight(4);
  beginShape();
  noFill();
  // noStroke();

  for (let i = 0; i < 6; i++) {
    let angle = (TWO_PI * i) / 6;
    let x = size * cos(angle);
    let y = size * sin(angle);

    // ellipse(x, y, size);

    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}
