let cellW = 20;
let cellH = cellW;
let margin = 50;

const colors = ["#355070", "#6d597a", "#b56576", "#e56b6f", "#eaac8b"];

function setup() {
  createCanvas(300, 600);
  rectMode(CENTER);
  noStroke();
  for (let x = margin; x <= width - margin; x += cellW) {
    for (let y = margin; y <= height - margin; y += cellH) {
      let xOff = map(y, margin, height - margin, 0, random(cellW / 2));
      let yOff = map(y, margin, height - margin, 0, random(cellH / 2));
      let rOff = map(y, margin, height - margin, 0, random(-PI, PI));

      let xPos = x + xOff;
      let yPos = y + yOff;
      push();
      translate(xPos, yPos);
      rotate(rOff);
      fill(random(colors));
      rect(0, 0, cellW);
      pop();
    }
  }
}
function draw() {}
