const colors = ["#21409a", "#ffde17", "#be1e2d", "#0000"];

function setup() {
  createCanvas(600, 800);
  background("#F2EECB");

  for (let x = 80; x <= 500; x += 120) {
    for (let y = 100; y <= 600; y += 120) {
      strokeWeight(6);
      let c = random(colors);
      stroke(c);
      console.log(c);
      const newColors = colors.filter((color) => color !== c);
      fill(random(newColors));
      rect(x, y, 100, 100, 10, 10, 10, 10);
    }
  }
}
function draw() {}

class Grid {}
