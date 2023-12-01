const red = "#be1e2d";
const yellow = "#ffde17";
const blue = "#21409a";

const colors = [red, yellow, blue];

function setup() {
  createCanvas(600, 800);
  background("beige");

  let xOff = -20;
  for (let y = 100; y <= height - 100; y += 100) {
    stroke(random(colors));
    sideDiamond(300 + xOff, y, 100);
    sideDiamond(300 + xOff, y, 50);
    xOff *= -1;
  }
}

function sideDiamond(x, y, size) {
  stroke(blue);
  strokeJoin(ROUND);
  strokeWeight(10);
  noFill();
  beginShape();
  vertex(x - size, y);
  vertex(x, y - size / 2);
  vertex(x + size, y);
  vertex(x, y + size / 2);
  endShape(CLOSE);
}
