let origin;
let nodes = [];
let e, g;
let img;

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height, SVG);
  noFill();
  noLoop();
  stroke(0);
  e = new p5.Ease();
  g = new p5.Gen();
  origin = createVector(width / 2, (height * 3) / 4);
}
function draw() {}

function keyPressed() {
  if (key == "s") {
    save("2021-01-23.svg");
  }
}

function sun() {
  for (let i = 0; i < 100; i++) {}
}
