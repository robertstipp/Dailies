const yellow = "#f3ea5f";
const pink = "#ff48c4";
const blue = "#2bd1fc";
const purple = "#c04df9";
const red = "#ff3f3f";

function setup() {
  createCanvas(600, 600);
  background(pink);
  noStroke();
  sun();
  ocean();
}

function sun() {
  fill(yellow);

  ellipse(150, 200, 300);
  fill(pink);

  let bandH = 30;
  let curY = 200;
  for (let i = 0; i < 10; i++) {
    rect(0, curY, 300, bandH);
    curY += bandH + 10;
    bandH -= 5;
  }
}

function ocean() {
  for (let y = 500; y <= height; y += 10) {
    for (let x = 0; x <= width; x += 10) {
      let val = random();
      if (val < 0.5) {
        let c = lerpColor(color(pink), color(blue), random());
        fill(c);
      } else {
        let c = lerpColor(color(yellow), color(blue), random());

        fill(c);
      }
      rect(x, y, 10, 10);
    }
  }
}
