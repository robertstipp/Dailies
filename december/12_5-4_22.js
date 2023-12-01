let color1 = "#23eae6";
let color2 = "#1b7fbd";
let t = 0;

let color3 = "#a836ad";
function setup() {
  createCanvas(1080, 1080);
  background(20);

  let midX = width / 2;
  let midY = height / 2;
  let startAngle = 0;
  let stopAngle = 2.15 * TAU;
  noStroke();
  for (let angleOffset = 0; angleOffset <= TAU; angleOffset += TAU / 17) {
    for (let angle = startAngle; angle <= stopAngle; angle += 0.01) {
      let interC = map(sin(angle), -1, 1, 0, 1);
      let c = lerpColor(color(color1), color(color3), interC);
      fill(c);
      let radius = map(angle, startAngle, stopAngle, 0, 500);
      let size = map(sin(angle), -1, 1, 1, 20);
      let x = midX + radius * Math.cos(angle + angleOffset);
      let y = midY + radius * Math.sin(angle + angleOffset);
      ellipse(x, y, size);
    }
  }
}
function draw() {
  background(0);
  let midX = width / 2;
  let midY = height / 2;
  let startAngle = 0;
  let stopAngle = t * TAU;
  noStroke();
  for (let angleOffset = 0; angleOffset <= TAU; angleOffset += TAU / 17) {
    for (let angle = startAngle; angle <= stopAngle; angle += 0.1) {
      let interC = map(sin(angle), -1, 1, 0, 1);
      let c = lerpColor(color(color1), color(color3), interC);
      fill(c);
      let radius = map(angle, startAngle, stopAngle, 0, 500);
      let size = map(sin(angle), -1, 1, 1, 20);
      let x = midX + radius * Math.cos(angle + angleOffset);
      let y = midY + radius * Math.sin(angle + angleOffset);
      ellipse(x, y, size);
    }
  }
  t += 0.01;
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_5_22.jpeg");
  }
}
