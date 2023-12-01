const points = [];

function setup() {
  createCanvas(600, 600);
  background("#fff5de");
  let r = 300;
  let xOrigin = 300;
  let yOrigin = 300;
  for (let angle = 0; angle <= TAU; angle += TAU / 100) {
    let x = xOrigin + r * Math.cos(angle);
    let y = yOrigin + r * Math.sin(angle);

    points.push(new Point(x, y));
  }
  console.log(points);
  points.forEach((point) => point.display());

  let numPoints = points.length;
  let halfArr = points.slice(Math.floor(numPoints / 2));

  for (let i = 0; i < points.length - 1; i++) {
    let index = Math.floor(random(55, 101));
    console.log(index);
    points[i].connect(index);

    if (index < 90) {
      for (let step = 0; step < 3; step++) {
        points[i].connect(index + step);
      }
    }
    if (index > 10) {
      points[i].connect(index - 10);
    }
  }
}

function draw() {}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    point(this.x, this.y);
  }

  connect(index) {
    let other = points[index];
    console.log(index);
    line(this.x, this.y, other.x, other.y);
  }
}
