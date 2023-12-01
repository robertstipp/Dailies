function setup() {
  createCanvas(600, 1200);
  background(0);
  stroke(0);
  let step = 50;
  for (let x = 20; x <= 580; x += 15) {
    for (let y = 100; y <= 1100; y += 40) {
      let yDist = constrain(Math.abs(y - 600), 0, 500);
      let sW = map(yDist, 0, 500, 17, 2);
      strokeWeight(sW);
      unbean(x, y, 50, 100);
    }
  }
}
function unbean(x, y, w, h) {
  let len = w;
  let angle = random(PI / 6, (PI * 2) / 6);
  stroke(255, 255, 255, 200);

  push();
  translate(x, y);
  rotate(angle);
  line(0 - w / 2, 0, 0 + w / 2, 0);
  pop();
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_9_22.jpeg");
  }
}
