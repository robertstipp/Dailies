// This is a template for creating a looping animation in p5.js (JavaScript).
// When you press the 'F' key, this program will export a series of images into
// your default Downloads folder. These can then be made into an animated gif.
// This code is known to work with p5.js version 0.6.0
// Prof. Golan Levin, 28 January 2018

// INSTRUCTIONS FOR EXPORTING FRAMES (from which to make a GIF):
// 1. Run a local server, using instructions from here:
//    https://github.com/processing/p5.js/wiki/Local-server
// 2. Set the bEnableExport variable to true.
// 3. Set the myNickname variable to your name.
// 4. Run the program from Chrome, press 'f'.
//    Look in your 'Downloads' folder for the generated frames.
// 5. Note: Retina screens may export frames at twice the resolution.

//===================================================
// User-modifiable global variables.
var myNickname = "nickname";
var nFramesInLoop = 120;
var bEnableExport = true;
// Other global variables you don't need to touch.
let spacing;
var nElapsedFrames;
var bRecording;
var theCanvas;
let pills = [];
let e, g;
//===================================================
function setup() {
  theCanvas = createCanvas(1080, 1080);
  bRecording = false;
  nElapsedFrames = 0;
  e = new p5.Ease();
  g = new p5.Gen();

  // for (let x = 0; x <= width; x += 300) {
  //   for (let y = 0; y <= height; y += 300) {
  //     pills.push(new Pill(createVector(x, y)));
  //   }
  // }
  for (let r = 100; r <= 600; r += 200) {
    let numPoints = map(r, 100, 600, 4, 20);
    for (let a = 0; a <= TAU; a += TAU / numPoints) {
      let pos = createVector(width / 2, height / 2).add(
        p5.Vector.fromAngle(a, r)
      );
      pills.push(new Pill(pos, r, a));
    }
  }

  // noLoop();
}

//===================================================
function keyTyped() {
  if (bEnableExport) {
    if (key === "f" || key === "F") {
      bRecording = true;
      nElapsedFrames = 0;
    }
  }
}

//===================================================
function draw() {
  // Compute a percentage (0...1) representing where we are in the loop.
  var percentCompleteFraction = 0;
  if (bRecording) {
    percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
  } else {
    percentCompleteFraction =
      float(frameCount % nFramesInLoop) / float(nFramesInLoop);
  }

  // Render the design, based on that percentage.
  // This function renderMyDesign() is the one for you to change.
  renderMyDesign(percentCompleteFraction);

  // If we're recording the output, save the frame to a file.
  // Note that the output images may be 2x large if you have a Retina mac.
  // You can compile these frames into an animated GIF using a tool like:
  if (bRecording && bEnableExport) {
    var frameOutputFilename = myNickname + nf(nElapsedFrames, 4) + ".png";
    print("Saving output image: " + frameOutputFilename);
    saveCanvas(theCanvas, frameOutputFilename, "png");
    nElapsedFrames++;

    if (nElapsedFrames >= 600) {
      bRecording = false;
    }
  }
}

//===================================================
function renderMyDesign(percent) {
  //
  // THIS IS WHERE YOUR ART GOES.
  // This is an example of a function that renders a temporally looping design.
  // It takes a "percent", between 0 and 1, indicating where we are in the loop.
  // Use, modify, or delete whatever you prefer from this example.
  // This example uses several different graphical techniques.
  // Remember to SKETCH FIRST!

  //----------------------
  // here, I set the background and some other graphical properties
  background("#efefef");
  smooth();
  // stroke(0, 0, 0);
  // strokeWeight(2);
  noStroke();
  //----------------------
  // Here, I assign some handy variables.
  var cx = width / 2;
  var cy = height / 2;

  //----------------------
  // Here, I use trigonometry to render a rotating element.

  var radius = percent * 20;
  let center = createVector(cx, cy);
  // for (let x = 0; x <= width; x += 20) {
  //   for (let y = 0; y <= height; y += 20) {
  //     let d = dist(x, y, cx, cy);
  //     let speed = 2;
  //     let angleOffset = map(d, 0, width, 0, TAU);
  //     let angle = map(percent, 0, 1, 0, speed * TAU);
  //     let sizeVal = map(sin(angle + angleOffset), -1, 1, 0, 1);
  //     let size = map(e.backOut(sizeVal), 0, 1, 2, 20);
  //     fill("#012a4a");
  //     push();
  //     translate(x, y);
  //     rotate(angle * 2);
  //     mytriangle(0, 0, size);
  //     pop();
  //   }
  // }
  pills.forEach((pill) => {
    let d = pill.center.dist(center);
    let speed = 2;
    let angleOffset = map(d, 0, width, 0, TAU);
    let angle = map(percent, 0, 1, 0, speed * TAU);
    let sizeVal = map(sin(angle + angleOffset), -1, 1, 0, 1);
    let size = map(e.backOut(sizeVal), 0, 1, 2, 100 / 2);

    pill.show(size, angle + angleOffset);
  });
}

// symmetric double-element sigmoid function (a is slope)
// See https://github.com/IDMNYU/p5.js-func/blob/master/lib/p5.func.js
// From: https://idmnyu.github.io/p5.js-func/
//===================================================
function doubleExponentialSigmoid(_x, _a) {
  if (!_a) _a = 0.75; // default

  var min_param_a = 0.0 + Number.EPSILON;
  var max_param_a = 1.0 - Number.EPSILON;
  _a = constrain(_a, min_param_a, max_param_a);
  _a = 1 - _a;

  var _y = 0;
  if (_x <= 0.5) {
    _y = pow(2.0 * _x, 1.0 / _a) / 2.0;
  } else {
    _y = 1.0 - pow(2.0 * (1.0 - _x), 1.0 / _a) / 2.0;
  }
  return _y;
}

function mytriangle(x, y, size) {
  let orig = createVector(x, y);
  beginShape();
  vertex(orig.x, orig.y - size / 2);
  vertex(orig.x - size / 2, orig.y + size / 2);
  vertex(orig.x + size / 2, orig.y + size / 2);

  endShape(CLOSE);
}

function pill(center, pillWidth, clr1, clr2) {
  let diameter1 = pillWidth / 2;
  let diameter2 = diameter1 * 0.96;
  let ratioLR = 1;
  strokeJoin(ROUND);
  strokeWeight(3);
  stroke(255);

  // left Points
  let leftPoints = [];
  let leftTop = createVector(center.x, center.y - diameter1 / 2);
  let leftBottom = createVector(center.x, center.y + diameter1 / 2);

  let leftArcOrigin = createVector(
    center.x - (pillWidth / 2) * ratioLR,
    center.y
  );
  let leftAngleStart = PI / 2;
  let leftAngleStop = PI + PI / 2;
  leftPoints.push(leftBottom);
  for (let a = leftAngleStart; a <= leftAngleStop; a += 0.01) {
    let pos = leftArcOrigin.copy().add(p5.Vector.fromAngle(a, diameter1 / 2));
    leftPoints.push(pos);
  }
  leftPoints.push(leftTop);

  fill("#faf0d7");

  beginShape();
  leftPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);

  // right Points
  let rightPoints = [];
  let rightTop = createVector(center.x, center.y - diameter2 / 2);
  let rightBottom = createVector(center.x, center.y + diameter2 / 2);

  let rightArcOrigin = createVector(
    center.x + ((pillWidth / 2) * 1) / ratioLR,
    center.y
  );
  let rightAngleStart = -PI / 2;
  let rightAngleStop = PI / 2;
  rightPoints.push(rightTop);
  for (let a = rightAngleStart; a <= rightAngleStop; a += 0.01) {
    let pos = rightArcOrigin.copy().add(p5.Vector.fromAngle(a, diameter2 / 2));
    rightPoints.push(pos);
  }
  fill(clr2);
  rightPoints.push(rightBottom);
  beginShape();
  rightPoints.forEach((p) => vertex(p.x, p.y));
  endShape(CLOSE);
}
class Pill {
  constructor(center, r, angle) {
    this.center = center;
    this.pos = center.copy();
    this.pillWidth = 20;
    this.clr1 = random(colors);
    this.clr2 = random(colors);
    this.angle = angle;
    this.r = r;
  }

  move() {
    this.pos = p5.Vector.lerp(
      createVector(width / 2, height / 2),
      this.center,
      this.r / 600
    );
  }
  show(size, rot) {
    push();
    this.move();
    translate(this.pos, this.pos);
    rotate(rot);
    pill(createVector(0, 0), size, this.clr1, this.clr2);
    pop();
  }
}

const colors = [
  "#54478c",
  "#2c699a",
  "#048ba8",
  "#0db39e",
  "#16db93",
  "#83e377",
  "#b9e769",
  "#efea5a",
  "#f1c453",
  "#f29e4c",
];
