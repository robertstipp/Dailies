const squares = [];
let margin = 100;
let spacing = 100;

let mic, fft, song, bass, mid;
let bassScl;

// function preload() {
//   song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
// }

let color1 = "#EE6983";
let color2 = "#850E35";

function setup() {
  createCanvas(600, 600);
  background(0);
  stroke(0);
  noFill();

  // mic = new p5.AudioIn();
  // mic.start();
  // fft = new p5.FFT();
  // fft.setInput(mic);

  for (let x = margin; x <= width - margin; x += spacing) {
    for (let y = margin; y <= height - margin; y += spacing) {
      for (let r = 5; r < spacing / 1.5; r += 1) {
        let origin = createVector(x, y);
        squares.push(new NoiseSquare(origin, r));
      }
    }
  }
  // backgroundDots();
  squares.forEach((square) => {
    square.display();
  });
}

function draw() {
  // fft.analyze();
  // bass = fft.getEnergy("bass");
  // treble = fft.getEnergy("treble");
  // console.log(getFrameRate());
  // background("#FFF5E4");
  // squares.forEach((square) => {
  //   square.display();
  // });
}

class NoiseSquare {
  constructor(origin, radius) {
    this.points = [];
    this.startAngle = PI / 4;
    this.stepAngle = PI / 2;
    this.maxOff = map(radius, 10, spacing, 2, 10);
    this.c = random() < 0.25 ? random([color1, color2]) : random(255);

    for (let angle = this.startAngle; angle <= TAU; angle += this.stepAngle) {
      let x = origin.x + radius * Math.cos(angle);
      let y = origin.y + radius * Math.sin(angle);

      let xOff = map(noise(x, y), 0, 1, -this.maxOff, this.maxOff);
      let yOff = map(noise(y, x), 0, 1, -this.maxOff, this.maxOff);

      this.points.push(createVector(x + xOff, y + yOff));
    }
  }

  display() {
    push();
    stroke(this.c);
    beginShape();
    this.points.forEach((point) => {
      vertex(point.x, point.y);
    });
    endShape(CLOSE);
    pop();
  }
}

function backgroundDots() {
  for (let x = 0; x <= width; x += 10) {
    for (let y = 0; y <= height; y += 10) {
      let len = map(noise(x, y), 0, 1, 0, 10);
      push();
      stroke(random(150, 255));

      if (random() < 0.5) line(x, y, x + len, y - len);
      // line(x, y, x - len, y + len);
      pop();
    }
  }
}

function mouseClicked() {
  song.isPlaying() ? song.stop() : song.play();
}
