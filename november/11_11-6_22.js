let noiseNess;

let mic;
let song;
let fft;
let bass;
let mid;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

let t = 0;
function setup() {
  createCanvas(600, 600);
  background(0);
  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);

  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  mid = fft.getEnergy("mid");
  noiseNess = map(bass, 100, 200, 1, 0.00001);

  cross();

  t += 0.1;
}

function band(width, yPos) {
  let y = yPos;
  beginShape();
  for (let x = 300 - width; x <= 300 + width; x += 1) {
    let yOff = map(noise(x * noiseNess, y * noiseNess), 0, 1, -10, 10);

    vertex(x, y + yOff);
  }
  endShape();
}

function cross() {
  stroke("#f3cf7a");
  noFill();
  for (let y = 50; y < 150; y += 10) {
    let width = map(y, 50, 120, 40, 50) * map(bass, 220, 255, 1, 1.5);

    band(width, y);
  }
  for (let y = 150; y < 230; y += 10) {
    let width = map(y, 150, 250, 200, 220) * map(bass, 220, 255, 1, 1.5);
    band(width, y);
  }

  for (let y = 230; y <= 500; y += 10) {
    let width = map(y, 250, 500, 70, 100) * map(bass, 220, 255, 1, 1.5);
    band(width, y);
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
