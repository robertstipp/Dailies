const colors = ["#363636", "#99d8d0", "#ffbcbc", "#b7efcd"];
const colors2 = ["#e0ece4", "#ff4b5c", "#056674", "#66bfbf"];

function setup() {
  createCanvas(600, 600);
  background(30);
  verticalLineBackground();

  let x = 100;
  let y = 100;
  const boundary = new Boundary(200, 200, 100, 100);

  while (x < width - 100) {
    while (y < height - 100) {
      noFill();

      // break;
      // stroke(map(noise(x, y), 0, 1, 0, 255));

      let yStep = noise(x / 1000, y / 1000) * random(10, 20);
      y += yStep;

      let colorIndex = Math.floor(
        map(noise(x / 10, y / 10), 0, 1, 0, colors.length)
      );

      if (boundary.contains(x, y)) {
        stroke(colors2[colorIndex]);
      } else {
        stroke(colors[colorIndex]);
      }
      ellipse(x, y, noise(x / 100, y / 100) * 10);
    }
    y = 100;
    let xStep = noise(x / 1000, y / 1000) * 25;

    x += xStep;
  }
}

function draw() {}

function verticalLineBackground() {
  for (let i = 0; i < 1000; i++) {
    stroke(random(20));
    let x1 = random(width);
    let y1 = random(height);
    let angle = PI / 2;
    let len = random(50);
    let x2 = x1 + len * Math.cos(angle);
    let y2 = y1 + len * Math.sin(angle);

    line(x1, y1, x2, y2);
  }
}

class Grid {
  constructor(height, width) {}
}

class Boundary {
  constructor(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  contains(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}
