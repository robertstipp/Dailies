function setup() {
  createCanvas(1000, 1000);
  background(0);
  rectMode(CENTER);
  noFill();
  stroke(255);
  for (let x = 100; x <= 900; x += 50) {
    for (let y = 100; y <= 900; y += 50) {
      let shapeIndex = Math.floor(map(y, 100, 700, 0, 2));
      console.log(shapeIndex);
      let shapeSelect = shapes[shapeIndex];
      shapeSelect(x, y, 40, 40);
    }
  }
}

const shapes = [unbean, deuxbean, troisbean];

function unbean(x, y, w, h) {
  let len = w;
  let angle = random(0, TAU);
  stroke(255);
  strokeWeight(8);
  push();
  translate(x, y);
  rotate(angle);
  line(0 - w / 2, 0, 0 + w / 2, 0);
  pop();
}

function deuxbean(x, y, w, h) {
  let len = w;
  let angle = random(0, TAU);
  stroke(255);
  strokeWeight(8);
  push();
  translate(x, y);
  rotate(angle);
  line(0 - w / 2, 0 - h / 4, 0 + w / 2, 0 - h / 4);
  line(0 - w / 2, 0 + h / 4, 0 + w / 2, 0 + h / 4);
  pop();
}

function troisbean(x, y, w, h) {
  let len = w;
  let angle = random(0, TAU);
  stroke(255);
  strokeWeight(8);
  push();
  translate(x, y);
  rotate(angle);
  line(0 - w / 2, 0 - h / 3, 0 + w / 2, 0 - h / 3);
  line(0 - w / 2, 0, 0 + w / 2, 0);
  line(0 - w / 2, 0 + h / 3, 0 + w / 2, 0 + h / 3);
  pop();
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_9_22.jpeg");
  }
}
