// let colors = ["#000073", "#0000F5", "#D60000", "#BF0000", "#A30000"];
let colors = ["#F2F2F2", "#BFBFBF", "#737373", "#404040", "#0D0D0D"];

function setup() {
  pixelDensity(1);
  createCanvas(1080, 1080);
  background(0);
  noLoop();
  e = new p5.Ease();
}

function draw() {
  let rings = 260;
  let bands = 10;
  let hBands = 10;
  let cellW = width / bands;
  let cellH = height / hBands;
  let tri = new myTriangle(createVector(width / 2, height / 2), 100);
  // console.log(tri);
  loadPixels();
  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      let dist = sqrt(sq(x - width / 2) + sq(y - height / 2));
      let a = atan2(y - height / 2, x - width / 2);
      let sects = 20;
      let maxDist = sqrt(sq(width) + sq(height));
      let ring = floor(
        e.quadraticIn(map(dist, 0, maxDist, 0, 1), rings) * rings
      );
      let band = floor(e.staircase(map(x, 0, width, 0, 1), 10) * 10);
      let hBand = floor(e.staircase(map(y, 0, height, 0, 1), 10) * 10);
      let arc = floor(map(a, -PI, PI, 0, sects));
      let cellPos = createVector(
        floor(x / cellW) * cellW,
        floor(y / cellH) * cellH
      );
      let cellCenter = createVector(
        cellPos.x + cellW / 2,
        cellPos.y + cellH / 2
      );
      // fill(255);

      // ellipse(cellCenter.x, cellCenter.y, 10, 10);
      let mytri = myTriangle(cellCenter, cellW / 2);
      let inTri = pointInEquilateralTriangle(x, y, ...mytri);
      let clr = color(colors[(band + hBand) % colors.length]);
      let index = (x + y * width) * 4;
      if (inTri) {
        pixels[index] = red(clr);
        pixels[index + 1] = green(clr);
        pixels[index + 2] = blue(clr);
        pixels[index + 3] = alpha(clr);
      }

      // let gray = (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
    }
    // break;
  }
  updatePixels();
}

function pointInEquilateralTriangle(x, y, x1, y1, x2, y2, x3, y3) {
  console.log(x, x1, y1, x2, y2, x3, y3);
  // Calculate the barycentric coordinates of the point with respect to the triangle
  let d1 = abs((x - x2) * (y1 - y2) - (x1 - x2) * (y - y2));
  let d2 = abs((x - x3) * (y2 - y3) - (x2 - x3) * (y - y3));
  let d3 = abs((x - x1) * (y3 - y1) - (x3 - x1) * (y - y1));

  let d = d1 + d2 + d3;
  let alpha = d1 / d;
  let beta = d2 / d;
  let gamma = d3 / d;

  // Check if the barycentric coordinates satisfy the condition for the point to be inside the triangle
  return alpha >= 0 && beta >= 0 && gamma >= 0;
}

function myTriangle(origin, size) {
  let startAngle = PI / 4;
  let vertices = [];
  for (let a = startAngle; a < TAU + startAngle; a += TAU / 3) {
    vertices.push(
      createVector(origin.x + size * cos(a), origin.y + size * sin(a))
    );
  }

  // beginShape();
  // vertices.forEach((v) => {
  //   vertex(v.x, v.y);
  // });
  // endShape(CLOSE);

  return [
    vertices[0].x,
    vertices[0].y,
    vertices[1].x,
    vertices[1].y,
    vertices[2].x,
    vertices[2].y,
  ];
  // beginShape();
  // vertex(x1, y1);
  // vertex(x2, y2);
  // vertex(x3, y3);
  // endShape(CLOSE);
}
