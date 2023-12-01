function setup() {
  createCanvas(1080, 1080);
  background(0);

  let midX = width / 2;
  let midY = height / 2;

  let radStart = 100;
  let radEnd = 500;
  stroke(255);
  // for (let angle = 0; angle < TAU; angle += TAU / 100) {
  //   let radius = 100;
  //   let xPos = midX + radius * Math.cos(angle);
  //   let yPos = midY + radius * Math.sin(angle);

  //   let curX = xPos;
  //   let curY = yPos;

  //   let angle0 = atan2(yPos - midY, xPos - midX);
  //   for (let i = 0; i < 1000; i++) {
  //     let a = noise(curX / 100, curY / 100) * TAU;

  //     let d = dist(curX, curY, midX, midY);
  //     let dFact = constrain(map(d, 100, 200, 1, 0), 0, 1);
  //     let effAngle = dFact * angle0 + (1 - dFact) * a;
  //     let len = 1;

  //     let nextX = curX + len * Math.cos(effAngle);
  //     let nextY = curY + len * Math.sin(effAngle);

  //     line(curX, curY, nextX, nextY);
  //     curX = nextX;
  //     curY = nextY;
  //   }
  // }

  jelly(midX, midY);
}

function jelly(x, y) {
  for (let angle = 0; angle < TAU; angle += TAU / 500) {
    let radius = 50;
    let xPos = x + radius * Math.cos(angle);
    let yPos = y + radius * Math.sin(angle);

    let curX = xPos;
    let curY = yPos;

    let angle0 = atan2(yPos - y, xPos - x);
    for (let i = 0; i < 1000; i++) {
      let a = noise(curX / 100, curY / 1000) * TAU;

      let d = dist(curX, curY, x, y);
      let dFact = constrain(map(d, 50, 300, 1, 0), 0, 1);
      let effAngle = dFact * angle0 + (1 - dFact) * a;
      let len = 1;
      let alpha = map(dFact, 1, 0, 10, 100);
      stroke(255, alpha);
      let nextX = curX + len * Math.cos(effAngle);
      let nextY = curY + len * Math.sin(effAngle);

      line(curX, curY, nextX, nextY);
      curX = nextX;
      curY = nextY;
    }
  }
}

function eclipse() {
  fill("black");
  ellipse(300, 550, 100);
  noStroke();
  fill("white");
  ellipse(300, 530, 100);
}

function sparkle(x, y, size) {
  strokeWeight(1);
  for (let angle = 0; angle < TAU; angle += TAU / 40) {
    let rad = random(size / 5, size);
    let xPos = x + rad * Math.cos(angle);
    let yPos = y + rad * Math.sin(angle);
    line(x, y, xPos, yPos);
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_8_22.jpeg");
  }
}
