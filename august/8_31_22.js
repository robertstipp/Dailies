let mic, fft, song, bass, mid;

let colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

let center, direction;

function setup() {
  createCanvas(600, 600);
  background(220);
  stroke(0);
  strokeWeight(2);
  noFill();

  // Audio
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  center = createVector(300, 300);
  direction = p5.Vector.random2D();
}

let scale = 10;
let resolution = 0.002;
let numPoints = 500;

let radius = 100;
let numRings = 10;

let t = 0;

function draw() {
  background(220);
  for (r = 0; r < radius; r += radius / numRings) {
    beginShape();
    for (
      let a = -TAU / numPoints;
      a < TAU + TAU / numPoints;
      a += TAU / numPoints
    ) {
      let x = center.x + r * cos(a);
      let y = center.y + r * sin(a);

      let n = map(noise(x * resolution, y * resolution), 0, 1, -scale, scale);

      // point(x + n, y + n);

      curveVertex(x + n, y + n);

      if (noise(x, y, bass) > 0.75 - 0.25 * sin(r)) {
        endShape();
        beginShape();
      }
    }
    endShape();

    center.x = 300 + 100 * cos(t);
    center.y = 300 + 100 * sin(t);

    if (center.x + radius > width || center.x - radius < 0) {
      direction.x *= -1;
    }
    if (center.y + radius > height || center.y - radius < 0) {
      direction.y *= -1;
    }
  }

  let spectrum = fft.analyze();
  // console.log(getFrameRate());
  bass = fft.getEnergy("bass");
  treble = fft.getEnergy("treble");
  mid = fft.getEnergy("mid");
  t += map(bass, 0, 255, 0, 0.1);
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
