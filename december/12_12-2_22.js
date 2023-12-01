const clr = ["#FF6464"];

function setup() {
  createCanvas(1080, 1080);
  background(0);

  stroke(255);
  noFill();

  // ellipse(540, 540, 540);

  // for (let radius = 80; radius <= 540; radius += 80) {
  //   ellipse(540, 540, 540, radius);
  //   ellipse(540, 540, radius, 540);
  // }

  for (let i = 0; i < 300; i++) {
    let radius = random(0, 400);
    let angle = random(0, TAU);

    let x = 540 + radius * cos(angle);
    let y = 540 + radius * sin(angle);

    if (random() < 0.5) {
      line(540, 540, x, y);
    }

    let selections = random([circle1, circle2]);
    selections(x, y, random(20, 80));
  }
}

function circle1(x, y, radius) {
  push();
  fill("black");
  strokeWeight(2);
  ellipse(x, y, radius);
  line(x - radius / 2, y, x + radius / 2, y);
  line(x, y + radius / 2, x, y - radius / 2);
  pop();
}

function circle2(x, y, radius) {
  fill("black");
  let steps = Math.floor(random(10, 30));
  ellipse(x, y, radius);
  for (let rad = 0; rad <= radius; rad += radius / steps) {
    noFill();
    ellipse(x, y, rad);
  }
}

function circle3(x, y, radius) {
  let vertices = Math.floor(random(3, 10));
  let dotSize = map(vertices, 3, 10, radius / 2);
  let startAngle = random(0, TAU);
  fill("black");
  ellipse(x, y, radius);
  for (
    let angle = startAngle;
    angle <= TAU + startAngle;
    angle += TAU / vertices
  ) {
    let x1 = x + (radius / 4) * cos(angle);
    let y1 = y + (radius / 4) * sin(angle);
    fill("white");
    ellipse(x1, y1, radius / 9);
  }
  noFill();
}
