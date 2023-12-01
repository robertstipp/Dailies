let dots = [];
// let colors = ["#dad7cd", "#a3b18a", "#588157", "#3a5a40", "#344e41"];
// let colors = ["#250902", "#38040e", "#640d14", "#800e13", "#ad2831"];
// let colors = ["#403f4c", "#2c2b3c", "#1b2432", "#121420"];
// let colors = ["#44af69", "#f8333c", "#fcab10", "#2b9eb3"];

let colors = ["#f72585", "#b5179e", "#7209b7", "#560bad", "#480ca8"];

let step = 15;
let sz = step * 0.25;
let t = 0;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

let mic;
let song;
let fft;
let bass;
let mid;

function setup() {
  createCanvas(800, 800);
  background(255);

  for (x = 100; x < width - 100; x += step) {
    for (y = 100; y < height - 100; y += step) {
      dots.push(new Dot(x, y));
    }
  }

  // LOAD NEIGHBORS
  dots.forEach((dot) => dot.findNeighbors());

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}
function draw() {
  background(0, 10);
  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");

  lowMid = fft.getEnergy("lowMid");
  mid = fft.getEnergy("mid");

  let bassScl = map(bass, 200, 255, 0, 2);
  // dot.forEach((dot) => dot.move());
  dots.forEach((dot) => dot.show());
  dots.forEach((dot) => {
    dot.neighbors.forEach((neighbor) => {
      if (neighbor.c == dot.c) {
        push();
        strokeWeight(5 * bassScl);
        stroke(dot.c);
        line(neighbor.x, neighbor.y, dot.x, dot.y);
        pop();
      }
    });
  });

  t += map(mid, 200, 255, 0.0, 0.05);
  // noLoop();
}

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.cIndex = Math.floor(map(noise(this.x * 10, this.y * 10), 0, 1, 0, 4));
    this.c = colors[this.cIndex];
    this.neighbors = [];
  }

  findNeighbors() {
    let posNeighbors = [];
    posNeighbors.push(
      dots.find((dot) => dot.x === this.x + step && dot.y === this.y)
    );
    posNeighbors.push(
      dots.find((dot) => dot.x === this.x - step && dot.y === this.y)
    );
    posNeighbors.push(
      dots.find((dot) => dot.y === this.y + step && dot.x === this.x)
    );
    posNeighbors.push(
      dots.find((dot) => dot.y === this.y - step && dot.x === this.x)
    );
    posNeighbors.forEach((pos) => {
      if (pos) {
        this.neighbors.push(pos);
      }
    });
  }

  move() {
    this.cIndex = Math.floor(
      map(noise(this.x * 10, this.y * 10, t), 0, 1, 0, 5)
    );
    this.c = colors[this.cIndex];
  }

  show() {
    this.move();

    push();
    // fill(this.c);
    // ellipse(this.x, this.y, sz);
    pop();
  }
}

function keyPressed() {
  // 83 is key code for key "s"s
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save("aug_14_22.jpeg");
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
