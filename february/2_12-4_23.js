let aspectRatio = 2480 / 3508;

let colors = ["red", "yellow", "blue"];
let e, g;
let ringsArr = [];
let cols = 5;
let rows = 5;

let cellH, cellW, margin, effW;
let myCells = [];

let dots = [];
let subCircles = [];

function setup() {
  createCanvas(1080, 1080, SVG);
  // background("black");
  e = new p5.Ease();
  g = new p5.Gen();
  noFill();
  noLoop();
  noStroke();
  // background("red");
}

function draw() {
  let margin = 100;
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  cellW = effW / cols;
  cellH = effH / rows;

  let canvasCenter = createVector(width / 2, height / 2);
  stroke(0);
  rectMode(CENTER);

  // triangle1

  let corner1 = createVector(margin, margin);
  let corner2 = createVector(width - margin, margin);
  let corner3 = createVector(width - margin, height - margin);

  // beginShape();
  // vertex(corner1.x, corner1.y);
  // vertex(corner2.x, corner2.y);
  // vertex(corner3.x, corner3.y);
  // endShape(CLOSE);

  let corners1 = [corner1, corner2, corner3];

  // triangle2
  let cornert1 = createVector(margin, margin);
  let cornert2 = createVector(width - margin, height - margin);
  let cornert3 = createVector(margin, height - margin);
  // beginShape();
  // vertex(cornert1.x, cornert1.y);
  // vertex(cornert2.x, cornert2.y);
  // vertex(cornert3.x, cornert3.y);

  // endShape(CLOSE);

  let corners2 = [cornert1, cornert2, cornert3];
  stepPolygon(corners1, 50);
  stepPolygon(corners2, 50);
}
function perpSquare(x, y, r) {
  noStroke();
  fill(random(colors));
  beginShape();
  vertex(x, y);
  vertex(x + r, y);
  vertex(x + r, y + r);
  vertex(x, y + r);
  endShape(CLOSE);

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

function stepPolygon(corners, steps) {
  let centerX = 0;
  let centerY = 0;

  for (let i = 0; i < corners.length; i++) {
    centerX += corners[i].x;
    centerY += corners[i].y;
  }

  centerX /= corners.length;
  centerY /= corners.length;

  for (let t = 0; t <= 1; t += 1 / steps) {
    let newCorners = [];
    let testT = e.doubleCircularOgee(t, 0.1);
    for (let i = 0; i < corners.length; i++) {
      let pos = p5.Vector.lerp(
        corners[i],
        createVector(centerX, centerY),
        testT
      );
      newCorners.push(pos);
    }
    for (let i = 0; i < newCorners.length; i++) {
      let corner0 = newCorners[i];
      let corner1 = newCorners[(i + 1) % corners.length];

      line(corner0.x, corner0.y, corner1.x, corner1.y);
      line(corner0.x, corner0.y, corner1.x, corner1.y);
    }
  }
}
function getColor(d) {
  let c = "black";

  return c;
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}
