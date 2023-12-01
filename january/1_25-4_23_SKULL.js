let cols = 27;
let rows = 36;
let size = 5;
let grid = [];
let cellW, cellH, effW, effH;
let cellR;
let margin = 100;
let simplexNoise;
let img;
let colors = ["#9A1663", "#E0144C", "#FF5858"];
let pinks = [];
let greens = [];
let blues = [];
let paths = [];
let myPaths = [];
function preload() {
  img = loadImage("../media/bunny.jpeg");
}
function setup() {
  pixelDensity(1);
  createCanvas(img.width, img.height, SVG);
  // background(0);
  noFill();
  noLoop();

  noStroke();
  simplexNoise = new openSimplexNoise(20);
  randomSeed(20);
  cellW = (width - margin * 2) / cols;
  cellH = (height - margin * 2) / rows;
  cellR = Math.sqrt((cellW * cellW) / 2 + (cellH * cellH) / 2);
}
function draw() {
  let d = pixelDensity();
  img.loadPixels();
  let mid = createVector(width / 2, height / 2);
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {
      let clr;
      for (let x = 0; x < width; x += size) {
        beginShape();
        let path = [];
        for (let y = 0; y < height; y += size) {
          let xOff = 0;
          if (y % 10 == 0) {
            xOff = 10;
          }
          index = 4 * ((y * d + j) * width * d + (x * d + i));
          let r = img.pixels[index + 0];
          let g = img.pixels[index + 1];
          let b = img.pixels[index + 2];
          let a = img.pixels[index + 3];
          let c = color(r, g, b, a);
          let grayScale = (r + g + b) / 3;
          let angle = atan2(y - mid.y, x - mid.x);
          let angle2 = map(
            simplexNoise.noise2D(x / 100, y / 100),
            -1,
            1,
            0,
            Math.PI * 2
          );
          clr = Math.floor(
            map(
              simplexNoise.noise3D(x / 100, y / 1000, angle / 100),
              -1,
              1,
              0,
              3
            )
          );
          if (grayScale > 200) {
            endShape();
            clr = Math.floor(
              map(
                simplexNoise.noise3D(x / 10, y / 10, angle / 100),
                -1,
                1,
                0,
                3
              )
            );
            paths.push(path);

            path = [];
            beginShape();
            continue;
          }
          // if (clr === 0 || clr === 2) continue;
          stroke(colors[clr]);

          xOff = sin(angle2) * 3;
          if (random() < 0) {
            endShape();
            paths.push(path);

            ellipse(x + xOff, y, 2, 2);
            beginShape();
          } else {
            path.push(createVector(x, y));
            // vertex(x + xOff, y);
          }

          // ellipse(x, y, 5, 5);
          // img.pixels[index + 3] = a;
        }
        paths.push(path);
        myPaths.push(new Path(path, clr));
        endShape();
      }
    }
  }

  img.updatePixels();
  let xOffLen = 5;
  function angleOff(point) {
    return map(noise(point.x / 100, point.y / 100), -1, 1, 0, Math.PI * 10);
  }
  function getColor(point) {
    let angle = atan2(point.y - mid.y, point.x - mid.x);
    let d = point.dist(mid);
    let dAngle = map(d, 0, img.height / 2, 0, Math.PI * 4);

    let factor = map(sin(dAngle), -1, 1, 2, 10);
    let angleOff = map(d, 0, img.height / 2, 0, Math.PI * factor);
    return Math.floor(map(noise(point.x / 100, point.y / 50, 1), 0, 1, 0, 5));
  }
  const filteredPaths = paths.filter((path) => path.length > 0);

  let sites = [];
  filteredPaths.forEach((path) => {
    path.forEach((p) => {
      // point(p.x, p.y);
      if (random() < 0.2) {
        sites.push([p.x, p.y]);
      }
    });
  });

  voronoiSites(sites);
  voronoi(width, height, true);
  stroke(0);
  var normal = voronoiGetCells();
  let cells = [];
  normal.forEach((cell) => {
    cells.push(new Cell(cell));
    return;
  });
  colors.forEach((color, index) => {
    cells.forEach((cell) => {
      if (cell.color === index && cell.grayScale < 200) {
        let c = colors[index];
        fill(c);
        cell.draw();
        // cell.drawRing();
        // cell.drawArc();
        // cell.drawSquiggle();
        // cell.drawWheel();

        // cell.drawRect();
        // cell.drawSpiral();
      }
    });
  });
  // cells.forEach((cell) => {
  //   if (cell.grayScale < 200 && cell.isSquare) {
  //     cell.draw();
  //   }
  // });
  // colors.forEach((color, i) => {
  //   filteredPaths.forEach((path) => {
  //     let subPath = [];
  //     beginShape();
  //     path.forEach((p) => {
  //       let clr = getColor(p);
  //       let xOff = sin(angleOff(p)) * xOffLen;
  //       stroke(colors[i]);
  //       if (clr === i) {
  //         vertex(p.x + xOff, p.y);
  //       } else {
  //         endShape();
  //         beginShape();
  //       }
  //     });
  //     endShape();
  //   });
  // });

  // image(img, 0, 0);
}

function keyPressed() {
  if (key == "s") {
    save("skull_rects.svg");
  }
}

class Cell {
  constructor(points, clr) {
    this.points = points;
    this.mid = this.getMid();
    this.color = this.getColor();
    this.pixelIndex = this.getPixelIndex();

    this.grayScale = img.pixels[this.pixelIndex + 0];
    this.isSquare = this.checkSquare();
  }

  checkSquare() {
    if (this.points.length < 4) return false;
    let d1 = dist(
      this.points[0][0],
      this.points[0][1],
      this.points[1][0],
      this.points[1][1]
    );
    let d2 = dist(
      this.points[1][0],
      this.points[1][1],
      this.points[2][0],
      this.points[2][1]
    );
    let d3 = dist(
      this.points[2][0],
      this.points[2][1],
      this.points[3][0],
      this.points[3][1]
    );
    let d4 = dist(
      this.points[3][0],
      this.points[3][1],
      this.points[0][0],
      this.points[0][1]
    );
    return d1 === d2 && d2 === d3 && d3 === d4;
  }

  getColor() {
    let point = this.mid;
    // let angle = atan2(point.y - mid.y, point.x - mid.x);
    // let d = point.dist(mid);
    // let dAngle = map(d, 0, img.height / 2, 0, Math.PI * 4);

    // let factor = map(sin(dAngle), -1, 1, 2, 10);
    // let angleOff = map(d, 0, img.height / 2, 0, Math.PI * factor);
    // return Math.floor(map(noise(point.x / 100, point.y / 50, 1), 0, 1, 0, 3));
    return Math.floor(random(colors.length));
  }
  getPixelIndex = () => {
    let x = Math.floor(this.mid.x);
    let y = Math.floor(this.mid.y);
    let d = 1;
    let index = 4 * ((y * d + 0) * width * d + (x * d + 0));
    return index;
  };
  getGrayScale = () => {
    let r = img.pixels[this.pixelIndex + 0];
    let g = img.pixels[this.pixelIndex + 1];
    let b = img.pixels[this.pixelIndex + 2];

    let c = color(r, g, b, a);
    return (r + g + b) / 3;
  };
  getMid = () => {
    let midX = 0;
    let midY = 0;
    this.points.forEach((p) => {
      midX += p[0];
      midY += p[1];
    });
    midX /= this.points.length;
    midY /= this.points.length;
    return createVector(midX, midY);
  };

  draw() {
    // noStroke();
    // fill(colors[this.color]);
    beginShape();
    this.points.forEach((p) => {
      let x = p[0];
      let y = p[1];
      vertex(x, y);
    });
    endShape(CLOSE);
  }

  drawRing() {
    let maxR = size;
    let steps = 8;
    for (let i = 0; i < 8; i++) {
      let rEff = map(i, 0, steps, 0, maxR);
      ellipse(this.mid.x, this.mid.y, rEff, rEff);
    }
  }
  drawRect() {
    rectMode(CENTER);
    let maxR = size;
    let steps = 6;

    noFill();
    for (let i = 0; i <= steps; i++) {
      let rEff = map(i, 0, steps, 0, maxR);
      rect(this.mid.x, this.mid.y, rEff, rEff);
    }
  }
  drawSpiral() {
    let count = 0;
    let rMin = (size / 2) * 0.1;
    let rMax = (size / 2) * 0.9;
    let rings = 4;

    beginShape();
    let r;
    for (let a = PI / 4; a < TAU * 4 + PI / 4; a += Math.PI / 2) {
      if (count % 4 === 0) {
        r = map(count, 0, rings * 4, rMin, rMax);
      }

      let x = this.mid.x + cos(a) * r;
      let y = this.mid.y + sin(a) * r;
      vertex(x, y);
      count++;
    }
    endShape();
  }
  drawArc() {
    let halfR = size * 2;
    let corners = [];
    let cellW = size / 2;
    let cellH = size / 2;
    rectMode(CENTER);
    stroke(random(colors));
    // rect(this.mid.x, this.mid.y, size, size);
    // ellipse(this.mid.x, this.mid.y, size, size);
    corners.push(createVector(this.mid.x - cellW, this.mid.y - cellH));
    corners.push(createVector(this.mid.x + cellW, this.mid.y - cellH));
    corners.push(createVector(this.mid.x + cellW, this.mid.y + cellH));
    corners.push(createVector(this.mid.x - cellW, this.mid.y + cellH));

    let selectedCorner = Math.floor(random(corners.length));
    let angles = [
      [0, PI / 2],
      [PI / 2, PI],
      [PI, (PI * 3) / 2],
      [(PI * 3) / 2, 0],
    ];
    for (let i = 0; i < corners.length; i++) {
      if (i === selectedCorner) {
        let startAngle = angles[i][0];
        let endAngle = angles[i][1];

        for (let j = 0; j <= 4; j++) {
          let rEff = map(j, 0, 4, 0, halfR);
          let x = corners[i].x;
          let y = corners[i].y;
          arc(x, y, rEff, rEff, startAngle, endAngle);
        }
      }
    }
    // corners.forEach((corner) => ellipse(corner.x, corner.y, 10, 10));
  }
  drawSquiggle() {
    ellipse(this.mid.x, this.mid.y, size / 4, size / 4);
    for (let i = 0; i < 4; i++) {
      let rEff = map(i, 0, 4, 0, size);
      let x = this.mid.x;
      let y = this.mid.y;
      arc(x, y, rEff, rEff, 0, PI);
    }
    // arc(this.mid.x, this.mid.y, size, size, 0, PI);
  }
  drawWheel() {
    let tireD = size;
    let rimD = size * 0.9;
    let ringD = size * 0.5;
    let innerD = size * 0.2;
    stroke("black");
    ellipse(this.mid.x, this.mid.y, tireD, tireD);
    ellipse(this.mid.x, this.mid.y, rimD, rimD);

    ellipse(this.mid.x, this.mid.y, ringD, ringD);
    let origin = this.mid.copy();
    let steps = 10;
    let angleOffset = PI / 20;
    for (let i = 0; i < steps; i++) {
      let angle = map(i, 0, steps, 0, Math.PI * 2);
      let point1 = origin.copy().add(p5.Vector.fromAngle(angle, innerD / 2));
      let point2 = origin
        .copy()
        .add(p5.Vector.fromAngle(angle + PI / 6, rimD / 2));
      let d = p5.Vector.dist(point1, point2);
      let cp1 = origin
        .copy()
        .add(p5.Vector.fromAngle(angle + angleOffset, innerD + d / 4));
      noFill();
      bezier(
        point1.x,
        point1.y,
        cp1.x,
        cp1.y,
        cp1.x,
        cp1.y,
        point2.x,
        point2.y
      );
      break;
    }
    let angleShift = PI / 10;
    for (let i = 0; i < steps; i++) {
      let angle = map(i, 0, steps, 0, Math.PI * 2);
      let point1 = origin.copy().add(p5.Vector.fromAngle(angle, innerD / 2));
      let point2 = origin
        .copy()
        .add(p5.Vector.fromAngle(angle - PI / 10, rimD / 2));
      let d = p5.Vector.dist(point1, point2);
      let cp1 = origin
        .copy()
        .add(p5.Vector.fromAngle(angle - angleOffset, innerD + d / 4));

      noFill();
      bezier(
        point1.x,
        point1.y,
        cp1.x,
        cp1.y,
        cp1.x,
        cp1.y,
        point2.x,
        point2.y
      );
      break;
    }
  }
}

class Path {
  constructor(points) {
    this.points = points;
    this.clr = "red";
  }
}
