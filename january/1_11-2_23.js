let cols = 50;
let rows = 50;

function setup() {
  pixelDensity(1);
  createCanvas(650, 900, SVG);
  noFill();
  noLoop();
  stroke(0);
}
function draw() {
  let cellW = width / cols;
  let cellH = height / rows;
  for (let x = 0; x < width; x += cellW) {
    for (let y = 0; y < height; y += cellH) {
      let r = random(1);
      if (r < 0.5) {
        line(x, y, x + cellW, y + cellH);
      } else {
        line(x + cellW, y, x, y + cellH);
      }
    }
  }
}
function keyPressed() {
  if (keyCode == 83) {
    save("1_2_23.svg");
  }
}
