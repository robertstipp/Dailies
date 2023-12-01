const colors = [
  "#03071e",
  "#370617",
  "#6a040f",
  "#9d0208",
  "#03045e",
  "#03045e",
  "#03045e",
  "#0077b6",
  "#00b4d8",
  "#90e0ef",
  "#caf0f8",
  "#d00000",
  "#e85d04",
  "#f48c06",
  "#dc2f02",
  "#faa307",
  "#ffba08",
];

function setup() {
  createCanvas(1080, 1080);
  background(255);
  let count = 0;

  let origin = createVector(width / 2, width / 2);
  for (let radius = 60; radius < 800; radius += 30) {
    let c = colors[count % colors.length];
    if (radius < 100) c = color("#ffba08");
    noStroke();
    fill(c);
    let angleStep = TAU / (radius / 9);
    for (let a = angleStep; a < TAU + angleStep; a += angleStep) {
      push();
      let x = origin.x + cos(a) * radius;
      let y = origin.y + sin(a) * radius;
      let brushPos = createVector(x, y);
      let angle = brushPos.sub(origin).heading() + PI / 2;

      let w = 50;
      let h = w / 2;
      translate(x, y);
      rotate(angle);
      brushStroke(0, 0, w, h);
      pop();
    }
    count++;
  }
}

function brushStroke(x, y, w, h) {
  let corners = [
    createVector(x - w / 2, y - h / 2),
    createVector(x + w / 2, y - h / 2),
    createVector(x + w / 2, y + h / 2),
    createVector(x - w / 2, y + h / 2),
  ];
  let points = [];
  for (let i = 0; i < corners.length; i++) {
    let corner1 = corners[i];
    let corner2 = corners[(i + 1) % corners.length];
    let distance = corner1.dist(corner2);
    let stepDistance = 20;
    let numSteps = distance / stepDistance;
    let xOffRange = width / 600;
    let yOffRange = height / 500;
    for (let i = 0; i < 1; i += 1 / numSteps) {
      let inter = p5.Vector.lerp(corner1, corner2, i);
      let xOff = random(-xOffRange, xOffRange);
      let yOff = random(-yOffRange, yOffRange);

      points.push(inter.add(xOff, yOff));
    }
  }

  beginShape();
  points.forEach((c) => vertex(c.x, c.y));
  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_20_22.jpeg");
  }
}
