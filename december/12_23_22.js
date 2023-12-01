let color1 = "white";
let color2 = "grey";
let red = "#A555EC";
let e;
let diameter = 900;
function setup() {
  pixelDensity(8);
  createCanvas(1080, 1080);
  background(255);

  e = new p5.Ease();

  bgGradient();
  let shapeOrigin = createVector(width / 2, height / 2 - 50);
  shadow(shapeOrigin);
  myShape(shapeOrigin);
  patternShape(shapeOrigin, diameter);
}

function bgGradient() {
  for (let x = 0; x <= width; x += 1) {
    for (let y = 0; y <= height; y++) {
      let d = dist(x, y, width / 2, height / 2);
      let maxD = dist(0, 0, width / 2, height / 2);
      let int = map(d, 0, maxD, 0, 1);
      let c = lerpColor(color(color1), color(color2), e.smoothStep(int));
      stroke(c);
      point(x, y);
    }
  }
}

function shadow(shapeOrigin) {
  push();
  fill("grey");
  ellipse(shapeOrigin.x, shapeOrigin.y + diameter / 12, diameter * 0.97);
  filter(BLUR, 12);
  pop();
}
function myShape(shapeOrigin) {
  fill("black");
  ellipse(shapeOrigin.x, shapeOrigin.y, diameter);
}

function patternShape(shapeOrigin, diameter) {
  for (
    let x = shapeOrigin.x - diameter / 2;
    x <= shapeOrigin.x + diameter / 2;
    x += 8
  ) {
    for (
      let y = shapeOrigin.y - diameter / 2;
      y <= shapeOrigin.y + diameter / 2;
      y += 8
    ) {
      fill(red);

      noStroke();
      let d = dist(x, y, shapeOrigin.x, shapeOrigin.y);
      let maxD = diameter / 2;
      if (d > maxD) continue;
      let t = map(d, 0, maxD, 1, 0);
      let val = e.staircase(t, 14);
      let size = map(val, 0, 1, 2, 10);
      ellipse(x, y, size);
    }
  }
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_23_22.jpeg");
  }
}
