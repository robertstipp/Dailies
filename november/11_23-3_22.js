const red = "#be1e2d";
const yellow = "#ffde17";
const blue = "#21409a";

const colors = [red, yellow, blue];

function setup() {
  createCanvas(600, 800);
  background("beige");
  strokeWeight(3);
  for (let y = 0; y <= 800; y += 100) {
    for (let x = 0; x <= 600; x += 50) {
      let yOff = random([-50, -5, 0, 5, 50]);
      let angle = random([PI / 2, -PI / 2, PI, 0]);
      let size = random([10, 25, 50, 75]);
      let c = random(colors);
      push();

      translate(x, y + yOff);
      rotate(angle);
      if (random() < 0.2) {
        fill(c);
      } else {
        noFill();
      }

      roundedTri(0, 0, size, c);
      pop();
    }
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
