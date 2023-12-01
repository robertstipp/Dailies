const colors = ["#F65A83", "#FF87B2", "#FFE898", "#FFF8BC"];

let mic;
let song;
let fft;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(600, 600);
  background(0);
  angleMode(DEGREES);
  stroke("red");
  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);

  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");

  let bassStep = map(bass, 0, 255, 0, 10);
  let bassMax = map(bass, 0, 255, 0, 500);
  let bassMin = map(bass, 0, 255, 500, 100);

  let midStep = map(mid, 0, 255, 10, 10);
  let midMax = map(mid, 0, 255, 0, 500);
  let midMin = map(mid, 0, 255, 500, 100);

  let midCir = map(mid, 0, 255, 0, 180);

  for (x = 100; x < bassMax; x += bassStep) {
    let c1 = color(colors[0]);
    let c2 = color(colors[1]);
    let interC = lerpColor(c1, c2, map(x, 100, 500, 0, 1));
    stroke(interC);
    strokeWeight(3);
    strokeCap(ROUND);

    line(x, 51, x, 149);
  }

  for (y = 100; y < midMax; y += midStep) {
    let c1 = color(colors[1]);
    let c2 = color(colors[2]);
    let interC = lerpColor(c1, c2, map(y, 100, 500, 0, 1));
    stroke(interC);
    strokeCap(ROUND);
    line(450, y, 550, y);
  }

  for (x = bassMin; x < 500; x += bassStep) {
    let c1 = color(colors[1]);
    let c2 = color(colors[2]);
    let interC = lerpColor(c1, c2, map(x, 100, 450, 0, 1));
    stroke(interC);
    strokeCap(ROUND);
    line(x, 550, x, 450);
  }

  for (y = midMin; y < 500; y += midStep) {
    let c1 = color(colors[0]);
    let c2 = color(colors[1]);
    let interC = lerpColor(c1, c2, map(y, 100, 500, 0, 1));
    stroke(interC);
    strokeCap(ROUND);
    line(50, y, 150, y);
  }

  lerpCircle(300, 300, colors[0], midCir);
}

function lerpCircle(x, y, clr, mid) {
  push();
  let c = color(clr);
  stroke(c);
  translate(x, y);
  let radius = 200;
  for (angle = 0; angle < mid; angle += 2) {
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    point(x, y);
    line(x, y, x, -y);
  }
  pop();
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
