function setup() {
  createCanvas(1080, 1920);
  background("#C74B50");

  fill(255);

  let startHeight = 300;
  let stalkHeight = 400;
  let stalkWidth = 120;
  // for (let y = startHeight; y <= startHeight + stalkHeight; y += 10) {
  //   noStroke();
  //   let diameter = random(stalkWidth, stalkWidth * 1.05);
  //   ellipse(540, y, diameter, diameter);
  // }

  let point0 = createVector(540, startHeight + stalkHeight);
  let point1 = createVector(500, startHeight);
  ellipse(point0.x, point0.y, stalkWidth, stalkWidth);
  ellipse(point1.x, point1.y, stalkWidth, stalkWidth);

  let cp1 = createVector(540, startHeight + stalkHeight * 0.5);
  let cp2 = createVector(540, startHeight + stalkHeight * 0.2);
  ellipse(cp1.x, cp1.y, 10, 10);
  ellipse(cp2.x, cp2.y, 10, 10);

  let curvePoints = [];
  for (let t = 0; t <= 1; t += 0.01) {
    let x = bezierPoint(point0.x, cp1.x, cp2.x, point1.x, t);
    let y = bezierPoint(point0.y, cp1.y, cp2.y, point1.y, t);
    curvePoints.push(createVector(x, y));
  }
  curvePoints.forEach((p, index) => {
    let diameter = random(stalkWidth, stalkWidth * 1.05);
    noStroke();
    ellipse(p.x, p.y, diameter, diameter);
  });

  // stalk

  let base = createVector(340, height);
  let baseCp = p5.Vector.lerp(base, point0, 0.8);
  let baseCp2 = p5.Vector.lerp(base, point0, 0.2);
  let basewidth = stalkWidth * 0.5;
  ellipse(baseCp.x, baseCp.y, basewidth, basewidth);
  ellipse(baseCp2.x, baseCp2.y, basewidth, basewidth);
  stroke(255);
  line(base.x, base.y, 540, startHeight + stalkHeight);
  rectMode(CENTER);
  curvePoints = [];
  for (let t = 0; t <= 1; t += 0.001) {
    let x = bezierPoint(base.x, baseCp.x, baseCp2.x, point0.x, t);
    let y = bezierPoint(base.y, baseCp.y, baseCp2.y, point0.y, t);
    curvePoints.push(createVector(x, y));
  }
  curvePoints.forEach((p, index) => {
    let diameter = random(basewidth, basewidth * 1.05);
    noStroke();
    ellipse(p.x, p.y, diameter, diameter);
  });
}
