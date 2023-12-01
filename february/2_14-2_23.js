let aspectRatio = 2480 / 3508;
let maxD;
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
let e, g;
let ringsArr = [];
let cols = 17;
let rows = 17;
let columns = [];
let myHearts = [];
let cellH, cellW, margin, effW;
let myCells = [];
let diameter;
let dots = [];
let subCircles = [];
let pointsWithin = [];
let sortedTop = [];
let count = 0;
let img;
let arcs = [];
function preload() {
  img = loadImage("../media/female4.jpg");
}
function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  // background("black");
  e = new p5.Ease();
  g = new p5.Gen();

  noFill();
  // noLoop();
  noStroke();

  noLoop();
}

function draw() {
  let d = pixelDensity();
  let resolution = 1;
  img.loadPixels();
  let histogram = createHistogram(img);
  let cdf = createCDF(histogram);
  img = equalizeHistogram(img, cdf);
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {
      for (let x = 0; x < width; x += resolution) {
        for (let y = 0; y < height; y += resolution) {
          let index = (x + y * width) * 4;
          let r = img.pixels[index];
          let g = img.pixels[index + 1];
          let b = img.pixels[index + 2];
          let a = img.pixels[index + 3];
          let gray = (r + g + b) / 3;
          let grayInt = map(gray, 0, 255, 0, 1);
          // grayInt = e.quinticIn(grayInt);
          let clrVal = e.quinticIn(grayInt);
          let clr = map(clrVal, 0, 1, 0, 255);
          let clrAngle = map(clrVal, 0, 1, 0, 360);
          let cutoff = 200;
          if (gray > cutoff) {
            colorMode(HSB);
            let clrHue = clrAngle % 360;

            let c = color(clrHue, 255, 255);

            let rVal = red(c);
            let gVal = green(c);
            let bVal = blue(c);
            img.pixels[index] = rVal;
            img.pixels[index + 1] = gVal;
            img.pixels[index + 2] = bVal;
          }
          if (gray < cutoff) {
            colorMode(RGB);
            let c = color("black");
            let rVal = red(c);
            let gVal = green(c);
            let bVal = blue(c);
            img.pixels[index] = rVal;
            img.pixels[index + 1] = gVal;
            img.pixels[index + 2] = bVal;
          }
        }
      }
    }

    let kernel = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    for (let rounds = 0; rounds < 1; rounds++) {
      for (let x = 1; x < img.width - 1; x++) {
        for (let y = 1; y < img.height - 1; y++) {
          let c = convolution(x, y, kernel, img);
          let loc = (x + y * img.width) * 4;
          img.pixels[loc] = c[0];
          img.pixels[loc + 1] = c[1];
          img.pixels[loc + 2] = c[2];
        }
      }
    }
  }
  // for (let pass = 0; pass < 4; pass++) {
  //   for (let y = 0; y < img.height; y++) {
  //     for (let x = 0; x < img.width; x++) {
  //       let index = (x + y * img.width) * 4;
  //       let oldR = img.pixels[index];
  //       let oldG = img.pixels[index + 1];
  //       let oldB = img.pixels[index + 2];
  //       let newR = oldR > 127 ? 255 : 0;
  //       let newG = oldG > 127 ? 255 : 0;
  //       let newB = oldB > 127 ? 255 : 0;
  //       img.pixels[index] = newR;
  //       img.pixels[index + 1] = newG;
  //       img.pixels[index + 2] = newB;
  //       let errR = oldR - newR;
  //       let errG = oldG - newG;
  //       let errB = oldB - newB;
  //       distributeError(img, x, y, errR, errG, errB);
  //     }
  //   }
  // }
  img.updatePixels();
  image(img, 0, 0, width, height);
}
function createHistogram(img) {
  let histogram = new Array(256).fill(0);
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let gray = round(0.2126 * r + 0.7152 * g + 0.0722 * b);
    histogram[gray]++;
  }
  return histogram;
}

function createCDF(histogram) {
  let cdf = new Array(256).fill(0);
  let sum = 0;
  for (let i = 0; i < 256; i++) {
    sum += histogram[i];
    cdf[i] = sum / (img.width * img.height);
  }
  return cdf;
}

function equalizeHistogram(img, cdf) {
  let equalizedImg = createImage(img.width, img.height);
  equalizedImg.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let gray = round(0.2126 * r + 0.7152 * g + 0.0722 * b);
    let newGray = round(cdf[gray] * 255);
    equalizedImg.pixels[i] = newGray;
    equalizedImg.pixels[i + 1] = newGray;
    equalizedImg.pixels[i + 2] = newGray;
    equalizedImg.pixels[i + 3] = 255;
  }
  equalizedImg.updatePixels();
  return equalizedImg;
}

function distributeError(img, x, y, errR, errG, errB) {
  let w1 = 7 / 16.0;
  let w2 = 3 / 16.0;
  let w3 = 5 / 16.0;
  let w4 = 1 / 16.0;
  propagateError(img, x + 1, y, errR * w1, errG * w1, errB * w1);
  propagateError(img, x - 1, y + 1, errR * w2, errG * w2, errB * w2);
  propagateError(img, x, y + 1, errR * w3, errG * w3, errB * w3);
  propagateError(img, x + 1, y + 1, errR * w4, errG * w4, errB * w4);
}

function propagateError(img, x, y, errR, errG, errB) {
  if (x >= 0 && x < img.width && y >= 0 && y < img.height) {
    let index = (x + y * img.width) * 4;
    img.pixels[index] += errR;
    img.pixels[index + 1] += errG;
    img.pixels[index + 2] += errB;
  }
}

function convolution(x, y, kernel, img) {
  let r = 0;
  let g = 0;
  let b = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let loc = (x + i + (y + j) * img.width) * 4;
      let weight = kernel[j + 1][i + 1];
      r += img.pixels[loc] * weight;
      g += img.pixels[loc + 1] * weight;
      b += img.pixels[loc + 2] * weight;
    }
  }
  return [r / 9, g / 9, b / 9];
}
class Circ {
  constructor(pos, r, angle) {
    this.pos = pos;
    this.r = r;
    this.angle = angle;
  }
}
class Arc {
  constructor(x, y, radius, start, end, clr) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.start = start;
    this.end = end;
    this.clr = clr;
    this.clrInt = map(clr, 0, 255, 0, 1);
    this.clrVal = e.sineOut(this.clrInt);
    this.clrAngle = map(this.clrVal, 0, 1, 0, 1080);
  }
  draw() {
    if (this.clr > 100) {
      colorMode(HSB);
      stroke(this.clrAngle % 360, 255, 255);
    } else {
      colorMode(RGB);
      stroke("black");
    }

    arc(this.x, this.y, this.radius * 2, this.radius * 2, this.start, this.end);
  }
}

function spiralfy(points, fact) {
  // line(points[0].x, points[0].y, points[3].x, points[3].y);

  beginShape();
  points.forEach((p) => {
    vertex(p.x, p.y);
    // ellipse(p.x, p.y, 10);
  });
  endShape(CLOSE);
  for (let i = 3; i < 10; i++) {
    let point1 = points[i - 3];
    let point2 = points[i - 2];
    let midPoint = p5.Vector.lerp(point1, point2, fact);
    // ellipse(point1.x, point1.y, 10);
    // ellipse(point2.x, point2.y, 10);
    // ellipse(midPoint.x, midPoint.y, 10);
    points.push(midPoint);
    // break;
  }
  beginShape();
  points.forEach((p) => {
    vertex(p.x, p.y);
    // ellipse(p.x, p.y, 10);
  });
  endShape();
}

function stepPolygon(corners, steps) {
  let centerX = 0;
  let centerY = 0;

  for (let i = 0; i < corners.length; i++) {
    centerX += corners[i].x;
    centerY += corners[i].y;
  }

  centerX /= corners.length;
  centerY /= corners.length;

  for (let t = 1 / steps; t < 1 - 1 / steps; t += 1 / steps) {
    let newCorners = [];
    let testT = e.linear(t);
    for (let i = 0; i < corners.length; i++) {
      let pos = p5.Vector.lerp(
        corners[i],
        createVector(centerX, centerY),
        testT
      );
      newCorners.push(pos);
    }
    for (let i = 0; i < newCorners.length; i++) {
      let corner0 = newCorners[i];
      let corner1 = newCorners[(i + 1) % corners.length];

      line(corner0.x, corner0.y, corner1.x, corner1.y);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
    }
  }
}

function pointInPoly(verts, pt) {
  let c = false;
  for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
    if (
      verts[i].y > pt.y != verts[j].y > pt.y &&
      pt.x <
        ((verts[j].x - verts[i].x) * (pt.y - verts[i].y)) /
          (verts[j].y - verts[i].y) +
          verts[i].x
    )
      c = !c;
  }
  return c;
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.jpeg");
  }
}
