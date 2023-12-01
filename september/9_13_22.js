const colors1 = ["#B1B2FF", "#AAC4FF", "#D2DAFF", "#EEF1FF"];
const colors2 = ["#FFEBAD", "#FFF6BF", "#ABD9FF", "#C3F8FF"];
let t = 0;
function setup() {
  createCanvas(600, 600);
  background(255);
  // noFill();
  noStroke();
  // for (let y = 0; y <= height; y += 10) {
  //   for (let x = 0; x <= width; x += 10) {
  //     if (noise(x, y) < 0.5) {
  //       blendMode(HARD_LIGHT);
  //     } else {
  //       blendMode(BLEND);
  //     }

  //     if (noise(x / 100, y / 100) < 0.5) {
  //       let vec = p5.Vector.fromAngle(
  //         map(noise(x / 100, y / 100), 0, 1, 0, TAU)
  //       );
  //       vec.setMag(40);
  //       let colorIndex = Math.floor(noise(x, y) * colors2.length);
  //       console.log(colorIndex);
  //       fill(colors2[colorIndex]);
  //       rect(x, y, vec.x, vec.y);
  //     } else {
  //       let vec = p5.Vector.fromAngle(
  //         map(noise(x / 100, y / 100), 0, 1, 0, TAU)
  //       );
  //       vec.setMag(40);

  //       let colorIndex = Math.floor(noise(x, y) * colors1.length);
  //       let c = color(colors1[colorIndex]);
  //       fill(c);
  //       rect(x, y, vec.x, vec.y);
  //     }
  //   }
  // }
}
function draw() {
  for (let y = 0; y <= height; y += 10) {
    for (let x = 0; x <= width; x += 10) {
      if (noise(x, y, t) < 0.5) {
        blendMode(SOFT_LIGHT);
      } else {
        blendMode(BLEND);
      }

      if (noise(x / 100, y / 100) < 0.5) {
        let vec = p5.Vector.fromAngle(
          map(noise(x / 100, y / 100), 0, 1, 0, TAU)
        );
        vec.setMag(40);
        let colorIndex = Math.floor(noise(x, y) * colors2.length);
        console.log(colorIndex);
        fill(colors2[colorIndex]);
        rect(x, y, vec.x, vec.y);
      } else {
        let vec = p5.Vector.fromAngle(
          map(noise(x / 100, y / 100), 0, 1, 0, TAU)
        );
        vec.setMag(40);

        let colorIndex = Math.floor(noise(x, y) * colors1.length);
        let c = color(colors1[colorIndex]);
        fill(c);
        rect(x, y, vec.x, vec.y);
      }
    }
  }
  t += 0.1;
}
