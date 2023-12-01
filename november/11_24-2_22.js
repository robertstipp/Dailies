const yellow = "#F5991D";
const orange = "#F54F11";
const red = "#F50515";

function setup() {
  createCanvas(600, 600);
  background("#F5D65A");
  stroke("white");

  noFill();
  rect(0, 0, width, height);
  for (let y = 0; y <= height; y += 120) {
    for (let x = 0; x <= width; x += 72) {
      wave(x, y, 6);
    }
  }
  stroke("black");
  strokeWeight(50);
  noFill();
  // rect(0, 0, width, height);
}
function draw() {}

function wave(x, y, r) {
  strokeWeight(10);

  let r1 = r;
  let r1Big = r * 5;
  let vLen = 50;
  // outer
  stroke(yellow);
  line(x - r1, y, x - r1, y - vLen);
  arc(x, y, 2 * r1, 2 * r1, 0, PI);
  line(x + r1, y, x + r1, y - vLen);
  arc(x + r1Big + r, y - vLen, 2 * r1Big, 2 * r1Big, PI, 0);

  // //middle
  stroke(orange);
  let r2 = r1 * 3;
  let r2Big = (r2 * 3) / 3;
  line(x - r2, y, x - r2, y - vLen);
  arc(x, y, 2 * r2, 2 * r2, 0, PI);
  line(x + r2, y, x + r2, y - vLen);
  arc(x + r2Big + r2, y - vLen, 2 * r2Big, 2 * r2Big, PI, 0);

  // //inner
  stroke(red);
  let r3 = r1 * 5;
  let r3Big = (r2 * 1) / 3;
  line(x - r3, y, x - r3, y - vLen);
  arc(x, y, 2 * r3, 2 * r3, 0, PI);
  line(x + r3, y, x + r3, y - vLen);
  arc(x + r3Big + r3, y - vLen, 2 * r3Big, 2 * r3Big, PI, 0);
}

function waves() {}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_23_22.jpeg");
  }
}
