let innerRadius;
let outerRadius;
let t = 0;
function setup() {
  createCanvas(1080, 1080, SVG);
  noFill();
  noLoop();
  stroke(0);
}

function draw() {
  let outterSteps = 20;
  let outerRadius = 500;
  let innerRadius = 400;
  let outterStep = TWO_PI / outterSteps;
  for (let a = 0; a <= TWO_PI; a += outterStep) {
    let x = width / 2 + outerRadius * cos(a);
    let y = height / 2 + outerRadius * sin(a);
    let innerSteps = abs(sin(t) + cos(t)) * 10;
    let innerStep = TWO_PI / innerSteps;
    let halfInnerSteps = innerSteps / 2;
    for (let i = -halfInnerSteps; i < halfInnerSteps; i++) {
      let xPos = width / 2 + innerRadius * cos(a + i * innerStep);
      let yPos = height / 2 + innerRadius * sin(a + i * innerStep);
      line(x, y, xPos, yPos);
    }

    // ellipse(x, y, 10);
  }
}

function keyPressed() {
  if (key == "s") {
    save("2021-01-23.svg");
  }
}
