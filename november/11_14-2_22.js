let marginH = 50;
let marginV = 25;
const myBeige = "#FFEFD6";

function setup() {
  createCanvas(600, 800);
  pixelDensity(2);
  background(myBeige);
  noStroke();
  head();

  fill(myBeige);
  // eye
  rect(200, 150, 100, 100);
  // brows
  rect(160, 150, 120, 10);
  rect(300, 150, 10, 140);
  // nose
  rect(400, marginV, 15, 450);
  // mouth
  rect(300, 475, 115, 10);
  rect(360, 480, 40, 160);
  rect(330, 550, 50, 10);
  // chin
  rect(225, 640, 175, 10);
  rect(300, 650, 60, 180);
}
function draw() {}

function head() {
  fill("black");
  rect(marginH, marginV, width - 2 * marginH, height - 2 * marginV);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_14_22.jpeg");
  }
}
