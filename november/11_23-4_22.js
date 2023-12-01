const shapes = [];

const red = "#be1e2d";
const yellow = "#ffde17";
const blue = "#21409a";

const colors = [red, yellow, blue];

function setup() {
  createCanvas(600, 800);
  background("black");
  strokeWeight(4);
  for (let i = 0; i < 10000; i++) {
    let isValid = true;
    let xPos = random(width);
    let yPos = random(height);
    let r = random([20, 60, 80]);
    for (let shape of shapes) {
      let d = dist(shape.x, shape.y, xPos, yPos);
      if (d < shape.r + r) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      shapes.push(new Shape(xPos, yPos, r));
    }
  }
  shapes.forEach((shape) => shape.display());
}

function draw() {}

class Shape {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = random(colors);
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(random(TAU));
    let num = random();
    if (num < 0.33) {
      roundedTri(0, 0, this.r, this.c);
    } else if (num < 0.66) {
      roundedRect(0, 0, this.r, this.c);
    } else {
      stroke(this.c);
      noFill();
      ellipse(0, 0, this.r);
    }

    pop();
  }
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
  noFill();
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

function roundedRect(x, y, r, color) {
  stroke(color);
  noFill();
  rect(x, y, r, r, r / 20, r / 20, r / 20, r / 20);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_23_22.jpeg");
  }
}
