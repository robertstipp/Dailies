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
  createCanvas(1080, 1080);
  background(255);

  for (let i = 0; i < 5000; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let position = createVector(x, y);
    ribbon(position, 10);
  }
}

function draw() {}

function block(currentTop, nextTop, nextBottom, currentBottom) {
  fill(random(colors));
  noStroke();
  beginShape();
  vertex(currentTop.x, currentTop.y);
  vertex(nextTop.x, nextTop.y);
  vertex(nextBottom.x, nextBottom.y);
  vertex(currentBottom.x, currentBottom.y);

  endShape();
}

function ribbon(top, thickness) {
  let topPoints = [];
  let bottomPoints = [];
  let bottom = createVector(top.x, top.y + thickness);
  let currentTop = top.copy();
  let currentBottom = bottom.copy();
  for (let i = 0; i < 10000; i++) {
    let average = p5.Vector.lerp(currentTop, currentTop, 0.5);
    let angleMap = map(average.x, 0, width, 0, PI);
    let angle = map(
      noise(average.x / 100, average.y / 100, Math.sin(angleMap)),
      0,
      1,
      0,
      2 * TAU
    );
    let len = 1;
    let nextTop = p5.Vector.fromAngle(angle, len).add(currentTop);
    let nextBottom = p5.Vector.fromAngle(angle, len).add(currentBottom);
    topPoints.push(currentTop);
    bottomPoints.push(currentBottom);
    // block(currentTop, nextTop, nextBottom, currentBottom);
    currentTop = nextTop;
    currentBottom = nextBottom;
  }
  let allPoints = [];
  allPoints = topPoints.concat(bottomPoints.reverse());
  fill(random(colors));
  noStroke();
  beginShape();
  allPoints.forEach((p) => {
    vertex(p.x, p.y);
  });
  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_20_22.jpeg");
  }
}
