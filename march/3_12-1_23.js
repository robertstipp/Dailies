let img;
let screen;
let balletshader;

let kernel = [
  [0, 1, 0],
  [1, -4, 1],
  [0, 1, 0],
];

function preload() {
  img = loadImage("../media/ballet.jpg");
  balletshader = loadShader("../shaders/ballet.vert", "../shaders/ballet.frag");
}

function setup() {
  createCanvas(img.width, img.height, WEBGL);
  screen = createGraphics(width, height, WEBGL);
  screen.image(img, -width / 2, -height / 2, width, height);
  noLoop();
}

function draw() {
  drawScreen();
}

function drawScreen() {
  // screen.background(0);

  ballet();
  image(screen, -width / 2, -height / 2, width, height);
}

function ballet() {
  screen.shader(balletshader);
  balletshader.setUniform("u_texture", screen);
  balletshader.setUniform("u_resolution", [width, height]);
  balletshader.setUniform("u_time", millis() / 1000);
  balletshader.setUniform("u_mouse", [mouseX, mouseY]);

  // screen.rect(0, 0, width, height);
}
