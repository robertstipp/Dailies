let t = 0;
function setup() {
  createCanvas(600, 600);

  background("blue");

  noFill();
  stroke("black");

  let count = 0;
  for (let x = -100; x <= 600; x += 50) {
    for (let y = -100; y <= 600; y += 50) {
      if (count % 2 === 0) {
        flowLine(x, y + 25);
      } else {
        flowLine(x, y);
      }
    }
    count++;
  }
}
function draw() {}

function flowLine(x, y) {
  let curX = x;
  let curY = y;
  noFill();
  strokeWeight(noise(x, y) * 10);

  beginShape();
  // for (let i = 0; i < 10; i++) {
  //   vertex(curX, curY);
  //   let angle = noise(curX / 1000, curY / 1000) * TAU;
  //   let len = 1;
  //   curX = curX + len * Math.cos(angle);
  //   curY = curY + len * Math.sin(angle);
  // }
  // endShape();

  for (let i = 0; i <= 100; i++) {
    let d = dist(curX, curY, 300, 300);
    let angle = noise(d / 1000) * TAU;
    let len = 1;
    let nextX = curX + len * Math.cos(angle);
    let nextY = curY + len * Math.sin(angle);
    let x = map(i, 0, 100, 1, 0);
    let y = Math.pow(0.8, x);

    let sw = map(y, 0, 1, 10, 1);
    strokeWeight(sw);
    line(curX, curY, nextX, nextY);
    curX = nextX;
    curY = nextY;
  }
}
