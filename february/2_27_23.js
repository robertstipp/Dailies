let myshader;
let song;
let fft;
let bass;
let spectrum;
let mid;
let level;
let buffer;
let img;
let mynoise;
let simplex;
let blur;
let screen;
function preload() {
  myshader = loadShader("../shaders/blobs.vert", "../shaders/blobs.frag");
  blur = loadShader("../shaders/blur.vert", "../shaders/blur.frag");
  song = loadSound("../media/flume.mp3");
  img = loadImage("../media/tyler7.jpeg");
}

function setup() {
  // Audio

  createCanvas(img.width, img.height, WEBGL);

  screen = createGraphics(width, height, WEBGL);

  // noLoop();
}
function draw() {
  drawScreen();
}

function drawScreen() {
  screen.image(img, 0, 0, width, height);
  screen.shader(blur);
  // image(screen, 0, 0, width, height);
  blur.setUniform("u_texture", img);
  blur.setUniform("u_resolution", [width, height]);
  blur.setUniform("u_time", millis() / 1000);

  screen.rect(-width / 2, -height / 2, width, height);
  shader(myshader);

  myshader.setUniform("u_texture", screen);

  myshader.setUniform("u_resolution", [width, height]);

  myshader.setUniform("u_time", millis() / 1000);
  myshader.setUniform("u_bass", bass);
  myshader.setUniform("u_mid", mid);
  myshader.setUniform("u_level", level);
  rect(-width / 2, -height / 2, width, height);
}

function keyPressed() {
  if ((key = "s")) {
    save("cat.jpeg");
  }
}
