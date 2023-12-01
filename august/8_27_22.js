let colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];
let angles = [
  [0, Math.PI],
  [Math.PI / 2, Math.PI],
  [Math.PI / 2, 2 * Math.PI],
  [0, 2 * Math.PI],
];

function setup() {
  createCanvas(600, 600);
  background(255);
  noStroke();

  for (let x = 0; x <= width; x += 100) {
    for (let y = 0; y <= height; y += 100) {
      let anglePair = random(angles);
      fill(random(colors));
      arc(x, y, 100, 100, anglePair[0], anglePair[1]);
      if (random(1) < 0.5) {
        fill(random(colors));
        let anglePair = random(angles);
        arc(x, y, 50, 50, anglePair[0], anglePair[1]);
      } else {
        fill(random(colors));
        let anglePair = random(angles);
        arc(x + 50, y + 50, 50, 50, anglePair[0], anglePair[1]);
      }
    }
  }
}
function draw() {}

function keyPressed() {
  if (keyCode == "83") {
    console.log("saved");
    save("aug_27_22.jpeg");
  }
}
