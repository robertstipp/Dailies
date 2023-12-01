let cols = 20;
let rows = 20;
let rez = 0.01;

const circles = [];

const colors = [
  "#03045e",
  "#023e8a",
  "#0077b6",
  "#0096c7",
  "#00b4d8",
  "#48cae4",
  "#90e0ef",
  "#ade8f4",
  "#caf0f8",
];

function setup() {
  createCanvas(600, 600);

  rectMode(CENTER);

  let cellW = width / cols;
  let cellH = height / rows;

  for (let x = 0; x <= width; x += cellW) {
    for (let y = 0; y <= height; y += cellH) {
      let cIndex = Math.floor(map(noise(x, y), 0, 1, 0, colors.length - 1));
      let c = color(colors[cIndex]);
      fill(c);
      let d = dist(x, y, 300, 300);
      if (d > 150) {
        let noiseVal = noise(x * rez, y * rez);

        if (noiseVal < 0.2) {
          rect(x, y, cellW);
        } else if (noiseVal < 0.5) {
          subDivide(x, y, cellW, cellH);
        } else {
          quadDivide(x, y, cellW, cellH);
        }
      } else {
        let radius = map(noise(x, y), 0, 1, 0, cellW);
        circles.push(new Circle(x, y, radius));
        circles.forEach((circle) => circle.findNeighbor(circles));
        ellipse(x, y, radius);
      }
    }
  }
}

function draw() {}

function subDivide(x, y, cellW, cellH) {
  let halfW = cellW / 2;
  let halfH = cellH / 2;

  rect(x - halfW / 2, y, halfH, cellH);

  rect(x + halfW / 2, y, halfH, cellH);
}

function quadDivide(x, y, cellW, cellH) {
  let halfW = cellW / 2;
  let halfH = cellH / 2;

  rect(x - halfW / 2, y - halfH / 2, halfW, halfH);
  rect(x - halfW / 2, y + halfH / 2, halfW, halfH);
  rect(x + halfW / 2, y - halfH / 2, halfW, halfH);
  rect(x + halfW / 2, y + halfH / 2, halfW, halfH);
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  findNeighbor(circles) {
    circles.forEach((circle) => {
      if (circle !== this) {
        let d = dist(this.x, this.y, circle.x, circle.y);
        if (d < 40) {
          line(this.x, this.y, circle.x, circle.y);
        }
      }
    });
  }
}
