const colors = ["#59C1BD", "#3E6D9C", "#F7F7F7"];
let margin = 50;

function setup() {
  createCanvas(600, 800);
  background(colors[2]);
  rectMode(CENTER);
  // for (let x = margin; x < 550; x += 100) {
  //   rect(x, 300, 100);
  // }

  for (let x = 100; x <= 500; x += 100) {
    for (let y = 100; y <= 700; y += 100) {
      shape(x, y);
    }
  }
}
function draw() {}

function semiCircle(x, y, r) {
  push();
  translate(x, y);
  rotate(random([PI / 2, PI, (PI * 3) / 2, 0]));
  arc(0, 0, r, r, 0, PI);
  pop();
}

function shape(x, y) {
  noStroke();
  let squareColor, circleColor;
  let num = random();
  if (num > 0.0 && num < 0.2) {
    squareColor = colors[0];
    circleColor = colors[1];
  } else if (num >= 0.2 && random < 0.4) {
    squareColor = colors[1];
    circleColor = colors[0];
  } else if (num >= 0.4 && random <= 0.7) {
    squareColor = colors[2];
    circleColor = random([colors[0], colors[1]]);
  } else {
    squareColor = colors[2];
    circleColor = random([colors[1], colors[2]]);
  }
  fill(squareColor);
  rect(x, y, 100);
  fill(circleColor);
  semiCircle(x, y, 100);
}
