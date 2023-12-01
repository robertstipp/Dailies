let simplexNoise;
let points = [];
function setup() {
  createCanvas(600, 600);
  simplexNoise = new openSimplexNoise(Date.now());

  // Set the background color
  background(0);

  blob(createVector(width / 2, height / 2), 300);
  connect(points);
  // blobs(createVector(width / 2, height / 2), 200, 100);
}

function blob(origin, radius) {
  stroke(255);
  noFill();
  beginShape();
  for (let a = 0; a < TAU; a += 0.05) {
    let xPos1 = origin.x + radius * cos(a);
    let yPos1 = origin.y + radius * sin(a);
    let xOff = map(
      simplexNoise.noise3D(xPos1 / 100, yPos1 / 100, cos(a)),
      -1,
      1,
      -10,
      10
    );
    let yOff = map(
      simplexNoise.noise3D(xPos1 / 100, yPos1 / 100, cos(a)),
      -1,
      1,
      -10,
      10
    );

    let xPos2 = origin.x + radius * 0.5 * cos(a);
    let yPos2 = origin.y + radius * 0.2 * sin(a);
    let xOff2 = map(
      simplexNoise.noise3D(xPos2 / 1000, yPos2 / 1000, cos(a)),
      -1,
      1,
      -100,
      100
    );
    let yOff2 = map(
      simplexNoise.noise3D(xPos2 / 100, yPos2 / 100, cos(a)),
      -1,
      1,
      -100,
      100
    );
    let point1 = createVector(xPos1 + xOff, yPos1 + yOff);
    let point2 = createVector(xPos2 + xOff2, yPos2 + yOff2);

    for (let t = 0; t < 1; t += 0.1) {
      points.push(p5.Vector.lerp(point1, point2, t));
    }
    // points.push(point1, point2);
    line(point1.x, point1.y, point2.x, point2.y);
    // vertex(xPos1 + xOff, yPos1 + yOff);
  }
  endShape();
}

// function blobs(origin, outer, inner) {
//   blob(origin, outer);
//   blob(origin, inner);
// }

function connect(points) {
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      let point1 = points[i];
      let point2 = points[j];
      let d = p5.Vector.dist(point1, point2);
      if (d < 20) line(point1.x, point1.y, point2.x, point2.y);
    }
  }
}
