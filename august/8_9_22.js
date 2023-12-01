let angleStep = 4;
let ring;
let ring1;
let pointsize = [2, 3, 4, 5, 7];
let colors = ["#5f0f40", "#9a031e", "#fb8b24", "#e36414", "#0f4c5c"];
let bass;
let mic;
let song;
let fft;
let rings = [];
let t = 0;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(1000, 1000);

  angleMode(DEGREES);

  noStroke();
  for (r = 0; r < 1000; r += 50) {
    rings.push(new Ring(width / 2, height / 2, r));
  }
  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}
function draw() {
  background(255);
  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");

  let bassMax = map(bass, 0, 255, 0, rings.length);
  for (let i = 0; i <= bassMax; i++) {
    rings[i].show();
  }
  t += 0.01;
  // let mid = fft.getEnergy("mid");
  // let bassMax = map(bass, 0, 255, 100, 300);
  // bandedNoiseCircle(width / 2, 500, 50, 100);
}

function bandedNoiseCircle(x, y, r1, r2) {
  let c = color(colors[0]);
  // for (let r = r1; r < r2; r += 10) {
  //   push();
  //   translate(x, y);
  //   let angleStep = map(r, r1, r2, 0.5, 0.25);
  //   for (let angle = 0; angle < 360; angle += angleStep) {
  //     let x1 = r * cos(angle) * (1 - sin(angle));
  //     let y1 = r * sin(angle) * (1 - sin(angle));

  //     c.setAlpha(map(noise(x1, y1, r), 0, 1, 0, 255));
  //     fill(c);
  //     noStroke();
  //     ellipse(x1, y1, random(pointsize));
  //   }
  //   pop();
  // }
}

function keyPressed() {
  // 83 is key code for key "s"s
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save("aug_9_22.jpeg");
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}

class Ring {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.points = [];
    this.r = r;
    this.color = color(random(colors));

    for (let angle = 0; angle < 360; angle += 4) {
      let x1 = this.r * cos(angle);
      let y1 = this.r * sin(angle);
      let alpha = map(noise(x1, y1, this.r), 0, 1, 0, 255);

      this.points.push(new Point(x1, y1, alpha));
    }
  }

  show() {
    push();
    translate(this.x, this.y);

    for (const p of this.points) {
      let c = this.color;

      c.setAlpha(p.alpha);
      fill(c);
      ellipse(p.x, p.y, p.size * noise(p.x, p.y, t) * 10);
    }
    pop();
  }
}

class Point {
  constructor(x, y, alpha) {
    this.x = x;
    this.y = y;
    this.alpha = alpha;
    this.size = random(pointsize);
  }
}
