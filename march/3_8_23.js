let img;
let filter = [
  [0, 1, 0],
  [1, -4, 1],
  [0, 1, 0],
];

function preload() {
  img = loadImage("../media/veiled_lady.jpeg");
}

function setup() {
  pixelDensity(1);
  createCanvas(400, 400);

  noLoop();
}

function draw() {
  image(img, 0, 0, width, height);
  img.resize(img.width / 2, img.height / 2);
  image(img, 0, height / 2, width / 2, height / 2);
}
