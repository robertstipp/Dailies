const yellow = "#fac901";
const white = "#FAF9F6";
const blue = "#225095";
const red = "#dd0100";

const colors = [yellow, white, blue, red];

function setup() {
  createCanvas(1080, 1080);
  background(220);

  let midW = width / 2;
  let midH = height / 2;
  noFill();
  let step = 20;
  for (let x = 0; x < midW; x += step) {
    strokeWeight(map(step, 20, 40, 1, 10));
    stroke(random(colors));
    step = random(20, 40);
    beginShape();
    vertex(x, 0);
    vertex(x, height - x);
    vertex(width, height - x);
    endShape();
  }

  for (let x = midW + step; x <= width; x += step) {
    stroke(random(colors));
    step = random(20, 40);
    strokeWeight(map(step, 20, 40, 1, 10));
    beginShape();
    vertex(x, height);
    vertex(x, height - x);
    vertex(0, height - x);
    endShape();
  }
}
function draw() {}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_27_22.jpeg");
  }
}
