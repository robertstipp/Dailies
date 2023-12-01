function setup() {
  createCanvas(600, 600);

  background(0);
  // textureBackground(width, height);
  let origin = createVector(width / 2, height / 2);

  patternCircle(origin);
}

function patternCircle(origin) {
  let a = 300;
  let b = a * 0.9;
  let c = a * 0.5;
  let d = a * 0.4;

  stroke(255);
  let count = 0;
  for (let angle = 0; angle <= TAU; angle += 0.05) {
    let aPoint = p5.Vector.fromAngle(angle, a).add(origin);
    let bPoint = p5.Vector.fromAngle(angle, b).add(origin);
    let cPoint = p5.Vector.fromAngle(angle, c).add(origin);
    let dPoint = p5.Vector.fromAngle(angle, d).add(origin);
    // ellipse(aPoint.x, aPoint.y, 10, 10);
    // ellipse(bPoint.x, bPoint.y, 10, 10);

    let start, end;
    if (count % 2 === 0) {
      let start = createVector(aPoint.x, aPoint.y);
      let end = createVector(dPoint.x, dPoint.y);
    } else {
    }
    count++;
  }
}

function textureBackground(width, height) {
  for (let y = 0; y <= height; y++) {
    for (let x = 0; x <= width; x++) {
      let angle = random(-PI / 6, PI / 12);

      let len = map(noise(x / 100, y / 100), 0, 1, 0, 1.1);
      let point0 = createVector(x, y);
      let point1 = createVector(
        point0.x + len * cos(angle),
        point0.y + len * sin(angle)
      );
      stroke("#3A3B3C");
      line(point0.x, point0.y, point1.x, point1.y);
    }
  }
}
