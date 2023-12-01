const myRed = "#DC3535";
const myYellow = "#F5D5AE";
const myBlue = "#0D4C92";
let margin = 25;
function setup() {
  pixelDensity(2);
  createCanvas(600, 800);
  background("white");
  redBack();
  sun();
  mountain();
}
function draw() {}

function redBack() {
  noStroke();
  fill(myRed);
  rect(margin, margin, width - 2 * margin, height - 2 * margin);
}

function sun() {
  fill(myYellow);
  ellipse(width / 3, height / 3, 150);
}

function mountain() {
  noStroke();
  fill(myYellow);
  // line(margin, height - 200, width - margin, height - 500);
  beginShape();
  vertex(margin, height - 100);
  vertex(width - margin, height - 500);
  vertex(width - margin, height - margin);
  vertex(margin, height - margin);
  endShape(CLOSE);
  fill(myBlue);
  beginShape();
  vertex(width - 300, height - margin);
  vertex(width - 150, height - 250);
  vertex(width - 250, height - 275);
  vertex(width - margin, height - 500);
  vertex(width - margin, height - margin);

  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_14_22.jpeg");
  }
}
