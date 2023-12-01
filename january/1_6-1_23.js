let t = 0;
function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);

  gridWidth = w;
  gridHeight = w;
  hexagonSize = w / 20;
}

function drawHexagon(cX, cY, r) {
  colorMode(HSB);
  let red = (cX + t) % 255;
  let green = cY % 255;
  let blue = (cX + cY) % 255;
  fill(red, green, blue);
  let effRad = r * abs(sin((t + (cX * cY) / (width + height)) / 100));
  beginShape();
  for (let a = 0; a < TAU; a += TAU / 6) {
    vertex(cX + effRad * cos(a), cY + effRad * sin(a));
  }
  endShape(CLOSE);
}

function makeGrid() {
  count = 0;
  for (y = 0; y < gridHeight; y += hexagonSize / 2.3) {
    for (x = 0; x < gridWidth; x += hexagonSize * 1.5) {
      drawHexagon(
        x + hexagonSize * (count % 2 == 0) * 0.75,
        y,
        hexagonSize / 2
      );
    }
    count++;
  }
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  makeGrid();

  t++;
  // noLoop();
}
