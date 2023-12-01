const color1 = "#f16896";
const color2 = "#a836ad";
function setup() {
  createCanvas(1080, 1080);
  background(20);

  let midX = width / 2;
  let midY = height / 2;
  let startAngle = 0;
  let stopAngle = 4 * TAU;
  noStroke();

  for (let radius = 10; radius < 1000; radius += random(20, 40)) {
    noFill();
    stroke(255, 50);
    ellipse(midX, midY, radius);
  }
  noStroke();
  for (let offset = 0; offset <= TAU; offset += 0.3) {
    for (let angle = startAngle; angle <= stopAngle; angle += PI / 100) {
      let interColor = map(angle, startAngle, stopAngle, 0, 1);

      let c = lerpColor(color(color1), color(color2), interColor);
      fill(c);
      let size = map(sin(angle), -1, 1, 3, 20);
      let cornerRadius = map(sin(angle + PI), -1, 1, 0, 20);
      let radius = map(angle, startAngle, stopAngle, 0, 500);
      let x = midX + radius * Math.cos(angle + offset);
      let y = midY + radius * Math.sin(angle + offset);

      if (random() < map(radius, 0, 500, 1, 0.25)) {
        if (random() < 0.5) {
          cross(x, y, size);
        } else {
          rectMode(CENTER);
          rect(x, y, size, size, cornerRadius);
        }
      }
    }
  }
}

function cross(x, y, size) {
  push();
  rectMode(CENTER);
  rect(x, y, size, size / 3);
  rect(x, y, size / 3, size);
  pop();
}

function draw() {}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_5_22.jpeg");
  }
}
