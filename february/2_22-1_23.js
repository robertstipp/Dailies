let cols = 40;
let rows = 40;
let effW, effH, cellW, cellH;
let e;
// let colors = ["#D90D1E", "#42558C", "#F2CB05", "#F2B705", "#F2F2F2"];
let colors = ["#000073", "#0000F5", "#D60000", "#BF0000", "#A30000"];
// let colors = ["#C82066", "#F46361", "#FFE72A", "#53AFC3", "#F6B8C0"];
// let colors = ["#A62631", "#F2B705", "#F2F2F2", "#42558C", "#D90D1E"];
let bwcolors = ["#F2F2F2", "#BFBFBF", "#737373", "#404040", "#0D0D0D"];
let img;
function preload() {
  img = loadImage("../media/female4.jpg");
}

function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height);
  background(0);
  noLoop();
  e = new p5.Ease();
}

function draw() {
  let cellW = width / cols;
  let cellH = height / rows;
  img.filter(THRESHOLD, 0.5);
  img.filter(INVERT);
  img.loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;

      let maxDist = sqrt(sq(width) + sq(height));
      // let ring = floor(e.staircase(map(dist, 0, maxDist, 0, 1), 80) * 80);
      let imgRed = img.pixels[index];
      let imgGreen = img.pixels[index + 1];
      let imgBlue = img.pixels[index + 2];
      let imgAlpha = img.pixels[index + 3];
      let gray = (imgRed + imgGreen + imgBlue) / 3;
      let clr = color(imgRed, imgGreen, imgBlue, imgAlpha);
      let column = floor((x / img.width) * cols);
      let row = floor((y / img.height) * rows);
      let rowColor = row % colors.length;
      let cellPos = createVector(column * cellW, row * cellH);
      let cellCenter = createVector(
        cellPos.x + cellW / 2,
        cellPos.y + cellH / 2
      );
      let d = dist(x, y, cellCenter.x, cellCenter.y);

      fill("red");
      // ellipse(cellCenter.x, cellCenter.y, 10, 10);
      let finalColor = color(colors[(column * column + row) % colors.length]);
      let secondFinalColor = color(
        colors[(column + row + 1) % bwcolors.length]
      );
      // let r = lerp(rowColor.levels[0], columnColor.levels[0], lerpVal);
      // let g = lerp(rowColor.levels[1], columnColor.levels[1], lerpVal);
      // let b = lerp(rowColor.levels[2], columnColor.levels[2], lerpVal);
      // let a = lerp(rowColor.levels[3], columnColor.levels[3], lerpVal);
      let r = red(finalColor);
      let g = green(finalColor);
      let b = blue(finalColor);
      let a = alpha(finalColor);
      if (gray < 40) {
        let lerpVal = 1;
        let re = lerp(img.pixels[index], r, lerpVal);
        let gr = lerp(img.pixels[index + 1], g, lerpVal);
        let bl = lerp(img.pixels[index + 2], b, lerpVal);
        let al = lerp(img.pixels[index + 3], a, lerpVal);

        img.pixels[index] = re;
        img.pixels[index + 1] = gr;
        img.pixels[index + 2] = bl;
        img.pixels[index + 3] = al;
        if (d < 5) {
          img.pixels[index] = red(secondFinalColor);
          img.pixels[index + 1] = green(secondFinalColor);
          img.pixels[index + 2] = blue(secondFinalColor);
          img.pixels[index + 3] = 255;
        }
      } else {
        column = floor(((x / img.width) * cols) / 2);
        row = floor((y / img.height) * rows);
        columnColor = column % colors.length;
        rowColor = row % colors.length;
        let finalColor = color(0);

        img.pixels[index] = red(finalColor);
        img.pixels[index + 1] = green(finalColor);
        img.pixels[index + 2] = blue(finalColor);
        img.pixels[index + 3] = 100;
      }

      // img.pixels[index] = r;
      // img.pixels[index + 1] = g;
      // img.pixels[index + 2] = b;
      // img.pixels[index + 3] = a;
    }
  }
  // image(img, 0, 0);
  img.updatePixels();
  image(img, 0, 0);
}

function keyPressed() {
  if (key == "s") {
    save("image.jpeg");
  }
}
