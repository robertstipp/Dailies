let img;
let dotSize = 16;
function preload() {
  img = loadImage("../media/tyler3.jpg");
}
let count = 0;
let grid = [];
function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  background(0);
  // noLoop();
  noStroke();
  img.loadPixels();
  let x = 0;
  while (x < width) {
    let y = 0;
    let col = [];
    while (y < height) {
      let index = floor(x + y * width) * 4;

      let gray =
        (img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2]) / 3;

      let scale = map(gray, 0, 255, 0, 1);
      let clr = map(gray, 0, 255, 0, 255);

      if (gray < 10) {
        colorMode(RGB);
        clr = "black";
        fill(clr);
      } else {
        colorMode(HSB);
        let clrAngle = floor(map(gray, 0, 255, 0, 360));
        clr = color(clrAngle, 100, 100);
        fill(clrAngle, 100, 100);
      }
      let scaleVal = 0.5;
      // if (scale < 1) ellipse(x, y, dotSize * scaleVal);
      col.push(new Circle(x, y, dotSize * scaleVal, clr));
      y += dotSize * scaleVal;

      // break;
    }
    x += dotSize * 0.5;
    grid.push(col);

    // break;
  }
}

function draw() {
  // image(img, 0, 0);
  // grayScale();
  background(0, 20);

  grid.forEach((col) => {
    col.forEach((circle) => {
      circle.show();
    });
  });
  count++;
  console.log(frameRate());
}
class Circle {
  constructor(x, y, r, clr) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.pos = createVector(x, y);
    this.clr = clr;
    this.angle = Math.random() * TAU;

    this.destination = createVector(
      x + 100 * cos(this.angle),
      y + 100 * sin(this.angle)
    );
  }
  show() {
    fill(this.clr);
    // ellipse(this.x, this.y, this.r);
    this.move();
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  move() {
    let lerpAngle = map(count % 800, 0, 400, 0, TAU);
    let lerpVal = map(sin(lerpAngle), -1, 1, 0, 1);
    if (count % 800 == 0) {
      this.angle = Math.random() * TAU;
      this.destination = createVector(
        this.x + 100 * cos(this.angle),
        this.y + 100 * sin(this.angle)
      );
    }
    this.pos.x = lerp(this.x, this.destination.x, lerpVal);
    this.pos.y = lerp(this.y, this.destination.y, lerpVal);
  }
}
function grayScale(img) {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let gray = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
    pixels[i] = gray;
    pixels[i + 1] = gray;
    pixels[i + 2] = gray;
  }
  updatePixels();
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("2-18-2023", "jpeg");
  }
}
