const colors = ["#FFA100", "#E87404", "#FF5400", "#FF5400", "#FF0100"];
let opennoise;
function setup() {
  createCanvas(1080, 1080);
  background(0);

  const shapes = [];
  opennoise = new openSimplexNoise(Date.now());
  for (let size = 50; size <= 500; size += 20) {
    // squares.push(interpolatedSquare(540, 540, size, size, 500));
    let angleOff = 0;
    shapes.push(
      interpolateShape(540, 540, Math.floor(random(2, 10)), size, 100, angleOff)
    );
  }

  shapes.forEach((seedPoints) => {
    seedPoints.forEach((point) => {
      let curX = point.x;
      let curY = point.y;
      // stroke(random(colors));
      let d = dist(540, 540, curX, curY);
      let colorIndex = Math.floor(map(d, 0, 500, 0, colors.length - 1));
      let c = color(colors[colorIndex]);
      stroke(c);
      flowLine(curX, curY);
    });
  });
}

function interpolateShape(x, y, vertices, size, resolution, angleOff = 0) {
  let corners = getPoints(x, y, vertices, PI / 2 + angleOff, size);

  let points = [];
  stroke(255);

  // handle corner edge
  for (let i = 0; i < corners.length; i++) {
    let point0;
    if (i === 0) {
      point0 = corners[corners.length - 1];
    } else {
      point0 = corners[i - 1];
    }
    let point1 = corners[i];

    for (let j = 0; j < 1; j += 1 / resolution) {
      let interX = lerp(point0.x, point1.x, j);
      let interY = lerp(point0.y, point1.y, j);
      if (random() < 0.5) {
        ellipse(point.x, point.y, 1);
        points.push(createVector(interX, interY));
      }
    }
  }

  points.forEach((point) => {
    push();
    noFill();

    pop();
  });
  return points;
}

function interpolatedSquare(x, y, w, h, resolution) {
  let midH = h / 2;
  let midW = w / 2;

  let corners = getPoints(x, y, 4, PI / 2, w);

  let point0 = createVector(x - midW, y - midH);
  let point1 = createVector(x + midW, y - midH);
  let point2 = createVector(x + midW, y + midH);
  let point3 = createVector(x - midW, y + midH);

  const points = [];

  for (let i = 0; i < 1; i += 1 / resolution) {
    let interX = lerp(point0.x, point1.x, i);
    let interY = lerp(point0.y, point1.y, i);
    points.push(createVector(interX, interY));
    // ellipse(interX, interY, 10);
  }

  for (let i = 0; i < 1; i += 1 / resolution) {
    let interX = lerp(point1.x, point2.x, i);
    let interY = lerp(point1.y, point2.y, i);
    points.push(createVector(interX, interY));
    // ellipse(interX, interY, 10);
  }

  for (let i = 0; i < 1; i += 1 / resolution) {
    let interX = lerp(point2.x, point3.x, i);
    let interY = lerp(point2.y, point3.y, i);
    points.push(createVector(interX, interY));
    // ellipse(interX, interY, 10);
  }

  for (let i = 0; i < 1; i += 1 / resolution) {
    let interX = lerp(point3.x, point0.x, i);
    let interY = lerp(point3.y, point0.y, i);
    points.push(createVector(interX, interY));
    // ellipse(interX, interY, 10);
  }

  return points;
}

function flowLine(startX, startY) {
  let curX = startX;
  let curY = startY;

  for (let i = 0; i < 100; i++) {
    let angle = map(
      opennoise.noise2D(curX / 100, curY / 100),
      -1,
      1,
      0,
      2 * TAU
    );
    let len = 10;

    let nextX = curX + cos(angle) * len;
    let nextY = curY + sin(angle) * len;

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

function getPoints(x, y, numVertices, startAngle, rad) {
  const points = [];
  let angleStep = TAU / numVertices;
  for (let angle = startAngle; angle < TAU + startAngle; angle += angleStep) {
    let xPos = x + cos(angle) * rad;
    let yPos = y + sin(angle) * rad;

    points.push(createVector(xPos, yPos));
  }

  return points;
}
