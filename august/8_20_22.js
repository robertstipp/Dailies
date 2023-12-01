let openSimplex;

const bassPoints = [];
const midPoints = [];
const treblePoints = [];
const midHighPoints = [];
let colors = ["#44af69", "#f72585", "#fcab10", "#2b9eb3"];

let mic;
let song;
let fft;
let bass;
let mid;

let bassScl = 1;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(600, 600);
  background(0);
  noStroke();

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  openSimplex = openSimplexNoise(random(42));

  for (let y = 10; y <= 590; y += 10) {
    for (let x = 10; x <= 590; x += 10) {
      let noise = openSimplex.noise2D(x / 1, y / 100);
      let diameter = 10;
      let colorIndex = Math.floor(map(noise, -1, 1, 0, colors.length));
      let c = color(colors[colorIndex]);

      switch (colorIndex) {
        case 0:
          bassPoints.push(new Point(x, y, diameter, c));
          break;
        case 1:
          midPoints.push(new Point(x, y, diameter, c));
          break;
        case 2:
          treblePoints.push(new Point(x, y, diameter, c));
          break;
        case 3:
          midHighPoints.push(new Point(x, y, diameter, c));
          break;

        default:
          break;
      }
      console.log(midHighPoints.length);
      // fill(c);
      // ellipse(x, y, diameter);
    }
  }
}

function draw() {
  background(0);

  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  mid = fft.getEnergy("mid");
  highMid = fft.getEnergy("highMid");
  treble = fft.getEnergy("treble");

  let maxBass = map(bass, 0, 255, 0, bassPoints.length);
  let maxMid = map(mid, 0, 255, 0, midPoints.length);
  let maxTreble = map(treble, 0, 255, 0, treblePoints.length);
  let maxHighMid = map(highMid, 0, 255, 0, midHighPoints.length);

  for (let i = 0; i < maxBass; i++) {
    bassPoints[i].show();
  }
  for (let i = 0; i < maxMid; i++) {
    midPoints[i].show();
  }
  for (let i = 0; i < maxTreble; i++) {
    treblePoints[i].show();
  }
  for (let i = 0; i < maxHighMid; i++) {
    midHighPoints[i].show();
  }
}

class Point {
  constructor(x, y, d, c) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.d = d;
    this.angle = random(TAU);
    this.xOff = this.d * cos(this.angle);
    this.yOff = this.d * sin(this.angle);
  }

  show() {
    strokeWeight(10);
    stroke(this.c);
    line(this.x, this.y, this.x + this.xOff, this.y + this.yOff);
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
