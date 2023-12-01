let cols = 27;
let rows = 36;
let grid = [];
let cellW, cellH, effW, effH;
let cellR;
let margin = 100;
let simplexNoise;
let img;
let colors = ["#FC0049", "#FF5D1A", "#E7E860", "#00C891", "#FF5D1A"];
let pinks = [];
let greens = [];
let blues = [];
let paths = [];
let myPaths = [];
function preload() {
  img = loadImage("../media/soulcycle.jpg");
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
      for (let x = 0; x < width; x += 3) {
        beginShape();
        let path = [];
        for (let y = 0; y < height; y += 2) {
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
  // filteredPaths.forEach((path) => {
  //   let point0 = path[0];
  //   let testClr = getColor(point0);

  //   beginShape();
  //   if (testClr === 0) {
  //     path.forEach((p) => {
  //       let angle = atan2(p.y - mid.y, p.x - mid.x);
  //       let angle2 = angleOff(p);
  //       let xOff = sin(angle2) * xOffLen;
  //       stroke(colors[testClr]);
  //       // vertex(p.x + xOff, p.y);
  //       vertex(p.x, p.y);
  //     });
  //   }

  //   endShape();
  // });

  // filteredPaths.forEach((path) => {
  //   let point0 = path[0];
  //   let testClr = getColor(point0);
  //   beginShape();
  //   if (testClr === 1) {
  //     path.forEach((p) => {
  //       let angle = atan2(p.y - mid.y, p.x - mid.x);
  //       let angle2 = angleOff(p);

  //       let xOff = sin(angle2) * xOffLen;
  //       stroke(colors[testClr]);
  //       // vertex(p.x + xOff, p.y);
  //       vertex(p.x, p.y);
  //     });
  //   }

  //   endShape();
  // });
  // filteredPaths.forEach((path) => {
  //   let point0 = path[0];
  //   let testClr = getColor(point0);
  //   beginShape();
  //   if (testClr === 2) {
  //     path.forEach((p) => {
  //       let clr = getColor(p);
  //       if (clr === 0 || clr === 2) {
  //         endShape();
  //         beginShape();
  //       }

  //       let angle = atan2(p.y - mid.y, p.x - mid.x);
  //       let angle2 = angleOff(p);

  //       let xOff = sin(angle2) * xOffLen;
  //       stroke(colors[testClr]);

  //       // vertex(p.x + xOff, p.y);
  //       vertex(p.x, p.y);
  //     });
  //   }

  //   endShape();
  // });

  let pinkSubPaths = [];
  let greenSubPaths = [];
  let blueSubPaths = [];
  colors.forEach((color, i) => {
    filteredPaths.forEach((path) => {
      let subPath = [];
      beginShape();
      path.forEach((p) => {
        let clr = getColor(p);
        let xOff = sin(angleOff(p)) * xOffLen;
        stroke(colors[i]);
        if (clr === i) {
          vertex(p.x + xOff, p.y);
        } else {
          endShape();
          beginShape();
        }
        // stroke(colors[clr]);
        // if (clr === 0) {
        //   vertex(p.x, p.y);
        // }
      });
      endShape();
    });
  });
  // filteredPaths.forEach((path) => {
  //   let subPath = [];
  //   beginShape();
  //   path.forEach((p) => {
  //     let clr = getColor(p);
  //     let xOff = sin(angleOff(p)) * xOffLen;
  //     stroke(colors[0]);
  //     if (clr === 0) {
  //       vertex(p.x + xOff, p.y);
  //     } else {
  //       endShape();
  //       beginShape();
  //     }
  //     // stroke(colors[clr]);
  //     // if (clr === 0) {
  //     //   vertex(p.x, p.y);
  //     // }
  //   });
  //   endShape();
  // });
  // filteredPaths.forEach((path) => {
  //   let subPath = [];
  //   beginShape();
  //   path.forEach((p) => {
  //     let clr = getColor(p);
  //     let xOff = sin(angleOff(p)) * xOffLen;
  //     stroke(colors[1]);
  //     if (clr === 1) {
  //       vertex(p.x + xOff, p.y);
  //     } else {
  //       endShape();
  //       beginShape();
  //     }
  //     // stroke(colors[clr]);
  //     // if (clr === 0) {
  //     //   vertex(p.x, p.y);
  //     // }
  //   });
  //   endShape();
  // });
  // filteredPaths.forEach((path) => {
  //   let subPath = [];
  //   beginShape();
  //   path.forEach((p) => {
  //     let clr = getColor(p);
  //     let xOff = sin(angleOff(p)) * xOffLen;
  //     stroke(colors[2]);
  //     if (clr === 2) {
  //       vertex(p.x + xOff, p.y);
  //     } else {
  //       endShape();
  //       beginShape();
  //     }
  //     // stroke(colors[clr]);
  //     // if (clr === 0) {
  //     //   vertex(p.x, p.y);
  //     // }
  //   });
  //   endShape();
  // });

  // filteredPaths.forEach((path) => {
  //   let subPath = [];

  //   path.forEach((p) => {
  //     let clr = getColor(p);
  //     if (clr === 0) {
  //       subPath.push(p);
  //     } else {
  //       if (subPath.length > 0) {
  //         pinkSubPaths.push(subPath);
  //         subPath = [];
  //       }
  //     }
  //   });
  // });

  // image(img, 0, 0);
}

function keyPressed() {
  if (key == "s") {
    save("skull_ltblue.svg");
  }
}

class Cell {
  constructor(x, y, clr) {
    this.x = x;
    this.y = y;
    this.clr = clr;
  }
}

class Path {
  constructor(points, clr) {
    this.points = points;
    this.clr = clr;
  }
}
