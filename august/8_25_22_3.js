const sizes = [3, 5, 10];
let colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];
// const colors1 = [
//   "#f8f9fa",
//   "#e9ecef",
//   "#dee2e6",
//   "#ced4da",
//   "#adb5bd",
//   "#6c757d",
//   "#495057",
//   "#343a40",
//   "#212529",
// ];
let colors1 = ["#44af69", "#f72585", "#fcab10", "#2b9eb3"];
let cols = 10;
let rows = 10;
let cellW, cellH;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  cellW = width / cols;
  cellH = height / rows;
  background(255);
  noStroke();
  fill(255);
  blendMode(DARKEST);
  counter = 0;
  let xOff = 0;
  let yOff = 0;
  for (let x = 100; x <= width - 100; x += 100 * sin(radians(60))) {
    for (let y = 100; y <= height - 100; y += 100 * 0.8) {
      if (counter % 2 == 0) {
        xOff = 43;
        yOff = 45;
      } else {
        xOff = 0;
        yOff = 0;
      }
      drawOrb(x + xOff, y + yOff, 25);
      drawTriangle(x + xOff, y + yOff, 50, counter);
      counter++;
    }
  }

  // for (let x = 0; x <= width; x += cellW) {
  //   for (let y = 0; y <= height; y += cellH) {
  //     drawTriangle(x, y, cellW);
  //     // drawRect(x, y, cellW, cellH);

  //     drawOrb(x, y, cellW * 0.5);
  //   }
  // }
}
function draw() {}

function drawOrb(x, y, maxR) {
  let angleStep = TAU / 32,
    angleOffset;

  let counter = 0;
  fill(random(colors));
  for (let r = 0; r < maxR; r += 10) {
    counter % 2 == 0 ? (angleOffset = 0) : (angleOffset = angleStep / 2);
    for (let angle = 0 + angleOffset; angle < TAU; angle += angleStep) {
      let p = createVector(x + r * Math.cos(angle), y + r * Math.sin(angle));
      let szIndex = Math.floor(noise(r) * sizes.length);
      ellipse(p.x, p.y, sizes[szIndex]);
    }
    counter++;
  }
}

function drawRect(x, y, w, h) {
  fill(random(colors1));
  rect(x, y, w, h);
}

function drawHexagon(cX, cY, r) {
  noStroke();

  let colorIndex = Math.floor(
    map(noise(cX / 10, cY / 10), 0, 1, 0, colors.length)
  );

  fill(colors[colorIndex]);

  beginShape();
  for (let a = TAU / 12; a < TAU + TAU / 12; a += TAU / 6) {
    var x1 = cX + r * bassScl * cos(a);
    var y1 = cY + r * bassScl * sin(a);

    vertex(x1, y1);
  }
  endShape(CLOSE);
}

function drawTriangle(cX, cY, r, counter) {
  push();
  strokeWeight(1);
  stroke(random(colors));
  noFill();
  translate(cX, cY);
  if (counter % 2 == 0) {
    rotate(PI);
  }
  beginShape();

  for (let a = PI / 6; a < TAU; a += TAU / 3) {
    let x1 = r * cos(a);
    let y1 = r * sin(a);
    vertex(x1, y1);
  }
  endShape(CLOSE);
  pop();
}
