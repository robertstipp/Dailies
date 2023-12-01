let rows = 10;
let cols = 10;

let colors = ["#44af69", "#f72585", "#fcab10", "#2b9eb3"];

let tileWidth, tileHeight;

let tiles = [];

let patterns = [pattern1, pattern2];

let angles = [0];
let angleOffset = 0;

let mic;
let song;
let fft;
let bass;
let mid;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(600, 600);

  noFill();
  tileWidth = width / cols;
  tileHeight = height / rows;

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  for (let x = -30; x <= 600; x += tileWidth) {
    for (let y = -30; y <= 600; y += tileHeight) {
      tiles.push(new Tile(x, y));
    }
  }
}

function draw() {
  background(0);
  console.log(getFrameRate());
  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  console.log(bass);
  tiles.forEach((tile) => tile.show());

  angleOffset = map(constrain(bass, 0, 225), 0, 200, PI / 2, 0);
}

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pattern = new DotPattern(this.x, this.y);
    this.cIndex = Math.floor(
      map(noise(this.x, this.y), 0, 1, 0, colors.length)
    );
    this.c = color(colors[this.cIndex]);
  }

  show() {
    strokeWeight(6);
    stroke(this.c);

    this.pattern.show();
  }
}

class LinePattern {
  constructor(x, y) {
    this.x = x + tileWidth / 2;
    this.y = y + tileHeight / 2;
    this.angle = random(angles);
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    line(0, 0, -tileWidth / 2, -tileHeight / 2);
    line(0, 0, tileWidth / 2, tileHeight / 2);
    pop();
  }
}

class DotPattern {
  constructor(x, y) {
    this.x = x + tileWidth / 2;
    this.y = y + tileHeight / 2;
    this.pattern = random(patterns);
  }

  show() {
    push();
    // noFill();

    translate(this.x, this.y);
    rotate(angleOffset);
    this.pattern();
    pop();
  }
}

function pattern1() {
  arc(0, 0, tileWidth, tileHeight, 0, HALF_PI);
  arc(tileWidth, tileHeight, tileWidth, tileHeight, PI, (PI * 3) / 2);
}

function pattern2() {
  arc(0, tileHeight, tileWidth, tileHeight, (PI * 3) / 2, 0);
  arc(tileWidth, 0, tileWidth, tileHeight, PI / 2, PI);
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
