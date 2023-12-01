const points = [];

const colors = ["#FF597B", "#FF8E9E", "#F9B5D0"];
function setup() {
  pixelDensity(4);
  createCanvas(1080, 1080);
  background(0);

  let midX = width / 2;
  let midY = height / 2;

  let origin = createVector(midX, midY);
  let radius = 100;
  let theta = PI + PI / 2;
  let thetaOffset = PI / 3;

  let offsetAngles = [theta - thetaOffset, theta + thetaOffset];
  fill(255);

  drawBandedCircle(midX, midY, 500, 10, 3);

  let bandPoints = points;
  bandPoints.reverse();
  for (let i = 0; i < bandPoints.length - 2; i++) {
    let firstBand = bandPoints[i];
    let secondsBand = bandPoints[i + 1].slice();
    secondsBand.reverse();
    stroke(0);
    strokeWeight(0.1);
    let c;

    if (i % 2 == 0) {
      c = "black";
    } else {
      c = "white";
    }
    fill(c);
    beginShape();
    firstBand.forEach((point) => {
      curveVertex(point.x, point.y);
    });
    secondsBand.forEach((point) => {
      curveVertex(point.x, point.y);
    });
    endShape(CLOSE);
  }
}

function drawBandedCircle(x, y, radius, steps, cycles) {
  let offsetAngleStep = PI / steps;

  let theta = PI + PI / 2;

  for (let i = 0; i < steps; i++) {
    let thetaOffset = offsetAngleStep * i;
    let offsetAngles = [theta - thetaOffset, theta + thetaOffset];

    // get edges
    let point0 = createVector(
      x + radius * cos(offsetAngles[0]),
      y + radius * sin(offsetAngles[0])
    );
    let point1 = createVector(
      x + radius * cos(offsetAngles[1]),
      y + radius * sin(offsetAngles[1])
    );

    // draw edges
    let xDist = point1.x - point0.x;

    let band = [];
    beginShape();
    for (let t = 0; t <= 1; t += 0.001) {
      let pointX = lerp(point0.x, point1.x, t);
      let pointY = lerp(point0.y, point1.y, t);
      let angle = map(t, 0, 1, 0, cycles * TAU);
      let offSetMag = xDist / 20;

      // let yOffset = map(
      //   noise(pointX, pointY),
      //   0,
      //   1,
      //   -offSetMag * sin(angle),
      //   offSetMag * sin(angle)
      // );

      let yOffset = sin(angle) * offSetMag;
      // vertex(pointX, pointY + yOffset);
      // ellipse(pointX, pointY + yOffset, 5, 5);
      band.push(createVector(pointX, pointY + yOffset));
    }
    endShape();
    points.push(band);
    // line(point0.x, point0.y, point1.x, point1.y);
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_14_22.jpeg");
  }
}
