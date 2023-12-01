const blue = "#21409A";
const colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"];
function setup() {
  createCanvas(600, 1200);
  background(255);
  noStroke();
  let step = 20;
  // for (let x = 0; x <= width; x += step) {
  //   step = map(x, 0, width, 20, 40);
  //   fill(blue);
  //   rigidArc(x, 900, step / 2.5);
  // }
  background("black");
  for (let x = 0; x <= 300; x += 40) {
    let cDist = Math.abs(x - 300);
    let cIndex = Math.floor(map(cDist, 0, 300, 0, 4));
    fill(colors[cIndex]);
    rigidArc(x, 800, 10, 100);
  }
  for (let x = 300; x <= width; x += 40) {
    let cDist = Math.abs(x - 300);
    let cIndex = Math.floor(map(cDist, 0, 300, 0, 4));
    fill(colors[cIndex]);
    rigidArc(x, 800, 10, 200);
  }
}

function rigidArc(x, y, width, radius) {
  let point0 = createVector(x, height);
  let point1 = createVector(point0.x + width, height);
  let point2 = createVector(point0.x + width, y);
  let point7 = createVector(point0.x - width, height);
  let point5 = createVector(point0.x - width, y);

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
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_25_22.jpeg");
  }
}
