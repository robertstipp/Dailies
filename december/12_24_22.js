let g;
let sc = "white";
let hillStart = 1200;
let bgRed = "#990000";
function setup() {
  createCanvas(1080, 1920);
  background(0);

  g = new p5.Gen();

  for (let y = 0; y <= hillStart - 100; y += 10) {
    sky(y, y);
  }
  let sunOrigin = createVector(width / 2, height * 0.25);
  let sunDiameter = width * 0.75;
  sun(sunOrigin, sunDiameter);
  for (let y = 1200; y <= height; y += random(200, 400)) {
    hill(width, y, y, random(200, 500));
  }
}

function hill(width, startY, endY, height) {
  // generate hill

  let startPoint = createVector(-200, startY);
  let endPoint = createVector(width + 200, endY);
  let midThresh = random(0.2, 0.5);
  let lefThresh = random(0.1, 0.2);
  let rightThresh = random(0.8, 0.9);
  let effectiveWidth = width + 400;
  let cp1 = createVector(
    startPoint.x + effectiveWidth * lefThresh,
    startPoint.y - height
  );
  let cp2 = createVector(
    startPoint.x + effectiveWidth * rightThresh,
    endPoint.y - height
  );

  if (startY === hillStart) {
    fill("black");
    beginShape();
    vertex(startPoint.x, startPoint.y);
    bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, endPoint.x, endPoint.y);
    endShape();
  }

  fill("black");
  stroke("#EFEFEF");

  for (let t = 0; t <= 1; t += 0.001) {
    let x = bezierPoint(startPoint.x, cp1.x, cp2.x, endPoint.x, t);
    let y = bezierPoint(startPoint.y, cp1.y, cp2.y, endPoint.y, t);
    let subHillStart = createVector(x, y);
    let angle = random(PI / 6, PI / 4);
    let len = random(100, 500);
    let subHillEnd = createVector(
      x + len * Math.cos(angle),
      y + len * Math.sin(angle)
    );

    let subCp1 = createVector(
      subHillStart.x + (len / 3) * Math.cos(angle / 2),
      subHillStart.y + (len / 3) * Math.sin(angle / 2)
    );
    let subCp2 = createVector(
      subHillEnd.x + (len / 3) * Math.cos(PI + (3 * angle) / 2),
      subHillEnd.y + (len / 3) * Math.sin(PI + (3 * angle) / 2)
    );

    let sw = random(1, 3);
    if (random() < 0.1) sw = random(5, 10);
    strokeWeight(sw);
    for (let u = 0; u <= 1; u += 0.01) {
      let x = bezierPoint(subHillStart.x, subCp1.x, subCp2.x, subHillEnd.x, u);
      let y = bezierPoint(subHillStart.y, subCp1.y, subCp2.y, subHillEnd.y, u);
      if (random() < 0.5) point(x, y);
    }
    // ellipse(subHillEnd.x, subHillEnd.y, 5, 5);
  }
}

function sun(origin, diameter) {
  push();
  fill("#EFEFEF");
  ellipse(origin.x, origin.y, diameter, diameter);
  pop();
  // for (let i = 0; i < 10000; i++) {
  //   let r = (g.random(Math.random(), "even") * diameter) / 2;
  //   let a = g.random(Math.random(), "even") * TWO_PI;
  //   let xPos = origin.x + cos(a) * r;
  //   let yPos = origin.y + sin(a) * r;
  //   stroke(sc);
  //   strokeWeight(random(1, 3));
  //   point(xPos, yPos);
  // }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_24_22.jpeg");
  }
}

function sky(startY, endY) {
  for (let x = 0; x < width; x += 2) {
    let angle = map(x, 0, width, 0, 0.5 * TWO_PI);
    let amplitude = 10;
    let y = startY + Math.sin(angle) * amplitude;
    stroke(200);
    strokeWeight(g.random(Math.random(), "gaussian") * 4);
    point(x, y);
  }
}
