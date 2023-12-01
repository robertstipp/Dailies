let x, y, r;
let cols = 30;
let rows = cols;

let bodies = [];
let e, g;
const lines = [];
let margin = 100;

let cellW, cellH, effW, effH;
let grid;
function setup() {
  createCanvas(1080, 1080, SVG);
  background(0);
  noFill();

  // set circle center and radius

  // noLoop();
  e = new p5.Ease();
  g = new p5.Gen();
  stroke(0);
  noLoop();
}

function draw() {
  // Set the stroke color and weight

  var xVals = e
    .fillFloat32Array("normalizedLogitSigmoid", 20, 0.3)
    .map((x) => x * width);
  console.log(xVals);
  var yVals = e
    .fillFloat32Array("normalizedLogitSigmoid", 20, 0.4)
    .map((x) => x * height);
  xVals.forEach((x) => {
    // line(x, 0, x, height);
  });
  yVals.forEach((y) => {
    // line(0, y, width, y);
  });
  var points = [];

  for (let i = 0; i < xVals.length; i++) {
    for (let j = 0; j < yVals.length; j++) {
      let x = xVals[i];
      let nextX = xVals[i + 1];
      let w = nextX - x;
      let y = yVals[j];
      let nextY = yVals[j + 1];
      let h = nextY - y;
      let mid = createVector(x + w / 2, y + h / 2);

      // ellipse(mid.x, mid.y, 10, 10);
      let points = [
        createVector(mid.x - w / 2, mid.y),
        createVector(mid.x, mid.y - h / 2),
        createVector(mid.x + w / 2, mid.y),
        createVector(mid.x, mid.y + h / 2),
      ];

      let pIndex = random([0, 1, 2, 3]);
      let p2Index = (pIndex + 1) % 4;
      let p3Index = (pIndex + 2) % 4;
      let p4Index = (pIndex + 3) % 4;
      let p = points[pIndex];
      let p2 = points[p2Index];
      let p3 = points[p3Index];
      let p4 = points[p4Index];

      if ((i + j) % 2 == 0) {
        fill(255);
      } else {
        fill(0);
      }

      rect(p2.x, p2.y, w, h);
      let corners = [p, p2, p3, p4];
      // if ((i + j) % 2 == 0) {
      //   fill("red");

      //   beginShape();
      //   for (let i = 0; i < corners.length; i++) {
      //     vertex(corners[i].x, corners[i].y);
      //   }
      //   endShape(CLOSE);
      // }
      // line(p.x, p.y, p2.x, p2.y);
      // line(p2.x, p2.y, p3.x, p3.y);
      // line(p3.x, p3.y, p4.x, p4.y);
      // line(p4.x, p4.y, p.x, p.y);
    }
  }
}

function harlequein(pos, w, h, fl) {
  let points = [
    createVector(pos.x - w / 2, pos.y),
    createVector(pos.x, pos.y - h / 2),
    createVector(pos.x + w / 2, pos.y),
    createVector(pos.x, pos.y + h / 2),
  ];

  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (key == "s") {
    save("2021-03-23.svg");
  }
}
