let nsquares = [];
let t = 0;
let speed = 0.1;
let angleSwap = 0;
let disruptor;
const colors = ["#2192FF"];
function setup() {
  createCanvas(1080, 1920);
  background(0);
  noFill();
  let origin = createVector(width / 2, height / 2);
  let size = 50;
  nsquare = new NoiseSquare(origin, size);
  for (let x = 50; x < width; x += 100) {
    for (let y = 50; y < height; y += 100) {
      nsquares.push(new NoiseSquare(createVector(x, y), size));
    }
  }

  disruptor = new Disruptor(createVector(width / 2, height / 2));
}
function draw() {
  background(0, 10);

  nsquares.forEach((ns) => {
    let squarePos = ns.origin;
    let d = p5.Vector.dist(disruptor.origin, ns.origin);
    ns.draw();
    if (d < 500) {
      let mag = map(d, 0, 800, 2, 0);
      ns.disturb(mag);
    }
  });
  t += speed;
  angleSwap++;
}

class NoiseSquare {
  constructor(origin, size) {
    this.origin = origin;
    this.size = size;
    this.points = [];
    this.angles = Array(4)
      .fill()
      .map(() => random(TAU));
    for (let i = 0; i < 4; i++) {
      this.points.push(
        createVector(
          this.origin.x + this.size * cos((i * PI) / 2),
          this.origin.y + this.size * sin((i * PI) / 2)
        )
      );
    }
  }

  disturb(mag) {
    let len = sin(t) * mag;
    if (angleSwap % 60 == 0) {
      this.generateAngles();
    }
    let colorInt = abs(sin(t * 0.025));
    let c = lerpColor(color("#2192FF"), color("#FF0000"), colorInt);
    stroke(c);
    noFill();
    for (let i = 0; i < 4; i++) {
      let angle = this.angles[i];
      let start = createVector(
        this.origin.x + this.size * cos((i * PI) / 2),
        this.origin.y + this.size * sin((i * PI) / 2)
      );
      let end = createVector(
        this.origin.x + this.size * cos(angle) * len,
        this.origin.y + this.size * sin(angle) * len
      );
      this.points[i] = p5.Vector.lerp(start, end, sin(t * 0.2));
    }
  }

  generateAngles() {
    this.angles = Array(4)
      .fill()
      .map(() => random(TAU));
  }

  draw() {
    strokeWeight(2);
    // noFill();
    beginShape();
    for (let i = 0; i < 4; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape(CLOSE);
  }
}

class Disruptor {
  constructor(origin) {
    this.origin = origin;
  }
}
