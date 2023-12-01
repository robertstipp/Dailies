let rippleshader;
// IMAGE
let currBuff, prevBuff;
// CONSTANTS
const damping = 0.99;
let bins = 64;
// AUDIO
let song;
let mic;
let fft;
let spectrum;
let bass;
let mid;
let level;

let margin = 50;
let cols = Math.sqrt(bins);
let rows = Math.sqrt(bins);
let cellW, cellH;
let effW, effH;

function preload() {
  // img = loadImage("../media/tyler7.jpeg");
  rippleshader = loadShader("../shaders/ripple.vert", "../shaders/ripple.frag");
  song = loadSound("../media/flume.mp3");
}
function setup() {
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, bins);
  fft.setInput(mic);
  // createCanvas(img.width, img.height);
  createCanvas(400, 400, WEBGL);
  pixelDensity(1);
  noSmooth();

  // create buffers
  currBuff = createGraphics(width, height);
  currBuff.pixelDensity(1);
  currBuff.noSmooth();

  prevBuff = createGraphics(width, height);
  prevBuff.pixelDensity(1);
  prevBuff.noSmooth();

  // set the shader
  shader(rippleshader);

  rippleshader.setUniform("damping", damping);
  rippleshader.setUniform("res", [width, height]);

  effW = width - margin * 2;
  effH = height - margin * 2;
  cellW = effW / rows;
  cellH = effH / cols;

  // noLoop();
}
function draw() {
  level = mic.getLevel();
  spectrum = fft.analyze();
  time = millis() / 5000;
  stroke(255);
  if (mouseIsPressed || level > 0.0) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let index = i + j * rows;
        let value = spectrum[index];
        let direction = (i + j) % 2 == 0 ? 1 : -1;
        let x =
          margin +
          cellW * i +
          cellW / 2 -
          width / 2 +
          direction * pow(cos(time * TAU), 2) * 30;

        let y =
          margin +
          cellH * j +
          cellH / 2 -
          height / 2 +
          direction * pow(sin(time * TAU), 2) * 30;

        if (value > 1) {
          stroke(255);
          point(x, y);
        }
      }
    }
  }

  // add rain drop

  // update buffers
  prevBuff.image(currBuff, 0, 0);
  currBuff.image(get(), 0, 0);

  // set the buffers inside the shader
  rippleshader.setUniform("currBuff", currBuff);
  rippleshader.setUniform("prevBuff", prevBuff);
  rippleshader.setUniform("time", millis() / 1000);
  rect(-width / 2, -height / 2, width, height);
  // drawScreen();
}

// Idea from:
// https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm

// Coding Train Videos:
// Stream: https://www.youtube.com/watch?v=5lIl5F1hpTE
// Challenge: https://www.youtube.com/watch?v=BZUdGqeOD0w

function drawScreen() {
  // screen.image(img, -width / 2, -height / 2, width, height);
  // orb();
  // blur();

  // invert();
  // ring();
  // gaussianblur();
  // stripes();
  // basic();
  // ripple();
  image(screen, -width / 2, -height / 2, width, height);
}

// function ripple() {
//   screen.shader(rippleshader);
//   rippleshader.setUniform("u_texture", screen);
//   rippleshader.setUniform("u_resolution", [width, height]);
//   rippleshader.setUniform("u_time", millis() / 1000);
//   screen.rect(0, 0, width, height);
// }

function basic() {
  screen.shader(basicshader);
  basicshader.setUniform("u_texture", screen);
  basicshader.setUniform("u_resolution", [width, height]);
  basicshader.setUniform("u_time", millis() / 1000);
  screen.rect(0, 0, width, height);
}

function blur() {
  screen.shader(blurshader);
  blurshader.setUniform("u_texture", screen);
  blurshader.setUniform("u_resolution", [width, height]);
  blurshader.setUniform("u_time", millis() / 1000);
  blurshader.setUniform("blurAmount", blurslider.value());
  // blurshader.setUniform("blurAmount", bass / 100);
  screen.rect(-width / 2, -height / 2, width, height);
}

function invert() {
  screen.shader(invertshader);

  invertshader.setUniform("u_texture", screen);
  invertshader.setUniform("u_resolution", [width, height]);
  invertshader.setUniform("u_time", millis() / 1000);

  invertshader.setUniform("invertAmount", invertslider.value() > 0.5 ? 1 : 0);
  // invertshader.setUniform("invertAmount", mid > 128 ? 1 : 0);
  screen.rect(-width / 2, -height / 2, width, height);
}

function ring() {
  screen.shader(ringshader);

  ringshader.setUniform("u_texture", screen);
  ringshader.setUniform("u_resolution", [width, height]);
  ringshader.setUniform("ringAmount", ringslider.value());
  ringshader.setUniform("u_time", millis() / 10000);
  screen.rect(-width / 2, -height / 2, width, height);
}
function gaussianblur() {
  screen.shader(gaussianblurshader);
  gaussianblurshader.setUniform("u_texture", screen);
  gaussianblurshader.setUniform("u_resolution", [width, height]);
  gaussianblurshader.setUniform("u_time", millis() / 1000);
  gaussianblurshader.setUniform("blurRadius", gaussianblurslider.value());
  screen.rect(-width / 2, -height / 2, width, height);
}

function stripes() {
  screen.shader(stripesshader);
  stripesshader.setUniform("u_texture", screen);
  stripesshader.setUniform("u_texture2", img);
  stripesshader.setUniform("u_resolution", [width, height]);
  stripesshader.setUniform("u_time", millis() / 1000);
  stripesshader.setUniform("stripesAmount", stripesslider.value());
  screen.rect(-width / 2, -height / 2, width, height);
}
function orb() {
  screen.shader(orbshader);
  orbshader.setUniform("u_texture", screen);
  orbshader.setUniform("u_resolution", [width, height]);
  orbshader.setUniform("u_time", millis() / 1000);
  screen.rect(-width / 2, -height / 2, width, height);
}
function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
