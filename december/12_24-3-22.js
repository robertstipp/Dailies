function setup() {
  createCanvas(1080, 1920);
  background(0);
}

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
