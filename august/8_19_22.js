// const colors = [
//   "#f72585",
//   "#b5179e",
//   "#7209b7",
//   "#560bad",
//   "#480ca8",
//   "#3a0ca3",
//   "#3f37c9",
//   "#4361ee",
//   "#4895ef",
//   " #4cc9f0",
// ];

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

let c1, c2;

let mic;
let song;
let fft;
let bass;
let mid;

let colors = ["#44af69", "#f72585", "#fcab10", "#2b9eb3"];

let noiseScale = 0.1;

function setup() {
  createCanvas(800, 800);
  background(0);

  openSimplex = openSimplexNoise(random(42));
  stroke(color(colors[1]));
  noFill();

  c1 = color(colors[1]);
  c2 = color(colors[3]);

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  // for (let r = 0; r < 600; r += 30) {
  //   beginShape();

  //   let sW = map(r, 100, 600, 5, 30);
  //   strokeWeight(sW);

  //   for (let angle = 0; angle < TAU; angle += 0.01) {
  //     let x = 300 + r * Math.cos(angle);
  //     let y = 300 + r * Math.sin(angle);

  //     let xOff =
  //       openSimplex.noise3D(x * noiseScale, y * noiseScale, angle) * 10;
  //     let yOff =
  //       openSimplex.noise3D(x * noiseScale, y * noiseScale, angle) * 10;

  //     x += xOff;
  //     y += yOff;

  //     vertex(x, y);
  //   }
  //   endShape(CLOSE);
  // }
}
function draw() {
  background(0, 10);
  console.log(getFrameRate());
  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  mid = fft.getEnergy("mid");

  let noiseScaleX = map(bass, 0, 255, 1, 0.01);
  let noiseScaleY = map(mid, 0, 255, 0.01, 1);

  rScale = map(bass, 0, 255, 0, 5);
  let c = lerpColor(c1, c2, map(bass, 0, 255, 1, 0));
  stroke(c);
  for (let r = 10; r < 400; r += 20) {
    beginShape();

    strokeWeight(3);
    for (let angle = 0; angle <= TAU; angle += 0.05) {
      let angleOff = map(noise(r, angle), 0, 1, -0.3, 0.3);
      let x = 300 + r * rScale * Math.cos(angle + angleOff);
      let y = 300 + r * rScale * Math.sin(angle + angleOff);

      let xOff = openSimplex.noise2D(x * noiseScaleX, y * noiseScaleY) * 15;
      let yOff = openSimplex.noise2D(x * noiseScaleX, y * noiseScaleY) * 15;

      x += xOff;
      y += yOff;

      point(x, y);
    }
    endShape(CLOSE);
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
