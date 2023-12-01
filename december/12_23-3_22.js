function setup() {
  createCanvas(1080, 1080);
  background(0);
  var g = new p5.Gen();

  let r1 = 300;
  let r2 = 500;
  let origin = createVector(width / 2, height / 2);

  // for (let r = r1; r <= r2; r += 10) {
  //   noFill();
  //   strokeWeight(3);
  //   stroke(255);
  //   ellipse(width / 2, height / 2, r * 2, r * 2);
  //   for (let angle = 0; angle < TAU; angle += 0.01) {
  //     let xPos = width / 2 + r * cos(angle);
  //     let yPos = height / 2 + r * sin(angle);
  //     noStroke();
  //     fill(255);
  //   }
  // }

  console.log(g.window(0.95, "gaussian"));

  let d = 300;

  noFill();

  let diameters = [];
  strokeWeight(1);
  let steps = 40;
  for (let i = 1; i <= steps; i++) {
    diameters.push(d);
    ellipse(origin.x, origin.y, d);
    let angle = map(i, 0, steps, 0, 1);

    let dStep = steps * 2.5 * g.window(angle, "gaussian");
    let nextD = d + dStep;
    d = nextD;
  }

  let startDiameter = diameters[0];
  let endDiameter = diameters[diameters.length - 1];

  for (let angle = 0; angle < TAU; angle += TAU / 100) {
    let point1 = createVector(
      origin.x + (startDiameter / 2) * cos(angle),
      origin.y + (startDiameter / 2) * sin(angle)
    );
    let point2 = createVector(
      origin.x + (endDiameter / 2) * cos(angle),
      origin.y + (endDiameter / 2) * sin(angle)
    );
    stroke(255);
    strokeWeight(4);
    line(point1.x, point1.y, point2.x, point2.y);
  }

  diameters.forEach((diameter, i) => {
    ellipse(origin.x, origin.y, diameter);

    for (let angle = 0; angle < TAU - 0.01; angle += TAU / 100) {
      let xPos = origin.x + (diameter / 2) * cos(angle);
      let yPos = origin.y + (diameter / 2) * sin(angle);
      push();

      let sizeT = map(diameter, startDiameter, endDiameter, 1, 0);
      fill(20);
      noStroke();
      let size = map(g.window(sizeT, "gaussian"), 0, 1, 4, 30);

      ellipse(xPos, yPos, size, size);
      pop();
    }
  });
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_23_22.jpeg");
  }
}
