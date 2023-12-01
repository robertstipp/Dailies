const clr = "#FF6464";

const colors = ["#B3FFAE", "#F8FFDB", "#FF6464", "#FF7D7D"];

function setup() {
  noStroke();
  createCanvas(1080, 1080);

  background(0);

  for (let x = 100; x <= 1000; x += 25) {
    for (let y = 100; y <= 900; y += 50) {
      fill(random(colors));
      push();
      translate(x, y);
      let d = dist(540, 540, x, y);
      let xOff = map(noise(d / 10), 0, 1, -30, 30);
      let angle = map(noise(x / 1000, y / 1000), 0, 1, 0, PI / 2);
      rotate(angle);
      rect(0 + xOff, 0, 20, 40);
      pop();
    }
  }
}
