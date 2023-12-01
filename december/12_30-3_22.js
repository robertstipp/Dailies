let g, e;
let origin;
let toColor = "#FFF";
let otherColor = "#FFF";
let fromColor = "#FFF";
let ocean = "#5800FF";
let polygons = [];
let lowerPolygons = [];
let radius = 400;
const colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];

function setup() {
  pixelDensity(4);
  createCanvas(2550, 3300, SVG);
  smooth();

  //Settings for drawing(these are the default values)
  g = new p5.Gen();
  e = new p5.Ease();
  //Set Cell Stroke Weight
  voronoiCellStrokeWeight(1);
  //Set Site Stroke Weight
  voronoiSiteStrokeWeight(1);
  //Set Cell Stroke
  voronoiCellStroke(0);
  //Set Site Stroke
  voronoiSiteStroke(0);
  //Set flag to draw Site
  voronoiSiteFlag(false);

  //Sets 30 random sites with 50 minimum distance to be added upon computing
  //Please note that this method is just for testing, you should use your own
  //method for placing random sites with minimum distance
  // voronoiRndSites(30, 50);

  //Add array of custom sites
  origin = createVector(width / 2, height / 2);
  let sites = [];

  // for (let i = 0; i < 1000; i++) {
  //   let r = g.random(Math.random(), "high") * radius;
  //   let a = g.random(Math.random(), "even") * TAU;
  //   let pos = origin.copy().add(p5.Vector.fromAngle(a).mult(r));
  //   // ellipse(pos.x, pos.y, 10, 10);
  //   // sites.push([pos.x, pos.y]);
  // }

  // for (let i = 0; i < 10; i++) {
  //   let rEff = map(i, 0, 10, 0, radius);

  //   // let numPoints = map(i, 0, 10, 10, 200);

  //   let numPoints = e.bounceInOut(i / 10) * 300;
  //   for (let j = 0; j < numPoints; j++) {
  //     let pos = origin
  //       .copy()
  //       .add(p5.Vector.fromAngle((j * TAU) / numPoints).mult(rEff));
  //     pos.add(p5.Vector.random2D().mult(100));
  //     // sites.push([pos.x, pos.y]);
  //   }
  // }

  // for (let lw = 2000; lw < 10000; lw += 1000) {
  //   const [validUpper, validLower, upperPoints, lowerPoints] = lips(origin, lw);
  //   strokeWeight(10);
  //   stroke(random(colors));
  //   beginShape();
  //   upperPoints.forEach((p) => {
  //     vertex(p.x, p.y);
  //   });
  //   endShape();
  //   beginShape();
  //   lowerPoints.forEach((p) => {
  //     vertex(p.x, p.y);
  //   });
  //   endShape();
  // }

  let lipWidth = 2000;
  const [validUpper, validLower, upperPoints, lowerPoints] = lips(
    origin,
    lipWidth
  );
  validUpper.forEach((p) => sites.push([p.x, p.y]));
  // upper.forEach((p) => sites.push([p.x, p.y]));
  // lower.forEach((p) => sites.push([p.x, p.y]));
  voronoiSites(sites);

  //Clear custom sites (does not clear random sites)
  // voronoiClearSites();

  //Jitter Settings (These are the default settings)

  //Maximum distance between jitters
  voronoiJitterStepMax(20);
  //Minimum distance between jitters
  voronoiJitterStepMin(5);
  //Scales each jitter
  voronoiJitterFactor(3);
  //Jitter edges of diagram
  voronoiJitterBorder(false);

  //Compute voronoi diagram with size 700 by 500
  //With a prepared jitter structure (true)
  voronoi(width, height, true);

  //Get the raw diagram, for more advanced use
  //This is purely to get information, doesn't change the diagram
  //https://github.com/gorhill/Javascript-Voronoi
  var diagram = voronoiGetDiagram();

  //Get simplified cells without jitter, for more advanced use
  var normal = voronoiGetCells();
  stroke(0);
  strokeWeight(3);

  let max = 100;

  // filter cells
  let validUpperCells = [];
  normal.forEach((cell) => {
    let valid = true;

    cell.forEach((p) => {
      let x = p[0];
      let y = p[1];
      let d = dist(x, y, origin.x, origin.y);
      let pos = createVector(x, y);
      if (
        x === 0 ||
        x === width ||
        y >= height / 2 ||
        y <= height / 3 ||
        d > lipWidth / 1.8 ||
        !pointInPoly(upperPoints, pos) ||
        pointInPoly(lowerPoints, pos)
      ) {
        valid = false;
      }
    });
    if (valid) {
      validUpperCells.push(cell);
    }
  });
  noFill();
  stroke(255);
  validUpperCells.forEach((cell) => {
    polygons.push(new Polygon(cell, "upper"));
    // for (let i = 0; i < 4; i++) {
    //   let c = lerpColor(color(toColor), color(fromColor), i / 43);
    //   c.setAlpha(map(i, 0, 4, 100, 255));
    //   strokeWeight(4 - i);
    //   stroke(c);
    //   beginShape();
    //   cell.forEach((p) => {
    //     vertex(p[0], p[1]);
    //   });
    //   endShape(CLOSE);
    // }
  });

  polygons.forEach((polygon) => {
    polygon.draw(toColor);
  });
  strokeWeight(3);
  sites = [];
  // voronoiClearSites();
  validLower.forEach((p) => sites.push([p.x, p.y]));
  voronoiSites(sites);
  //Maximum distance between jitters
  voronoiJitterStepMax(20);
  //Minimum distance between jitters
  voronoiJitterStepMin(5);
  //Scales each jitter
  voronoiJitterFactor(3);
  //Jitter edges of diagram
  voronoiJitterBorder(false);
  voronoi(width, height, true);
  normal = voronoiGetCells();
  polygons = [];

  let validLowerCells = [];
  normal.forEach((cell) => {
    let valid = true;

    cell.forEach((p) => {
      let x = p[0];
      let y = p[1];
      let d = dist(x, y, origin.x, origin.y);
      let pos = createVector(x, y);
      if (
        x === 0 ||
        x === width ||
        y === 0 ||
        y === height ||
        d > lipWidth / 1.8 ||
        y <= height / 2 - 200 ||
        pointInPoly(upperPoints, pos) ||
        !pointInPoly(lowerPoints, pos)
      ) {
        valid = false;
      }
    });
    if (valid) {
      validLowerCells.push(cell);
    }
  });
  noFill();
  stroke(255);
  validLowerCells.forEach((cell) => {
    polygons.push(new Polygon(cell, "lower"));
    // for (let i = 0; i < 4; i++) {
    //   let c = lerpColor(color(toColor), color(fromColor), i / 43);
    //   c.setAlpha(map(i, 0, 4, 100, 255));
    //   strokeWeight(4 - i);
    //   stroke(c);
    //   beginShape();
    //   cell.forEach((p) => {
    //     vertex(p[0], p[1]);
    //   });
    //   endShape(CLOSE);
    // }
  });
  polygons.forEach((polygon) => {
    polygon.draw(toColor);
  });

  // stroke("blue");
  // beginShape();
  // upper.forEach((p) => vertex(p.x, p.y));
  // endShape(CLOSE);
  // beginShape();
  // lower.forEach((p) => vertex(p.x, p.y));
  // endShape(CLOSE);
  //Get simplified cells with jitter, for more advanced use

  //Simulate initial mouse press for simplicity
  // voronoiDraw(0, 0, true, false);

  // voronoiDraw(0, 520, false, true);
  // mousePressed();
}

function draw() {
  // save("12_5_22.svg");
  // noLoop();
}

// function mousePressed() {
//   background(150);

//   //Draw diagram in coordinates 0, 0
//   //Filled and without jitter

//   //Draw diagram frame in coordinates 0, 500
//   //Not filled and with jitter

//   //Get id of voronoi cell that contains the coordinates mouseX, mouseY without accounting for jitter(false)
//   //Note that these coordinates are relative to the voronoi diagram and not any drawn diagram.
//   //In this example we can use mouseX and mouseY directly since we drawn our diagram at
//   //coordinates 0,0
//   var cellId = voronoiGetSite(mouseX, mouseY, false);

//   if (cellId !== undefined) {
//     //Get ids of voronoi cells neighboring cellId
//     //Ctrl+Shift+I on Chrome to open the console
//     console.log(cellId + ": " + voronoiNeighbors(cellId));

//     //Get color of selected voronoi cell
//     console.log("Color: " + voronoiGetColor(cellId));
//   }

//   //Draw a specific voronoi cell using different centers

//   //Draw cell from top left without jitter
//   voronoiDrawCell(800, 10, cellId, VOR_CELLDRAW_BOUNDED, true, false);
//   //Draw cell frame from top left with jitter
//   voronoiDrawCell(1000, 10, cellId, VOR_CELLDRAW_BOUNDED, false, true);

//   //Draw cell from site without jitter
//   voronoiDrawCell(800, 300, cellId, VOR_CELLDRAW_SITE, true, false);
//   //Draw cell frame from site with jitter
//   voronoiDrawCell(1000, 300, cellId, VOR_CELLDRAW_SITE, false, true);

//   //Draw cell from geometric center without jitter
//   voronoiDrawCell(800, 610, cellId, VOR_CELLDRAW_CENTER, true, false);
//   //Draw cell frame from geometric center with jitter
//   voronoiDrawCell(1000, 610, cellId, VOR_CELLDRAW_CENTER, false, true);

//   //Guide lines to compare different draw modes

//   //Vertical Line 1
//   line(800, 10, 800, 800);
//   //Vertical Line 2
//   line(1000, 10, 1000, 800);
//   //Horizontal Line 1
//   line(800, 10, 1200, 10);
//   //Horizontal Line 2
//   line(800, 300, 1200, 300);
//   //Horizontal Line 3
//   line(800, 610, 1200, 610);
// }

class Polygon {
  constructor(cell, side) {
    this.points = cell;
    this.color = 0;
    this.center = this.getCenter();
    this.distance = dist(this.center.x, this.center.y, origin.x, origin.y);
    this.angle = atan2(this.center.y - origin.y, this.center.x - origin.x);
    this.side = side;
  }

  getCenter() {
    let x = 0;
    let y = 0;
    this.points.forEach((p) => {
      x += p[0];
      y += p[1];
    });
    return createVector(x / this.points.length, y / this.points.length);
  }

  shift() {
    let yDist = this.center.y - origin.y;
    if (this.side == "lower" && yDist > 350) {
      let lenVal = map(yDist, 350, 450, 0, 1);
      let len = e.quadraticInOut(lenVal) * 300;
      this.points = this.points.map((p) => {
        let x = p[0] + Math.cos(PI / 2) * len;
        let y = p[1] + Math.sin(PI / 2) * len;
        return [x, y];
      });
    }

    colorMode(HSB);
    let c = color(random(colors));
    let h = hue(c);
    let s = saturation(c);
    let b = brightness(c);
    let yAbs = Math.abs(yDist);

    c = color(h, s, b);
    stroke(0);
    // fill(c);
  }

  draw(clr) {
    push();
    noFill();
    strokeJoin(ROUND);

    strokeWeight(2);
    this.shift();

    beginShape();
    this.points.forEach((p) => {
      vertex(p[0], p[1]);
    });
    endShape(CLOSE);
  }
}
function keyPressed() {
  if (keyCode == 83) {
    save("lips.svg");
  }
}

function glowEffect(clr) {
  // push();
  let c = color(clr);
  colorMode(HSB);
  let h = hue(c);
  let s = saturation(c);
  let b = brightness(c);
  c = color(h, s, 100);
  // c.setAlpha(255);
  drawingContext.shadowColor = color(c);
  drawingContext.shadowBlur = 60;
  // pop();
}

function lips(origin, lipWidth) {
  let leftCorner = origin.copy().add(-lipWidth / 2, 0);
  // ellipse(leftCorner.x, leftCorner.y, 10, 10);
  let rightCorner = origin.copy().add(lipWidth / 2, 0);
  // ellipse(rightCorner.x, rightCorner.y, 10, 10);

  let bottomAngleOffset = PI / 10;
  let cp1Angle = PI / 10;
  let cp1Len = lipWidth / 4;

  let cp2Angle = PI + PI / 10;
  let cp2Len = lipWidth / 3;
  let cp2 = origin.copy().add(p5.Vector.fromAngle(cp2Angle).mult(cp2Len));

  let cp1 = leftCorner.copy().add(p5.Vector.fromAngle(cp1Angle).mult(cp1Len));

  stroke("blue");
  noFill();
  // bottomupperleft
  // bezier(
  //   leftCorner.x,
  //   leftCorner.y,
  //   cp1.x,
  //   cp1.y,
  //   cp2.x,
  //   cp2.y,
  //   origin.x,
  //   origin.y
  // );

  let cp3Angle = -PI / 10;
  let cp3Len = lipWidth / 3;
  let cp3 = origin.copy().add(p5.Vector.fromAngle(cp3Angle).mult(cp3Len));

  let cp4Angle = -PI - PI / 10;
  let cp4Len = lipWidth / 4;
  let cp4 = rightCorner.copy().add(p5.Vector.fromAngle(cp4Angle).mult(cp4Len));
  // ellipse(cp4.x, cp4.y, 10, 10);

  // ellipse(cp3.x, cp3.y, 10, 10);
  // bottomupperright
  // bezier(
  //   origin.x,
  //   origin.y,
  //   cp3.x,
  //   cp3.y,
  //   cp4.x,
  //   cp4.y,
  //   rightCorner.x,
  //   rightCorner.y
  // );

  // bottomlower

  let bottomMid = origin.copy().add(0, lipWidth / 4.5);

  let cp5Angle = PI / 4;
  let cp5Len = lipWidth / 4;
  let cp5 = leftCorner.copy().add(p5.Vector.fromAngle(cp5Angle).mult(cp5Len));

  let cp6Angle = PI;
  let cp6Len = lipWidth / 4;
  let cp6 = bottomMid.copy().add(p5.Vector.fromAngle(cp6Angle).mult(cp6Len));

  // bezier(
  //   leftCorner.x,
  //   leftCorner.y,
  //   cp5.x,
  //   cp5.y,
  //   cp6.x,
  //   cp6.y,
  //   bottomMid.x,
  //   bottomMid.y
  // );

  let cp7Angle = PI - PI / 4;
  let cp7Len = lipWidth / 4;
  let cp7 = rightCorner.copy().add(p5.Vector.fromAngle(cp7Angle).mult(cp7Len));

  let cp8Angle = 0;
  let cp8Len = lipWidth / 4;
  let cp8 = bottomMid.copy().add(p5.Vector.fromAngle(cp8Angle).mult(cp8Len));

  // bezier(
  //   bottomMid.x,
  //   bottomMid.y,
  //   cp8.x,
  //   cp8.y,
  //   cp7.x,
  //   cp7.y,
  //   rightCorner.x,
  //   rightCorner.y
  // );

  let lowerpoints = [];

  let maxPoints = 100;
  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(leftCorner.x, cp1.x, cp2.x, origin.x, t);
    let y = bezierPoint(leftCorner.y, cp1.y, cp2.y, origin.y, t);
    // ellipse(x, y, 10, 10);
    lowerpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(origin.x, cp3.x, cp4.x, rightCorner.x, t);
    let y = bezierPoint(origin.y, cp3.y, cp4.y, rightCorner.y, t);
    // ellipse(x, y, 10, 10);
    lowerpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(rightCorner.x, cp7.x, cp8.x, bottomMid.x, t);
    let y = bezierPoint(rightCorner.y, cp7.y, cp8.y, bottomMid.y, t);
    // ellipse(x, y, 10, 10);
    lowerpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(bottomMid.x, cp6.x, cp5.x, leftCorner.x, t);
    let y = bezierPoint(bottomMid.y, cp6.y, cp5.y, leftCorner.y, t);
    // ellipse(x, y, 10, 10);
    lowerpoints.push(createVector(x, y));
  }

  // beginShape();
  // lowerpoints.forEach((p) => {
  //   vertex(p.x, p.y);
  // });
  // endShape();

  // beginShape();
  // vertex(leftCorner.x, leftCorner.y);
  // bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, origin.x, origin.y);
  // bezierVertex(cp3.x, cp3.y, cp4.x, cp4.y, rightCorner.x, rightCorner.y);
  // bezierVertex(cp7.x, cp7.y, cp8.x, cp8.y, bottomMid.x, bottomMid.y);
  // bezierVertex(cp6.x, cp6.y, cp5.x, cp5.y, leftCorner.x, leftCorner.y);
  // endShape(CLOSE);

  let upperMid = origin.copy().add(0, -lipWidth / 6);
  // ellipse(upperMid.x, upperMid.y, 10, 10);

  let cp9Angle = -PI / 6;
  let cp9Len = lipWidth / 4;
  let cp9 = leftCorner.copy().add(p5.Vector.fromAngle(cp9Angle).mult(cp9Len));
  // ellipse(cp9.x, cp9.y, 10, 10);

  let cp10Angle = -PI / 2 - PI / 4;
  let cp10Len = lipWidth / 4;
  let cp10 = upperMid.copy().add(p5.Vector.fromAngle(cp10Angle).mult(cp10Len));
  // ellipse(cp10.x, cp10.y, 10, 10);
  // bezier(
  //   leftCorner.x,
  //   leftCorner.y,
  //   cp9.x,
  //   cp9.y,
  //   cp10.x,
  //   cp10.y,
  //   upperMid.x,
  //   upperMid.y
  // );

  let cp11Angle = -PI / 2 + PI / 4;
  let cp11Len = lipWidth / 4;
  let cp11 = upperMid.copy().add(p5.Vector.fromAngle(cp11Angle).mult(cp11Len));
  // ellipse(cp11.x, cp11.y, 10, 10);

  let cp12Angle = -PI + PI / 6;
  let cp12Len = lipWidth / 4;
  let cp12 = rightCorner
    .copy()
    .add(p5.Vector.fromAngle(cp12Angle).mult(cp12Len));
  // ellipse(cp12.x, cp12.y, 10, 10);
  // bezier(
  //   upperMid.x,
  //   upperMid.y,
  //   cp11.x,
  //   cp11.y,
  //   cp12.x,
  //   cp12.y,
  //   rightCorner.x,
  //   rightCorner.y
  // );

  let upperpoints = [];
  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(leftCorner.x, cp9.x, cp10.x, upperMid.x, t);
    let y = bezierPoint(leftCorner.y, cp9.y, cp10.y, upperMid.y, t);
    // ellipse(x, y, 10, 10);
    upperpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(upperMid.x, cp11.x, cp12.x, rightCorner.x, t);
    let y = bezierPoint(upperMid.y, cp11.y, cp12.y, rightCorner.y, t);
    // ellipse(x, y, 10, 10);
    upperpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(rightCorner.x, cp4.x, cp3.x, origin.x, t);
    let y = bezierPoint(rightCorner.y, cp4.y, cp3.y, origin.y, t);
    // ellipse(x, y, 10, 10);
    upperpoints.push(createVector(x, y));
  }

  for (let i = 0; i <= maxPoints; i++) {
    let t = i / maxPoints;
    let x = bezierPoint(origin.x, cp2.x, cp1.x, leftCorner.x, t);
    let y = bezierPoint(origin.y, cp2.y, cp1.y, leftCorner.y, t);
    // ellipse(x, y, 10, 10);
    upperpoints.push(createVector(x, y));
  }

  // beginShape();
  // upperpoints.forEach((p) => {
  //   vertex(p.x, p.y);
  // });
  // endShape();
  let validPointsUpper = [];
  let validLowerPoints = [];
  for (let i = 0; i < 12000; i++) {
    let x = random(origin.x - lipWidth / 1, origin.x + lipWidth);
    let y = random(origin.y - lipWidth / 2, origin.y + lipWidth / 2);
    let pt = createVector(x, y);
    // ellipse(x, y, 10, 10);
    if (pointInPoly(upperpoints, pt)) validPointsUpper.push(pt);
    if (pointInPoly(lowerpoints, pt)) validLowerPoints.push(pt);
  }

  return [validPointsUpper, validLowerPoints, upperpoints, lowerpoints];
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
