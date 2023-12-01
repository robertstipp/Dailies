const boxes = [];
let t = 0;
function setup() {
  createCanvas(600, 600);
  background(0);

  for (let x = 20; x <= width; x += 20) {
    for (let y = 20; y <= height; y += 20) {
      boxes.push(new Box(x, y, 18, 20));
    }
  }
}

function draw() {
  background(0);
  boxes.forEach((box) => box.display());
  t += 0.01;
}

class Box {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.posX = this.x;
    this.posY = this.y;
  }

  display() {
    this.move();
    rect(this.posX, this.posY, this.height, this.width);
  }
  move() {
    this.posY = this.y + 100 * Math.sin(this.x + t);
  }
}
