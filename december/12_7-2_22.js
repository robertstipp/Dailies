const colors = [
  "#580aff",
  "#be0aff",
  "#ff0000",
  "#EA047E",
  "#ffd300",
  "#deff0a",
  "#a1ff0a",
  "#00F5FF",
  "#147df5",
];

const black = "#000000";
const red = "#be1e2d";
const yellow = "#ffde17";
const white = "#ffffff";
const blue = "#21409a";
const purple = "#292c6d";

const colors3 = [red, blue, yellow];
const colors2 = ["#EA047E", "#FF6D28", "#FCE700", "#00F5FF"];
function setup() {
  createCanvas(1080, 1080);
  background(20);
  let count = 0;
  for (let y = 0; y <= height + 100; y += 225) {
    for (let x = 0; x <= width + 100; x += 129) {
      if (count % 2 === 0) {
        tri(x, y, 300, true);
      } else {
        tri(x, y + 75, 300, false);
      }
      count++;
    }
  }

  let borderWidth = 20;
  let borderColor = 255;
  fill(borderColor);
  rect(0, 0, width, borderWidth);
  rect(0, 0, borderWidth, height);
  rect(0, height - borderWidth, width, borderWidth);
  rect(width - borderWidth, 0, borderWidth, height);
  // for (let x = 0; x <= width; x += 70) {
  //   if (count % 2 === 0) {
  //     drawTri(x, 300, 50, false);
  //   } else {
  //     drawTri(x, 300, 50, true);
  //   }
  //   count++;
  // }
}

function draw() {}

function drawTri(x, y, size, rot) {
  noStroke();
  push();
  translate(x, y);
  if (rot) {
    rotate(PI);
  }

  let point0 = createVector(0, 0);
  let point1 = createVector(point0.x - size, point0.y + size / 1.5);
  let point2 = createVector(point0.x, point0.y - size);
  let point3 = createVector(point0.x + size, point0.y + size / 1.5);

  let c = random(colors);
  fill(darken(c, random(20, 100)));
  // left side
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point1.x, point1.y);
  vertex(point2.x, point2.y);
  endShape();
  // rightside
  fill(darken(c, random(20, 100)));
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point2.x, point2.y);
  vertex(point3.x, point3.y);
  endShape();

  // bottomside
  fill(darken(c, random(20, 100)));
  beginShape();
  vertex(point0.x, point0.y);
  vertex(point1.x, point1.y);
  vertex(point3.x, point3.y);
  endShape();
  pop();
}

function tri(x, y, size, rot) {
  noStroke();
  let vertices = 3;
  let radius = size / 2;
  let startAngle = PI / 6;

  let points = [];
  points[0] = createVector(0, 0);
  for (
    let angle = startAngle;
    angle <= TAU + startAngle;
    angle += TAU / vertices
  ) {
    let xPos = 0 + radius * Math.cos(angle);
    let yPos = 0 + radius * Math.sin(angle);
    points.push(createVector(xPos, yPos));
  }

  // points.forEach((point) => {
  //   ellipse(point.x, point.y, 10);
  // });
  push();
  translate(x, y);
  if (rot) {
    rotate(PI);
  }

  let d = dist(x, y, width / 2, height / 2);
  let val = noise(d / 1000) * 8;
  let low = Math.floor(val);
  let high = Math.ceil(val);
  let inter = val - low;
  console.log(low);
  console.log(high);

  let fromColor = color(colors[low]);
  let toColor = color(colors[high]);
  let c = lerpColor(fromColor, toColor, inter);

  fill(darken(c, random(50, 100)));
  //bottom side
  beginShape();
  vertex(points[0].x, points[0].y);
  vertex(points[2].x, points[2].y);
  vertex(points[1].x, points[1].y);
  endShape(CLOSE);
  //bottom side
  fill(darken(c, random(50, 100)));
  beginShape();
  vertex(points[0].x, points[0].y);
  vertex(points[2].x, points[2].y);
  vertex(points[3].x, points[3].y);
  endShape(CLOSE);
  //right side
  fill(darken(c, random(50, 100)));
  beginShape();
  vertex(points[0].x, points[0].y);
  vertex(points[1].x, points[1].y);
  vertex(points[3].x, points[3].y);
  endShape(CLOSE);
  pop();
}

function darken(clr, bri) {
  let c = color(clr);
  colorMode(HSB);

  const h = hue(c);
  const s = saturation(c);
  const b = brightness(c);

  return color(h, s, bri);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_7_22.jpeg");
  }
}
