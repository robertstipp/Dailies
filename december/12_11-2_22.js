const colors = ["#9A1663", "#E0144C", "#0000"];
const blues = ["#00FFF6", "#00E7FF", "#009EFF", "#0014FF"];
const circles = [];

function setup() {
  pixelDensity(8);
  createCanvas(1080, 1080);
  background("white");

  let curX = 300;
  let curY = 300;

  noFill();
  // stroke(255);
  // ellipse(540, 540, 300, 300);
  // ellipse(810, 810, 300, 300);
  // ellipse(270, 810, 300, 300);

  // circles.push(new Circle(540, 810, 200));

  let radius = 30;

  const heartPointsArr = [];

  let x1 = width / 3;
  let x2 = (width * 2) / 3;

  heartPointsArr.push(heartPoints(540, 450, radius));
  // break;

  // break;

  heartPointsArr.forEach((heartPoints) => {
    strokeCap(ROUND);
    let flowLength = random([200, 700, 2000]);

    heartPoints.forEach((point) => {
      stroke(random(colors));
      flowLine(point.x, point.y, flowLength, 10);
    });
  });

  // const heartPointsArr = heartPoints(300, 300, 10);
  // stroke(255);
  // heartPointsArr.forEach((point) => {
  //   flowLine(point.x, point.y, 100, 10);
  // });
}

function heartPoints(x, y, size) {
  let points = [];

  for (let a = 0; a < TAU; a += 0.001) {
    let xPos = x + size * 16 * pow(sin(a), 3);
    let yPos =
      y +
      -(
        size * 13 * cos(a) -
        size * 5 * cos(2 * a) -
        size * 2 * cos(3 * a) -
        size * cos(4 * a)
      );

    points.push(createVector(xPos, yPos));
    // ellipse(xPos, yPos, 10, 10);
  }

  return points;
}

function flowLine(x, y, maxSteps, noiseResolution) {
  let curX = x;
  let curY = y;
  let steps = random(0.25 * maxSteps, maxSteps);

  for (let i = 0; i < steps; i++) {
    let resolution;
    let angle;
    angle = map(
      noise(curX / noiseResolution, curY / noiseResolution),
      0,
      1,
      0,
      PI
    );
    let len = 0.5;

    // circles.forEach((circle) => {
    //   let d = dist(curX, curY, circle.x, circle.y);
    //   if (d <= circle.radius) {
    //     let tangentAngle;
    //     if (curX - circle.x) {
    //       tangentAngle == atan2(circle.y - curY, circle.x - curX) - 90;
    //     } else {
    //       tangentAngle = atan2(circle.y - curY, circle.x - curX) + 90;
    //     }

    //     angle = tangentAngle;
    //     len = 1;
    //   }
    // });

    let nextX = curX + cos(angle) * len;
    let nextY = curY + sin(angle) * len;
    strokeWeight(map(i, 0, steps, 3, 0.1));

    line(curX, curY, nextX, nextY);

    curX = nextX;
    curY = nextY;
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_11_22.jpeg");
  }
}

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}
