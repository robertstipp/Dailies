let origin;
let e, g;
const colors = ["#ff2626", "#ff2626", "#ffc900"];
function setup() {
  createCanvas(400, 400);
  background(0);
  e = new p5.Ease();
  origin = createVector(width / 2, height / 2);
  let origin1 = createVector(width / 2, height / 3);
  let d = 200;
  let c1 = new Circle(origin1, d);
  c1.init();
  c1.show();
  let origin2 = createVector(width / 2, (height * 2) / 3);
  let c2 = new Circle(origin2, d);
  c2.init();
  c2.show();
}

function draw() {}

class Circle {
  constructor(ori, d) {
    this.origin = ori;
    this.d = d;
    this.r = d / 2;
    this.points = [];
    this.numPoints = 50;
    this.direction = atan2(ori.y - origin.y, ori.x - origin.x);
  }

  init() {
    let steps = 20;

    let spacing = e.quadraticIn(steps, 0, this.r, 0, 1);

    for (let i = 0; i <= steps; i++) {
      // let r = map(i, 0, steps, 0, this.r);
      let r = e.quadraticIn(i / steps) * this.r;
      for (let a = 0; a < TAU; a += TAU / this.numPoints) {
        let v = p5.Vector.fromAngle(a, r);
        v.add(this.origin);
        this.points.push(v);
      }
    }
  }

  show() {
    noStroke();
    noFill();
    // ellipse(this.origin.x, this.origin.y, this.d);
    for (let p of this.points) {
      let angle = atan2(p.y - this.origin.y, p.x - this.origin.x);
      let direction = atan2(p.y - origin.y, p.x - origin.x);
      let angOffset = Math.abs(angle - this.direction);
      let yDist = Math.abs(p.y - origin.y);
      let yInt = map(yDist, 0, height / 2, 0, 1);
      let aInt = map(angOffset, 0, PI / 2, 0, 1);
      let c1 = lerpColor(color(colors[0]), color(colors[2]), yInt);
      let c = lerpColor(color(colors[0]), c1, aInt);
      fill(c);
      let d = dist(p.x, p.y, origin.x, origin.y);
      let rSize = map(d, 0, origin.y + this.r, 0, 20);
      let size = map(d, 0, height / 2, 0, rSize);
      ellipse(p.x, p.y, size);
    }
  }
}

function keyPressed() {
  if (keyCode == 83) {
    save("1_2_23.jpg");
  }
}
