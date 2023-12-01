const myRed = "#F94144";
const myOrange = "#F3722C";
const myYellow = "#F9C74F";
const myGreen = "#43AA8B";
const myBlue = "#577590";
function setup() {
  createCanvas(600, 800);
  background(0);
  straightHills(0, 200);

  flatHills(210, 340);
  spikyHills(350, 490);
  mountainHills(520, 660);
  wavyHills(660, 800);
}
function draw() {}

function straightHills(startY, stopY) {
  push();
  strokeWeight(3);
  stroke(myRed);
  for (let y = startY; y <= stopY; y += random(10, 20)) {
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      vertex(x, y);
    }
    endShape();
  }
  pop();
  push();
  noStroke();
  fill(myRed);
  ellipse(100, 100, 100);
  pop();
}

function flatHills(startY, stopY) {
  push();
  fill("black");
  strokeWeight(3);
  stroke(myOrange);

  for (let y = startY; y <= stopY; y += random(10, 30)) {
    if (y === startY) {
      push();
      noStroke();
      rect(0, y, width, height);
      pop();
    }
    beginShape();
    let yOrig = y;
    let xPos = 0;
    vertex(xPos, yOrig);
    while (xPos <= width) {
      xPos += random(10, 40);
      yPos = yOrig + random([-10, 0, -10]);
      vertex(xPos, yPos);
    }

    endShape();
  }
  pop();

  push();
  noStroke();
  fill(myOrange);
  ellipse(200, 250, 100);
  pop();
}

function spikyHills(startY, stopY) {
  push();
  fill("black");
  strokeWeight(3);
  stroke(myYellow);
  for (let y = startY; y <= stopY; y += random(10, 20)) {
    if (y === startY) {
      push();
      noStroke();
      rect(0, y, width, height);
      pop();
    }
    beginShape();
    let yOrig = y;
    let xPos = 0;
    vertex(xPos, yOrig);
    while (xPos <= width) {
      if (random() < 0.1) {
        for (let i = 0; i < 4; i++) {
          if (i % 2 === 0) {
            yPos = yOrig - 10;
          } else {
            yPos = yOrig;
          }
          xPos += 10;

          vertex(xPos, yPos);
        }
      } else {
        xPos += random(10, 20);
        yPos = yOrig;
        vertex(xPos, yPos);
      }
    }
    endShape();
  }
  pop();
  push();
  noStroke();
  fill(myYellow);
  ellipse(300, 400, 100);
  pop();
}

function mountainHills(startY, stopY) {
  push();
  noFill();
  strokeWeight(3);
  stroke(myGreen);
  for (let y = startY; y <= stopY; y += random(10, 10)) {
    noiseSeed(Math.floor(random(1000)));
    if (y === startY) {
      push();
      noStroke();
      rect(0, y, width, height);
      pop();
    }
    beginShape();
    let yOrig = y;
    let xPos = -10;

    while (xPos <= width) {
      // vertex(xPos, yOrig);
      vertex(xPos, yPos);
      xPos += 10;
      yPos = noise(xPos / 100) * -50 + yOrig;
    }
    endShape();
  }
  pop();
  push();
  noStroke();
  fill(myGreen);
  ellipse(400, 550, 100);
  pop();
}

function wavyHills(startY, stopY) {
  push();
  noFill();
  strokeWeight(3);
  stroke(myBlue);
  for (let y = startY; y <= stopY; y += random(10, 30)) {
    if (y === startY) {
      push();
      noStroke();
      rect(0, y, width, height);
      pop();
    }
    let factor = map(noise(y), 0, 1, 1, 3);
    beginShape();

    let yOrig = y;
    let xPos = 0;
    vertex(xPos, yOrig);
    while (xPos <= width) {
      xPos += 10;
      let angle = map(xPos, 0, width, 0, factor * TAU);
      yPos = yOrig + 10 * Math.sin(angle);
      vertex(xPos, yPos);
    }
    endShape();
  }
  pop();
  push();
  noStroke();
  fill(myBlue);
  ellipse(500, 700, 100);
  pop();
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_16_22.jpeg");
  }
}
