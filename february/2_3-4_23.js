let aspectRatio = 1;
let rows = 11;
let cols = Math.floor(rows * aspectRatio);

let colors = ["red", "yellow", "blue"];

function setup() {
  createCanvas(1080, 1080, SVG);
  noLoop();
}
function draw() {
  let origin = createVector(width / 2, height / 2);
  let startR = 100;
  let endR = width * 0.5;
  ellipse(origin.x, origin.y, startR * 2);
  let steps = 100;
  let angleStep = TAU / steps;
  let numStarts = 2;
  let startAngles = Array(numStarts)
    .fill(0)
    .map((el, index) => TAU / (index * numStarts));
  startAngles.forEach((sAngle, index) => {
    stroke(colors[index % 3]);
    let start = sAngle;
    for (let i = 0; i < steps; i++) {
      let angle = start + i * angleStep;
      let startR = 100;
      // let effEndR = endR;
      let steps = 20;
      let val = i % steps;
      effEndR = map(val, 0, steps - 1, endR * 0.25, endR * 1);
      let pos1 = origin.copy().add(p5.Vector.fromAngle(angle, startR));
      let pos2 = origin.copy().add(p5.Vector.fromAngle(angle, effEndR));
      line(pos1.x, pos1.y, pos2.x, pos2.y);
    }
  });
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}
