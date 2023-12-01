let aspectRatio = 1;

let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
let cols = 16;
let rows = 16;
let cellH, cellW, margin, effW;
let myCells = [];

let dots = [];
let subCircles = [];

function setup() {
  createCanvas(1080, 1080, SVG);
  background("rect");
  e = new p5.Ease();
  g = new p5.Gen();
  noFill();
  noLoop();
  noStroke();
}

function draw() {
  let center = createVector(width / 2, height / 2);
  let radius = width / 2;

  ellipse(center.x, center.y, radius * 2, radius * 2);

  let numSubCircles = 15;
  for (let i = 0; i < numSubCircles; i++) {
    let subRadius = radius / 2;
    let subPos = createVector(
      center.x + subRadius * cos((TWO_PI / numSubCircles) * i),
      center.y + subRadius * sin((TWO_PI / numSubCircles) * i)
    );
    let clr = colors[i % colors.length];
    subCircles.push(new SubCircle(subPos.x, subPos.y, subRadius, clr));
  }

  // stroke("black");

  // subCircles.forEach((sc) => {
  //   sc.draw();
  // });

  let numDots = 5000;
  while (dots.length < numDots) {
    let innerRadius = random(0, width / 2);
    let angle = random(TAU);
    let pos = center.copy().add(p5.Vector.fromAngle(angle, innerRadius));
    let testSize = map(innerRadius, 0, width / 2, 5, 10);

    let valid = true;
    for (let k = 0; k < dots.length; k++) {
      let otherDot = dots[k];
      let d = dist(pos.x, pos.y, otherDot.x, otherDot.y);

      if (d < otherDot.r) valid = false;
    }
    if (valid) {
      dots.push(new Dot(pos.x, pos.y, testSize, "red"));
    }
  }

  dots.forEach((d) => {
    noStroke();
    let c = getColor(d);
    if (c === "black") return;
    fill(c);

    let distCenter = dist(d.x, d.y, center.x, center.y);
    if (distCenter < 100) return;
    ellipse(d.x, d.y, d.r, d.r);
  });
}

function getColor(d) {
  let c = "black";
  for (let i = 2; i < subCircles.length + 2; i++) {
    let sub = subCircles[i % subCircles.length];
    let prevSub = subCircles[(i - 1) % subCircles.length];
    let secondPrevSub = subCircles[(i - 2) % subCircles.length];

    let d1 = dist(d.x, d.y, sub.x, sub.y);
    let d2 = dist(d.x, d.y, prevSub.x, prevSub.y);
    let d3 = dist(d.x, d.y, secondPrevSub.x, secondPrevSub.y);
    let within1 = d1 < sub.r;
    let within2 = d2 < prevSub.r;
    let within3 = d3 < secondPrevSub.r;
    if (within1 && within2 && within3) {
      c = random(colors);
    }
    if (within1 && within2 && !within3) {
      c = random([sub.clr, prevSub.clr]);
    }
  }

  return c;
}

class SubCircle {
  constructor(x, y, r, clr) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.clr = clr;
  }

  draw() {
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

class Dot {
  constructor(x, y, r, clr) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.clr = clr;
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}

function pointInPoly(verts, pt) {
  let c = false;
  for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
    if (
      verts[i].y > pt.y != verts[j].y > pt.y &&
      pt.x <
        ((verts[j].x - verts[i].x) * (pt.y - verts[i].y)) /
          (verts[j].y - verts[i].y) +
          verts[i].x
    )
      c = !c;
  }
  return c;
}
