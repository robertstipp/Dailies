let mic, fft, song, bass, mid;

const points = [];

let t = 0;
function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(600, 600);
  background(0);
  colorMode(HSB);

  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  for (let r = 0; r < 300; r += 50) {
    for (let angle = 0; angle <= TAU; angle += TAU / 6) {
      let x = 0 + r * Math.cos(angle);
      let y = 0 + r * Math.sin(angle);
      points.push(new Point(x, y));
    }
  }
  points.forEach((p) => p.findNeighbors());
  console.log(points);
}
function draw() {
  background(0, 0, 0, 0.1);
  // console.log(getFrameRate());
  fft.analyze();
  bass = fft.getEnergy("bass");
  treble = fft.getEnergy("treble");
  mid = fft.getEnergy("mid");

  translate(300, 300);
  rotate(t);

  points.forEach((p) => {
    if (dist(p.x, p.y, 0, 0) < 500) {
      stroke(bass, 100, 100);
      p.attachNeighbors();
    }
  });

  t += 0.01;
}

function mouseClicked() {
  song.isPlaying() ? song.stop() : song.play();
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
    this.nodes = points;
  }

  findNeighbors() {
    this.nodes.forEach((n) => {
      if (n !== this) {
        let d = dist(n.x, n.y, this.x, this.y);
        if (d > 50 && d < 500) {
          let neighbor = {
            ...n,
            d,
          };
          this.neighbors.push(neighbor);
        }
      }
    });
  }

  attachNeighbors() {
    this.neighbors.forEach((neighbor) => {
      if (neighbor.d < bass) {
        line(neighbor.x, neighbor.y, this.x, this.y);
      }
    });
  }
}
