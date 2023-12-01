let step = 100;
let radius = 20;

function setup() {
  createCanvas(600, 600);
  background(0);

  rectMode(CENTER);
  let curX = 100;
  let curY = 100;
  let curDirection = "right";

  ellipse(curX, curY, radius);

  const grid = Array(5)
    .fill()
    .map(() => Array(5).fill(0));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      push();
      fill(255, 30);
      rect(100 + i * 100, 100 + j * 100, 100);
      pop();
    }
  }

  grid[0][0] = 1;

  for (let k = 0; k < 100; k++) {
    let nextDirection;
    let nextX, nextY;
    if (curDirection === "right") {
      nextDirection = random(["right", "up", "down"]);
    }

    if (nextDirection === "up") {
      nextX = curX + 0;
      nextY = curY - 100;
    }

    if (nextDirection === "down") {
      nextX = curX + 0;
      nextY = curY + 100;
    }

    if (nextDirection === "right") {
      nextX = curX + 100;
      nextY = curY + 0;
    }

    if (nextX > 500 || nextX < 50 || nextY > 500 || nextY < 50) {
      break;
    }

    let col = (nextX - 100) / 100;
    let row = (nextY - 100) / 100;
    if (grid[row][col] === 1) {
      continue;
    }
    console.log(grid);

    grid[row][col] = 1;

    ellipse(nextX, nextY, radius);

    push();
    stroke(255);
    strokeWeight(10);
    // line(curX, curY, nextX, nextY);

    pop();

    curX = nextX;
    curY = nextY;
  }
}
