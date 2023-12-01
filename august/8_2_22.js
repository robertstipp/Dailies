const colors2 = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
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
  background(0);

  noFill();
  for (let i = 100; i < 800; i += 100) {
    push();
    scale(0.5);
    translate(i - 100, i - 100);
    drawShape(colors);
    pop();
  }
}

function draw() {}

function drawShape(colors) {
  push();
  translate(0, 100);
  for (x = -100; x < width; x += 5) {
    beginShape();
    strokeWeight(3);
    strokeJoin(BEVEL);
    stroke(color(random(colors)));
    vertex(x + 100, 0);
    for (y = -100; y < height; y += 50) {
      if (y != 380) {
        stroke(color(random(colors)));
        line(x, y, x + 100, y - 100);
      }
      stroke(color(random(colors)));
      vertex(x, y);
    }
    stroke(color(random(colors)));
    vertex(x + 100, y - 100);
    noStroke();
    vertex(x + 100, 0);
    endShape();
  }
  pop();
}

function keyPressed() {
  // 83 is key code for key "s"s
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save("aug_2_22.jpeg");
  }
}
