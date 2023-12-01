const red = "#F20544";
const blue1 = "#1DBEF2";
const blue2 = "#7781F2";
let cellW = 500 / 4;
let cellH = 500 / 4;
function setup() {
  createCanvas(600, 600 + cellH);
  background(red);
  rectMode(CENTER);

  for (let y = 100; y <= 600; y += cellH) {
    for (let x = 100; x <= 500; x += cellW) {
      let num = random();
      strokeWeight(4);
      noFill();
      if (num < 0.2) {
        push();
        noStroke();
        fill(blue1);
        for (
          let yPos = y - cellH / 4;
          yPos <= y + cellH / 4;
          yPos += cellH / 10
        ) {
          rect(x, yPos, cellW, cellH / 20);
        }
        pop();
      } else if (num < 0.5) {
        push();
        noStroke();
        fill(blue2);
        for (
          let xPos = x - cellH / 4;
          xPos <= x + cellH / 4;
          xPos += cellH / 10
        ) {
          rect(xPos, y, cellW / 20, cellH);
        }
        pop();
      } else if (num < 0.75) fill(random([blue1, blue2]));

      rect(x, y, cellW, cellH);
    }
  }
}
