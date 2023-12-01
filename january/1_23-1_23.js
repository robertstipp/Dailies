let start, end;
let points = [];
let simplexNoise;
function setup() {
  pixelDensity(1);
  createCanvas(869, 1152, SVG);
  noFill();
  noLoop();
  simplexNoise = new openSimplexNoise(Date.now());
}
function draw() {
  let steps = 1000;
  let radius = 20;
  let origin = createVector(width / 2, height / 2);
  for (let a = 0; a < steps; a++) {
    let angle = map(a, 0, steps, 0, TWO_PI);

    points.push(new PolarCoord(angle, radius, origin));
  }
  for (let i = 0; i < 200; i++) {
    origin.add(0, 0);
    beginShape();
    points.forEach((p) => {
      p.plot(origin);
      p.mutate();
    });
    endShape(CLOSE);
  }
}

function keyPressed() {
  if (key == "s") {
    save("1_21_23.svg");
  }
}

class PolarCoord {
  constructor(angle, radius) {
    this.angle = angle;
    this.radius = radius;
  }
  mutate() {
    let noise = map(
      simplexNoise.noise3D(cos(this.angle), sin(this.angle), this.radius / 100),
      -1,
      1,
      0,
      4
    );
    this.radius += noise;
    let noiseAngle = map(
      simplexNoise.noise3D(
        cos(this.angle * 2),
        sin(this.angle),
        this.radius / 100
      ),
      -1,
      1,
      0,
      0.1
    );
    this.angle += 0.1 + noiseAngle;
  }
  plot(origin) {
    let x = origin.x + this.radius * cos(this.angle);
    let y = origin.y + this.radius * sin(this.angle);
    vertex(x, y);
  }
}
