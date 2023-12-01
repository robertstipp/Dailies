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
let ar;
let cols;
let rows = 20;
let myTriangles = [];
let img;
let secondCanvas;
function preload() {
  img = loadImage("../media/tyler2.jpeg");
}
let noiseScale = 0.002;
let circleRadius = 100;

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  cols = 20;
  ar = height / height;
  rows = floor(0);
  e = new p5.Ease();
  secondCanvas = createGraphics(img.width, img.height);
  let origin = createVector(width / 2, height / 2);
  secondCanvas.noFill();

  secondCanvas.stroke("black");
  let steps = 20;
  for (let i = steps; i > 0; i--) {
    let iInt = i / steps;
    let w = e.quadraticInOut(iInt) * Math.sqrt(width * width + height * height);
    let h = (w * height) / width;
    w = random(100, 200);
    h = random(100, 200);
    secondCanvas.rectMode(CENTER);
    secondCanvas.background("white");
    secondCanvas.push();
    secondCanvas.noStroke();
    random() < 0.5 ? secondCanvas.fill("black") : secondCanvas.fill("white");

    secondCanvas.fill("black");
    secondCanvas.translate(random(width), random(height));
    // secondCanvas.rotate(map(i, 0, steps, 0, TWO_PI));
    secondCanvas.rect(0, 0, w, h);
    secondCanvas.pop();
  }
  noLoop();
}

function draw() {
  // image(img, 0, 0);
  img.loadPixels();
  // image(secondCanvas, 0, 0);
  // let steps = 10;
  // for (let i = 0; i <= steps; i++) {
  //   let x = ((i * i) / 100) * width;
  //   let y = e.quadraticIn(i / steps) * height;
  //   ellipse(x, y, 10, 10);
  // }

  secondCanvas.loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];
      let gray = (r + g + b) / 3;
      let secondIndex = (x + y * width) * 4;
      let secondR = secondCanvas.pixels[secondIndex];
      let secondG = secondCanvas.pixels[secondIndex + 1];
      let secondB = secondCanvas.pixels[secondIndex + 2];
      let secondA = secondCanvas.pixels[secondIndex + 3];
      let secondGray = (secondR + secondG + secondB) / 3;
      let col = floor(invQuadraticInOut(x / width) * cols);
      // // console.log(invQuadraticInOut(x / width) * cols);
      let row = floor(invQuadraticInOut(y / height) * rows);
      // console.log(invQuadraticInOut(y / height) * rows);

      if (secondGray < 100) {
        let colorAngle = map(gray, 0, 255, 0, 360);
        let maxD = dist(0, 0, width, height) / 2;
        let d = dist(x, y, width / 2, height / 2);
        let offset = map(d, 0, maxD, 0, 360);
        colorMode(HSB);
        let clr = color(colorAngle + offset, 100, 100);
        img.pixels[index] = 0;
        img.pixels[index + 2] = 0;
        img.pixels[index + 1] = 0;
      }

      //     // second canvas is black and white
    }
  }
  img.updatePixels();

  image(img, 0, 0);
}

function invQuadraticInOut(y) {
  let invertedX;
  if (y < 0.5) {
    invertedX = 0.5 * Math.sqrt(2 * y);
  } else {
    invertedX = 1 - 0.5 * Math.sqrt(2 * (1 - y));
  }
  return invertedX;
}

function topLeftCorner(cellMid, diameter) {
  let radius = diameter / 2;
  line(cellMid.x, cellMid.y, cellMid.x + radius, cellMid.y);
  line(cellMid.x, cellMid.y, cellMid.x, cellMid.y + radius);
}
function topRightCorner(cellMid, diameter) {
  let radius = diameter / 2;
  line(cellMid.x, cellMid.y, cellMid.x - radius, cellMid.y);
  line(cellMid.x, cellMid.y, cellMid.x, cellMid.y + radius);
}
function bottomLeftCorner(cellMid, diameter) {
  let radius = diameter / 2;
  line(cellMid.x, cellMid.y, cellMid.x + radius, cellMid.y);
  line(cellMid.x, cellMid.y, cellMid.x, cellMid.y - radius);
}

function bottomRightCorner(cellMid, diameter) {
  let radius = diameter / 2;
  line(cellMid.x, cellMid.y, cellMid.x - radius, cellMid.y);
  line(cellMid.x, cellMid.y, cellMid.x, cellMid.y - radius);
}
function upDown(cellMid, diameter) {
  let radius = diameter / 2;
  line(cellMid.x, cellMid.y, cellMid.x, cellMid.y + radius);
  line(cellMid.x, cellMid.y, cellMid.x, cellMid.y - radius);
}
function leftRight(cellMid, diameter) {
  let radius = diameter / 2;
  line(cellMid.x, cellMid.y, cellMid.x + radius, cellMid.y);
  line(cellMid.x, cellMid.y, cellMid.x - radius, cellMid.y);
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
