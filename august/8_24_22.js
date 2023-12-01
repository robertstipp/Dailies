let mic;
let song;
let fft;
let bass;
let mid;

let margin = 100;

let diamonds = [];

let bassDiamonds = [];
let midDiamonds = [];

let t = 0;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

let colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];

function setup() {
  createCanvas(600, 600);

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  noStroke();
  for (x = margin; x <= width - margin; x += 100) {
    for (y = margin; y <= height - margin; y += 100) {
      for (let sz = 10; sz < 30; sz += 10) {
        bassDiamonds.push(new Diamond(x, y, sz));
      }
    }
  }

  for (x = 150; x <= width - 150; x += 100) {
    for (y = 150; y <= height - 150; y += 100) {
      for (let sz = 10; sz < 35; sz += 10) {
        midDiamonds.push(new Diamond(x, y, sz));
      }
    }
  }
}
function draw() {
  background(0);
  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  bassDiamonds.forEach((diamond) => diamond.show(t));
  midDiamonds.forEach((diamond) => {
    diamond.show(-t);
  });
  t += 0.1;
}

class Diamond {
  constructor(x, y, sz) {
    this.origin = createVector(x, y);
    this.size = sz;
    this.points = [];

    // let top = createVector(x, y - this.size);
    // let right = createVector(x + this.size, y);
    // let bottom = createVector(x, y + this.size);
    // let left = createVector(x - this.size, y);

    let top = createVector(0, 0 - this.size);
    let right = createVector(0 + this.size, 0);
    let bottom = createVector(0, 0 + this.size);
    let left = createVector(0 - this.size, 0);

    this.points.push(top, right, bottom, left);
    let colorIndex = Math.floor(
      noise(this.origin.x / 1000, this.origin.y / 1000) * 4
    );
    this.c = color(colors[colorIndex]);
  }

  color() {
    let colorIndex = Math.floor(
      noise(this.origin.x / 100, this.origin.y / 100, t / 10) * 4
    );
    if (colorIndex == 0) {
      this.c = color(0);
    } else {
      this.c = color(colors[colorIndex]);
    }
  }

  show(t) {
    this.color();
    push();
    noFill();
    strokeWeight(map(bass, 0, 255, 0, 5));
    stroke(this.c);
    translate(this.origin.x, this.origin.y);

    beginShape();
    this.points.forEach((p) => {
      vertex(p.x, p.y);
    });
    endShape(CLOSE);
    pop();
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
