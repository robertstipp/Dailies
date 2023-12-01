const grid = Array(600)
  .fill(0)
  .map(() => Array(600).fill(0));

function setup() {
  createCanvas(600, 600);
  background(0);
  stroke(255);
  for (let x = 0; x < 600; x++) {
    for (let y = 0; y < 600; y++) {
      if (grid[x][y] === 0) {
        grid[x][y] = PI;
      }
    }
  }

  for (let a = 0; a < TAU; a += 0.01) {
    let xPos = Math.floor(300 + 100 * cos(a));
    let yPos = Math.floor(300 + 100 * sin(a));
    let atan = Math.atan2(yPos - 300, xPos - 300);
    grid[xPos][yPos] = PI / 2;
  }

  for (let y = 200; y < 500; y += 10) {
    flowLine(300, y, 100);
  }
}
function drawVec(x, y, angle, length) {
  push();
  translate(x, y);
  rotate(angle);
  line(0, 0, length, 0);
  pop();
}

function flowLine(x, y, steps) {
  let curX = x;
  let curY = y;
  let len = 10;
  let curAngle = grid[x][y];
  for (let i = 0; i < steps; i++) {
    let nextX = Math.floor(curX + len * cos(curAngle));
    let nextY = Math.floor(curY + len * sin(curAngle));
    if (nextX < 0 || nextX >= 600 || nextY < 0 || nextY >= 600) {
      break;
    }
    curAngle = grid[nextX][nextY];
    line(curX, curY, nextX, nextY);
    curX = nextX;
    curY = nextY;
  }
}
