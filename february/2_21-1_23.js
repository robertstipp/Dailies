let kernel = [
  [-1, -1, -1],
  [-1, 9, -1],
  [-1, -1, -1],
];
let img;

function preload() {
  img = loadImage("../media/female4.jpg");
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  noLoop();
}

function draw() {
  image(img, 0, 0);
  edgeImg = createImage(img.width, img.height);
  edgeImg.loadPixels();

  for (let x = 1; x < img.width - 1; x++) {
    for (let y = 1; y < img.height - 1; y++) {
      let sum = 0;

      for (let kx = -1; kx <= 1; kx++) {
        for (let ky = -1; ky <= 1; ky++) {
          let xpos = x + kx;
          let ypos = y + ky;
          let pos = (y + ky) * img.width + (x + kx);
          let c = img.get(xpos, ypos);
          let gray = floor((c[0] + c[1] + c[2]) / 3);
          sum += gray * kernel[kx + 1][ky + 1];
        }
      }
      sum = constrain(sum, 0, 255);

      edgeImg.set(x, y, [sum, sum, sum, 255]);
    }
  }
  edgeImg.updatePixels();
  image(edgeImg, 0, 0);
  // filter(POSTERIZE, 5);
}
