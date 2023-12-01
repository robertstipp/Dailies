let t = 0;
let s = 0;
const yellow = "#FFE15D";
const orange = "#F49D1A";
const darkOrange = "#DC3535";

const green = "#4BBD55";
const red = "#DE4078";
const mustard = "#DEB44B";
function setup() {
  createCanvas(1080, 1080);
  background(0);
  pixelDensity(2);
  noFill();
  stroke(255);
}

function draw() {
  background(0);
  sunBeams(width / 2, height / 2);
  funkySun(width / 2, height / 2, 400);
  t += 0.001;
  s += 0.001;
}

function sunBeams(x, y) {
  let count = 0;
  stroke(0);
  for (let angle = 0; angle <= TAU; angle += PI / 6) {
    if (count % 2 == 0) {
      fill(red);
    } else {
      fill(mustard);
    }
    beginShape();
    let radius = 1000;
    vertex(x, y);
    let angle1 = angle + t;
    let angle2 = angle + PI / 6 + t;
    vertex(x + radius * Math.cos(angle1), y + radius * Math.sin(angle1));
    vertex(x + radius * Math.cos(angle2), y + radius * Math.sin(angle2));
    endShape();
    count++;
  }
}
function funkySun(x, y, size) {
  let point0 = createVector(x, y);

  let angle1 = 0 + s;
  let point1 = createVector(
    x + size * Math.cos(angle1),
    x + size * Math.sin(angle1)
  );
  fill(yellow);
  beginShape();
  stroke(0);
  vertex(point1.x, point1.y);
  // stroke(255);
  for (let angle = PI / 6; angle <= TAU + PI / 6; angle += PI / 6) {
    let cp = createVector(
      x + size * 0.75 * Math.cos(angle - PI / 12 + s),
      x + size * 0.75 * Math.sin(angle - PI / 12 + s)
    );
    bezierVertex(
      cp.x,
      cp.y,
      cp.x,
      cp.y,
      x + size * Math.cos(angle + s),
      x + size * Math.sin(angle + s)
    );
  }
  endShape(CLOSE);
  fill(darkOrange);
  ellipse(point0.x, point0.y, size * 1.5);
  fill(orange);
  ellipse(point0.x, point0.y, size * 1.35);

  // shades
  push();
  translate(x * 0.8, y * 0.9);
  rotate(PI);
  roundedTri(0, 0, 80, "pink");
  roundedTri(0, 0, 65, "black");
  pop();
  push();
  translate(x * 1.2, y * 0.9);
  rotate(PI);
  roundedTri(0, 0, 80, "pink");
  roundedTri(0, 0, 65, "black");
  pop();

  // nose
  stroke("black");
  strokeWeight(5);
  arc(x, y, 65, 60, PI / 2, (PI * 7) / 4);

  // smile
  noFill();
  arc(x, y + 100, size * 0.9, 120, 0, PI);
  arc(x - 180, y + 90, 10, 10, 0, PI);
  arc(x + 180, y + 90, 10, 10, 0, PI);

  // freckles
  fill("black");
  ellipse(x - 190, y + 65, 3);
  ellipse(x - 180, y + 60, 3);
  ellipse(x - 175, y + 70, 3);

  ellipse(x + 190, y + 65, 3);
  ellipse(x + 180, y + 60, 3);
  ellipse(x + 175, y + 70, 3);
}

function roundedTri(x, y, r, color) {
  fill(color);
  let rndFactor = 0.1;
  let point0 = createVector(x - r * 1.5, y + r / 2);
  let point1 = createVector(x, y - r);
  let point2 = createVector(x + r * 1.5, y + r / 2);

  let interX0 = lerp(point0.x, point1.x, rndFactor);
  let interY0 = lerp(point0.y, point1.y, rndFactor);

  let interX1 = lerp(point0.x, point1.x, 1 - rndFactor);
  let interY1 = lerp(point0.y, point1.y, 1 - rndFactor);

  let interX2 = lerp(point2.x, point1.x, 1 - rndFactor);
  let interY2 = lerp(point2.y, point1.y, 1 - rndFactor);

  let interX3 = lerp(point2.x, point1.x, rndFactor);
  let interY3 = lerp(point2.y, point1.y, rndFactor);

  let interX4 = lerp(point0.x, point2.x, rndFactor);
  let interY4 = lerp(point0.y, point2.y, rndFactor);

  let interX5 = lerp(point0.x, point2.x, 1 - rndFactor);
  let interY5 = lerp(point0.y, point2.y, 1 - rndFactor);

  stroke(color);

  // ellipse(point0.x, point0.y, 3);
  // ellipse(interX1, interY1, 3);
  // ellipse(interX2, interY2, 3);
  // ellipse(interX4, interY4, 3);
  // ellipse(interX5, interY5, 3);
  // ellipse(point2.x, point2.y, 3);

  beginShape();
  vertex(interX0, interY0);
  vertex(interX1, interY1);
  //corner 1
  bezierVertex(point1.x, point1.y, point1.x, point1.y, interX2, interY2);
  vertex(interX3, interY3);
  //corner 2
  bezierVertex(point2.x, point2.y, point2.x, point2.y, interX5, interY5);
  vertex(interX4, interY4);
  //corner 3
  bezierVertex(point0.x, point0.y, point0.x, point0.y, interX0, interY0);
  endShape(CLOSE);
}
