// IMAGE
let img;
let screen;

// SHADERS

let basicshader;

// SLIDERS

// AUDIO
let song;
let mic;
let fft;
let spectrum;
let bass;
let mid;
let level;

function preload() {
  // img = loadImage("../media/tyler7.jpeg");
  basicshader = loadShader("../shaders/basic.vert", "../shaders/basic.frag");

  // song = loadSound("../media/flume.mp3");
}
function setup() {
  // mic = new p5.AudioIn();
  // mic.start();
  // fft = new p5.FFT();
  // fft.setInput(mic);
  // createCanvas(img.width, img.height);
  createCanvas(800, 800, WEBGL);
  screen = createGraphics(width, height, WEBGL);

  // noLoop();
}
function draw() {
  drawScreen();
}

function drawScreen() {
  screen.background(0);
  // screen.image(img, -width / 2, -height / 2, width, height);
  // orb();
  // blur();

  // invert();
  // ring();
  // gaussianblur();
  // stripes();
  basic();
  image(screen, -width / 2, -height / 2, width, height);
}

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
// function mousePressed() {
//   if (song.isPlaying()) {
//     song.pause();
//   } else {
//     song.play();
//   }
// }
