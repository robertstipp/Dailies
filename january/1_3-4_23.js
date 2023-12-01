let slider;
let mic;
let song;
let fft;
let bass;
let mid;
let t = 0;
let e, g;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(600, 600);
  background(0);

  e = new p5.Ease();
  // slider = createSlider(0, 1000, 100);
  // slider.position(10, 10);
  // slider.style("width", "80px");
  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}
function draw() {
  background(0);

  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  mid = fft.getEnergy("mid");
  let origin = createVector(width / 2, height / 2);
  let bassMap = e.staircase(bass / 255, 600) * 1000;
  let steps = bassMap;
  let rounds = 100;
  beginShape();
  noFill();
  stroke(255, 200);
  strokeWeight(1);
  push();

  for (let i = 0; i < steps; i++) {
    let r1 = map(i, 0, steps, 0, width / 2);
    let angleOff = map(i, 0, steps, 0, 2 * TAU);
    let r2 = r1 * 0.95;
    let r;
    i % 2 === 0 ? (r = r1) : (r = r2);
    let a = map(i, 0, steps, 0, rounds * TAU);
    let pos = p5.Vector.fromAngle(a + (sin(angleOff) * PI) / 6, r);
    pos.add(origin);
    vertex(pos.x, pos.y);
    // ellipse(pos.x, pos.y, 5);
  }
  endShape();
  pop();
  t += 0.01;
}
function keyPressed() {
  if (keyCode == 83) {
    save("1_2_23.png");
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
