let pathIndex = 0;
let t = 0;

let bassScl = 1;

let circles = [];
let paths = [];

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

  // stroke(color("#3EC70B"));
  noFill();
  noStroke();

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  for (let i = 0; i < 1000; i++) {
    circles.push(new Circle(random(2, 4)));

    let r = map(i, 0, 1000, 0, 100);
    let x = 300 + r * Math.cos(random(2 * PI));
    let y = 300 + r * Math.sin(random(2 * PI));

    paths.push(new OrbitPath(x, y));
  }
  let c = color("#3EC70B");

  fill(c);
}

function draw() {
  background(0, 10);

  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  mid = fft.getEnergy("mid");
  bassScl = map(bass, 0, 255, 0, 2);

  for (let i = 0; i < circles.length; i++) {
    circles[i].show(paths[i].path[pathIndex].x, paths[i].path[pathIndex].y);
  }

  pathIndex++;
  if (pathIndex >= paths[0].path.length) {
    pathIndex = 0;
  }
  console.log(getFrameRate(0));
}

class OrbitPath {
  constructor(x, y) {
    this.originX = x;
    this.originY = y;
    this.path = [];
    this.radius = random(100, 200);

    for (let angle = 0; angle < 360; angle++) {
      let x =
        this.originX +
        this.radius *
          map(noise(this.originX, this.originY), 0, 1, 0, 1) *
          Math.cos(radians(angle));
      let y = this.originY + this.radius * Math.sin(radians(angle));

      this.path.push(createVector(x, y));
    }
  }
}

class Circle {
  constructor(size) {
    this.size = size;
  }

  show(x, y) {
    ellipse(x, y, this.size * bassScl);
  }
}

// class Triangle {
//   constructor() {
//     this.size = size;
//   }

//   show() {

//   }
// }
