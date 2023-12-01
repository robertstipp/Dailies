const yellow = "#F5991D";
const orange = "#F54F11";
const red = "#F50515";

const colors = [yellow, orange, red];

function setup() {
  createCanvas(600, 800);
  background("#11F5C7");
  stroke(0);

  const array = new Array(4).fill(0).map(() => new Array(4).fill(0));
  let radii = [10, 20, 30, 40];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let num = random();
      if (i !== 3 && !array[i][j]) {
        if (num < 0.25) {
          array[i][j] = 2;
          array[i + 1][j] = 3;
        } else if (num < 0.5) {
          array[i][j] = 1;
        } else if (num < 0.75) {
          array[i][j] = 4;
        } else {
          array[i][j] = 5;
        }
      }
      if (i === 3 && !array[i][j]) {
        array[i][j] = 1;
      }
    }
  }
  console.log(array);
  rectMode(CENTER);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noStroke();
      fill(random(colors));
      let val = array[j][i];
      if (val === 1) {
        ellipse(100 + i * 120, 100 + j * 120, 100);
      }
      if (val === 2) {
        rect(100 + i * 120, 160 + j * 120, 100, 220);
      }
      if (val === 4) {
        rect(100 + i * 120, 100 + j * 120, 100, 100);
      }
      if (val === 5) {
        myTriangle(100 + i * 120, 100 + j * 120, 100);
      }
    }
  }
}

function draw() {}

function myTriangle(x, y, r) {
  beginShape();
  vertex(x - r / 2, y + r / 2);
  vertex(x + r / 2, y);
  vertex(x - r / 2, y - r / 2);
  endShape(CLOSE);
}
