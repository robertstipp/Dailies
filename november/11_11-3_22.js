let t = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255, 200, 200);
  // backgroundDots();
  for (let x = 50; x < width - 50; x += 20) {
    for (let y = 50; y < height - 50; y += 20) {
      push();
      let angle = map(noise(x / 100, y / 100, t), 0, 1, 0, TAU);
      translate(x, y);
      rotate(angle);

      heart(x, y, 0.5);
      pop();
    }
  }

  t += 0.01;
}

function heart(x, y, r) {
  // stroke(255);

  let red = 255;
  let green = map(y, 100, height, 0, 255);
  let blue = map(x, 100, width, 0, 255);
  fill(red, green, blue);
  beginShape();
  for (let angle = 0; angle < TAU; angle += 0.1) {
    let xOff = r * (16 * Math.pow(Math.sin(angle), 3));
    let yOff =
      r *
      (13 * Math.cos(angle) -
        5 * Math.cos(2 * angle) -
        2 * Math.cos(3 * angle) -
        Math.cos(4 * angle));

    vertex(xOff, -yOff);
  }
  endShape();
}

function backgroundDots() {
  noStroke();
  for (let x = 0; x <= width; x += 10) {
    for (let y = 0; y <= height; y += 10) {
      let dots = Math.floor(noise(x, y) * 5);
      for (let i = 0; i <= dots; i++) {
        let xOff = map(noise(x), 0, 1, -10, 10);
        let yOff = map(noise(y), 0, 1, -10, 10);
        fill(255, random(20, 300));
        ellipse(x + xOff, y + yOff, 2);
      }
    }
  }
}
