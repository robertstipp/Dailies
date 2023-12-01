let aspectRatio = 2480 / 3508;
let maxD;
let origin;
let colors = [
  "#c30010",
  "#d1001f",
  "#de0a26",
  "#ff2c2c",
  "#ff4d4d",
  "#ff6e6e",
  "#ff8f8f",
  "#ffb0b0",
];
let colorsBlue = [
  "#0700C4",
  "#0000FF",
  "#0052FF",
  "#007AFF",
  "#00A3FF",
  "#00CCFF",
];
let e, g;
let ringsArr = [];
let ar = 1920 / 1080;
let cols = 10;
let rows = Math.floor(cols * ar);
let myTriangles = [];
let img;
let secondCanvas;
function preload() {
  img = loadImage("../media/tyler8.jpeg");
}
function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  secondCanvas = createGraphics(img.width, img.height);
  secondCanvas.background("red");
  // background("black");
  e = new p5.Ease();
  g = new p5.Gen();

  noFill();

  noStroke();

  noLoop();

  background(255);
  noStroke();
  fill(0);
  let dotSize = 8;
  // for (let y = dotSize / 2; y < height; y += dotSize) {
  //   for (let x = dotSize / 2; x < width; x += dotSize) {
  //     if ((x + y) % (dotSize * 2) == 0) {
  //       ellipse(x, y, dotSize, dotSize);
  //     }
  //   }
  // }
}

function draw() {
  // image(img, 0, 0);
  // background(0);
  let myCircles = [];
  while (myCircles.length < 200) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 100);

    let valid = true;
    for (let j = 0; j < myCircles.length; j++) {
      let other = myCircles[j];
      let otherX = other.x;
      let otherY = other.y;
      let otherR = other.r;

      let d = dist(x, y, otherX, otherY);
      if (d < r + otherR) {
        valid = false;
        break;
      }
    }
    if (valid) {
      myCircles.push(new Circle(x, y, r));
    }
  }

  loadPixels();
  img.loadPixels();
  secondCanvas.loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let r = pixels[index + 0];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      let a = pixels[index + 3];
      let secondIndex = (x + y * width) * 4;
      let secondR = secondCanvas.pixels[secondIndex + 0];
      let secondG = secondCanvas.pixels[secondIndex + 1];
      let secondB = secondCanvas.pixels[secondIndex + 2];
      let secondA = secondCanvas.pixels[secondIndex + 3];
      let imgR = img.pixels[secondIndex + 0];
      let imgG = img.pixels[secondIndex + 1];
      let imgB = img.pixels[secondIndex + 2];
      let imgA = img.pixels[secondIndex + 3];
      let gray = (imgR + imgG + imgB) / 3;

      pixels[index + 0] = gray;
      pixels[index + 1] = gray;
      pixels[index + 2] = gray;

      if (gray > 20) {
        colorMode(HSB);
        let clr = color(imgR, imgG, imgB);

        pixels[index + 0] = red(clr);
      }
    }
  }
  updatePixels();
  dither("FloydSteinberg");
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
}
function keyPressed() {
  if (key == "s") {
    save("2021-02-23.jpeg");
  }
}
