function setup() {
  createCanvas(600, 600);
  background(20);
  noFill();
  strokeWeight(3);
  stroke(255);

  let max = 100;
  for (let yInit = 100; yInit < height - 100; yInit += 20) {
    beginShape();
    for (let x = 100; x <= width - 100; x += 1) {
      let y = yInit + map(noise(x / 100, yInit / 1000), 0, 1, -max, max);
      vertex(x, y);
      if (random() < 0.1 && x > random(300, 500)) {
        for ()
        break;
      }
    }
    endShape();
  }
}
function draw() {}
