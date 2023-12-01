let aspectRatio = 1;

let colors = ["red", "yellow", "blue"];
let e, g;
function setup() {
  createCanvas(1080, 1080, SVG);
  e = new p5.Ease();
  g = new p5.Gen();
  noFill();
  noLoop();
}
function draw() {
  let rings = 20;
  let circs = [];
  let maxRadius = width / 2;
  let minRadius = maxRadius / rings;
  let origin = createVector(width / 2, height / 2);
  for (let i = 5; i < rings; i++) {
    let rInt = map(i, 0, rings, 0, 1);
    let radius = e.linear(rInt) * maxRadius;
    let startAngle = map(e.linear(rInt), 0, 1, 0, TAU);
    let endAngle = startAngle + TAU;
    let angleStep = TAU / 30;
    for (let a = startAngle; a < endAngle; a += angleStep) {
      let size = map(e.linear(rInt), 0, 1, 10, 30);
      let sFact = map(sin(a + startAngle), -1, 1, 0.5, 1.5);
      let pos = origin.copy().add(p5.Vector.fromAngle(a).mult(radius));

      circs.push(new Circle(pos.x, pos.y, size * sFact));
    }
  }
  colors.forEach((c) => {
    circs.forEach((circ) => {
      if (circ.c == c) {
        circ.draw();
      }
    });
  });
  // circs.forEach((c) => c.draw());
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = this.getColor();
    // this.c = this.getNoiseColor();
  }
  getNoiseColor = () => {
    let n = noise(this.x / 1000, this.y / 1000);
    return colors[floor(map(n, 0, 1, 0, colors.length))];
  };
  getColor() {
    if (this.y < height / 3) {
      return colors[0];
    } else if (this.y < (height * 2) / 3) {
      return colors[1];
    } else {
      return colors[2];
    }
  }
  drawRing() {
    ellipse(this.x, this.y, this.r * 1.5);
  }
  draw() {
    fill(this.c);
    ellipse(this.x, this.y, this.r);
  }
}
