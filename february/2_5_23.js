let aspectRatio = 1;

let colors = ["red", "yellow", "blue"];

function setup() {
  createCanvas(1080, 1080, SVG);
  noFill();
  noLoop();
}
function draw() {
  let maxR = 400;
  let origin = createVector(width / 2, height / 2);
  let rings = 20;

  for (let i = 3; i < rings; i++) {
    if (i % 2 == 0) continue;
    let innerR = map(i, 0, rings - 1, 0, maxR);
    let outerR = map(i + 1, 0, rings - 1, 0, maxR);
    let angleInt = TAU / 6;
    let startAngleOffset = angleInt / Math.floor(random(10));
    if (i % 3 == 0) startAngleOffset = 0;
    const startAngles = Array.from(
      { length: 6 },
      (_, i) => i * angleInt + startAngleOffset
    );

    for (let startAngle of startAngles) {
      let endAngle = startAngle + angleInt;
      let points = [];
      let gap = 0.1;
      for (let a = startAngle + gap; a <= endAngle; a += 0.001) {
        let pos = origin.copy().add(p5.Vector.fromAngle(a).mult(innerR));
        points.push(pos);
      }
      for (let a = endAngle; a >= startAngle + gap; a -= 0.001) {
        let pos = origin.copy().add(p5.Vector.fromAngle(a).mult(outerR));
        points.push(pos);
      }
      fill(random(colors));
      beginShape();
      for (let p of points) {
        vertex(p.x, p.y);
      }
      endShape(CLOSE);
    }
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}
