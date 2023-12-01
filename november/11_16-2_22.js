const yellows = [
  "#FFEA00",
  "#FFDD00",
  "#FFD000",
  "#FFC300",
  "#FFB700",
  "#FFAA00",
];
const oranges = [
  "#F7B267",
  "#F79D65",
  "#f48c06",
  "#F4845F",
  "#F27059",
  "#F25C54",
];
const reds = ["#641220", "#6e1423", "#85182A", "#BD1F36", "#c71f37", "#da1e37"];
const greens = [
  "#d9ed92",
  "#b5e48c",
  "#99d98c",
  "#76c893",
  "#52b69a",
  "#34a0a4",
];
const purples = [
  "#10002b",
  "#240046",
  "#3c096c",
  "#5a189a",
  "#7b2cbf",
  "#9d4edd",
];
const blues = [
  "#03045e",
  "#0077b6",
  "#00b4d8",
  "#90e0ef",
  "#caf0f8",
  "#023047",
];

function setup() {
  pixelDensity(2);
  createCanvas(700, 700);
  background(255);
  // for (let i = 0; i < 6; i++) {
  //   for (let x = 100; x <= 600; x += 100) {
  //     let c = color(yellows[i]);
  //     c.setAlpha(10);
  //     fill(c);
  //     crookedCircles(45, 20, x, 100);
  //   }

  // }

  rowCrookedCircles(100, yellows);
  rowCrookedCircles(200, oranges);
  rowCrookedCircles(300, reds);
  rowCrookedCircles(400, greens);
  rowCrookedCircles(500, purples);
  rowCrookedCircles(600, blues);
}
function draw() {}

function imperfectCircle(x, y, r) {
  stroke(255);
}

function crookedCircle(radius, steps, centerX, centerY) {
  var xValues = [];
  var yValues = [];
  let intensity = random(50, 100);
  for (var i = 0; i < steps; i++) {
    let rad = radius + random(-radius / intensity, radius / intensity); // you can change the 10 here to how intense you want the change to be;
    xValues[i] = centerX + rad * cos((2 * PI * i) / steps);
    yValues[i] = centerY + rad * sin((2 * PI * i) / steps);
  }
  beginShape();
  for (let i = 0; i < xValues.length; i++) {
    curveVertex(xValues[i], yValues[i]);
  }
  endShape(CLOSE);
}

function crookedCircles(radius, steps, centerX, centerY) {
  noStroke();
  for (let i = 0; i < 2; i++) {
    let r = random(radius * 0.9, radius * 1.1);
    let s = Math.floor(random(steps * 0.8, steps * 2));
    crookedCircle(r, s, centerX, centerY);
  }
}

function rowCrookedCircles(y, colors) {
  for (let i = 0; i < 6; i++) {
    for (let x = 100; x <= 600; x += 100) {
      let c = color(colors[i]);
      c.setAlpha(100);
      fill(c);

      crookedCircles(45, 20, x, y);
      spotCircle(x, y, 45);
    }
  }
}

function spotCircle(x, y, r) {
  push();
  let alpha = random(20);
  fill(255, 255, 255, alpha);
  for (let i = 0; i < 400; i++) {
    let angle = random(TAU);
    let radius = random(2, r);
    let xPos = x + radius * Math.cos(angle);
    let yPos = y + radius * Math.sin(angle);
    ellipse(xPos, yPos, random(2, 4));
  }
  pop();
}
