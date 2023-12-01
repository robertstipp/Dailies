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
let xResSlider;

function setup() {
  pixelDensity(1);
  createCanvas(1080, 1080);
  // background("black");
  e = new p5.Ease();
  g = new p5.Gen();

  noFill();
  // noLoop();
  noStroke();

  noLoop();
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  let margin = 100;
  let effW = width - 2 * margin;
  fill(255);
  let numBands = 50;
  let bandWidth = effW / numBands;
  let rects = Array(numBands)
    .fill(0)
    .map((e, i) => {
      let start = createVector();
      let rectWidth = bandWidth;
      return [
        createVector(i * rectWidth + 100, 100),
        createVector(i * rectWidth + 100 + rectWidth, 900),
      ];
    });
  console.log(rects);
  rects.forEach((rect, i) => {
    stroke("red");
    let s = rect[0];
    let e = rect[1];
    noiseRect(s, e);
  });
}

function noiseRect(start, end) {
  noFill();
  let xResolution = 1 / 1000;
  let yResolution = 1 / 100;
  for (let y = start.y; y < end.y; y += 1) {
    beginShape();
    for (let x = start.x; x <= end.x; x += 0.5) {
      let yOff = map(
        e.sineInOut(noise(x * xResolution, y * yResolution)),
        0,
        1,
        -100,
        100
      );
      curveVertex(x, y + yOff);
    }
    endShape();
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.jpeg");
  }
}
