function setup() {
  createCanvas(600, 600);
  background(0);
  bentSquare(createVector(width / 2, height / 2), 200);
}

function bentSquare(origin, size) {
  let halfW = size / 2;

  let bottomLeft = createVector(origin.x - halfW, origin.y + halfW);
  let bottomRight = createVector(origin.x + halfW, origin.y + halfW);
  let topRight = createVector(origin.x + halfW, origin.y - halfW);
  let topLeft = createVector(origin.x - halfW, origin.y - halfW);

  ellipse(bottomLeft.x, bottomLeft.y, 10, 10);
  ellipse(bottomRight.x, bottomRight.y, 10, 10);
  ellipse(topRight.x, topRight.y, 10, 10);
  ellipse(topLeft.x, topLeft.y, 10, 10);

  let offSetAngle = PI / 4;

  let upperAngleOffset = PI / 4;
  let horizAngleOffset = PI / 4;

  let len = size / 4;
  let topCp1 = topLeft
    .copy()
    .add(
      createVector(len * cos(upperAngleOffset), len * sin(upperAngleOffset))
    );

  let topCp2 = topRight
    .copy()
    .add(
      createVector(-len * cos(upperAngleOffset), len * sin(upperAngleOffset))
    );
  noFill();
  stroke(255);
  bezier(
    topLeft.x,
    topLeft.y,
    topCp1.x,
    topCp1.y,
    topCp2.x,
    topCp2.y,
    topRight.x,
    topRight.y
  );
  ellipse(topCp1.x, topCp1.y, 10, 10);
  ellipse(topCp2.x, topCp2.y, 10, 10);

  let lowerAngleOffset = PI / 4;
  let bottomCp1 = bottomLeft
    .copy()
    .add(
      createVector(len * cos(lowerAngleOffset), len * sin(lowerAngleOffset))
    );
  ellipse(bottomCp1.x, bottomCp1.y, 10, 10);

  let bottomCp2 = bottomRight
    .copy()
    .add(
      createVector(-len * cos(lowerAngleOffset), len * sin(lowerAngleOffset))
    );
  ellipse(bottomCp2.x, bottomCp2.y, 10, 10);
  bezier(
    bottomLeft.x,
    bottomLeft.y,
    bottomCp1.x,
    bottomCp1.y,
    bottomCp2.x,
    bottomCp2.y,
    bottomRight.x,
    bottomRight.y
  );
}
