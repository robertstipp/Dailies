let points = [];

let xNoise = 1 / 1000;
let yNoise = 1 / 1000;
let tNoise = 1 / 100;

let maxPoints = 200;

let t = 0;

// AUDIO
let mic;
let song;
let fft;
let bass;
let mid;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}

function setup() {
  createCanvas(600, 600);
  background(0);

  fill(255);
  noFill();

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  points = Array(2000)
    .fill()
    .map((n) => {
      return createVector(random(width), random(height));
    });
}

function draw() {
  background(0, 10);

  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  mid = fft.getEnergy("mid");

  if (bass > 200) {
    xNoise = 0.1;
  }

  maxPoints = map(bass, 100, 255, 100, 2000);

  stroke(0, 255, 0, 100);
  strokeWeight(map(bass, 0, 255, 0, 2));

  for (let i = 0; i <= maxPoints; i++) {
    let p = points[i];
    point(p.x, p.y);

    let angle = noise(p.x * xNoise, p.y * yNoise, t * tNoise) * TAU;

    p.x += cos(angle);
    p.y += sin(angle);

    p = checkBounds(p);
  }

  t += map(bass, 0, 255, 1, 2);

  console.log(getFrameRate());
}

function checkBounds(p) {
  if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
    p.x = random(width);
    p.y = random(height);
  }

  return p;
}
