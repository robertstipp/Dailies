let opennoise;

const colors = ["#ffde17", "#be1e2d", "#21409a", "#FFF"];

function setup() {
  createCanvas(1080, 1920, SVG);
  pixelDensity(1);
  noFill();
  opennoise = new openSimplexNoise(Date.now());

  strokeWeight(5);
  let noiseStart = height / 3;
  let noiseEnd = (height * 5) / 6;

  let band1clr = color(colors[0]);
  let band2clr = color(colors[1]);
  let band3clr = color(colors[2]);
  let midX = width / 2;

  let bandThickness = 300;
  let threadStep = 10;
  let band1StartX = midX - 1.5 * bandThickness;
  let band2StartX = band1StartX + bandThickness;
  let band3StartX = band2StartX + bandThickness;
  let numOptions = bandThickness / threadStep;
  let numThreads = 3;
  let threadInt = threadStep * numThreads;
  let options = Array(numOptions)
    .fill(0)
    .map((_, i) => band1StartX + i * threadInt);
  let curOptions = options.slice();
  stroke(band1clr);
  for (let x = band1StartX; x < band1StartX + bandThickness; x += threadStep) {
    let selectedOption = random(curOptions);
    curOptions = curOptions.filter((option) => option !== selectedOption);

    drawThread(x, 0, noiseStart, noiseEnd, height, selectedOption);
  }
  stroke(band2clr);
  options = Array(numOptions)
    .fill(0)
    .map((_, i) => band1StartX + threadStep * 1 + i * threadInt);
  curOptions = options.slice();
  for (let x = band2StartX; x < band2StartX + bandThickness; x += threadStep) {
    let selectedOption = random(curOptions);
    curOptions = curOptions.filter((option) => option !== selectedOption);

    drawThread(x, 0, noiseStart, noiseEnd, height, selectedOption);
  }

  stroke(band3clr);

  options = Array(numOptions)
    .fill(0)
    .map((_, i) => band1StartX + threadStep * 2 + i * threadInt);
  curOptions = options.slice();

  for (let x = band3StartX; x < band3StartX + bandThickness; x += threadStep) {
    let selectedOption = random(curOptions);
    curOptions = curOptions.filter((option) => option !== selectedOption);

    drawThread(x, 0, noiseStart, noiseEnd, height, selectedOption);
  }
}

function drawThread(
  x,
  linearStartY,
  noiseStartY,
  noiseEndY,
  linearEndY,
  destination
) {
  let point0 = createVector(x, linearStartY);
  let point1 = createVector(x, noiseStartY);
  let point2 = createVector(destination, noiseEndY);
  let point3 = createVector(destination, linearEndY);

  let noiseDist = noiseEndY - noiseStartY;
  beginShape();
  // start linear
  vertex(point0.x, point0.y);
  // start noise
  noFill();
  vertex(point1.x, point1.y);
  let steps = 1000;
  for (
    let y = noiseStartY;
    y <= noiseEndY;
    y += (noiseEndY - noiseStartY) / steps
  ) {
    let angle = map(y, noiseStartY, noiseEndY, 0, PI);
    let inter = map(y, noiseStartY, noiseEndY, 0, 1);
    let xInter = lerp(x, destination, inter);

    let xoff = map(
      opennoise.noise4D(
        x / 100,
        y / 100,
        cos(angle) / 10000,
        sin(angle) / 10000
      ),
      -1,
      1,
      -sin(angle) * 100,
      sin(angle) * 100
    );
    vertex(xoff + xInter, y);
  }

  vertex(point2.x, point2.y);
  // end noise
  vertex(point3.x, point3.y);
  // end linear
  endShape();
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_13_22.svg");
  }
}
