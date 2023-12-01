const colors1 = ["#B1B2FF", "#AAC4FF", "#D2DAFF", "#EEF1FF"];
const colors2 = ["#FFEBAD", "#FFF6BF", "#ABD9FF", "#C3F8FF"];

let canvasWidth = 600;
let canvasHeight = 600;

function setup() {
  createCanvas(canvasWidth, canvasWidth);
  background(255);
  noStroke();

  drawRect();
}
function draw() {
  noLoop();
  noFill();
  strokeWeight(1);
  let strokeC = color("navy");
  strokeC.setAlpha(200);
  stroke(strokeC);
  for (let x = 100; x <= canvasWidth - 100; x += 50) {
    let y = 100;
    let increment = 0;
    beginShape();
    while (y < canvasHeight - 100) {
      let angle = increment % 2 == 0 ? (PI * 3) / 4 : PI / 4;
      let xOff = 10 * Math.cos(angle);
      if (random() < 0.5) {
        endShape();
        drawShape(x, y, Math.floor(random(3, 8)), 5);
        y += 10;
        beginShape();
      }
      vertex(x + xOff, y);
      increment++;
      y += 10;
    }
    endShape();
  }
}

function drawBackRectangle() {
  this.xMin = -100;
  this.xMax = 700;
  this.yMin = -100;
  this.yMax = 700;
  this.origin = createVector(
    random(this.xMin, this.xMax),
    random(this.yMin, this.yMax)
  );
  this.width = random(200);
  this.height = random(200);

  let colorIndex = Math.floor(map(this.origin.x, -100, 700, 0, colors1.length));

  this.c = color(colors1[colorIndex]);
  this.c.setAlpha(random(random(100)));
  push();
  fill(this.c);
  rect(this.origin.x, this.origin.y, this.width, this.height);
  pop();
}

function drawForeRectangle() {
  this.xMin = -100;
  this.xMax = 700;
  this.yMin = 100;
  this.yMax = 700;
  this.origin = createVector(
    random(this.xMin, this.xMax),
    random(this.yMin, this.yMax)
  );
  this.width = random(200);
  this.height = random(200);

  let colorIndex = Math.floor(map(this.origin.x, -100, 700, 0, colors1.length));
  this.c = color(colors2[colorIndex]);
  this.c.setAlpha(random(10));
  push();
  fill(this.c);

  rect(this.origin.x, this.origin.y, this.width, this.height);
  pop();
}

function keyTyped() {
  if (key === "s" || key === "S") {
    saveCanvas("9_12_22", "jpg");
    print("saving image");
  }
  return false;
}

function drawRect() {
  for (let i = 0; i < 10000; i++) {
    if (random() < 0.5) {
      blendMode(HARD_LIGHT);
    } else {
      blendMode(BLEND);
    }
    drawBackRectangle();
  }
  for (let i = 0; i < 1000; i++) {
    if (random() < 0.5) {
      blendMode(HARD_LIGHT);
    } else {
      blendMode(BLEND);
    }
    drawForeRectangle();
  }
}

function drawShape(x, y, numSides, radius) {
  this.origin = createVector(x, y);
  this.radius = radius;

  beginShape();
  for (let angle = 0; angle < TAU; angle += TAU / numSides) {
    let x = this.origin.x + this.radius * Math.cos(angle);
    let y = this.origin.y + this.radius * Math.sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}
