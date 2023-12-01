let margin = 50;

function setup() {
  createCanvas(600, 1000);
  background("#FFE8B8");

  let adjL = width - 2 * margin;

  let vanishPoint = createVector(margin, 500);
  ellipse(vanishPoint.x, vanishPoint.y, 10);

  let point0 = createVector(adjL, vanishPoint.y - adjL * Math.tan(PI / 5));
  let point1 = createVector(adjL, vanishPoint.y + adjL * Math.tan(PI / 5));

  ellipse(point0.x, point0.y, 10);
  ellipse(point1.x, point1.y, 10);

  line(vanishPoint.x, vanishPoint.y, point0.x, point0.y);
  line(vanishPoint.x, vanishPoint.y, point1.x, point1.y);

  const cone = new Cone(vanishPoint, adjL, PI / 5);
  cone.calcBounds();

  let testPoint = createVector(Math.floor(random(width)), random(height));

  if (cone.checkPoint(testPoint)) {
    fill("green");
  } else {
    fill("red");
  }
  ellipse(testPoint.x, testPoint.y, 10);
}

class Cone {
  constructor(vanishPoint, width, angle) {
    this.vanishPoint = vanishPoint;
    this.width = width;
    this.angle = angle;
    this.bounds = [];
  }

  calcBounds() {
    for (let x = 0; x <= this.width - this.vanishPoint.x; x += 1) {
      let yHigh = this.vanishPoint.y - x * Math.tan(this.angle);
      let yLow = this.vanishPoint.y + x * Math.tan(this.angle);
      let xPos = x + this.vanishPoint.x;

      this.bounds.push([xPos, [yHigh, yLow]]);
      ellipse(xPos, yHigh, 10);
      ellipse(xPos, yLow, 10);
    }
  }

  checkPoint(point) {
    console.log(point.x);
  }
}
