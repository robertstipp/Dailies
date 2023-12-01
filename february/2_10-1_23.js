let aspectRatio = 1;

let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
let cols = 16;
let rows = 16;
let cellH, cellW, margin, effW;
let myCells = [];

let dots = [];

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

  let numSubCircles = 10;
  for (let i = 0; i < numSubCircles; i++) {
    let subRadius = radius / 2;
    let subPos = createVector(
      center.x + subRadius * cos((TWO_PI / numSubCircles) * i),
      center.y + subRadius * sin((TWO_PI / numSubCircles) * i)
    );
    stroke(0);
    ellipse(subPos.x, subPos.y, subRadius * 2, subRadius * 2);
    let numDots = 300;
    let subDots = [];
    while (subDots.length < numDots) {
      let r = random(0, subRadius);
      let a = random(0, TWO_PI);
      let clr = colors[i % colors.length];
      // fill(colors[i % colors.length]);
      let dotPos = createVector(subPos.x + r * cos(a), subPos.y + r * sin(a));
      let valid = true;
      for (let k = 0; k < dots.length; k++) {
        let otherDot = dots[k];
        let d = dist(dotPos.x, dotPos.y, otherDot.x, otherDot.y);
        if (d < otherDot.r) valid = false;
      }
      if (valid) {
        dots.push(new Dot(dotPos.x, dotPos.y, 10, clr));
        subDots.push(new Dot(dotPos.x, dotPos.y, 10, clr));
      }
    }
    noFill();
  }
  stroke("black");

  dots.forEach((d) => {
    noStroke();
    fill(d.clr);
    ellipse(d.x, d.y, d.r, d.r);
  });
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
