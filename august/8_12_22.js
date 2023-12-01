let cells = [];
let rows, cols;
let h, w;
let options = [
  [10, 10],
  [-10, 10],
  [-10, -10],
  [10, -10],
];

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

const sample = ["bass", "mid", "treble"];
const colors = ["#F65A83", "#FF87B2", "#FFE898", "#FFF8BC"];

let mic;
let song;
let fft;
let bass;
let mid;

function setup() {
  createCanvas(600, 600);
  background(0);

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  rows = 12;
  cols = rows;
  h = height / rows;
  w = width / cols;
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      cells.push(new Cell(col * w, row * h));
    }
  }
}
function draw() {
  background(255);
  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  lowMid = fft.getEnergy("lowMid");
  cells.forEach((cell) => cell.show());

  // mid = fft.getEnergy("mid");
  // highMid = fft.getEnergy("highMid");
  // treble = fft.getEnergy("treble");
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.option = random(options);
    this.vector = createVector(this.option[0], this.option[1]);
    this.vector.setMag(50);
    this.c = color(random(colors));
  }

  soundVector() {
    this.vector1 = createVector(
      map(bass, 0, 255, -10, 10),
      map(lowMid, 0, 255, -20, 20)
    );
  }

  show() {
    // rect(this.x, this.y, w);
    strokeWeight(20);
    stroke(this.c);
    this.soundVector();

    line(
      this.x + h / 2 + this.vector1.x,
      this.y + h / 2 + this.vector1.y,
      this.x + h / 2 + this.vector1.x,
      this.y + h / 2 + this.vector1.y
    );
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
