let aspectRatio = 1;

let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
function setup() {
  createCanvas(1080, 1080, SVG);
  e = new p5.Ease();
  g = new p5.Gen();
  noFill();
  noLoop();
}

function draw() {
  let angle0 = PI / 4;
  let thickness = 30;
  let origin = createVector(width / 2, height / 2);
  let origin1 = createVector(
    width / 2 + thickness * cos(PI / 4),
    height / 2 + thickness * sin(PI / 4)
  );
  let rings = 20;
  for (let i = 0; i < rings; i++) {
    if (i % 2 == 0) {
      fill("black");
    } else {
      continue;
    }
    let innerRadius = thickness + i * thickness;
    let outerRadius = innerRadius + thickness;

    let startAngle = angle0;
    let endAngle = startAngle + PI;
    let points = [];
    for (let a = startAngle; a <= endAngle; a += 0.01) {
      let pos = origin.copy().add(p5.Vector.fromAngle(a).mult(innerRadius));
      points.push(pos);

      // ellipse(pos.x, pos.y, 10, 10);
    }
    for (let a = endAngle; a >= startAngle; a -= 0.01) {
      let pos = origin.copy().add(p5.Vector.fromAngle(a).mult(outerRadius));
      points.push(pos);
    }

    // beginShape();
    // points.forEach((p) => vertex(p.x, p.y));
    // endShape(CLOSE);
    ringsArr.push(new Ring(points, true));
  }
  for (let i = 0; i < rings; i++) {
    if (i % 2 == 0) {
      fill("black");
    } else {
      continue;
    }
    let innerRadius = thickness + i * thickness;
    let outerRadius = innerRadius + thickness;

    let startAngle = PI + angle0;
    let endAngle = startAngle + PI;
    let points = [];
    for (let a = startAngle; a <= endAngle; a += 0.01) {
      let pos = origin1.copy().add(p5.Vector.fromAngle(a).mult(innerRadius));
      points.push(pos);
      // ellipse(pos.x, pos.y, 10, 10);
    }
    for (let a = endAngle; a >= startAngle; a -= 0.01) {
      let pos = origin1.copy().add(p5.Vector.fromAngle(a).mult(outerRadius));
      points.push(pos);
    }

    // beginShape();
    // points.forEach((p) => vertex(p.x, p.y));
    // endShape(CLOSE);
    ringsArr.push(new Ring(points, true));
  }
  ringsArr.forEach((ring) => ring.draw());
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}

class Ring {
  constructor(points, fill) {
    this.points = points;
    this.fill = fill;
  }

  draw() {
    this.fill ? fill("black") : noFill;
    beginShape();
    this.points.forEach((p) => {
      vertex(p.x, p.y);
    });
    endShape(CLOSE);
  }
}
