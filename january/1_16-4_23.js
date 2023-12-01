let origin;
let nodes = [];
let e, g;
let img;

function preload() {
  img = loadImage("../media/veiled_lady.jpeg");
}
function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height, SVG);
  noFill();
  noLoop();
  stroke(0);
  e = new p5.Ease();
  g = new p5.Gen();
  origin = createVector(width / 2, height / 2);
}
function draw() {
  img.loadPixels();
  console.log(img.pixels);
  let yStep = 10;
  let xStep = 5;
  for (let y = 0; y < img.height; y += yStep) {
    beginShape();
    for (let x = 0; x < img.width; x += xStep) {
      let i = (y * img.width + x) * 4;
      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];
      let a = img.pixels[i + 3];
      let grayScale = (r + g + b) / 3;
      if (grayScale < 10) continue;
      let factor = map(grayScale, 10, 255, 0, 200);
      let angle = map(noise(grayScale / 10), 0, 1, 0, PI);
      let yOff = sin(angle) * 10;
      curveVertex(x, y + yOff);
      let size = map(grayScale, 10, 255, 0, 10);
      // ellipse(x, y, size, size);
    }
    endShape();
  }
  // image(img, 0, 0);
}

function keyPressed() {
  if (key == "s") {
    save("2021-01-23.svg");
  }
}

function connectNodes(node, dist) {
  for (let i = 0; i < nodes.length; i++) {
    let d = node.dist(nodes[i]);
    if (d < dist && d > 0) {
      line(node.x, node.y, nodes[i].x, nodes[i].y);
    }
  }
}
