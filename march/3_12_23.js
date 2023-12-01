let walls = [];
let pos;
let initPos;
function setup() {
  createCanvas(400, 400);

  // Create some walls
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));
  walls.push(new Boundary(100, 100, 300, 100));
  walls.push(new Boundary(300, 100, 300, 300));
  walls.push(new Boundary(300, 300, 100, 300));
  walls.push(new Boundary(50, 50, 50, 350));
  walls.push(new Boundary(50, 350, 350, 350));
  walls.push(new Boundary(350, 350, 350, 50));
  initPos = createVector(200, 200);
}

function draw() {
  // Draw the walls
  background(255, 10);
  pos = initPos
    .copy()
    .add([
      (width / 2) * cos(frameCount / 100) + sin(frameCount / 100) * 100,
      (height / 2) * sin(frameCount / 100),
    ]);
  for (let wall of walls) {
    wall.show();
    // wall.rotate(frameCount / 100);
  }

  // Cast rays from the mouse position
  // let rays = [];
  // for (let i = 0; i < 360; i += 1) {
  //   let angle = radians(i);
  //   let ray = new Ray(pos.x, pos.y, angle);
  //   rays.push(ray);
  // }

  // // Find the closest intersection point for each ray
  // for (let ray of rays) {
  //   let closest = null;
  //   let record = Infinity;
  //   let a;
  //   for (let wall of walls) {
  //     let pt = ray.cast(wall);
  //     if (pt) {
  //       let d = p5.Vector.dist(ray.pos, pt);
  //       a = atan2(pt.y - ray.pos.y, pt.x - ray.pos.x);
  //       if (d < record) {
  //         record = d;
  //         closest = pt;
  //       }
  //     }
  //   }
  //   if (closest) {
  //     push();
  //     colorMode(HSB);

  //     let clrAngle = map(a, -PI, PI, 0, 360);
  //     stroke(clrAngle, 255, 255);
  //     line(ray.pos.x, ray.pos.y, closest.x, closest.y);
  //     pop();
  //   }
  // }
}

class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
    this.mid = p5.Vector.lerp(this.a, this.b, 0.5);
    this.len = p5.Vector.dist(this.a, this.b);
    this.thetaA = atan2(this.a.y - this.mid.y, this.a.x - this.mid.x);
    this.thetaB = atan2(this.b.y - this.mid.y, this.b.x - this.mid.x);
    this.secondA = this.mid
      .copy()
      .add(p5.Vector.fromAngle(this.thetaA, this.len / 2));
    this.secondB = this.mid
      .copy()
      .add(p5.Vector.fromAngle(this.thetaB, this.len / 2));
  }

  rotate(angle) {
    this.secondA = this.mid
      .copy()
      .add(p5.Vector.fromAngle(this.thetaA + angle * 2, this.len / 2));
    this.a = this.secondA.copy();
    this.secondB = this.mid
      .copy()
      .add(p5.Vector.fromAngle(this.thetaB + angle * 2, this.len / 2));
    this.b = this.secondB.copy();
  }

  showMid() {
    // ellipse(this.mid.x, this.mid.y, 10, 10);
    fill(0);
    ellipse(this.secondA.x, this.secondA.y, 10, 10);
    ellipse(this.secondB.x, this.secondB.y, 10, 10);
  }
  show() {
    this.showMid();
    this.rotate(frameCount / 100);
    stroke(0);
    // line(this.a.x, this.a.y, this.b.x, this.b.y);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class Ray {
  constructor(x, y, angle) {
    this.pos = createVector(x, y);
    this.dir = p5.Vector.fromAngle(angle);
  }

  cast(wall) {
    // Get the endpoints of the wall
    let x1 = wall.a.x;
    let y1 = wall.a.y;
    let x2 = wall.b.x;
    let y2 = wall.b.y;

    // Get the position and direction of the ray
    let x3 = this.pos.x;
    let y3 = this.pos.y;
    let x4 = this.pos.x + this.dir.x;
    let y4 = this.pos.y + this.dir.y;

    // Calculate the denominator of the intersection formula
    let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    // If the denominator is zero, the lines are parallel and do not intersect
    if (den == 0) {
      return null;
    }

    // Calculate the numerator of the intersection formula
    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    // If t and u are between 0 and 1, the intersection point is inside the segment
    if (t > 0 && t < 1 && u > 0) {
      // Calculate and return the intersection point
      let pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return null;
    }
  }

  show() {
    stroke(255, 100);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 10, this.dir.y * 10);
    pop();
  }
}
