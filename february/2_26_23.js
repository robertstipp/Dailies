const colors = [
  "#fbfcfe",
  "#38e5f5",
  "#0383f0",
  "#192fc3",
  "#1c1525",
  "#f63b06",
  "#FFA71D",
  "#f6f946",
  "#fdfdfb",
  "#39e5f1",
  "#0364e9",
  "#3e259d",
  "#241927",
  "#f93600",
  "#fff766",
  "#e2f4f4",
];
let capturer;
let pg;

let myshader;
let fft;
let mic;
let bass;
let mid;
let treble;
let high;
let spectrum;
let texture;
let screen;
function preload() {
  myshader = loadShader("../shaders/rings.vert", "../shaders/rings.frag");
  song = loadSound("../media/01 Let You Know (feat. London Gramma.mp3");
}

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 128);
  fft.setInput(mic);
  pixelDensity(1);
  createCanvas(1080, 1920, WEBGL);
  pg = createGraphics(width, height);
  screen = createGraphics(width, height);
  // capturer = new CCapture({ format: "webm" });
  // capturer.start();
  // noLoop();
}
function draw() {
  spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  mid = fft.getEnergy("mid");
  treble = fft.getEnergy("treble");
  high = fft.getEnergy("highMid");

  drawScreen();
  // image(pg, 0, 0);
  // capturer.capture(canvas);
}

function drawScreen() {
  shader(myshader);

  screen.rect(0, 0, width, height);
  myshader.setUniform("u_texture", screen);
  myshader.setUniform("u_resolution", [width, height]);
  myshader.setUniform("u_time", millis() / 1000);
  myshader.setUniform("u_mouse", [mouseX, mouseY]);
  myshader.setUniform("u_prevPos", [0, 0]);
  myshader.setUniform("u_bass", pow(bass / 255.0, 3));
  myshader.setUniform("u_mid", pow(mid / 255.0, 3));
  myshader.setUniform("u_treble", pow(treble / 255.0, 1));
  myshader.setUniform("u_high", pow(high / 255.0, 2));
  myshader.setUniform("u_spectrum", spectrum);

  image(screen, 0, 0);
}

function keyPressed() {
  if (key == "s") {
    // saveCanvas("image", "png");
    capturer.stop();
    capturer.save();
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
