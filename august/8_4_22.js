const colors = [
  "#f72585",
  "#b5179e",
  "#7209b7",
  "#560bad",
  "#480ca8",
  "#3a0ca3",
  "#3f37c9",
  "#4361ee",
  "#4895ef",
  " #4cc9f0",
];

function setup() {
  createCanvas(600, 600);
  background("black");

  translate(width / 2, height / 2);

  for (r = 100; r < 300; r += 50) {
    let angleStep = map(r, 50, 300, 10, 20);
    let sz = map(r, 50, 300, 0.3, 1);
    for (angle = 0; angle < 360; angle += angleStep) {
      let x = r * cos(radians(angle));
      let y = r * sin(radians(angle));
      fill(random(colors));
      drawTear(x, y, angle, sz);
    }
  }
  noFill();
  strokeWeight(2);
  stroke(255);
  ellipse(0, 0, 100);
}
function draw() {}

function drawTear(x, y, angle, sz) {
  push();

  translate(x, y);
  rotate(radians(angle - 90));
  scale(sz);

  beginShape();

  vertex(0, 0);
  bezierVertex(-50, -50, -50, -50, 0, -100);
  bezierVertex(50, -50, 50, -50, 0, 0);
  endShape(CLOSE);
  pop();
}

function keyPressed() {
  // 83 is key code for key "s"s
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save("aug_4_22.jpeg");
  }
}
