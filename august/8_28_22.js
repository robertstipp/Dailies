let mic, fft, song, bass, mid;

let cols = 30;
let rows = 30;
let cellW, cellH;
let margin = 0;

let trebleScl;

let midCanvas;

let discs = [];

let colors = ["#ff006e", "#8338ec", "#3a86ff"];
colors = ["#FFF"];

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}
function setup() {
  createCanvas(600, 600);
  background(0, 10);
  noStroke();

  cellW = width / cols;
  cellH = height / rows;

  midCanvas = createVector(width / 2, height / 2);

  // Audio
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  // const disc = new SoundDisc(300, 300);
  let counter = 0;
  let angleStep = PI / 12;

  // for (let r = 0; r <= width; r += 10) {
  //   for (let angle = 0; angle < TAU; angle += angleStep) {
  //     if (counter % 2 == 0) {
  //       angleOffset = angleStep / 2;
  //     } else {
  //       angleOffset = 0;
  //     }

  //     let x = midCanvas.x + r * Math.cos(angle + angleOffset);
  //     let y = midCanvas.y + r * Math.sin(angle + angleOffset);
  //     discs.push(new SoundDisc(x, y, cellW / 4));
  //   }
  //   counter++;
  // }

  for (let x = margin; x <= width - margin; x += cellW) {
    for (let y = margin; y <= height - margin; y += cellH) {
      discs.push(new SoundDisc(x, y, cellW / 4));
    }
  }
}
function draw() {
  background(0);
  let spectrum = fft.analyze();
  console.log(getFrameRate());
  bass = fft.getEnergy("bass");
  treble = fft.getEnergy("treble");
  mid = fft.getEnergy("mid");

  // console.log(mid);
  trebleScl = map(mid, 0, 255, 0.5, 3);

  discs.forEach((disc) => disc.show());
}

class SoundDisc {
  constructor(cX, cY, r) {
    this.origin = createVector(cX, cY);
    this.pos = createVector(this.origin.x, this.origin.y);
    this.radius = r;

    this.c = random(colors);
    this.angleHeading = Math.atan2(
      midCanvas.y - this.origin.y,
      midCanvas.x - this.origin.x
    );

    this.magMax = p5.Vector.dist(this.origin, midCanvas) / 1;
  }

  move() {
    let t = map(bass, 0, 255, 0, map(this.magMax, 0, 500, 0, 1));
    let lerpX = lerp(
      this.origin.x,
      this.origin.x + this.magMax * Math.cos(this.angleHeading),
      t
    );
    let lerpY = lerp(
      this.origin.y,
      this.origin.y + this.magMax * Math.sin(this.angleHeading),
      t
    );
    this.pos = createVector(lerpX, lerpY);
  }

  scaleLine() {
    this.mag = lerp(0, this.magMax, map(bass, 0, 255, 0, 2));
  }
  point() {
    this.scaleLine();
    let x = this.origin.x + this.mag * Math.cos(this.angleHeading);
    let y = this.origin.y + this.mag * Math.sin(this.angleHeading);
    strokeWeight(1);
    stroke(255);
    line(this.origin.x, this.origin.y, x, y);
  }

  color() {
    fill(this.c);
  }

  show() {
    this.move();
    this.color();
    // this.point();s
    ellipse(this.pos.x, this.pos.y, this.radius * trebleScl);
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
