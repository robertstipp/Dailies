const cells = [];
let e, g;
function setup() {
  createCanvas(1080, 1920);
  background(0);

  //Settings for drawing(these are the default values)

  //Set Cell Stroke Weight
  voronoiCellStrokeWeight(1);
  //Set Site Stroke Weight
  voronoiSiteStrokeWeight(3);
  //Set Cell Stroke
  voronoiCellStroke(0);
  //Set Site Stroke
  voronoiSiteStroke(0);
  //Set flag to draw Site
  voronoiSiteFlag(true);

  g = new p5.Gen();

  let origin = createVector(width / 2, height / 2);
  for (let distance = 100; distance < 500; distance += 50) {
    vornoiCircle(origin, distance);
  }

  console.log(g);
  function vornoiCircle(origin, distance) {
    for (let i = 0; i < 1000; i++) {
      let r = g.random(Math.random(), "high") * distance;
      let angle = random(TAU);

      let pos = origin.copy().add(p5.Vector.fromAngle(angle).mult(r));

      voronoiSite(pos.x, pos.y);
    }

    voronoi(1080, 1920, true);

    var normal = voronoiGetCells();
    // normal.forEach((cell) => {
    //   cells.push(new Cell(cell));
    // });

    for (let i = 0; i < normal.length; i++) {
      let point = normal[i];
      let valid = validatePoints(point, origin, distance);
      if (valid) {
        cells.push(new Cell(point));
      }
    }
    cells.forEach((cell) => cell.draw());
  }
}
function draw() {}

class Cell {
  constructor(vertices) {
    this.vertices = vertices.map((vertex) => {
      return createVector(vertex[0], vertex[1]);
    });
    this.center = this.getCenter();
    this.d = this.getDistance();
  }

  getDistance() {
    return p5.Vector.dist(this.center, createVector(width / 2, height / 2));
  }
  getCenter() {
    let centerX = 0;
    let centerY = 0;
    this.vertices.forEach((vert) => {
      centerX += vert.x;
      centerY += vert.y;
    });
    centerX /= this.vertices.length;
    centerY /= this.vertices.length;
    return createVector(centerX, centerY);
  }

  step(steps) {
    for (let i = 0; i < 1; i += 1 / steps) {
      let points = [];
      for (let j = 0; j < this.vertices.length; j++) {
        let corner = this.vertices[j];
        let pos = p5.Vector.lerp(corner, this.center, i);
        points.push(pos);
      }
      // fill(map(i, 0, 1, 0, 255));
      let c = color("#fff");
      c.setAlpha(10);
      stroke(c);
      noFill();

      for (let k = 0; k < points.length; k++) {
        let corner0 = points[k];
        let corner1 = points[(k + 1) % points.length];
        if (k % 2 === 0) strokeWeight(2);
        else strokeWeight(1);
        line(corner0.x, corner0.y, corner1.x, corner1.y);
      }
    }
  }

  draw() {
    // noFill();
    // beginShape();
    // this.vertices.forEach((vert) => {
    //   vertex(vert.x, vert.y);
    // });
    // endShape(CLOSE);

    // ellipse(this.center.x, this.center.y, 10);
    this.step(5);
  }
}

function pointInPoly(verts, pt) {
  let c = false;
  for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
    if (
      verts[i].y > pt.y != verts[j].y > pt.y &&
      pt.x <
        ((verts[j].x - verts[i].x) * (pt.y - verts[i].y)) /
          (verts[j].y - verts[i].y) +
          verts[i].x
    )
      c = !c;
  }
  return c;
}

function validatePoints(points, origin, distance) {
  let valid = true;
  points.forEach((point) => {
    let pos = createVector(point[0], point[1]);

    if (p5.Vector.dist(origin, pos) > distance) {
      valid = false;
    }
  });
  return valid;
}
