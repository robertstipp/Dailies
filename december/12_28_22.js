let g, e;
let effBottom;
const hills = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];
let colorList = [];
function setup() {
  createCanvas(1080, 1080);
  background("#ECE8DD");
  effBottom = height + 100;
  g = new p5.Gen();
  e = new p5.Ease();
  sun(createVector(width / 2, 150), 200);

  for (let y = 400; y <= effBottom; y += 100) {
    let colorOptions = hills.filter(
      (c) => c !== colorList[colorList.length - 1]
    );
    let c = random(colorOptions);

    colorList.push(c);
    slope(y, random(100, 200), random(["left", "right"]), c);
  }

  // house(origin, houseWidth, houseHeight);
}

function slope(yStart, hillHeight, slopeDirection, c) {
  // clean colors

  let lastColors = [
    colorList[colorList.length - 2],
    colorList[colorList.length - 3],
  ];

  let possibleTreeColors = hills.filter((c) => !lastColors.includes(c));

  let max = hillHeight;
  let min = 0;
  let xStart = random(-400, -100);
  let xEnd = width + random(100, 400);

  // style
  noStroke();
  // stroke(255);
  fill("black");
  let points = [];
  beginShape();
  points.push(createVector(0, effBottom));
  for (let x = xStart; x <= width + 100; x += 20) {
    let mapX =
      slopeDirection === "right"
        ? map(x, xStart, xEnd, 0, 1)
        : map(x, xStart, xEnd, 1, 0);

    let offset = map(e.elasticIn(mapX), 0, 1, max, min);
    let yAngle = map(x, xStart, xEnd, 0, TAU);
    let yOff = map(sin(yAngle), -1, 1, -2, 2);
    let y = yStart - offset + yOff;
    points.push(createVector(x, y));
  }

  fill(c);

  points.push(createVector(width, effBottom));
  beginShape();

  points.forEach((p) => {
    if (random() < 0.01) {
      let treeHeight = map(p.y, 0, height, 50, 100);
      // minimalTree(
      //   p,
      //   random(treeHeight * 0.9, treeHeight),
      //   random(possibleTreeColors)
      // );
    }

    vertex(p.x, p.y);
  });
  endShape(CLOSE);
  stroke(c);
  strokeWeight(3);

  // points.forEach((p, i) => {
  //   let start = createVector(p.x, p.y);
  //   let end = createVector(p.x, height);
  //   line(start.x, start.y, end.x, end.y);
  // });
}

function house(origin, width, height) {
  let bottomMid = origin.copy();
  let bottomLeft = origin.copy().add(createVector(-width / 2, 0));
  let bottomRight = origin.copy().add(createVector(width / 2, 0));
  ellipse(bottomMid.x, bottomMid.y, 10);
  ellipse(bottomLeft.x, bottomLeft.y, 10);
  ellipse(bottomRight.x, bottomRight.y, 10);

  let roofLeft = origin.copy().add(createVector(-width / 2, -height));
  let roofOverhang = 20;
  let roofLeftOverhang = roofLeft.copy().add(createVector(-roofOverhang, 0));
  let roofRight = origin.copy().add(createVector(width / 2, -height));
  let roofRightOverhang = roofRight.copy().add(createVector(roofOverhang, 0));

  ellipse(roofLeft.x, roofLeft.y, 10);
  ellipse(roofRight.x, roofRight.y, 10);
  ellipse(roofLeftOverhang.x, roofLeftOverhang.y, 10);
  ellipse(roofRightOverhang.x, roofRightOverhang.y, 10);
}

function minimalTree(origin, height, c) {
  push();
  let base = origin.copy();
  let top = origin.copy().add(createVector(0, -height));
  let branchHeight = random(0.8, 0.75) * height;

  let canopyDiameter = random(0.5, 0.75) * height;
  let branchLength = (random(0.5, 0.75) * canopyDiameter) / 2;
  let canopyOrigin = origin.copy().add(createVector(0, -height * 0.95));
  let branchNode = origin.copy().add(createVector(0, -branchHeight));
  let branchAngle = random([
    PI + PI / 4,
    PI + PI / 3,
    PI + PI / 2 + PI / 3,
    PI + PI / 2 + PI / 4,
  ]);
  let branchEnd = branchNode
    .copy()
    .add(p5.Vector.fromAngle(branchAngle, branchLength));

  // canopy

  stroke(0);
  noStroke();
  fill(c);
  ellipse(canopyOrigin.x, canopyOrigin.y, canopyDiameter);
  stroke(0);
  strokeWeight(height / 20);
  line(base.x, base.y, top.x, top.y);
  line(branchNode.x, branchNode.y, branchEnd.x, branchEnd.y);
  pop();
}

function minimalCloud(origin, width) {
  //left arc
  noStroke();
  fill(random(hills));

  for (let a = 0; a < TAU; a += TAU / 8) {
    let angleOffset;
    if (a > PI && a < TAU) {
      angleOffset = Math.abs(a - PI - PI / 2);
    } else {
      angleOffset = Math.abs(a - PI / 2);
    }
    let r = map(angleOffset, 0, PI / 2, width / 4, width / 2);
    let pos = origin.copy().add(p5.Vector.fromAngle(a, r));
    ellipse(pos.x, pos.y, random(width / 2, width));
  }
}

function sun(origin, diameter) {
  noStroke();
  fill(random(hills));
  ellipse(origin.x, origin.y, diameter);
}

function minimalCactus(origin, width, height) {
  push();
  let base = origin.copy();
  let top = origin.copy().add(createVector(0, -height));
  let branchHeight = random(0.8, 0.75) * height;

  let canopyDiameter = random(0.5, 0.75) * height;
  let branchLength = (random(0.5, 0.75) * canopyDiameter) / 2;
  let canopyOrigin = origin.copy().add(createVector(0, -height * 0.95));
  let branchNode = origin.copy().add(createVector(0, -branchHeight));
  let branchAngle = random([
    PI + PI / 4,
    PI + PI / 3,
    PI + PI / 2 + PI / 3,
    PI + PI / 2 + PI / 4,
  ]);
  let branchEnd = branchNode
    .copy()
    .add(p5.Vector.fromAngle(branchAngle, branchLength));

  // canopy

  stroke(0);
  noStroke();
  fill(c);

  stroke(0);
  strokeWeight(height / 20);
  line(base.x, base.y, top.x, top.y);
  line(branchNode.x, branchNode.y, branchEnd.x, branchEnd.y);
  pop();
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_27_22.jpeg");
  }
}
