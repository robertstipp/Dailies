let img;
let finalImg;
function preload() {
  img = loadImage("../media/dolphin.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0);
  finalImg = createGraphics(img.width, img.height);
  noLoop();
}

function draw() {
  loadPixels();
  finalImg.loadPixels();
  let len = pixels.length / 4;
  let sortedPixels = Array(len)
    .fill()
    .map((_, i) => i);

  sortedPixels = shuffle(sortedPixels);

  for (let i = 0; i < len; i++) {
    let index = i;
    if (noise(i) < 0.5) {
      index = sortedPixels[i];
    }

    let r = pixels[index * 4];
    let g = pixels[index * 4 + 1];
    let b = pixels[index * 4 + 2];
    let a = pixels[index * 4 + 3];
    finalImg.pixels[i * 4] = r * 1.2;
    finalImg.pixels[i * 4 + 1] = g * 1.2;
    finalImg.pixels[i * 4 + 2] = b * 0.8;
    finalImg.pixels[i * 4 + 3] = a;
  }
  finalImg.updatePixels();
  image(finalImg, 0, 0);
}
