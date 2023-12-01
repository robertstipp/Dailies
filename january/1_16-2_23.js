let img;
function preload() {
  img = loadImage("./media/figure.jpg");
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height, SVG);
  noFill();
  noLoop();
  stroke(0);
}

function draw() {
  img.loadPixels();
  for (let y = 0; y < img.height; y += 10) {
    noFill();
    stroke(0, 0, 0);
    beginShape();
    for (let x = 0; x < img.width; x += 2) {
      let pos = (y * img.width + x) * 4;
      let r = img.pixels[pos];
      let g = img.pixels[pos + 1];
      let b = img.pixels[pos + 2];
      let grayscale = (r + g + b) / 3;
      let yOff = map(grayscale, 0, 255, 0, img.height / 30);

      if (r + g + b < 100) {
        // vertex(x, y);
        line(x, y, x + 1, y);
      } else {
        line(x, y, x + 1, y + yOff);
        // vertex(x, y + yOff);
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
  // image(img, 0, 0);
}

function keyPressed() {
  if (keyCode == 83) {
    save("1_2_23.svg");
  }
}
