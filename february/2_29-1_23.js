let basicshader;
let dithershader;
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

function preload() {
  img = loadImage("../media/tyler7.jpeg");
  basicshader = loadShader("../shaders/basic.vert", "../shaders/basic.frag");
  dithershader = loadShader("../shaders/dither.vert", "../shaders/dither.frag");
  // song = loadSound("../media/flume.mp3");
}
function setup() {
  // mic = new p5.AudioIn();
  // mic.start();
  // fft = new p5.FFT(0.8, bins);
  // fft.setInput(mic);
  // createCanvas(img.width, img.height);
  createCanvas(img.width, img.height, WEBGL);
  pixelDensity(1);
  noSmooth();

  // create buffers

  // set the shader
  shader(basicshader);
  shader(dithershader);
  dithershader.setUniform("iResolution", [width, height]);

  // noLoop();
}
function draw() {
  // add rain
  // update buffers
  // set the buffers inside the shader
  // drawScreen();
  dithershader.setUniform("u_time", millis() / 1000);
  dithershader.setUniform("u_texture", img);

  rect(-width / 2, -height / 2, width, height);
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
// function mousePressed() {
//   if (song.isPlaying()) {
//     song.pause();
//   } else {
//     song.play();
//   }
// }
