const colors = ["#FFF", "#FFF", "#F8F988", "#B01E68"];

let points = [];
let opennoise;
function setup() {
  pixelDensity(8);
  createCanvas(1080, 1080);
  background(0);

  noFill();
  opennoise = new openSimplexNoise(Date.now());

  let seedPoints = [];
  let finalPoints = [];
  for (let x = 0; x <= width; x += 2) {
    seedPoints.push(createVector(x, 540));
  }
  let steps = 500;
  for (let i = 0; i < steps; i++) {
    let c = color(colors[0]);
    c.setAlpha(100);
    stroke(c);
    beginShape();
    let line = [];
    for (let p of seedPoints) {
      let x = p.x;
      let horizD = Math.abs(x - 540);
      let dispMax = map(horizD, 0, 540, 50, 500);

      let y =
        p.y +
        map(opennoise.noise2D(x / 100, i / 100), -1, 1, -dispMax, dispMax);
      // vertex(x, y);
      line.push(createVector(x, y));
    }
    endShape();
    finalPoints.push(line);
  }

  finalPoints.reverse();
  finalPoints.forEach((line, i) => {
    let fromColor = colors[3];
    let toColor = colors[1];
    let c = lerpColor(color(fromColor), color(toColor), i / finalPoints.length);
    let a = map(i, 0, finalPoints.length, 50, 120);
    c.setAlpha(a);
    stroke(c);
    beginShape();
    for (let point of line) {
      let x = point.x;
      let y = point.y;
      vertex(x, y);
    }
    endShape();
  });
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_11_22.jpeg");
  }
}
