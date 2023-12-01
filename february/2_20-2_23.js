let img;
let res = 1;
let margin = 100;
let cols = 10;
let rows = 150;
let effW, effH;
let cellW, cellH;
let clr1 = "#ff8c32";
let clr2 = "#000";

function preload() {
  img = loadImage("../media/sunset.jpeg");
}
function setup() {
  pixelDensity(1);

  createCanvas(img.width, img.height);
  background("black");
  noLoop();
}
function draw() {
  // image(img, 0, 0);
  // filter(GRAY);
  img.loadPixels();
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  let cellW = effW / cols;
  let cellH = effH / rows;
  stroke(255);
  for (let j = 0; j < rows; j++) {
    let y = j * cellH + margin;
    let curX = margin;

    beginShape();
    while (curX < width - margin) {
      for (let subX = curX; subX < curX + cellW; subX++) {
        colorMode(RGB);
        let clr = img.get(subX, y);
        let gray = (clr[0] + clr[1] + clr[2]) / 3;
        let cellW = map(gray, 0, 255, 5, 1);
        let offSetAngle = map(subX, curX, curX + cellW, 0, TWO_PI);
        let offSet = map(sin(offSetAngle), -1, 1, 0, 2);

        noFill();
        stroke(255);
        point(subX, y + offSet);
        // vertex(subX, y + offSet);
        if (subX > width - margin) break;
      }
      curX += cellW;

      // break;
    }
    endShape();
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.jpeg");
  }
}
