const colors = ["#214252", "#f05454", "#af2d2d", "#ce6262"];
function setup() {
  createCanvas(1080, 1080);
  background(255);
  let midX = (width * 2) / 3;
  let midY = (height * 2) / 3;
  let startAngle = 0;
  let stopAngle = 5 * TAU;

  for (let r = 0; r < 500; r++) {
    fill(255);
    ellipse(midX, midY, r);
  }
  for (let angle = startAngle; angle <= stopAngle; angle += PI / 50) {
    stroke(0);
    strokeWeight(1);
    let r = map(angle, startAngle, stopAngle, 200, 300);
    let xPos = midX + r * Math.cos(angle);
    let yPos = midY + r * Math.sin(angle);
    let len = 1;
    let x2Pos = xPos + len * Math.cos(angle + PI / 2);
    let y2Pos = yPos + len * Math.sin(angle + PI / 2);

    let curX = xPos;
    let curY = yPos;
    for (let i = 0; i <= 40; i++) {
      let subAngle = map(noise(curX / 1000, curY / 1000), 0, 1, angle, TAU);
      let len = 20;
      let nextX = curX + len * Math.cos(subAngle);
      let nextY = curY + len * Math.sin(subAngle);
      line(curX, curY, nextX, nextY);
      curX = nextX;
      curY = nextY;
    }
    stroke(255);
  }
  noStroke();
  fill(0);
  ellipse(midX, midY, 100);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_7_22.jpeg");
  }
}
