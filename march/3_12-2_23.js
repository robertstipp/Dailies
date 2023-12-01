let img;

function preload() {
  img = loadImage("../media/jungle.jpeg");
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  noLoop();
  image(img, 0, 0);
}

function draw() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let recordBrightness = -1;
      let recordR = 0;
      let recordG = 0;
      let recordB = 0;
      for (let i = y; i < height; i++) {
        let index = (x + i * width) * 4;
        let r = pixels[index];
        let g = pixels[index + 1];
        let b = pixels[index + 2];
        let a = pixels[index + 3];
        let brightness = (r + g + b) / 3;
        if (brightness > recordBrightness) {
          recordBrightness = brightness;
          recordR = r;
          recordG = g;
          recordB = b;
        }
      }
      let index = (x + y * width) * 4;
      pixels[index] = recordR;
      pixels[index + 1] = recordG;
      pixels[index + 2] = recordB;
    }
  }
  updatePixels();
}
