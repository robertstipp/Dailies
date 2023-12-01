function setup() {
  createCanvas(600, 600);
  background(220);
  noFill();
  for (let y = 1000; y >= 0; y -= 200) {
    for (let x = 50; x <= 700; x += 200) {
      shape(x, y, 100);
    }
    for (let x = -150; x <= 700; x += 200) {
      shape(x + 100, y - 100, 100);
    }
  }
}
function draw() {}

function shape(x, y, size) {
  let pos1 = createVector(x, y + size / 1.5);

  //outer square
  fill("black");
  beginShape();
  vertex(x, y - size);
  vertex(x - size, y);
  vertex(x, y + size);
  vertex(x + size, y);
  endShape(CLOSE);

  // ellipse(x, y, 10);
  ellipse(pos1.x, pos1.y, 10);
  strokeWeight(2);
  stroke("#FFD700");
  let point1 = createVector(pos1.x, pos1.y - size / 3);
  let point2 = createVector(pos1.x - size / 3, pos1.y);
  let point3 = createVector(pos1.x + size / 3, pos1.y);
  let point4 = createVector(pos1.x, pos1.y + size / 3);

  for (let angle = PI + PI / 4; angle <= TAU - PI / 4; angle += PI / 24) {
    let x = point4.x + 200 * Math.cos(angle);
    let y = point4.y + 200 * Math.sin(angle);

    line(point4.x, point4.y, x, y);
  }
  fill("#FFD700");
  beginShape();
  vertex(point1.x, point1.y);
  vertex(point2.x, point2.y);
  vertex(pos1.x, pos1.y + size / 3);
  vertex(point3.x, point3.y);
  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_28_22.jpeg");
  }
}
