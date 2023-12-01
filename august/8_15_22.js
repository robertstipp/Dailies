let cells = [];
let dots = [];

let r = 1;
let rows = 30;
let cols = 30;
let w, h;
let angleStep = 0.1;
let bassScl = 0;
let bassClr = 0;
let radScl = 1;
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
  noStroke();
  fill(255);

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  w = width / cols;
  h = height / rows;

  for (let angle = 0; angle < 360; angle += 0.5) {
    let x = 300 + r * cos(radians(angle));
    let y = 300 + r * sin(radians(angle));
    cells.push(new Cell(x, y, w, h));
    r += 0.25;
  }

  cells.forEach((cell) => cell.show());
}

function draw() {
  background(0);
  noiseSeed(t);
  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  mid = fft.getEnergy("mid");

  for (let i = 0; i < map(bass, 0, 255, 0, dots.length); i++) {
    dots[i].show();
  }

  angleStep = map(bass, 0, 255, 0, 0.2);
  bassScl = map(bass, 0, 255, 1, 2);
  radScl = map(bass, 0, 255, 1, 2);
}

class Cell {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    dots.push(new Dot(this.x, this.y));
  }

  show() {
    rect(this.x, this.y, this.w, this.h);
  }
}

class Dot {
  constructor(x, y) {
    this.x = x + w / 2;
    this.y = y + h / 2;
    this.r = w / 2;
    this.angle = map(noise(x / 1000, y / 1000), 0, 1, 0, 2 * PI);
    this.xPos = this.x;
    this.yPos = this.y;

    this.c = color(255, 0, 0);
  }

  move() {
    this.angle += angleStep;
    this.xPos = this.x + this.r * radScl * bassScl * Math.cos(this.angle);
    this.yPos = this.y + this.r * radScl * bassScl * Math.sin(this.angle);
  }

  show() {
    this.move();

    fill(this.c);
    ellipse(this.xPos, this.yPos, 2 * bassScl);
  }
}
