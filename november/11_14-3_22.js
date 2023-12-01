const myBeige = "#FFEFD6";
const myGreen = "#0E5E6F";
const mySecondGreen = "#3A8891";
const colors = [myGreen, mySecondGreen];
let marginH = 25;
let marginV = 50;

function setup() {
  pixelDensity(2);
  createCanvas(600, 800);
  background("white");
  myBackground();

  for (let r = 10; r <= 150; r += 10) {
    myArc(300, 500, r);
  }

  orb(300, 100, 150);
  // myOrb(300, 100, 150);
}

function draw() {}

function myArc(x, y, r) {
  let startAngle = PI;
  let endAngle = TAU;
  noFill();
  stroke("navy");
  strokeWeight(2);
  beginShape();
  vertex(x - r, height - marginV);

  for (let angle = startAngle; angle <= endAngle; angle += 0.1) {
    let xPos = x + r * Math.cos(angle);
    let yPos = y + r * Math.sin(angle);

    vertex(xPos, yPos);
  }
  vertex(x + r, height - marginV);
  endShape();
}

function myBackground() {
  noStroke();
  fill(myBeige);
  rect(marginH, marginV, width - 2 * marginH, height - 2 * marginV);
}

function orb(x, y, r) {
  // ellipse(x, y, r);

  for (let i = 0; i < 60000; i++) {
    let angle = random(0, PI);
    let radius = random(r);
    let xPos = x + radius * Math.cos(angle);
    let yPos = y + radius * Math.sin(angle);
    stroke(random(colors));
    point(xPos, yPos);
  }
}

function myOrb(x, y, r) {
  let angleStep = 0.1;
  for (let angle = 0; angle <= PI; angle += angleStep) {
    for (let radius = 0; radius <= r; radius += 0.1) {
      let xPos = x + radius * Math.cos(angle);
      let yPos = y + radius * Math.sin(angle);
      stroke(random(colors));
      point(xPos, yPos);
    }
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_14-2_22.jpeg");
  }
}
