let margin = 100;

const yellow = "#fac901";
const white = "#FAF9F6";
const blue = "#225095";
const red = "#dd0100";

const colors = [yellow, white, blue, red];

function setup() {
  createCanvas(600, 600);
  background(255);
  colorMode(HSB);
  for (let y = 50; y <= 500; y += 100) {
    for (let x = 50; x <= 500; x += 100) {
      let angle = random(360);

      noStroke();
      let startR = 60;
      fill(random(colors));
      ellipse(x, y, startR * 1.3);
      fill(random(colors));
      ellipse(x, y, startR * 1.2);
      fill(random(colors));
      ellipse(x, y, startR * 1.1);
      fill("black");
      ellipse(x, y, startR);
    }
  }
}
