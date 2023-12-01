let mic, fft, song, bass, mid;

let margin = 100;
let spacing = 50;
let t = 0;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(600, 600);
  background(0, 10);
  stroke(255);
  noFill();
  colorMode(HSB);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}
function draw() {
  background(0, 0, 0, 0.2);
  fft.analyze();

  bass = fft.getEnergy("bass");
  treble = fft.getEnergy("treble");
  mid = fft.getEnergy("mid");

  for (let x = margin; x <= width - margin; x += spacing) {
    for (let y = margin; y <= height - margin; y += spacing) {
      let origin = createVector(x, y);

      if (noise(x / 10, y / 10, t / 100) < map(bass, 0, 255, 0, 1)) {
        noiseSquare(origin, map(bass, 0, 255, 0, spacing / 1.5));
        let steps = Math.floor(bass / 30);
        let increment = 1.5;
        for (let i = 0; i < steps; i++) {
          noiseSquare(origin, map(bass, 0, 255, 0, spacing / increment));
          increment += 0.5;
        }
      }
    }
  }
  t++;
}

function noiseSquare(origin, radius) {
  this.startAngle = map(bass, 0, 255, 0, TAU);
  this.numVertices = 4;
  this.stepAngle = TAU / this.numVertices;
  this.c = color(map(treble, 0, 255, 0, 360), 100, 100);
  this.noiseScl = map(treble, 0, 255, 0, 10);

  stroke(this.c);

  beginShape();

  for (
    let angle = this.startAngle;
    angle <= TAU + this.startAngle;
    angle += this.stepAngle
  ) {
    let x = origin.x + radius * Math.cos(angle);
    let y = origin.y + radius * Math.sin(angle);

    let xOff = map(noise(x, y), 0, 1, -this.noiseScl, this.noiseScl);
    let yOff = map(noise(x, y), 0, 1, -this.noiseScl, this.noiseScl);
    vertex(x + xOff, y + yOff);
  }
  endShape(CLOSE);
}

function mouseClicked() {
  song.isPlaying() ? song.stop() : song.play();
}
