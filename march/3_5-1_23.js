let cols = 20;
let rows = 20;
let numChars = 12;
let chars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+"];
let maxD;
let cellW, cellH;
let time = 0;
function setup() {
  createCanvas(400, 400);
  cellW = width / cols;
  cellH = height / rows;
  background(0);
  // noLoop();
  maxD = dist(width / 2, height / 2, cellW / 2, cellH / 2);
  // frameRate(1);
  colorMode(HSB, 360, 100, 100);
}
function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW + cellW / 2;
      let y = j * cellH + cellH / 2;

      stroke(255);
      textSize(cellW / 2);
      textAlign(CENTER);
      fill(0);
      let d = dist(x, y, width / 2, height / 2);
      let a = atan((y - height / 2) / (x - width / 2));
      let sinval;
      if (time % 1050 < 150) {
        sinval = sin(a + time / 100) * 0.5 + 1;
      } else if (time % 1050 < 300) {
        sinval =
          sin(time / 100 + d / 100) * 0.5 +
          0.5 +
          sin(a * a + time / 100) * 0.5 +
          0.5;
      } else if (time % 1050 < 450) {
        sinval = sin(d / 10 + time / 10) * 0.5 + 1;
      } else if (time % 1050 < 600) {
        sinval = sin(i / 10 + time / 10) * 0.5 + 1;
      } else if (time % 1050 < 750) {
        sinval = sin(j / 10 + time / 10) * 0.5 + 1;
      } else if (time % 1050 < 900) {
        sinval = sin((i + j) / 20 + time / 10) * 0.5 + 1;
      } else if (time % 1050 < 1050) {
        sinval = sin(floor((i / 10) * 20) / 20 + time / 100) * 0.5 + 1;
      }

      let val = floor(map(sinval, 0, 2, 0, numChars));
      let colorAngle = map(sinval, 0, 2, 0, 360);

      // rect(x, y, cellW, cellH);
      fill(colorAngle, 100, 100);
      // let val = 11;
      text(chars[val], x, y + cellH / 8);
    }
  }

  time += 1;
}
