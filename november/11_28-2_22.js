const colors2 = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
function setup() {
  createCanvas(600, 600);
  background(0);
  stroke(255);
  sideEye(200, 300, 100, "left");
  eye(400, 300, 100, 100);
}

function sideEye(x, y, size, direction) {
  beginShape();
  if (direction === "right") {
    vertex(x - size, y);
  } else {
    vertex(x + size, y);
  }
  vertex(x, y - size);
  if (direction === "right") {
    bezierVertex(x + size, y, x + size, y, x, y + size);
  } else {
    bezierVertex(x - size, y, x - size, y, x, y + size);
  }
  vertex(x, y + size);
  endShape();
  fill("black");
  ellipse(x, y, 20);
}

function eye(x, y, r1, r2) {
  let originX = x;
  let originY = y;
  noStroke();
  fill("beige");

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
  fill("white");
  noStroke();
  // ellipse(x, y, r2 * 1.5);
  // fill("beige");
  ellipse(x, y, r2 * 1.25);
  rectMode(CENTER);
  fill("black");
  ellipse(x, y, 20);
}
