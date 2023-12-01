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
  createCanvas(1080, 1080);

  background(0);

  noFill();
  stroke(255);
  let x = 100;
  let y = 100;
  let w = 50;
  let h = 50;

  // rect(200, 200, 200, 200);

  // topEdge
  for (let x = 100; x < width - 100; x += 100) {
    for (let y = 100; y <= height - 100; y += 100) {
      threadedRect(x, y, w, h);
    }
  }
}

function threadedRect(x, y, w, h) {
  let midPoint = createVector(x + w / 2, y + h / 2);
  let corners = [];
  corners.push(createVector(x, y));
  corners.push(createVector(x + w, y));
  corners.push(createVector(x + w, y + h));
  corners.push(createVector(x, y + h));

  beginShape();
  corners.forEach((point) => {
    vertex(point.x, point.y);
  });
  endShape(CLOSE);

  for (let i = 0; i < corners.length; i++) {
    let corner1 = corners[i];
    let corner2 = corners[i + 1] || corners[0];
    let tStep = map(noise(midPoint.x, midPoint.y), 0, 1, 0.5, 0.01);
    for (let t = 0; t <= 1; t += tStep) {
      // left/right

      if (corner1.x === corner2.x) {
        let start = p5.Vector.lerp(corner1, corner2, t);
        let xStep = random(w / 2);
        let xStepIn = -random(w / 2);
        if (corner1 === corners[3]) {
          xStep *= -1;
          xStepIn *= -1;
        }
        let end = createVector(start.x + xStep, start.y);
        start = createVector(start.x + xStepIn, start.y);
        line(start.x, start.y, end.x, end.y);
      } else {
        // top/bottom
        let start = p5.Vector.lerp(corner1, corner2, t);
        let yStep = random(h / 2);
        let yStepIn = -random(h / 2);
        if (corner1 === corners[0]) {
          yStep *= -1;
          yStepIn *= -1;
        }
        let end = createVector(start.x, start.y + yStep);
        start = createVector(start.x, start.y + yStepIn);
        line(start.x, start.y, end.x, end.y);
      }
    }
  }

  return corners;
}
