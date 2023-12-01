let img;
let cellW = 10;
let cellH = 10;

function preload() {
  img = loadImage("/media/female3.jpg");
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  noLoop();
}
function draw() {
  background(255);
  img.loadPixels();
  for (let y = 0; y < img.height; y += 10) {
    noFill();
    stroke(0, 0, 0);
    beginShape();
    for (let x = 0; x < img.width; x += 1) {
      let pos = (y * img.width + x) * 4;
      let r = img.pixels[pos];
      let g = img.pixels[pos + 1];
      let b = img.pixels[pos + 2];
      let grayscale = (r + g + b) / 3;
      let yOff = map(grayscale, 0, 255, 0, img.height / 30);

      if (r + g + b < 100) {
        // curveVertex(x, y);
        line(x, y, x + 1, y);
      } else {
        line(x, y, x + 1, y + yOff);
        // curveVertex(x, y + yOff);
      }
      // let a = img.pixels[pos + 3];
      // img.pixels[pos] = r / 2;
      // img.pixels[pos + 1] = g * 0.5;
      // img.pixels[pos + 2] = b;
      // img.pixels[pos + 3] = a;
    }
    endShape();
    img.updatePixels();
    // image(img, 0, 0);
  }
}

function keyPressed() {
  if (keyCode == 83) {
    save("1_2_23.jpg");
  }
}
