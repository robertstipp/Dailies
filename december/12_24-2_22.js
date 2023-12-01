let g;
let leafColor = "black";
let hillStart = 1200;
function setup() {
  createCanvas(1080, 1920);
  background(0);
  noLoop();
  g = new p5.Gen();
  for (let y = -100; y < hillStart; y += 10) {
    sky(y, y);
  }
  sun(createVector(width / 2, height * 0.25), width * 0.75);
  for (let y = 1200; y <= height; y += random(200, 400)) {
    hill(width, y, y, random(200, 500));
  }

  for (let x = -100; x <= width + 100; x += 300) {
    flowLine(x, 0, random(100, 200));
  }

  stroke(255);
}
function draw() {}

function leaf(base, direction, size) {
  let tip = createVector(
    base.x + size * Math.cos(direction),
    base.y + size * Math.sin(direction)
  );
  let angle = Math.atan2(tip.y - base.y, tip.x - base.x);
  let len = size * 0.5;
  let cPAngle = PI / 3;
  let cp1 = createVector(
    base.x + len * Math.cos(angle - cPAngle),
    base.y + len * Math.sin(angle - cPAngle)
  );
  let cp2 = createVector(
    tip.x + -len * Math.cos(angle + cPAngle),
    tip.y + -len * Math.sin(angle + cPAngle)
  );

  let cp3 = createVector(
    base.x + len * Math.cos(angle + cPAngle),
    base.y + len * Math.sin(angle + cPAngle)
  );
  let cp4 = createVector(
    tip.x - len * Math.cos(angle - cPAngle),
    tip.y - len * Math.sin(angle - cPAngle)
  );
  fill(leafColor);
  noStroke();
  beginShape();
  vertex(base.x, base.y);
  bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, tip.x, tip.y);
  bezierVertex(cp4.x, cp4.y, cp3.x, cp3.y, base.x, base.y);
  endShape();
  stroke(255);
  // midStalk
  let stalkcPAngle = random(-PI / 12, PI / 12);
  let stalkLen = size * 0.3;
  let stalkCp = createVector(
    base.x + stalkLen * Math.cos(angle - stalkcPAngle),
    base.y + stalkLen * Math.sin(angle - stalkcPAngle)
  );

  let stalkCp2 = createVector(
    tip.x - stalkLen * Math.cos(angle + stalkcPAngle),
    tip.y - stalkLen * Math.sin(angle + stalkcPAngle)
  );
  // delete later
  bezier(
    base.x,
    base.y,
    stalkCp.x,
    stalkCp.y,
    stalkCp2.x,
    stalkCp2.y,
    tip.x,
    tip.y
  );

  for (let u = 0; u <= 1; u += 0.1) {
    let midX = bezierPoint(base.x, stalkCp.x, stalkCp2.x, tip.x, u);
    let midY = bezierPoint(base.y, stalkCp.y, stalkCp2.y, tip.y, u);

    let leftX = bezierPoint(base.x, cp1.x, cp2.x, tip.x, u);
    let leftY = bezierPoint(base.y, cp1.y, cp2.y, tip.y, u);

    let leftVeinAngle = atan2(midY - leftY, midX - leftX);
    let leftVeinLen = dist(leftX, leftY, midX, midY) * 0.3;
    let leftVeinCpAngle = PI / 6;
    let leftVeinCp = createVector(
      leftX + leftVeinLen * cos(leftVeinAngle - leftVeinCpAngle),
      leftY + leftVeinLen * sin(leftVeinAngle - leftVeinCpAngle)
    );
    let leftVeinCp2 = createVector(
      midX - leftVeinLen * cos(leftVeinAngle + leftVeinCpAngle),
      midY - leftVeinLen * sin(leftVeinAngle + leftVeinCpAngle)
    );

    // bezier(
    //   leftX,
    //   leftY,
    //   leftVeinCp.x,
    //   leftVeinCp.y,
    //   leftVeinCp2.x,
    //   leftVeinCp2.y,
    //   midX,
    //   midY
    // );
    for (let v = 0; v <= 1; v += 0.01) {
      let x = bezierPoint(leftX, leftVeinCp.x, leftVeinCp2.x, midX, v);
      let y = bezierPoint(leftY, leftVeinCp.y, leftVeinCp2.y, midY, v);
      if (random() < 0.2) {
        ellipse(x, y, 1, 1);
      }
    }

    let rightX = bezierPoint(base.x, cp3.x, cp4.x, tip.x, u);
    let rightY = bezierPoint(base.y, cp3.y, cp4.y, tip.y, u);
    let rightVeinAngle = atan2(midY - rightY, midX - rightX);
    let rightVeinLen = dist(rightX, rightY, midX, midY) * 0.3;
    let rightVeinCpAngle = PI / 6;
    let rightVeinCp = createVector(
      rightX + rightVeinLen * cos(rightVeinAngle + rightVeinCpAngle),
      rightY + rightVeinLen * sin(rightVeinAngle + rightVeinCpAngle)
    );
    let rightVeinCp2 = createVector(
      midX - rightVeinLen * cos(rightVeinAngle - rightVeinCpAngle),
      midY - rightVeinLen * sin(rightVeinAngle - rightVeinCpAngle)
    );

    for (let v = 0; v <= 1; v += 0.01) {
      let x = bezierPoint(rightX, rightVeinCp.x, rightVeinCp2.x, midX, v);
      let y = bezierPoint(rightY, rightVeinCp.y, rightVeinCp2.y, midY, v);
      if (random() < 0.2) {
        ellipse(x, y, 1, 1);
      }
    }
  }
}

function flowLine(x, y, steps) {
  let curX = x;
  let curY = y;

  let interval = 3;
  let maxSize = 100;
  for (let i = 0; i <= steps; i++) {
    let angle = noise(curX * 0.01, curY * 0.01) * 1 * PI;
    if (i % interval === 0 && i !== steps) {
      let direction = -1;
      if (i % (interval * 2) === 0) {
        direction = 1;
      }
      leaf(
        createVector(curX, curY),
        angle + (direction * PI) / 2,
        random(maxSize * 0.5, maxSize)
      );
    }

    if (i === steps) {
      leaf(createVector(curX, curY), angle, maxSize * 0.75);
    }
    let len = 10;
    let nextX = curX + len * cos(angle);
    let nextY = curY + len * sin(angle);
    line(curX, curY, nextX, nextY);
    curX = nextX;
    curY = nextY;
  }
}

function branch() {}
function sky(startY, endY) {
  for (let x = 0; x < width; x += 2) {
    push();
    let angle = map(x, 0, width, 0, 0.5 * TWO_PI);
    let amplitude = 10;
    let y = startY + Math.sin(angle) * amplitude;
    stroke(200);
    strokeWeight(g.random(Math.random(), "gaussian") * 4);
    point(x, y);
    pop();
  }
}

function sun(origin, diameter) {
  push();
  strokeWeight(1);
  fill("black");
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
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_24_22.jpeg");
  }
}
