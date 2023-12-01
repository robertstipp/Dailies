function setup() {
  createCanvas(600, 800);
  pixelDensity(2);
  background("#fff9e0");
  blueBack();
  eye(150, 200, 300, "#EF5959");
  eye(150, 400, 300, "#FE9801");
  eye(150, 600, 300, "#2C7873");
}
function draw() {}

function eye(x, y, width, color) {
  // noStroke();
  beginShape();
  fill("white");
  vertex(x, y);
  bezierVertex(
    x + width * 0.25,
    y - 100,
    x + width * 0.75,
    y - 100,
    x + width,
    y
  );
  bezierVertex(x + width * 0.75, y + 100, x + width * 0.25, y + 100, x, y);
  endShape(CLOSE);
  fill(color);
  ellipse(x + width / 2, y, 130);
  fill("black");
  ellipse(x + width / 2, y, 70);
  fill("white");
  ellipse(x + width * 0.55, y - 12, 15);
}

function blueBack() {
  fill("#5DA7DB");
  noStroke();
  let margin = 50;
  rect(margin, margin, width - 2 * margin, height - 2 * margin);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_22_22.jpeg");
  }
}
