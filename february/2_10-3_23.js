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
  background(0);
}

function draw() {
  let margin = 100;
  let coloredDots = 1000;
  for (let j = 0; j < colors.length; j++) {
    fill(colors[j % colors.length]);
    let subDotCount = 0;
    let offset = [Math.random(-100, 100), Math.random(-100, 100)];
    while (subDotCount < coloredDots) {
      let radius = map(g.random(Math.random(), "low"), 0, 1, 200, width);
      let angle = random(0, TWO_PI);

      let pos = createVector(
        width / 2 + offset[0] + radius * cos(angle),
        height / 2 + offset[1] + radius * sin(angle)
      );
      if (
        pos.x < margin ||
        pos.x > width - margin ||
        pos.y < margin ||
        pos.y > height - margin
      )
        continue;
      let size = map(radius, 200, width / 2, 2, 5);
      let valid = checkOverlap(pos, dots);
      if (!valid) continue;
      subDotCount++;
      dots.push(new Dot(pos.x, pos.y, size));
      // fill("white");
      ellipse(pos.x, pos.y, size, size);
    }
  }
  console.log(dots.length);
}

function getColor(d) {
  let c = "black";

  return c;
}

function checkOverlap(point, circles) {
  let valid = true;
  for (let i = 0; i < circles.length; i++) {
    let other = circles[i];
    let d = dist(point.x, point.y, other.x, other.y);
    if (d < other.r) valid = false;
  }
  return valid;
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
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
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
