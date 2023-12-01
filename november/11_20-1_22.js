const colors = ["#a6032f", "#730220", "#a6033f", "#08080d", "#4A4E59"];
const colors2 = ["#6e698c", "#212940", "#313b59", "#bf6d65", "#F2ACAC"];
const colors3 = ["#905E96", "#D58BDD", "#FF99D7", "#FFD372"];
let noiseMax = 3;
function setup() {
  createCanvas(600, 800);
  background("#FFF8CD");
  let squiggleRadius = 25;
  for (let y = -100; y <= 475; y += squiggleRadius) {
    for (let x = -100; x <= 600; x += squiggleRadius) {
      squiggle(x, y, squiggleRadius);
    }
  }
  sun(300, 200, 300);
  sun(300, 200, 300);
  sun(300, 200, 300);
  sun(300, 200, 300);
  sun2();
  ribbon();
}
function draw() {}

function ribbon() {
  stroke(colors[1]);
  noFill();
  let startAngle = random(TAU);
  for (let y = 500; y <= 1000; y += 3) {
    startAngle += 0.2;
    let cIndex = Math.floor(map(y, 500, 1000, 0, colors.length - 1));
    let c = colors[cIndex];
    let trigConstant = map(y, 500, 1000, 1, 2.5);
    stroke(c);
    beginShape();
    for (let x = 0; x <= 600; x += 1) {
      let angle = map(x, 100, 500, startAngle, startAngle + TAU);
      let yOff = -5 * trigConstant * Math.sin(angle);
      strokeWeight(1);
      if (random() < 0.3) {
        endShape();
        vertex(x, y + yOff);
        beginShape();
      }
      vertex(x, y + yOff);
    }
    endShape();
  }
}

function sun(x, y, r) {
  noFill();

  noiseSeed(Math.floor(random(1000)));
  let boundR = r / 2;
  let xMin = x - boundR;
  let xMax = x + boundR;
  let yMin = y - boundR;
  let yMax = y + boundR;
  noStroke();

  let c = color(random(colors3));

  // for (let xDot = xMin; xDot <= xMax; xDot += 10) {
  //   for (let yDot = yMin; yDot <= yMax; yDot += 10) {
  //     let d = dist(xDot, yDot, x, y);
  //     if (d < boundR) {
  //       rectMode(CENTER);
  //       let size = noise(xDot / 100, yDot) * 14;
  //       rect(xDot, yDot, size, size, 2);
  //     }
  //   }
  // }

  let grad = drawingContext.createLinearGradient(300, 300, width, height);
  grad.addColorStop(0, colors3[0]);
  grad.addColorStop(0.5, colors3[1]);
  grad.addColorStop(1, colors3[2]);
  drawingContext.save();
  drawingContext.fillStyle = grad;
  ellipse(300, 300, 300);
  drawingContext.restore();
}

function squiggle(x, y, r) {
  stroke("#F1D3B3");
  noFill();
  if (random() < 0.2) {
    strokeWeight(2);
  }
  if (random() < 0.2) {
    strokeWeight(1);
  }
  arc(x, y, r, r, 0, HALF_PI);
  arc(x, y + r, r, r, PI, PI + PI / 2);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_20_22.jpeg");
  }
}

function sun2() {
  let grad = drawingContext.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "black");
  grad.addColorStop(1, "white");
  drawingContext.save();
  drawingContext.fillStyle = grad;

  for (let x = 100; x <= 500; x += 100) {
    for (let y = 100; y <= 500; y += 100) {
      ellipse(x, y, 50);
    }
  }
  drawingContext.restore();
}
