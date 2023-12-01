const colors = ["#be1e2d", "#ffde17", "#21409a"];
let margin = 100;

function setup() {
  createCanvas(600, 800);
  background("#f5f5dc");
  noStroke();
  rectMode(CENTER);
  for (let x = margin; x <= 500; x += 100) {
    for (let y = margin; y <= 700; y += 100) {
      fill(random(colors));
      if (x == margin && y == margin) {
        fill("#000000");
      }
      if (x === 100) {
        noRound(x, y, 90);
      }
      if (x === 200) {
        oneRound(x, y, 90);
      }
      if (x === 300) {
        twoRound(x, y, 90);
      }
      if (x === 400) {
        threeRound(x, y, 90);
      }
      if (x === 500) {
        fourRound(x, y, 90);
      }
    }
  }
}
function draw() {}

function noRound(x, y, r) {
  rect(x, y, r, r, 0, 0, 0, 0);
}
function oneRound(x, y, r) {
  rect(x, y, r, r, 0, 0, 0, r);
}
function twoRound(x, y, r) {
  rect(x, y, r, r, 0, r, 0, r);
}
function threeRound(x, y, r) {
  rect(x, y, r, r, 0, r, r, r);
}
function fourRound(x, y, r) {
  rect(x, y, r, r, r, r, r, r);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_22_22.jpeg");
  }
}
