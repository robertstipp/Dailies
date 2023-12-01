const colors = [
  "#ff7b00",
  "#ff8800",
  "#ff9500",
  "#ffa200",
  "#ffaa00",
  "#ffb700",
  "#ffc300",
  "#ffd000",
  "#ffdd00",
  "#ffea00",
  "#3fc1c0",
  "#20bac5",
  "#00b2ca",
  "#04a6c2",
  "#0899ba",
  "#0f80aa",
  "#16679a",
  "#1a5b92",
  "#1c558e",
  "#1d4e89",
  "#007f5f",
  "#2b9348",
  "#55a630",
  "#80b918",
  "#aacc00",
  "#bfd200",
  "#d4d700",
  "#dddf00",
  "#eeef20",
  "#ffff3f",
  "#590d22",
  "#800f2f",
  "#a4133c",
  "#c9184a",
  "#ff4d6d",
  "#ff758f",
  "#ff8fa3",
  "#ffb3c1",
  "#ffccd5",
  "#fff0f3",
];
let seedColor;
let count = 0;
function setup() {
  createCanvas(1080, 1080);
  background(0);

  seedColor = color("#16679a");
  colorMode(HSL, 360, 100, 100, 100);
  let seedHue = hue(seedColor);
  let seedSat = saturation(seedColor);
  let seedLum = lightness(seedColor);
  let seedAlpha = alpha(seedColor);
  console.log(seedHue, seedSat, seedLum, seedAlpha);
  let origin = createVector(width / 2, height / 2);

  let rStart = 500;
  let rStop = 100;
  let rStep = 100;
  let maxTriangles = 12 * ((rStart - rStop) / rStep + 1);

  for (let r = rStart; r >= rStop; r -= rStep) {
    let hueStep = 360 / maxTriangles;
    seedHue += hueStep;
    let c = color(seedHue, seedSat, seedLum, seedAlpha);
    fill(c);
    star(540, 540, r);
  }
}
function draw() {}

function star(xOrigin, yOrigin, size, steps) {
  stroke(255);
  let origin = createVector(xOrigin, yOrigin);
  let longSideRadius = size;
  let shortSideRadius = longSideRadius / 1.7;
  let angle1 = 0;

  let angle2 = PI / 6;
  for (let i = 0; i < 12; i++) {
    if (i === 0) {
      angle1 = 0;
      angle2 = PI / 6;
    } else if (i % 2 !== 0) {
      angle1 += PI / 3;
    } else {
      angle2 += PI / 3;
    }

    let x1 = origin.x + longSideRadius * cos(angle1);
    let y1 = origin.y + longSideRadius * sin(angle1);
    let x2 = origin.x + shortSideRadius * cos(angle2);
    let y2 = origin.y + shortSideRadius * sin(angle2);

    let point1 = createVector(x1, y1);
    let point0 = origin;
    let point2 = createVector(x2, y2);

    let points = [point1, point0, point2];

    beginShape();
    points.forEach((p) => vertex(p.x, p.y));
    endShape(CLOSE);

    let avgX = (point0.x + point1.x + point2.x) / 3;
    let avgY = (point0.y + point1.y + point2.y) / 3;
    let avg = createVector(avgX, avgY);

    let fromC = color(random(colors));
    let toC = color(255);

    for (let i = 0; i <= 1; i += 1 / steps) {
      let c = lerpColor(color(fromC), color(toC), i / 10);

      beginShape(TRIANGLES);
      let point0AVG = p5.Vector.lerp(point0, avg, i / 10);
      let point1AVG = p5.Vector.lerp(point1, avg, i / 10);
      let point2AVG = p5.Vector.lerp(point2, avg, i / 10);
      vertex(point0AVG.x, point0AVG.y);
      vertex(point1AVG.x, point1AVG.y);
      vertex(point2AVG.x, point2AVG.y);
      endShape(CLOSE);
    }
    count++;
  }
}
