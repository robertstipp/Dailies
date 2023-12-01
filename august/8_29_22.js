const circleLocations = [];
const squareLocations = [];
const dots = [];

const numPoints = 30;

let mic, fft, song, bass, mid;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(600, 600);
  background(0);
  const origin = createVector(300, 300);
  const angleStep = TAU / numPoints;
  noFill();

  for (let radius = 10; radius <= 300; radius += 50) {
    for (let angle = 0; angle <= TAU + angleStep; angle += angleStep) {
      let x = origin.x + radius * Math.cos(angle);
      let y = origin.y + radius * Math.sin(angle);

      circleLocations.push(createVector(x, y));

      dots.push(new Dot(x, y));
    }
  }

  // Audio
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  dots.forEach((dot) => dot.move());
  dots.forEach((dot) => dot.show());
}
function draw() {
  background(0);

  let spectrum = fft.analyze();
  console.log(getFrameRate());
  bass = fft.getEnergy("bass");
  treble = fft.getEnergy("treble");
  mid = fft.getEnergy("mid");

  if (bass > 200) {
    dots.forEach((dot) => dot.move());
  } else {
    dots.forEach((dot) => dot.float());
  }
  // dots.forEach((dot) => dot.move());

  dots.forEach((dot) => dot.show());
  console.log(dots.every((dot) => dot.parked()));
}

class Dot {
  constructor(x, y) {
    this.endPoint = createVector(x, y);
    this.position = createVector(random(width), random(height));
    this.startPoint = createVector(random(width), random(height));
    this.speed = random(1, 2);
    this.randomDirection = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
  }

  move(destination) {
    if (!this.parked()) {
      destination = this.endPoint;
      // } else {
      //   destination = this.startPoint;
      // }
      let steeringAngle = Math.atan2(
        destination.y - this.position.y,
        destination.x - this.position.x
      );
      let steeringVector = createVector(
        Math.cos(steeringAngle),
        Math.sin(steeringAngle)
      );

      steeringVector.setMag(this.speed);
      // console.log(steeringVector);

      this.position.x += steeringVector.x;
      this.position.y += steeringVector.y;
    }
    // this.float();
  }

  float() {
    this.position.x += this.randomDirection.x;
    this.position.y += this.randomDirection.y;
  }

  parked() {
    return p5.Vector.dist(this.position, this.endPoint) < 1;
  }

  show() {
    stroke(255);
    // strokeWeight(1);

    strokeWeight(map(bass, 0, 255, -10, 10));

    point(this.position.x, this.position.y);
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
