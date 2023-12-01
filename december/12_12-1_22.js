function setup() {
  pixelDensity(4);
  pixelDensity(4);
  createCanvas(1080, 1080);
  background("pink");
  for (let x = 140; x < width - 100; x += 200) {
    for (let y = 140; y < height - 100; y += 200) {
      spider(x, y, 100);
    }
  }
}

function spider(x, y, size) {
  legs(x, y, size);
  ellipse(x, y, size);
  // eyes
  eyes(
    random(x - size / 4, x + size / 4),
    random(y - size / 4, y + size / 4),
    size
  );
}

function eyes(x, y, size) {
  push();
  fill("white");
  eye(x, y, size / 3);
  eye(x + size / 3.5, y, size / 3);
  pop();
}

function eye(x, y, size) {
  push();
  fill("white");
  ellipse(x, y, size);
  eyeball(x, y, size / 3);
  pop();
}

function eyeball(x, y, size) {
  push();
  fill("black");
  let xOff = random([-1, 1]) * random(size / 2);
  let yOff = random([-1, 1]) * random(size / 2);
  ellipse(x + xOff, y + yOff, size);
  pop();
}
function legs(x, y, size) {
  push();
  stroke(0);
  strokeWeight(size / 100);
  for (let angle = 0; angle <= TAU; angle += TAU / 80) {
    let radius = random(size / 2, size);
    let xPos = x + radius * cos(angle);
    let yPos = y + radius * sin(angle);
    line(x, y, xPos, yPos);
  }
  pop();
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_12_22.jpeg");
  }
}
