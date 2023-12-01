// Play with these parameters
let a = Math.random() * 4 - 2;
let b = Math.random() * 4 - 2;
let c = Math.random() * 4 - 2;
let d = Math.random() * 4 - 2;

let a1 = Math.random() * 4 - 2;
let b1 = Math.random() * 4 - 2;
let c1 = Math.random() * 4 - 2;
let d1 = Math.random() * 4 - 2;

let a2 = Math.random() * 4 - 2;
let b2 = Math.random() * 4 - 2;
let c2 = Math.random() * 4 - 2;
let d2 = Math.random() * 4 - 2;

let startAngle = Math.random() * 360;

// Number of loops to draw each frame
let loops = 1000;

let x = 0;
let y = 0;
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;

let xNext, yNext;
let xNext1, yNext1;
let xNext2, yNext2;

let grid = [];
let rows, cols;
let orange = "#FFA500";
function setup() {
  pixelDensity(1);
  createCanvas(1080, 1920);

  background(0);
  orange = color(orange);

  grid = Array(width)
    .fill()
    .map(() => Array(height).fill(0));

  colorMode(HSB);
  // noLoop();
}
function draw() {
  // loadPixels();
  colorMode(HSB);
  for (i = 0; i < 8000; i++) {
    xNext = sin(a * y) + c * cos(a * x);
    yNext = sin(b * x) + d * cos(b * y);
    xNext1 = sin(a1 * y) + c1 * cos(a1 * x);
    yNext1 = sin(b1 * x) + d1 * cos(b1 * y);
    xNext2 = sin(a2 * y) + c2 * cos(a2 * x);
    yNext2 = sin(b2 * x) + d2 * cos(b2 * y);
    let xScreen = round(map(xNext, -3, 3, 0, width - 1, true));
    let yScreen = round(map(yNext, -3, 3, 0, height - 1, true));
    let xScreen1 = round(map(xNext1, -3, 3, 0, width - 1, true));
    let yScreen1 = round(map(yNext1, -3, 3, 0, height - 1, true));
    let xScreen2 = round(map(xNext2, -3, 3, 0, width - 1, true));
    let yScreen2 = round(map(yNext2, -3, 3, 0, height - 1, true));
    let colorAngle = map(
      dist(xScreen, yScreen, xScreen1, yScreen1) +
        dist(xScreen, yScreen, xScreen2, yScreen2) +
        dist(xScreen1, yScreen1, xScreen2, yScreen2),
      0,
      dist(0, 0, width, height) * 3,
      0,
      360
    );

    stroke((colorAngle + startAngle) % 360, 255, 255, 0.1);
    let point1 = createVector(xScreen, yScreen);
    let point2 = createVector(xScreen1, yScreen1);
    let point3 = createVector(xScreen2, yScreen2);

    // console.log(finalPoint);

    point(xScreen, yScreen);
    point(xScreen1, yScreen1);
    point(xScreen2, yScreen2);
    // Now we can edit the pixel values to decrease its brightness
    // console.log(cl);
    // pixels[index] = red(cl); // Red value
    // pixels[index + 1] = green(cl); // Green value
    // pixels[index + 2] = blue(cl); // Blue value

    // if (pixels[index + 3] == 255) {
    //   pixels[index + 3] += 10;
    // } // Alpha value
    // pixels[index + 3] += 10; // Alpha value
    // console.log(pixels[index]);
    // point(xScreen, yScreen);

    x = xNext;
    y = yNext;
    x1 = xNext1;
    y1 = yNext1;
    x2 = xNext2;
    y2 = yNext2;
  }

  // updatePixels();
}
function keyPressed() {
  if (key == "s") {
    save(`Clifford a=${a} b=${b} c=${c} d=${d}.png`);
  }
}
