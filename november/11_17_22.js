const yellow = "#f6cc47";
const tan = "#f2ddc3";
const blue = "#a8b9bd";
const pink = "#FFC996";
const red = "#FFED99";
const darkerRed = "#FFA900";
const stone = "#2B2B2A";

let margin = 25;

function setup() {
  pixelDensity(2);
  createCanvas(600, 800);

  frame(stone);
  mainBG(tan);
  sun(yellow);
  sunBeams();
  frame(stone);
}
function draw() {}

function frame(color) {
  push();

  stroke(color);
  strokeWeight(50);
  noFill();
  rect(0, 0, width, height);
  pop();
}
function mainBG(color) {
  push();
  noStroke();
  fill(color);
  rect(margin, margin, width - 2 * margin, height - 2 * margin);
  pop();
}
function sun(color) {
  push();
  noStroke();
  fill(color);
  ellipse(100, 300, 200);
  spotted(100, 300, 200, red);
  spotted(100, 300, 200, pink);
  spotted(100, 300, 200, darkerRed);
  pop();
}
function sunBeams(color) {
  let angleStep = TAU / 120;
  let radiusOrigin = 100;
  let radiusOff = 5;
  let radius = radiusOrigin + radiusOff;

  let origin = createVector(100, 300);
  for (let angle = 0; angle < TAU; angle += angleStep) {
    let len = random(80, 350);
    let x1 = origin.x + radius * Math.cos(angle);
    let y1 = origin.y + radius * Math.sin(angle);
    let x2 = origin.x + (radius + len) * Math.cos(angle);
    let y2 = origin.y + (radius + len) * Math.sin(angle);

    let point1 = createVector(x1, y1);
    let point2 = createVector(x2, y2);
    brokenLine(point1, point2, stone);
  }
}

function brokenLine(point1, point2, color) {
  stroke(stone);
  strokeWeight(2);
  strokeCap(SQUARE);
  beginShape();
  for (let i = 0; i <= 1; i += 0.1) {
    let xInter = lerp(point1.x, point2.x, i);
    let yInter = lerp(point1.y, point2.y, i);
    if (random() < 0.2) {
      endShape();
      beginShape();
    }
    vertex(xInter, yInter);
  }
  endShape();
}

function spotted(x, y, r, myColor) {
  push();
  let c = color(myColor);
  c.setAlpha(20);
  fill(c);
  for (let i = 0; i <= 10000; i++) {
    let angle = random(TAU);
    let radius = random(3, r / 2);
    let xPos = x + radius * Math.cos(angle);
    let yPos = y + radius * Math.sin(angle);
    ellipse(xPos, yPos, map(noise(x, y), 0, 1, 0, 10));
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_17_22.jpeg");
  }
}
