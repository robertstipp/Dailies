function setup() {
  createCanvas(600, 600);
  background(100);

  for (let x = 0; x <= 550; x += 100) {
    for (let y = 0; y <= 550; y += 100) {
      foldedPaper(x, y, 100, 100);
    }
    // foldedRightPaper(x, 200, 100, 100);
  }
}
function draw() {}

function foldedPaper(x, y, w, h) {
  let mainColor = random(["white"]);
  let foldColor = mainColor === "black" ? "white" : "black";
  fill(mainColor);
  stroke(mainColor);
  let point0 = createVector(x, y);
  let point1 = createVector(x + w, y);
  let point2 = createVector(x + w, y + h);
  let point3 = createVector(x, y + h);
  let foldPointInt1 = random(0.2, 0.8);
  let foldPointInt2 = random(0.2, 0.8);
  beginShape();
  // top-left corner - travel right
  vertex(point0.x, point0.y);
  // top-right corner - travel down
  vertex(point1.x, point1.y);
  // bottom-right corner - travel left
  let foldPoint1X = lerp(point1.x, point2.x, foldPointInt1);
  let foldPoint1Y = lerp(point1.y, point2.y, foldPointInt1);
  let foldPoint1 = createVector(foldPoint1X, foldPoint1Y);
  // ellipse(foldPoint1.x, foldPoint1.y, 10);
  vertex(foldPoint1.x, foldPoint1.y);
  // vertex(point2.x, point2.y);
  let foldPoint2X = lerp(point2.x, point3.x, foldPointInt2);
  let foldPoint2Y = lerp(point2.y, point3.y, foldPointInt2);
  let foldPoint2 = createVector(foldPoint2X, foldPoint2Y);
  // ellipse(foldPoint2.x, foldPoint2.y, 10);
  vertex(foldPoint2.x, foldPoint2.y);
  vertex(point3.x, point3.y);
  vertex(point0.x, point0.y);
  endShape(CLOSE);

  fill(foldColor);
  stroke(foldColor);
  beginShape();
  vertex(foldPoint1.x, foldPoint1.y);
  let x1 = foldPoint1.y - point2.y;
  let y1 = foldPoint2.x - point2.x;
  let midFold = createVector(point2.x + x1, point2.y + y1);
  vertex(midFold.x, midFold.y);
  vertex(foldPoint2.x, foldPoint2.y);
  endShape(CLOSE);
}

function foldedRightPaper(x, y, w, h) {
  let mainColor = random(["white"]);
  let foldColor = mainColor === "black" ? "white" : "black";
  fill(mainColor);
  stroke(mainColor);
  let point0 = createVector(x, y);
  let point1 = createVector(x + w, y);
  let point2 = createVector(x + w, y + h);
  let point3 = createVector(x, y + h);
  let foldPointInt1 = random(0.2, 0.8);
  let foldPointInt2 = random(0.2, 0.8);
  beginShape();
  // top-left corner - travel right
  vertex(point0.x, point0.y);
  // top-right corner - travel down
  vertex(point1.x, point1.y);
  // bottom-right corner - travel left
  let foldPoint1X = lerp(point2.x, point3.x, foldPointInt1);
  let foldPoint1Y = lerp(point3.y, point3.y, foldPointInt1);
  let foldPoint1 = createVector(foldPoint1X, foldPoint1Y);
  // ellipse(foldPoint1.x, foldPoint1.y, 10);
  vertex(point2.x, point2.y);
  vertex(foldPoint1.x, foldPoint1.y);
  let foldPoint2X = lerp(point3.x, point0.x, foldPointInt2);
  let foldPoint2Y = lerp(point3.y, point0.y, foldPointInt2);
  let foldPoint2 = createVector(foldPoint2X, foldPoint2Y);
  // ellipse(foldPoint2.x, foldPoint2.y, 10);
  vertex(foldPoint2.x, foldPoint2.y);
  // vertex(point3.x, point3.y);
  vertex(point0.x, point0.y);
  endShape(CLOSE);

  fill(foldColor);
  stroke(foldColor);
  beginShape();
  vertex(foldPoint1.x, foldPoint1.y);
  let x1 = foldPoint1.y + point3.y;
  let y1 = foldPoint2.x - point3.x;
  let midFold = createVector(point3.x + x1, point3.y + y1);
  vertex(midFold.x, midFold.y);
  vertex(foldPoint2.x, foldPoint2.y);
  endShape(CLOSE);
}

function myFold(x, y, w, h) {
  let point0 = createVector(x, y);
  let point1 = createVector(x + w, y);
  let point2 = createVector(x + w, y + h);
  let point3 = createVector(x, y + h);

  const points = [point0, point1, point2, point3];

  const foldOptions = ["top-left", "top-right", "bottom-right", "bottom-left"];
}
