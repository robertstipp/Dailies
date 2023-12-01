let img;
let colors = ["red", "green", "blue"];
let size = 2;
function preload() {
  img = loadImage("../media/graf2.jpeg");
}
function setup() {
  createCanvas(img.width, img.height);
  // image(img, 0, 0);
  noLoop();
  noStroke();
}
function draw() {
  img.loadPixels();
  for (let y = 0; y < img.height; y += 2) {
    for (let x = 0; x < img.width; x += 2) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];
      let gray = (r + g + b) / 3;
      let newR, newG, newB, newC;
      if (gray < 64) {
        newR = 255;
        newG = 0;
        newB = 0;
      } else if (gray < 128) {
        newR = 0;
        newG = 255;
        newB = 0;
      } else if (gray < 192) {
        newR = 0;
        newG = 0;
        newB = 255;
      }
      fill(newR, newG, newB);
      ellipse(x, y, 10, 10);
      img.pixels[index] = newR;
      img.pixels[index + 1] = newG;
      img.pixels[index + 2] = newB;
      img.pixels[index + 3] = a;
    }
  }
  img.updatePixels();
  // image(img, 0, 0);
}
