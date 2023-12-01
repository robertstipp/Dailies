let cols = 80;
let rows = 40;
let margin = 100;
let effH;
let effW;
let img;
let res = 1;
let e;
let colors = [];

function preload() {
  img = loadImage("../media/sunset.jpeg");
}

function setup() {
  createCanvas(img.width, img.height, SVG);
  pixelDensity(1);

  noLoop();
  e = new p5.Ease();
}
function draw() {
  // image(img, 0, 0, width, height);

  // filter(INVERT);
  img.loadPixels();
  for (let x = 0; x < width; x += res) {
    for (let y = 0; y < height; y += res) {
      let index = x * 4 + y * width * 4;

      console.log(index);
      let r = img.pixels[index];

      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];
      let c = color(r, g, b, a);
      // let h = hue(c);
      // let s = saturation(c);
      // let br = brightness(c);
      noStroke();
      fill(c);
      swirl(createVector(x, y), c);
      // ellipse(x, y, res, res);
    }
  }
  // updatePixels();
  // image(img, 0, 0, width, height);
}

function swirl(pos, clr) {
  let cur = pos.copy();
  for (let i = 0; i < 2; i++) {
    let x = cur.x + random(-1, 1);
    let y = cur.y + -1;
    let c = clr;
    c.setAlpha(100);
    fill(c);
    ellipse(x, y, res, res);
    cur = createVector(x, y);
  }
}
function pixelIndex(x, y, w) {
  let index =
    x * pixelDensity() * 4 + y * pixelDensity() * (w * pixelDensity() * 4);
  return index;
}

class Cell {
  constructor(x, y, w, h, saturation) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    noFill();
    stroke("white");
    rect(this.x, this.y, this.w, this.h);
  }
}
function neonColor(sat) {
  let hue = random(0, 20); // select a random hue value between 0 and 360
  let saturation = sat; // set the saturation to 100%
  let brightness = random(50, 100); // select a random brightness value between 50% and 100%
  let alpha = 255; // set the alpha value to 255 (fully opaque)
  colorMode(HSB); // use the HSB color mode
  let neon = color(hue, saturation, brightness, alpha); // create a color object
  return neon;
}

function metallicColor() {
  let hue = random(20, 40); // select a random hue value between 20 and 40 (yellow to orange range)
  let saturation = random(30, 80); // select a random saturation value between 30 and 80
  let brightness = random(50, 100); // select a random brightness value between 50 and 70

  let alpha = 255; // set the alpha value to 255 (fully opaque)
  colorMode(HSB); // use the HSB color mode
  let metallic = color(hue, saturation, brightness, alpha);
  return metallic;
}
function metallicGradient() {
  let colors = [];
  let len = 255;
  for (let i = 0; i < len; i++) {
    let hue = floor(map(i, 0, len - 1, 0, 40)); // interpolate the hue value from 20 to 40 (yellow to orange range)
    let saturation = floor(map(i, 0, len - 1, 30, 80)); // interpolate the saturation value from 30 to 80
    let brightness = floor(map(i, 0, len - 1, 0, 100)); // interpolate the brightness value from 50 to 70
    let alpha = 255; // set the alpha value to 255 (fully opaque)
    colorMode(HSB);
    let metallic = color(hue, saturation, brightness, alpha); // create a color object with the selected values
    colors.push(metallic); // add the color object to the array
  }
  return colors;
}

function keyPressed() {
  if (key == "s") {
    save("sketch_2_20_23", "svg");
  }
}
