let points = [];
let simplexNoise;
function setup() {
  createCanvas(1080, 1920);
  background(0);

  simplexNoise = new openSimplexNoise(Date.now());
  let origin = createVector(width / 2, height / 2);
  let rad = 400;
  for (let a = 0; a <= TAU; a += 0.001) {
    let point = createVector(
      origin.x + Math.cos(a) * rad,
      origin.y + Math.sin(a) * rad
    );
    points.push(point);
    // ellipse(point.x, point.y, 10);
  }

  points.push(origin);

  let rightArm = createVector(
    origin.x + rad * Math.cos(PI / 4),
    origin.y + rad * Math.sin(PI / 4)
  );

  let leftArm = createVector(
    origin.x + rad * Math.cos(PI / 4 + PI / 2),
    origin.y + rad * Math.sin(PI / 4 + PI / 2)
  );

  let steps = 800;
  for (let i = 0; i < 1; i += 1 / steps) {
    let point1 = p5.Vector.lerp(origin, rightArm, i);
    let point2 = p5.Vector.lerp(origin, leftArm, i);
    points.push(point1);
    points.push(point2);
  }
  let bottomArm = createVector(
    origin.x + rad * Math.cos(PI / 2),
    origin.y + rad * Math.sin(PI / 2)
  );
  let topArm = createVector(
    origin.x + rad * Math.cos(PI + PI / 2),
    origin.y + rad * Math.sin(PI + PI / 2)
  );

  for (let i = 0; i < 1; i += 1 / steps) {
    let point1 = p5.Vector.lerp(origin, rightArm, i);
    let point2 = p5.Vector.lerp(origin, leftArm, i);
    let point3 = p5.Vector.lerp(origin, bottomArm, i);
    let point4 = p5.Vector.lerp(origin, topArm, i);
    points.push(point1);
    points.push(point2);
    points.push(point3);
    points.push(point4);

    // ellipse(point1.x, point1.y, 10);
    // ellipse(point2.x, point2.y, 10);
    // ellipse(point3.x, point3.y, 10);
    // ellipse(point4.x, point4.y, 10);
  }
  stroke(255);
  strokeWeight(3);
  noFill();
  points.forEach((p) => {
    // ellipse(p.x, p.y, 5);
    flowLine(p.x, p.y, random(10, 1000), 0.05);
  });
  // flowLine(300, 300, 1000, 0.01);
}

function flowLine(curX, curY, steps, resolution) {
  let x = curX;
  let y = curY;

  beginShape();
  for (let i = 0; i < steps; i++) {
    let angle = map(
      simplexNoise.noise2D(x * resolution, y * resolution),
      -1,
      1,
      -PI,
      PI
    );
    let v = p5.Vector.fromAngle(angle);
    v.setMag(1);
    x += v.x;
    y += v.y;
    vertex(x, y);
    // ellipse(x, y, 1);
  }
  endShape();
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_21_22.jpeg");
  }
}
