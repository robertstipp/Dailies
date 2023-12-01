let openNoise;

function setup() {
  createCanvas(600, 600);
  background(0);

  openNoise = new openSimplexNoise(Date.now());

  let point0 = createVector(200, 200);
  let point1 = createVector(400, 200);
  let point2 = createVector(400, 400);
  let point3 = createVector(200, 400);

  let points = [point0, point1, point2, point3];
  points.forEach((point) => {
    stroke(255);
    strokeWeight(10);
    fill(255);
    ellipse(point.x, point.y, 10);
  });

  // for (let i = 0; i < 1; i += 0.01) {
  //   let xPos = lerp(point0.x, point1.x, i);
  //   let yPos = lerp(point0.y, point1.y, i);
  //   stroke(255);
  //   strokeWeight(10);
  //   fill(255);

  //   let angle = map(xPos, point0.x, point1.x, 0, PI);
  //   let yOff = map(
  //     openNoise.noise4D(xPos / 10, yPos / 10, cos(angle), sin(angle)),
  //     0,
  //     1,
  //     sin(angle) * -10,
  //     sin(angle) * 10
  //   );
  //   ellipse(xPos, yPos + yOff, 1);
  // }

  simplexEdge(point1, point2, 10);
}

function simplexEdge(pointA, pointB, steps) {
  noFill();
  beginShape();
  for (let i = 0; i < 1; i += 1 / steps) {
    let xPos = lerp(pointA.x, pointB.x, i);
    let yPos = lerp(pointA.y, pointB.y, i);

    strokeWeight(1);

    if (xPos === pointA.x & xPos ==== pointB.x=)
    {
      angleX = 0
    }  else  {

    } else {
      angleX = constrain(map(xPos, pointA.x, pointB.x, 0, PI), 0, PI);
    } 
    let angleY = map(yPos, pointA.y, pointA.y, 0, PI);

    let xOff = map(
      openNoise.noise4D(xPos / 10, yPos / 10, cos(angleX), sin(angleY)),
      -1,
      1,
      sin(angleY) * -10,
      sin(angleY) * 10
    );

    let yOff = map(
      openNoise.noise4D(xPos / 100, yPos / 100, cos(angleY), sin(angleX)),
      -1,
      1,
      sin(angleX) * -10,
      sin(angleX) * 10
    );
    vertex(xPos + xOff, yPos + yOff);
  }
  endShape();
}
