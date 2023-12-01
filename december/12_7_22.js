const black = "#000000";
const red = "#be1e2d";
const yellow = "#ffde17";
const white = "#ffffff";
const blue = "#21409a";
const purple = "#292c6d";

const colors = [black, blue, purple];

function setup() {
  createCanvas(600, 600);
  background(220);
  noStroke();

  let originalAngle = random(TAU);
  let angles = [
    originalAngle,
    originalAngle + TAU / 3,
    originalAngle + (2 * TAU) / 3,
    0,
  ];
  let curI;

  let cols = width;
  let rows = height;

  const arr = Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));

  // select route
  for (let x = -100; x <= width + 100; x++) {
    let curX = random(-100, width + 100);
    let curY = random(-100, height + 100);
    stroke(random(colors));
    strokeWeight(2);
    // explore route
    for (let i = 0; i < 100; i++) {
      let index = Math.floor(noise(curX / 100, curY / 100) * angles.length);
      let angle = angles[index];
      let len = 10;

      let nextX = curX + len * Math.cos(angle);
      let nextY = curY + len * Math.sin(angle);
      line(curX, curY, nextX, nextY);
      if (nextX < 0 || nextX >= 600 || nextY < 0 || nextY >= 600) {
        break;
      }
      curX = nextX;
      curY = nextY;
    }
  }
}
function draw() {}
