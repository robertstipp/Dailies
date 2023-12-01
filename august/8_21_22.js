let arcs = [];

const color1 = ["#96E5D1"];
const color2 = ["#F7F6DC"];

let angles = [0, Math.PI];

function setup() {
  createCanvas(600, 600);
  background(color(color2));

  strokeWeight(5);
  noFill();
  for (let x = 0; x <= 600; x += 50) {
    for (let y = 0; y <= 600; y += 50) {
      arcs.push(new Arc(x, y));
    }
  }
  noiseSeed(1000);
  arcs.forEach((arc) => {
    push();
    arc.points.forEach((p) => {
      stroke(color(color1));
      point(p.x, p.y);
    });
    pop();
  });
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("aug_21_22.jpeg");
  }
}

class Arc {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.points = [];
    this.startAngle = random(angles);
    // this.startAngleIndex = Math.floor(noise(x / 100, y / 100) * angles.length);
    // this.startAngle = angles[this.startAngleIndex];
    this.endAngle = this.startAngle + PI / 2;
    this.angleStep = PI / 60;
    this.radius = 50;
    for (let r = 10; r < this.radius; r += 10) {
      for (
        let angle = this.startAngle;
        angle <= this.endAngle;
        angle += this.angleStep
      ) {
        let x = this.origin.x + r * Math.cos(angle);
        let y = this.origin.y + r * Math.sin(angle);
        this.points.push(createVector(x, y));
      }
    }
  }
}
