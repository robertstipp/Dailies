let screen;

let mic;
let song;
let fft;
let bpm = 0;
let lastBeatTime = 0;
let threshold = 200;

let glitchShader;
let cols = 10;
let rows = 10;
let effW, effH, cellW, cellH;
let margin = 100;
let img;
let e;
let bass;
let mid;
let treble;
let spectrum;
let loudness;
let video;
function preload() {
  glitchShader = loadShader("../shaders/glitch.vert", "../shaders/glitch.frag");
  img = loadImage("../media/female4.jpg");
  song = loadSound("../media/17. Flume - Holdin On (Hermitude Remix).mp3");
  video = createVideo("../media/dancing.mp4");
}
function setup() {
  // AUDIO
  // mic = new p5.AudioIn();
  // mic.start();
  // fft = new p5.FFT();
  // fft.setInput(mic);
  // pixelDensity(4);
  createCanvas(1280, 720, WEBGL);
  video.hide();
  video.loop();
  screen = createGraphics(1280, 720);
  // screen.background(50);

  // screen.stroke(255);
  // screen.strokeWeight(5);
  e = new p5.Ease();
  shader(glitchShader);
  // effW = width - margin * 2;
  // effH = height - margin * 2;
  // cellW = effW / cols;
  // cellH = effH / rows;
  // for (let i = 0; i < cols; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     let cellPos = createVector(
  //       margin + cellW * i + cellW / 2,
  //       margin + cellH * j + cellH / 2
  //     );
  //     let scale = 0.5;
  //     screen.rect(cellPos.x, cellPos.y, cellW * scale, cellH * scale);
  //   }
  // }

  // screen.filter(THRESHOLD, 0.5);
}

function draw() {
  // spectrum = fft.analyze();
  // bass = fft.getEnergy("bass");
  // mid = fft.getEnergy("mid");
  // treble = fft.getEnergy("treble");
  // // loudness = mic.getLevel();
  // if (bass > threshold) {
  //   let timeSinceLastBeat = millis() - lastBeatTime;

  //   if (timeSinceLastBeat > 1000) {
  //     lastBeatTime = millis();
  //     bpm = 60 / (timeSinceLastBeat / 1000);
  //     console.log(bpm);
  //   }
  // }
  // console.log(spectrum);
  screen.image(video, 0, 0, width, height);
  drawScreen();
}

function drawScreen() {
  glitchShader.setUniform("texture", screen);
  glitchShader.setUniform("noise", getNoiseValue());
  glitchShader.setUniform("resolution", [1280, 720]);
  glitchShader.setUniform("time", millis() / 1000);
  // glitchShader.setUniform("bpm", bpm);
  // glitchShader.setUniform("bass", bass);
  // glitchShader.setUniform("mid", mid);
  // glitchShader.setUniform("treble", treble);
  glitchShader.setUniform("spectrum", spectrum);
  rect(-width / 2, -height / 2, width, height);
}

function getNoiseValue() {
  let v = noise(millis() / 10000);
  v = e.exponentialEmphasis(v);
  return v;
}

function keyPressed() {
  if (key === " ") {
    // Pause or play the video on spacebar press
    if (video.elt.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}

function mousePressed() {
  if (!video.elt.paused) {
    video.elt.currentTime = 0; // Reset the video if it's already playing
  }
  video.play(); // Play the video on mouse click
}
