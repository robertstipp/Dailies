const colors = ["#c6ebc9", "#70af85", "#f0e2d0"];

function setup() {
  createCanvas(1080, 1080);

  background(0);

  stroke(255);

  noFill();
  stroke(255);
  // ellipse(300, 300, 300, 300);

  for (let i = 0; i < 1000; i++) {
    let radius = random(10, 400);
    let angle = random(0, 360);

    let xPos = 540 + radius * cos(angle);
    let yPos = 540 + radius * sin(angle);

    let curX = xPos;
    let curY = yPos;

    for (let j = 0; j < 100; j++) {
      let tangentAngle = atan2(540 - curX, 540 - curY) + 90;

      let angleOptions = [TAU / 3, (TAU * 2) / 3, TAU];
      let c;
      angleMode(DEGREES);

      if (tangentAngle > -90 && tangentAngle < 120) {
        angleSelection = 60;
        c = colors[0];
      }
      if (tangentAngle > 120 && tangentAngle < 200) {
        angleSelection = 120;
        c = colors[1];
      }
      if (tangentAngle > 200 && tangentAngle < 360) {
        angleSelection = 180;
        c = colors[2];
      }
      let effectAngle = map(
        noise(curX / 10, curY / 10),
        0,
        1,
        angleSelection - 20,
        angleSelection + 20
      );
      let nextX = curX + cos(effectAngle) * 1;
      let nextY = curY + sin(effectAngle) * 1;
      strokeWeight(2);
      stroke(c);
      line(curX, curY, nextX, nextY);

      curX = nextX;
      curY = nextY;
    }

    // let xPos2 = xPos + radius * cos(angleSelection);
    // let yPos2 = yPos + radius * sin(angleSelection);

    // ellipse(xPos, yPos, 10, 10);
    // line(xPos, yPos, xPos2, yPos2);
    // ellipse(xPos2, yPos2, 10, 10);
  }
}
