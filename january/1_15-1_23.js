let img;
let cellW = 20;
let cellH = 20;

function setup() {
  pixelDensity(1);
  createCanvas(888, 1215, SVG);
  fill(0);
  noLoop();
  stroke(0);
}

function draw() {
  for (let y = 0; y < height; y += 50) {
    let angleOff = map(y, 0, height, 0, 10 * PI);
    for (let x = 0; x < width; x += cellW) {
      let angle = map(x, 0, width, 0, 2 * PI);
      let yOff = map(sin(angle + angleOff), -1, 1, -100, 100);
      let size = 10;
      noFill();
      ellipse(x, y + yOff, 10);
    }
  }
}

function keyPressed() {
  if (keyCode == 83) {
    save("1_2_23.svg");
  }
}
