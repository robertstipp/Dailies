let img;
let secondCanvas;
function preload() {
  img = loadImage("../media/female3.jpg");
}

let cols = 10;
let rows = 1;
function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  secondCanvas = createGraphics(img.width, img.height);
  noLoop();
}

function draw() {
  secondCanvas.image(img, 0, 0);
  secondCanvas.filter(POSTERIZE, 2);
  secondCanvas.loadPixels();
  img.loadPixels();
  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      let index = (x + y * width) * 4;
      let clr = img.get(x, y);
      let clr2 = secondCanvas.get(x, y);

      let column = floor((x / width) * cols);
      let row = floor((y / height) * rows);
      let lerpVal = map(column, 0, cols, 0, 1);
      let r = lerp(clr[0], clr2[0], 1);
      let g = lerp(clr[1], clr2[1], 1);
      let b = lerp(clr[2], clr2[2], 1);

      if ((column + row) % 2 == 0) {
        img.pixels[index] = r;
        img.pixels[index + 1] = g;
        img.pixels[index + 2] = b;
      }
    }
  }
  img.updatePixels();
  image(img, 0, 0);
}
