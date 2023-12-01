function setup() {
  createCanvas(600, 800);
  background("blue");
  myTriangle(300, 300, 300);
}
function draw() {}

function myTriangle(xOrigin, yOrigin, radius) {
  noFill();
  strokeWeight(10);
  strokeJoin(ROUND);
  stroke("#926c15");
  let x1 = xOrigin - radius / 2;
  let y1 = yOrigin;

  let x2 = xOrigin + radius / 2;
  let y2 = yOrigin;

  let x3 = xOrigin;
  let y3 = yOrigin + radius / 2;

  beginShape();
  vertex(x1, y1);
  vertex(x2, y2);
  vertex(x3, y3);
  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_15_22.jpeg");
  }
}
