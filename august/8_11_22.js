const colors = ["#2b2d42", "#8d99ae", "#edf2f4", "#ef233c", "#d90429"];

const sample = ["bass", "mid", "treble"];

let lineArt = [
  [0, 20],
  [20, 0],
];

// LINES
// RIGHT
let drlines = [];
let dBass = [];
let dMid = [];
let dTreb = [];
let mic;
let song;
let fft;
let bass;
let mid;

let p;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(600, 600);
  background(0);

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  for (x = 0; x < width; x += 10) {
    for (y = 0; y < height; y += 10) {
      drlines.push(new Line(x, y, x, y));
    }
  }

  dBass = drlines.filter((line) => line.sample === "bass");
  dMid = drlines.filter((line) => line.sample === "mid");
  dTreb = drlines.filter((line) => line.sample === "treble");

  // for (x = 100; x < 200; x += 10) {
  //   for (y = 100; y < 200; y += 10) {
  //     urlines.push(new Line(x, y, x, y));
  //   }
  // }

  // for (x = 200; x < 400; x += 10) {
  //   for (y = 200; y < 400; y += 10) {
  //     dllines.push(new Line(x, y, x - 200, y + 200));
  //   }
  // }

  // for (x = 200; x < 400; x += 10) {
  //   for (y = 400; y > 200; y -= 10) {
  //     ullines.push(new Line(x, y, x - 200, y - 200));
  //   }
  // }
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  lowMid = fft.getEnergy("lowMid");
  mid = fft.getEnergy("mid");
  highMid = fft.getEnergy("highMid");
  treble = fft.getEnergy("treble");

  for (i = 0; i < dBass.length; i++) {
    dBass[i].show();
  }

  for (i = 0; i < dMid.length; i++) {
    dMid[i].show();
  }
  for (i = 0; i < dTreb.length; i++) {
    dTreb[i].show();
  }

  // let mid = fft.getEnergy("mid");
  // for (i = 0; i < map(bass, 0, 255, 0, drlines.length); i++) {
  //   if ((drlines[i].sample = "bass")) {
  //     console.log(drline)
  //     drlines[i].show();
  //   }
  // }

  // drlines.forEach((line) => line.show());
  // urlines.forEach((line) => line.show());
  // ullines.forEach((line) => line.show());
  // dllines.forEach((line) => line.show());
}

class Line {
  constructor(x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.sample = random(sample);

    if (this.sample === "bass") {
      this.c = color(colors[4]);
    } else if (this.sample === "mid") {
      this.c = color(colors[1]);
    } else {
      this.c = color(colors[2]);
    }
    // this.c = color(colors[floor(noise(x, y) * (colors.length - 1))]);
    // this.c = color(random(colors));
  }

  show() {
    push();

    fill(this.c);

    // ellipse(this.x0, this.y0, this.sz);
    strokeWeight(3);

    stroke(this.c);

    strokeCap(SQUARE);
    this.lines = [map(bass, 0, 255, -20, 20), map(treble, 0, 255, -20, 20)];
    line(this.x0, this.y0, this.x0 + this.lines[0], this.y0 + this.lines[1]);
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
