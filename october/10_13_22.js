function setup() {
  createCanvas(600, 600);
  background(255);
  let b = 0;
  for (let x = 100; x <= width - 100; x += 100) {
    for (let y = 100; y <= height - 100; y += 100) {
      noStroke();
      let r = random(255);
      let g = 200;
      b += 10;
      fill(r, g, b);
      ellipse(x, y, 80);
    }
  }
}
function draw() {}
