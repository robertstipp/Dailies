let rows = 10;
let cols = 10;
let cellW, cellH;
let gridSquares = [];
let noiseSquare;
let noiseSquares = [];
let margin = 100;

let mic;
let song;
let fft;
let bass;
let mid;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

let colors = ["#44af69", "#f72585", "#fcab10", "#2b9eb3"];

function setup() {
  createCanvas(600, 600);
  noStroke();
  background(255);
  noFill();
  rectMode(CENTER);

  // AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  cellW = width / cols;
  cellH = height / rows;

  for (let x = margin; x <= width - margin; x += cellW) {
    for (let y = margin; y <= height - margin; y += cellH) {
      gridSquares.push(new GridSquare(x, y));
      noiseSquares.push(new NoiseSquare(x, y));
    }
  }
}
function draw() {
  background(0);
  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  gridSquares.forEach((square) => square.show());
  noiseSquares.forEach((square) => square.show());
}

class GridSquare {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rectW = map(noise(x / 100, y / 100), 0, 1, cellW / 2, cellW);
    this.numSubSquares = 2;
  }

  fill() {}

  show() {
    push();
    translate(this.x, this.y);
    rotate(noise(this.x / 100, this.y / 100));
    rect(0, 0, this.rectW);
    pop();
  }
}

class NoiseSquare {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = map(
      noise(x / 100, y / 100),
      0,
      1,
      cellW / 4,
      (cellW * 3) / 4
    );
    this.points = [];
    this.c = random(colors);

    for (let angle = PI / 4; angle < TAU + PI / 4; angle += PI / 10) {
      let point = createVector(
        x + this.radius * Math.cos(angle),
        y + this.radius * Math.sin(angle)
      );
      this.points.push(point);
    }
  }

  show() {
    push();
    fill(this.c);
    beginShape();
    this.points.forEach((pt) => {
      if (noise(bass / 100, pt.x / 100, pt.y / 100) < 0.5) {
        vertex(pt.x, pt.y);
      }
    });
    endShape(CLOSE);
    pop();
  }
}
