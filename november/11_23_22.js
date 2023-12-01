const red = "#CC2132";
const blue = "#21409A";
const black = "#000000";
let margin = 100;
function setup() {
  createCanvas(600, 800);
  background("beige");
  stripes();
  fill(red);
  noStroke();
  rect(50, 450, 500, 300);
  fill("white");
  eye(300, 450, 250, 200);
}
function draw() {}

function stripes() {
  fill("black");
  noStroke();
  for (let x = 50; x <= 550; x += 40) {
    rect(x, 150, 20, 450);
  }
}

function eye(x, y, r1, r2) {
  let originX = x;
  let originY = y;
  stroke("white");

  point(originX, originY);
  let x1 = originX - r1;
  let y1 = originY;
  let x2 = originX - r1 / 2;
  let y2 = originY - r2;
  let x3 = originX + r1 / 2;
  let y3 = originY - r2;
  let x4 = originX + r1;
  let y4 = originY;

  let x5 = originX + r1 / 2;
  let y5 = originY + r2;
  let x6 = originX - r1 / 2;
  let y6 = originY + r2;
  // point(x1, y1);
  // point(x2, y2);
  // point(x3, y3);
  // point(x4, y4);
  beginShape();
  vertex(x1, y1);
  bezierVertex(x2, y2, x3, y3, x4, y4);
  bezierVertex(x5, y5, x6, y6, x1, y1);
  endShape();
  fill(blue);
  noStroke();
  ellipse(x, y, r2 * 1.5);
  fill(black);
  ellipse(x, y, r2);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_23_22.jpeg");
  }
}
