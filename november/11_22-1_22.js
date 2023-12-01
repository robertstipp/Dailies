const colors = ["#be1e2d", "#ffde17", "#21409a"];
let cols = 10;
let rows = 10;
let margin = 100;
let effW, effH, cellW, cellH;
let squares = [];
function setup() {
  createCanvas(1080, 1080, SVG);
  // background("beige");
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  for (let x = 100; x < width; x += 200) {
    for (let y = 50; y <= height - 100; y += 200) {
      // perpSquare(x, y, 100, (colors));
      squares.push(new PerpSquares(x, y, 100, random(colors)));
    }
  }
  colors.forEach((c) => {
    squares.forEach((s) => {
      if (s.color == c) s.draw();
    });
  });
}
function draw() {}

class PerpSquares {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
  draw() {
    fill(this.color);
    perpSquare(this.x, this.y, this.r, this.color);
  }
}

function perpSquare(x, y, r) {
  noStroke();

  // square
  // beginShape();
  // vertex(x, y);
  // vertex(x + r, y);
  // vertex(x + r, y + r);
  // vertex(x, y + r);
  // endShape(CLOSE);

  // shadow
  fill("#000000");
  beginShape();
  vertex(x, y);
  vertex(x - r, y + r);
  vertex(x - r, y + 2 * r);
  vertex(x, y + 2 * r);
  vertex(x + r, y + r);
  vertex(x, y + r);

  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_22_22.svg");
  }
}
