// const Delaunay = require("../addons/p5.delaunay");

function setup() {
  createCanvas(400, 400);
  background(0);

  let origin = createVector(width / 2, height / 2);
  let vertices = [];
  for (let d = 0; d <= 400; d += 100) {
    noFill();
    stroke(255);
    for (let a = 0; a < TAU; a += TAU / 20) {
      let xPos = origin.x + (cos(a) * d) / 2;
      let yPos = origin.y + (sin(a) * d) / 2;

      if (random() < 0.5 || d === 400) vertices.push([xPos, yPos]);
    }
  }
  triangulate(vertices);

  stroke(255);
}

function triangulate(vertices) {
  vertices.forEach((vertex) => point(vertex[0], vertex[1]));
  var triangles = Delaunay.triangulate(vertices);

  noFill();
  for (let i = 0; i < triangles.length; i += 3) {
    let point0 = vertices[triangles[i]];
    let point1 = vertices[triangles[i + 1]];
    let point2 = vertices[triangles[i + 2]];

    stroke(255);

    beginShape();
    vertex(point0[0], point0[1]);
    vertex(point1[0], point1[1]);
    vertex(point2[0], point2[1]);
    endShape();
  }
}
