const red = "#be1e2d";
const yellow = "#ffde17";
const blue = "#21409a";
const yellow2 = "#CCB012";
const colors = [red, yellow, blue];

function setup() {
  createCanvas(600, 800);
  background(colors[2]);
  let row = 0;
  for (let y = 0; y <= 800; y += 50) {
    for (let x = 0; x < 800; x += 200) {
      if (row % 2) {
        diamond(x + 100, y, 100);
      } else {
        diamond(x, y, 100);
      }
    }
    row++;
  }
}
function draw() {}

function diamond(x, y, size) {
  let c = lerpColor(color(yellow), color(yellow2), map(y, 0, 800, 0, 1));

  stroke(c);
  strokeWeight(3);
  strokeJoin(ROUND);
  noFill();
  beginShape();
  vertex(x - size, y);
  vertex(x, y - size / 2);
  vertex(x + size, y);
  vertex(x, y + size / 2);
  endShape(CLOSE);

  beginShape();
  vertex(x, y - size / 2);
  vertex(x, y + size / 2);
  endShape();

  beginShape();
  vertex(x - size / 3, y);
  vertex(x, y - size / 2);
  endShape();
  beginShape();
  vertex(x - size / 3, y);
  vertex(x, y + size / 2);
  endShape();
  beginShape();
  vertex(x - size / 3, y);
  vertex(x - size, y);
  endShape();

  beginShape();
  vertex(x + size / 3, y);
  vertex(x, y - size / 2);
  endShape();
  beginShape();
  vertex(x + size / 3, y);
  vertex(x, y + size / 2);
  endShape();
  beginShape();
  vertex(x + size / 3, y);
  vertex(x + size, y);
  endShape();

  strokeWeight(4);
  fill(colors[2]);
  ellipse(x - size, y, 20);
  ellipse(x, y - size / 2, 20);
  ellipse(x, y + size / 2, 20);
  ellipse(x + size, y, 20);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_23_22.jpeg");
  }
}
