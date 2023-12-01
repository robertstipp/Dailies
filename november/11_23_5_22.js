function draw() {
  createCanvas(600, 800);
  background("#E6DAAC");
  noStroke();
  fill("#D93107");
  ellipse(200, 600, 600);
  let row = 0;
  for (let y = 100; y <= height; y += 20) {
    let size = map(y, 100, height, 5, 20);
    for (let x = 0; x <= width; x += 20) {
      if (row % 2 !== 0) {
        diamond(x + 10, y, size);
      } else {
        diamond(x, y, size);
      }
    }
    row++;
  }
}
function setup() {}

function diamond(x, y, size) {
  fill("black");
  beginShape();
  vertex(x - size / 2, y);
  vertex(x, y - size);
  vertex(x + size / 2, y);
  vertex(x, y + size);
  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_23_22.jpeg");
  }
}
