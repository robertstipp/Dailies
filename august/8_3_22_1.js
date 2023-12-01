const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];

const sws = [7, 2];
// const colors = [
//   "#f72585",
//   "#b5179e",
//   "#7209b7",
//   "#560bad",
//   "#480ca8",
//   "#3a0ca3",
//   "#3f37c9",
//   "#4361ee",
//   "#4895ef",
//   " #4cc9f0",
// ];
let count = 0;
function setup() {
  createCanvas(1080, 1920);
  background(0);
  for (x = 100; x < 1000; x += 75) {
    for (y = 100; y < 1900; y += 100) {
      let cIndex = count % colors.length;
      console.log(cIndex);
      drawStar(x, y, cIndex, "L");
      drawStar(x + 50, y + 50, cIndex, "R");
    }
    count++;
  }
}
function draw() {}

function drawStar(x, y, c, d) {
  push();

  fill(color(colors[c]));
  noFill();
  noStroke();
  translate(x, y);
  ellipse(0, 0, 100, 90);

  if (d == "L") {
    if (y !== 100) {
      stroke(color(colors[(c + 1) % colors.length]));
      strokeWeight(5);
      point(0, 0);
      point(0, 0);

      line(0, 0, 50, -50);
    }
  }
  if (d == "R") {
    stroke(color(colors[(c + 1) % colors.length]));
    strokeWeight(5);
    point(0, 0);
    point(0, 0);
    line(0, 0, -50, -50);
  }

  beginShape();
  stroke(color(colors[(c + 1) % colors.length]));
  strokeWeight(random(sws));
  vertex(0, -25);
  vertex(-25, 0);
  vertex(0, 25);
  vertex(25, 0);
  endShape(CLOSE);

  pop();
  pop();
}

function keyPressed() {
  // 83 is key code for key "s"s
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save("aug_3_22.jpeg");
  }
}
