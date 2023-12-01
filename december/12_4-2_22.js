const specialArcs = [];
function setup() {
  createCanvas(600, 600);
  background(0);

  // noStroke();
  // arc(350, 300, 100, 100, PI, TAU);
  // rect(300, 300, 100, 100);
  // strokeWeight(3);
  // stroke(255);
  // line(0, 500, 300, 400);
  // line(0, 600, 400, 400);

  noFill();
  stroke(255);
  strokeWeight(10);

  // arc(300, 300, 100, 100, PI - PI / 3, TAU);
  for (let radius = 100; radius <= 500; radius += 100) {
    specialArcs.push(new myArc(300, 300, radius));
  }
}

function draw() {
  background(0);
  specialArcs.forEach((arc) => {
    arc.shrink();
    arc.display();
  });
}

class myArc {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angleRange = PI;
    this.midAngle = this.angleRange / 2;
    this.fromAngle = PI;
    this.toAngle = TAU;
    this.angleStep = 0.01;
    this.direction = 1;
  }
  shrink() {
    if (this.direction === 1) {
      this.fromAngle += this.angleStep;
      this.toAngle -= this.angleStep;
    }
    if (this.direction === -1) {
      this.fromAngle -= this.angleStep;
      this.toAngle += this.angleStep;
    }

    if (this.fromAngle >= PI) {
      this.direction * -1;
    }
  }

  display() {
    arc(this.x, this.y, this.radius, this.radius, this.fromAngle, this.toAngle);
  }
}
