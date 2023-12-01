const squares = [];

let t = 0;

function setup() {
  createCanvas(600, 600);
  background("#FBF2CF");

  // const square = new NoiseSquare(300, 300, 100);
  // square.show();

  for (let x = 0; x <= width; x += 10) {
    for (let y = 0; y <= height; y += 10) {
      squares.push(new NoiseSquare(x, y, random(20)));
    }
  }

  // squares.forEach((square) => square.show());

  squares.forEach((square) => square.show());
}
function draw() {}

class NoiseSquare {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.points = [];
    for (let angle = PI / 4; angle < TAU + PI / 4; angle += PI / 2) {
      let xOff = map(noise(x / 100, y / 100), 0, 1, -2, 2);
      // let xOff = random([-2, 2]);
      let yOff = random([-2, 2]);
      this.points.push(
        createVector(
          x + r * Math.cos(angle) + xOff,
          y + r * Math.sin(angle) + yOff
        )
      );
    }
  }
  show() {
    // stroke("#87A2FB");
    // strokeWeight(1);
    noStroke();
    let noiseVal = noise(this.x / 100, this.y / 100);

    if (random() < 0.5) {
    } else {
    }

    if (noiseVal < 0.4) {
      let c = color("#6F38C5");
      c.setAlpha(200);
      fill(c);
      blendMode(HARD_LIGHT);
    } else if (noiseVal > 0.4 && noiseVal < 0.6) {
      let c = color("#87A2FB");
      c.setAlpha(100);
      fill(c);
      blendMode(DARKEST);
    } else {
      let c = color("#6F38C5");
      c.setAlpha(200);
      fill(c);
      blendMode(BURN);
    }
    beginShape();
    this.points.forEach((point) => {
      vertex(point.x, point.y);
    });
    endShape(CLOSE);
  }
}
