let screen;

let mic;
let song;
let fft;
let bpm = 0;
let lastBeatTime = 0;
let threshold = 200;

let basic;
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
let spectrumTexture;
let loudness;
let noiseTexture;
let simplexNoise;
function preload() {
  basic = loadShader("../shaders/basic.vert", "../shaders/basic.frag");
  img = loadImage("../media/tatoo.jpeg");
  song = loadSound("../media/01 Let You Know (feat. London Gramma.mp3");
}
function setup() {
  // mic = new p5.AudioIn();
  // mic.start();
  // fft = new p5.FFT();
  // fft.setInput(mic);
  // simplexNoise = new openSimplexNoise(Date.now());
  createCanvas(img.width, img.height, WEBGL);
  // noiseTexture = createGraphics(width, height);

  // noiseTexture.noStroke();
  // noiseTexture.colorMode(RGB, 1.0);
  // noiseTexture.background(0.5);
  // noiseTexture.loadPixels();
  // for (let x = 0; x < noiseTexture.width; x++) {
  //   for (let y = 0; y < noiseTexture.height; y++) {
  //     let r = map(simplexNoise.noise2D(x * 0.001, y * 0.001), -1, 1, 0, 255);
  //     let c = color(r, 0, 0);

  //     noiseTexture.set(x, y, r);
  //   }
  // }
  // noiseTexture.updatePixels();
  background(255);
  screen = createGraphics(width, height);
}

function draw() {
  // spectrum = fft.analyze();
  // bass = fft.getEnergy("bass");
  // mid = fft.getEnergy("mid");
  // treble = fft.getEnergy("treble");
  // Create a 1D texture from the spectrum data and pass it to the shader

  // Create a 1D texture from the spectrum data and pass it to the shader
  // screen.image(noiseTexture, 0, 0);
  // image(noiseTexture, 0, 0);
  screen.image(img, 0, 0);
  drawScreen();
}

function drawScreen() {
  basic.setUniform("texture", screen);
  basic.setUniform("iResolution", [width, height]);
  basic.setUniform("texelSize", [1.0 / width, 1.0 / height]);
  basic.setUniform("radius", 3.0);
  // basic.setUniform("noiseTexture", noiseTexture);
  basic.setUniform("iTime", millis() / 1000);
  basic.setUniform("iBass", bass);
  basic.setUniform("iMid", mid);
  basic.setUniform("iTreble", treble);

  // glitchShader.setUniform("noise", getNoiseValue());
  shader(basic);

  rect(-width / 2, -height / 2, width, height);
}

function getNoiseValue() {
  let v = noise(millis() / 10000);
  v = e.exponentialEmphasis(v);
  return v;
}

// function mouseClicked() {
//   if (song.isPlaying()) {
//     song.pause();
//   } else {
//     song.play();
//   }
// }

function keyPressed() {
  if (key == "s") {
    save("screenshot.jpeg");
  }
}
