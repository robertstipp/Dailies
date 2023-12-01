const sky1 = "#FFC6BE";
const sky2 = "#975C8D";
const sun = "#FFA1C5";
const pyramidDarkFace = "#854777";
const pyramidLightFace = "#A773C3";
let margin = 50;

function setup() {
  createCanvas(800, 600);
  background("white");
  sky();
  pyramid(100, 550, 100);
  pyramid(250, 550, 200);
  pyramid(500, 550, 250);
  moon(400, 250, 300);
}

function draw() {}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_15-1_22.jpeg");
  }
}

function sky() {
  push();
  noStroke();
  fill(sky1);
  rect(margin, margin, width - 2 * margin, height - 2 * margin);
  pop();
}

function moon(x, y, r) {
  push();
  fill(sun);
  ellipse(x, y, r);
  pop();
}

function pyramid(x, y, height) {
  fill(pyramidDarkFace);
  strokeJoin(MITER);
  beginShape();
  vertex(x - height / 3, y);
  vertex(x + height * 0.3, y - height * 0.6);
  vertex(x + height / 2, y);
  endShape();

  noStroke();
  fill(pyramidLightFace);
  beginShape();
  vertex(x + height * 0.3, y - height * 0.6);
  vertex(x + height / 2, y);
  vertex(x + height, y);
  endShape(CLOSE);
}
