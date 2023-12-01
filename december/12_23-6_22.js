let g;
let sc;

function setup() {
  pixelDensity(1);
  createCanvas(1080, 1920);
  background("#FF0000");
  sc = "#FFF";
  g = new p5.Gen();
  let diameter = width * 0.5;
  let origin = createVector(width / 2, height * 0.25);
  // ellipse(origin.x, origin.y, diameter);

  for (let a = 0; a < TAU - 0.05; a += TAU / 200) {
    let xPos = origin.x + (cos(a) * diameter) / 2;
    let yPos = origin.y + (sin(a) * diameter) / 2;

    let xPos2 = origin.x + (cos(a) * diameter * 6) / 2;
    let yPos2 = origin.y + (sin(a) * diameter * 6) / 2;
    strokeWeight(2);
    stroke(sc);
    let startPoint = createVector(xPos, yPos);
    let endPoint = createVector(xPos2, yPos2);

    // line(xPos, yPos, xPos2, yPos2);
    bandLine(startPoint, endPoint, 50);
  }

  for (let i = 0; i < 200000; i++) {
    let r = (g.random(Math.random(), "even") * diameter) / 2;
    let a = random(0, TAU);
    let xPos = origin.x + cos(a) * r;
    let yPos = origin.y + sin(a) * r;
    stroke(sc);
    strokeWeight(1);
    point(xPos, yPos);
  }

  // let point1 = createVector(540, 0);
  // let point2 = createVector(540, 1080);
  // let bandWidth = 20;

  // let angle = atan2(point2.y - point1.y, point2.x - point1.x);
  // let distance = dist(point1.x, point1.y, point2.x, point2.y);
  // let point3 = createVector(
  //   point1.x + cos(angle) * distance,
  //   point1.y + sin(angle) * distance
  // );
  // let otherAngle = angle + PI / 2;
}

function bandLine(startPoint, endPoint, bandWidth) {
  let point1 = startPoint;
  let point2 = endPoint;
  let angle = atan2(point2.y - point1.y, point2.x - point1.x);
  let distance = dist(point1.x, point1.y, point2.x, point2.y);
  let point3 = createVector(
    point1.x + cos(angle) * distance,
    point1.y + sin(angle) * distance
  );
  let otherAngle = angle + PI / 2;

  for (let r = -bandWidth / 2; r <= bandWidth / 2; r += 5) {
    let startPoint = createVector(
      point1.x + r * cos(otherAngle),
      point1.y + r * sin(otherAngle)
    );

    let endPoint = createVector(
      point3.x + r * cos(otherAngle),
      point3.y + r * sin(otherAngle)
    );
    strokeWeight(2);
    stroke(sc);

    let steps = 200;
    for (let i = 0; i < steps; i++) {
      let x = lerp(startPoint.x, endPoint.x, i / steps);
      let y = lerp(startPoint.y, endPoint.y, i / steps);
      let sw = map(g.random(Math.random(), "even"), 0, 1, 1, 5);
      strokeWeight(sw);
      point(x, y);
    }
    // line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_23_22.jpeg");
  }
}
