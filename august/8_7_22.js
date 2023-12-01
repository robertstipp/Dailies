let img, maskImage;
function preload() {
  img = loadImage("../media/veiled_lady.jpeg");
  maskImage = loadImage("../media/graffitti.jpeg");
}

function setup() {
  createCanvas(img.width, img.height);

  pixelDensity(1);
}

function draw() {
  background(0);

  img.loadPixels();
  maskImage.loadPixels();
  const d = pixelDensity();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      const i = 4 * d * (y * d * img.width + x);
      // if (i % 2 == 0){

      if (
        img.pixels[i] < 50 &&
        img.pixels[i + 1] < 50 &&
        img.pixels[i + 2] < 50
      ) {
        img.pixels[i + 3] = 0;
      }

      if (
        img.pixels[i] > 100 &&
        img.pixels[i + 1] > 100 &&
        img.pixels[i + 2] > 100
      ) {
        img.pixels[i + 1] = 100;
        img.pixels[i + 1] = 100;
      }

      img.pixels[i + 2] = 200;
      maskImage.pixels[i] = 100;
      // img.pixels[i + 2] = 100;
      // img.pixels[i + 3] = 0;
      // } else {
      //    pixels[i] = 0;
      //   pixels[i + 1] = 0;
      //    pixels[i + 2] = 0;
      //    }
    }
  }
  img.updatePixels();
  // maskImage.updatePixels();
  // maskImage.resize(img.width, img.height);
  // image(maskImage, 0, 0);
  // image(img, 0, 0);
  for (x = 0; x < width; x += 1) {
    for (y = 0; y < height + 100; y += 1) {
      let c = color(img.get(x, y));
      noStroke();
      fill(c);
      ellipse(x, y, map(noise(x, y), 0, 1, 1, 5));
    }
  }
  noLoop();
}
function keyPressed() {
  // 83 is key code for key "s"s
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save("aug_7_22.jpeg");
  }
}
