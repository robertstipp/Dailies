const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
let count = 0;
function setup() {
  createCanvas(1080, 1920);
  background(0);
  for (x = 100; x < 1000; x += 100) {
    for (y = 100; y < 1900; y += 100) {
      let cIndex = count % colors.length;

      drawStar(x, y, color(colors[cIndex]));
      drawStar(x + 50, y + 50, color(colors[(cIndex + 2) % colors.length]));
      count++;
    }
    count++;
  }
}
function draw() {}

function drawStar(x, y, c) {
  push();
  fill(color(c));
  noStroke();
  translate(x, y);
  ellipse(0, 0, 100);
  stroke("white");
  strokeWeight(12);
  point(0, 0);
  point(-100, 0);
  point(+100, 0);
  point(+100, -100);
  point(-100, -100);
  point(0, 100);
  pop();
}
