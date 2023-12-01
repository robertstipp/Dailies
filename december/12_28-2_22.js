let e, g;
let effBottom;
const desertColors = ["#183140", "#419BBF", "#518EA6", "#D99873", "#D99B84"];

function setup() {
  createCanvas(400, 400);
  background(0);

  e = new p5.Ease();
  g = new p5.Gen();

  let origin = createVector(width / 2, height);

  for (let i = 0; i < 10; i++) {
    let cactusHeight = 40 * i;
    cactus2(origin, cactusHeight, "#419BBF");
  }
}

function cactus(origin, height, c) {
  let base = origin.copy();
  let top = origin.copy().add(0, -height);

  let count = 0;
  for (let t = 0.5; t < 0.8; t += 0.1) {
    let direction = 1;
    if (count % 2 == 0) {
      direction = -1;
    }
    if (random() < 0.5) continue;
    let branchNode = base.copy().add(0, -height * t);
    let branchWidth = random(height / 3, height / 10);
    let branchHeight = random(height / 3, height / 10);
    let branchEnd = branchNode
      .copy()
      .add(direction * branchWidth, -branchHeight);

    stroke("white");
    strokeWeight(2);
    noFill();

    for (let i = 0; i < 3; i++) {
      curBranchNode = branchNode.copy().add(0, -i * 5);
      // branchHeight -= i * 5;
      branchWidth -= i * 5;
      beginShape();
      for (let xOff = 0; xOff < branchWidth; xOff += 1) {
        let xVal = map(xOff, 0, branchWidth, 0, 1);
        let yVal = e.exponentialIn(xVal, 1);
        let yOff = map(yVal, 0, 1, 0, branchHeight);
        let branchPoint = curBranchNode.copy().add(direction * xOff, -yOff);
        vertex(branchPoint.x, branchPoint.y);
      }
      endShape();
    }
    count++;
  }
  line(base.x, base.y, top.x, top.y);
  // ellipse(origin.x, origin.y, 10);
}

function slope(yStart, hillHeight, slopeDirection, c) {
  // clean colors

  // let lastColors = [
  //   colorList[colorList.length - 2],
  //   colorList[colorList.length - 3],
  // ];

  let possibleTreeColors = c;

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

function cactus2(origin, height, color) {
  let bot = origin.copy();
  let top = origin.copy().add(0, -height);

  noStroke();
  for (let i = 0; i < 1; i += 0.001) {
    let a = map(i, 0, 1, 0, PI);
    let val = map(sin(a), 0, 1, 0, 1);
    let xOff = map(e.staircase(val, 10), 0, 1, 0, height / 2);
    let pos = p5.Vector.lerp(bot, top, i);

    ellipse(pos.x - xOff, pos.y, 3);
    ellipse(pos.x + xOff, pos.y, 4);
  }
}
