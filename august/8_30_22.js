let colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];

const boxes = [];

const margin = 100;

const boxMax = 100;

function setup() {
  createCanvas(1080, 1920);
  background(255);

  // push();
  // fill(0);
  // rect(100, 100, 880, 1820);
  // pop();

  for (let x = margin; x <= width - margin; x += 10) {
    for (let y = margin; y < height - margin; y += noise(x) * 100) {
      let centerCoord = createVector(x, y);
      let width = noise(x / 100, y / 100) * 20;
      let height = noise(x / 100, y / 100) * boxMax;
      boxes.push(new Box(centerCoord, width, height));
    }
  }

  boxes.forEach((box) => box.show());
}
function draw() {}

class Box {
  constructor(centerCoord, width, height) {
    this.x = centerCoord.x;
    this.y = centerCoord.y;
    this.width = width;
    this.height = height;

    this.c = this.selectColor();
  }

  selectColor() {
    let colorIndex = Math.floor(noise(this.x, this.y) * colors.length);
    return colors[colorIndex];
  }
  show() {
    push();
    fill(this.c);
    noStroke();
    for (
      let y = this.y;
      y < this.y + this.height;
      y += (noise(this.width) * this.width) / 10
    ) {
      ellipse(this.x, y, noise(this.x, this.y) * this.width);
    }
    // rect(this.x, this.y, this.width, this.height);
    pop();
  }
}

function keyPressed() {
  if (key === "s") {
    save("8_30_22.jpeg");
  }
}
