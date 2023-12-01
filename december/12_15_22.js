const colors = ["#FF597B", "#FF8E9E", "#F9B5D0"];
let simplexNoise;
function setup() {
  createCanvas(1080, 1080);
  background(10);

  simplexNoise = new openSimplexNoise(Date.now());
  let from = color(colors[0]);
  let to = color(colors[1]);
  noStroke();
  let i = 0;
  // for (let sizeW = 200; sizeW > 10; sizeW -= random(10)) {
  //   i % 2 === 0 ? fill(colors[0]) : fill(colors[1]);
  //   let sizeH = sizeW;
  //   let xPos = 300;
  //   let yPos = 300;
  //   let t = map(sizeW, 200, 10, 0, 1);
  //   t = expProb(2, t);
  //   let a = lerpColor(from, to, t);
  //   fill(a);
  //   beginShape();
  //   for (let angle = 0; angle < TAU; angle += 0.01) {
  //     let r = map(
  //       simplexNoise.noise2D(sin(angle) / 2, cos(angle) / 2),
  //       -1,
  //       1,
  //       0,
  //       1
  //     );
  //     let x = xPos + r * sizeW * cos(angle);
  //     let y = yPos + r * sizeH * sin(angle);
  //     vertex(x, y);
  //   }
  //   endShape();
  //   i++;
  // }

  // petal(300, 300, 200);

  for (let x = 100; x <= width - 100; x += 100) {
    for (let y = 100; y <= height - 100; y += 100) {
      fill(random(colors));
      heart(x, y, random(1, 4.5));
    }
  }

  // ellipse(xPos, yPos, sizeW / 10, sizeH / 10);
}

function heart(x, y, size) {
  let rad;
  beginShape();
  for (let angle = 0; angle <= TAU; angle += 0.1) {
    rad = map(
      simplexNoise.noise4D(x, y, cos(angle) / 2, sin(angle) / 2),
      -1,
      1,
      1,
      size
    );
    let xPos = x + rad * 16 * pow(sin(angle), 3);
    let yPos =
      y -
      rad *
        (13 * cos(angle) -
          5 * cos(2 * angle) -
          2 * cos(3 * angle) -
          cos(4 * angle));

    vertex(xPos, yPos);
    // ellipse(xPos, yPos, 10, 10);
  }
  endShape();
}

function petal(xPos, yPos, size) {
  let from = color(colors[0]);
  let to = color(colors[1]);
  noStroke();
  let i = 0;
  for (let sizeW = size; sizeW > 10; sizeW -= random(10)) {
    let sizeH = sizeW;
    let t = map(sizeW, 200, 10, 0, 1);
    t = expProb(2, t);
    let a = lerpColor(from, to, t);
    console.log(to);
    i % 2 === 0 ? fill(colors[0]) : fill(colors[1]);
    beginShape();
    for (let angle = 0; angle < TAU; angle += 0.01) {
      let r = map(
        simplexNoise.noise4D(xPos, yPos, sin(angle) / 2, cos(angle) / 2),
        -1,
        1,
        0,
        1
      );
      let xOff = map(noise(cos(angle), sin(angle)), 0, 1, -1, 1) * 100;
      let yOff = map(noise(cos(angle), sin(angle)), 0, 1, -1, 1) * 500;
      let x = xPos + xOff + r * sizeW * cos(angle);
      let y = yPos + r * sizeH * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    i++;
  }
}

function expProb(a, x) {
  let num = Math.pow(a, x) - 1;
  let den = Math.pow(a, 1) - 1;
  return num / den;
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_14_22.jpeg");
  }
}
