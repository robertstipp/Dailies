const red = "#be1e2d";
const yellow = "#ffde17";
const blue = "#21409a";

const colors = [red, yellow, blue];

function setup() {
  createCanvas(600, 600);
  background("beige");

  strokeWeight(5);
  noFill();

  // roundedTri(300, 300, 50, yellow);
  stroke(red);
  arc(300, 300, 300, 300, 0, PI);

  fill("black");
  noStroke();
  ellipse(200, 200, 50);
  ellipse(400, 200, 50);

  stroke(0);
  noFill();
  line(250, 200, 350, 200);
  arc(200, 200, 100, 100, 0, PI);
  arc(400, 200, 100, 100, 0, PI);

  arc(300, 300, 100, 100, PI / 2, PI);

  rect(100, 100, 400, 4);
}

function roundedTri(x, y, r, color) {
  let rndFactor = 0.1;
  let point0 = createVector(x - r, y + r / 2);
  let point1 = createVector(x, y - r);
  let point2 = createVector(x + r, y + r / 2);

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
