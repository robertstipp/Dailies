const colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
function setup() {
  createCanvas(600, 800);
  background(0);
  strokeJoin(ROUND);

  let i = 0;
  for (let x = 0; x <= 600; x += 80) {
    for (let y = 0; y <= 800; y += 50) {
      let cIndex = Math.floor(
        map(noise(x / 100, y / 100), 0, 1, 0, colors.length)
      );
      stroke(colors[cIndex]);
      fill(colors[cIndex]);
      if (i % 2 === 0) {
        leftTri(x, y, 50);

        if (random() < 0.5) eye(x, y, 25);
      } else {
        rightTri(x + 25, y, 50);
      }

      i++;
    }
  }
}
function draw() {}

function eye(x, y, r) {
  let c = color("black");
  c.setAlpha(340);
  fill(c);
  ellipse(x, y, r);
}

function leftTri(x, y, size) {
  let vertices = 3;
  let angleStep = TAU / vertices;
  beginShape();
  for (let angle = 0; angle <= TAU; angle += angleStep) {
    let xPos = x + size * Math.cos(angle);
    let yPos = y + size * Math.sin(angle);

    vertex(xPos, yPos);
  }
  endShape(CLOSE);
}

function rightTri(x, y, size) {
  push();
  translate(x, y);
  rotate(PI);
  leftTri(0, 0, size);
  pop();
}
