const red = "#be1e2d";
const yellow = "#ffde17";
const blue = "#21409a";
let bar;
const colors = [red, blue, yellow];
let t = 0;
const bars = [];

function setup() {
  createCanvas(600, 600);
  background("white");
  let count = 0;
  for (let x = -100; x <= 600; x += 100) {
    for (let y = -100; y <= 600; y += 100) {
      bars.push(new Shape(x, y, 200, count * 0.01));
      count++;
    }
  }
}
function draw() {
  background(200, 10);

  bars.forEach((bar) => {
    bar.move();
    bar.display();
  });

  t += 0.02;
}

function deadLift(x, y, size, plates, barColor, plateColor) {
  fill(barColor);
  strokeWeight(1);
  stroke("black");

  rectMode(CENTER);
  rect(x, y, size, size * 0.025);
  rect(x - size * 0.4, y, size * 0.2, size * 0.05);
  rect(x + size * 0.4, y, size * 0.2, size * 0.05);

  fill(blue);

  let numPlates = plates;

  for (let i = 0; i < numPlates; i++) {
    let xPos = x - size * 0.33 - i * size * 0.025;
    let xPos2 = x + size * 0.33 + i * size * 0.025;

    fill(plateColor);
    rect(
      xPos,
      y,
      size * 0.025,
      size * 0.25,
      size * 0.025,
      size * 0.025,
      size * 0.025,
      size * 0.025
    );
    rect(
      xPos2,
      y,
      size * 0.025,
      size * 0.25,
      size * 0.025,
      size * 0.025,
      size * 0.025,
      size * 0.025
    );
  }

  fill("white");

  rect(x, y, size * 0.05, size * 0.025);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_29_22.jpeg");
  }
}

class Shape {
  constructor(x, y, size, offset) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.plates = random([1, 2, 3, 4, 5, 6, 7]);
    this.barColor = random(colors);
    this.plateColor = random(colors);
    this.offset = offset;
  }

  move() {}

  display() {
    push();
    // this.move();
    translate(this.x, this.y);
    rotate(this.offset + t);
    deadLift(0, 0, this.size, this.plates, this.barColor, this.plateColor);
    pop();
  }
}
