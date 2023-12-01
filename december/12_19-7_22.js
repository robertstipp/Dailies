const pink = ["#EC9AA3"];
const pink2 = ["#FA9DDB"];
const pink3 = ["#FF007F"];
let colorCount = 0;
let myColors;
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
function setup() {
  pixelDensity(4);
  createCanvas(1080, 1920);
  background(0);
  let origin = createVector(300, 300);

  // star(200, 300, 100);
  myColors = colors.slice();
  myColors = shuffle(myColors);
  let count = 0;
  let size = 100;
  let yOffset = (87 / 100) * size;
  let xOffset = (50 / 100) * size;
  let yStep = (145 / 100) * size;
  let xStep = size;

  for (let i = 1; i < 2; i += 1) {
    for (let y = 0; y <= 2020; y += yStep) {
      for (let x = 0; x <= 1280; x += xStep) {
        if (count % 2 === 0) {
          star(x, y, size / i);
        } else {
          star(x + xOffset, y, size / i);
        }
      }
      myColors = shuffle(myColors);
      count++;
    }
  }
}

function star(xOrigin, yOrigin, size) {
  fill(myColors[colorCount % colors.length]);
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

    strokeWeight(1);
    stroke(0);
    beginShape();
    points.forEach((p) => vertex(p.x, p.y));
    endShape(CLOSE);
    colorCount++;
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_19_22.jpeg");
  }
}
