// IMAGE
let img;
let screen;

// SHADERS
let blurshader;
let invertshader;
let ringshader;
let gaussianblurshader;
let stripesshader;
let orbhader;
// SLIDERS
let blurslider;
let invertslider;
let ringslider;
let gaussianblurslider;
let stripesslider;

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
  blurshader = loadShader("../shaders/blur.vert", "../shaders/blur.frag");
  invertshader = loadShader("../shaders/invert.vert", "../shaders/invert.frag");
  ringshader = loadShader("../shaders/ring.vert", "../shaders/ring.frag");
  orbshader = loadShader("../shaders/orb.vert", "../shaders/orb.frag");
  gaussianblurshader = loadShader(
    "../shaders/gaussianblur.vert",
    "../shaders/gaussianblur.frag"
  );
  stripesshader = loadShader(
    "../shaders/stripes.vert",
    "../shaders/stripes.frag"
  );
  song = loadSound("../media/flume.mp3");
}
function setup() {
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  createCanvas(img.width, img.height);

  screen = createGraphics(width, height, WEBGL);
  blurslider = createSlider(0, 10, 1.5, 0.01);
  blurslider.position(10, 10);
  invertslider = createSlider(0, 1, 0.5, 0.01);
  invertslider.position(10, 30);
  ringslider = createSlider(0, 100, 2.5, 0.5);
  ringslider.position(10, 50);
  gaussianblurslider = createSlider(0, 20, 1.5, 0.01);
  gaussianblurslider.position(10, 70);
  stripesslider = createSlider(0, 100, 10, 1.0);
  stripesslider.position(10, 90);

  // noLoop();
}
function draw() {
  drawScreen();
}

function drawScreen() {
  screen.image(img, -width / 2, -height / 2, width, height);
  orb();
  blur();
  invert();
  ring();
  gaussianblur();
  // stripes();
  image(screen, 0, 0, width, height);
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
