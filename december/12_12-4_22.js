let bg = "#F0CAA3";

function setup() {
  pixelDensity(4);
  createCanvas(1080, 1920);
  background(bg);

  let midX = width / 2;
  let midY = height / 2;
  let origin = createVector(1, 0);
  let radius1 = 440;
  let radius2 = 440 * 1.956;
  let steps = 100;
  strokeCap(SQUARE);
  stroke("#C060A1");
  strokeWeight(3);
  noFill();
  beginShape();

  for (let angle = 0; angle <= PI / 2 + 0.01; angle += PI / steps) {
    let xPos = 100 + radius1 * cos(angle);
    let yPos = 100 + radius2 * sin(angle);
    vertex(100, 100);
    vertex(xPos, yPos);
    vertex(midX, midY);
  }
  endShape();

  beginShape();
  for (let angle = PI / 2; angle <= PI + 0.01; angle += PI / steps) {
    let xPos = width - 100 + radius1 * cos(angle);
    let yPos = 100 + radius2 * sin(angle);
    vertex(width - 100, 100);
    vertex(xPos, yPos);
    vertex(midX, midY);
  }
  endShape();

  beginShape();
  for (let angle = (PI * 3) / 2; angle <= TWO_PI + 0.01; angle += PI / steps) {
    let xPos = 100 + radius1 * cos(angle);
    let yPos = height - 100 + radius2 * sin(angle);
    vertex(100, height - 100);
    vertex(xPos, yPos);
    vertex(midX, midY);
  }
  endShape();

  beginShape();
  for (let angle = PI; angle <= (PI * 3) / 2; angle += PI / steps) {
    let xPos = width - 100 + radius1 * cos(angle);
    let yPos = height - 100 + radius2 * sin(angle);
    vertex(width - 100, height - 100);
    vertex(xPos, yPos);
    vertex(midX, midY);
  }
  endShape();

  noStroke();
  fill(bg);
  rect(0, 0, width, 98);
  rect(0, height - 100, width, 98);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_12_22.jpeg");
  }
}
