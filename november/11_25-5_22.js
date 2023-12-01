const yellow = "#F5991D";
const orange = "#F54F11";
const red = "#F50515";
const blue = "#21409A";
const colors2 = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
const colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"];
function setup() {
  createCanvas(600, 1000);
  background("beige");
  colorMode(HSB);

  noStroke();

  let radius = 300;
  let width = 20;

  for (let x = 100; x <= 500; x += 20) {
    let cDist = Math.abs(x - 300);
    let cIndex = Math.floor(map(cDist, 0, 200, 0, 4));
    fill(colors2[cIndex]);
    rigidArc(x);
  }

  eye(300, 500, 200, 200);
}

function rigidArc(x) {
  let radius = 600;
  let width = 7;
  let y = height;
  let point0 = createVector(x, 1000);
  let point1 = createVector(point0.x + width, 1000);
  let point2 = createVector(point0.x + width, 500);
  let point7 = createVector(point0.x - width, 1000);
  let point5 = createVector(point0.x - width, 500);

  let angle = map(point1.x, 0, 600, PI, 0);
  let x1 = point1.x + radius * Math.cos(angle);
  let y1 = point2.y - radius * Math.sin(angle);

  let point3 = createVector(x1, y1);
  let angle2 = map(point5.x, 0, 600, PI, 0);
  let x2 = point5.x + radius * Math.cos(angle2);
  let y2 = point5.y - radius * Math.sin(angle2);
  let point4 = createVector(x2, y2);
  // ellipse(x1, y1, 10);
  // ellipse(x2, y2, 10);
  // ellipse(point0.x, point0.y, 10);
  // ellipse(point1.x, point1.y, 10);
  // ellipse(point2.x, point2.y, 10);
  // ellipse(point5.x, point5.y, 10);
  // ellipse(point7.x, point7.y, 10);
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point1.x, point1.y);
  vertex(point2.x, point2.y);
  vertex(point3.x, point3.y);
  vertex(point4.x, point4.y);
  vertex(point5.x, point5.y);
  vertex(point7.x, point7.y);
  endShape(CLOSE);
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
  fill("beige");
  ellipse(x, y, r2 * 1.25);
  rectMode(CENTER);

  let rectW = 20;

  fill(colors2[0]);
  rect(300, 500, rectW, 280);
  rect(275, 500, rectW, 270);
  rect(325, 500, rectW, 270);
  fill(colors2[1]);
  rect(250, 500, rectW, 265);
  rect(350, 500, rectW, 265);
  rect(225, 500, rectW, 240);
  rect(375, 500, rectW, 240);
  fill(colors2[2]);
  // rect(200, 500, rectW, 120);
  // rect(400, 500, rectW, 100);
  fill(colors2[3]);
  // rect(175, 500, rectW, 80);
  fill(colors2[4]);
  // rect(425, 500, rectW, 60);
  // rect(150, 500, rectW, 40);
  // rect(450, 500, rectW, 20);

  fill("beige");
  ellipse(300, 460, 50);
  ellipse(300, 540, 50);
}

function eyeGlisten(startAngle, endAngle, color) {
  let center = createVector(300, 500);
  fill(color);
  // ellipse(center.x, center.y, 10);
  noStroke();

  let radius1 = 40;
  let radius2 = 80;
  beginShape();
  for (let angle = startAngle; angle <= endAngle; angle += 0.01) {
    let x = center.x + radius1 * Math.cos(angle);
    let y = center.y + radius1 * Math.sin(angle);
    vertex(x, y);
  }
  for (let angle = endAngle; angle >= startAngle; angle -= 0.01) {
    let x = center.x + radius2 * Math.cos(angle);
    let y = center.y + radius2 * Math.sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_25_22.jpeg");
  }
}
