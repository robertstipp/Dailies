let aspectRatio = 1;

let colors = ["red", "blue", "yellow", "black"];
let e, g;
let ringsArr = [];
let cols = 23;
let rows = 40;
function setup() {
  createCanvas(1080, 2160, SVG);
  e = new p5.Ease();
  g = new p5.Gen();
  noFill();
  noLoop();
}

function draw() {
  let margin = 100;
  let effW = width - 2 * margin;
  let cellW = effW / cols;
  let cellH = cellW;

  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let x = margin + i * cellW;
      let y = margin + j * cellH;
      let w = cellW;
      let h = cellH;
      let mid = createVector(x + w / 2, y + h / 2);

      let color = getColor(i, j);
      let size = getSize(i, j);
      // ellipse(mid.x, mid.y, 10, 10);
      // rect(x, y, w, h);
      noStroke();
      let gap = 0.1;

      if (i < cols / 2 && j < rows / 2) {
        let origin = createVector(x + w, y + h);

        fill(color);
        let arcRad = w * 2 * size;
        arc(origin.x, origin.y, arcRad, arcRad, PI, PI + PI / 2, PIE);
      }
      if (i < cols / 2 && j > rows / 2) {
        let origin = createVector(x + w, y - h);

        fill(color);
        let arcRad = w * 2 * size;
        arc(origin.x, origin.y, arcRad, arcRad, PI / 2, PI, PIE);
      }
      if (i > cols / 2 && j < rows / 2) {
        let origin = createVector(x, y + h);

        fill(color);
        let arcRad = w * 2 * size;
        arc(origin.x, origin.y, arcRad, arcRad, PI + PI / 2, TAU, PIE);
      }
      if (i > cols / 2 && j > rows / 2) {
        let origin = createVector(x, y - h);

        fill(color);
        let arcRad = w * 2 * size;
        arc(origin.x, origin.y, arcRad, arcRad, 0, PI / 2, PIE);
      }

      if (i == cols / 2 && j < rows / 2) {
        let origin = createVector(x, y + h);

        fill(color);
        let arcRad = w * 2 * size;
        arc(origin.x, origin.y, arcRad, arcRad, PI, PI + PI / 2, PIE);
      }
    }
  }
}

function getColor(i, j) {
  let midI = Math.floor(cols / 2);

  let midJ = Math.floor(rows / 2);
  let xDiff = i % midI;
  let yDiff = j % midJ;
  let noiseVal = noise(xDiff, yDiff);
  console.log(noiseVal);
  let colorIndex = Math.floor(noiseVal * colors.length);
  return colors[colorIndex];
}

function getSize(i, j) {
  let midI = Math.floor(cols / 2);
  let midJ = Math.floor(rows / 2);
  let xDiff = i % midI;
  let yDiff = j % midJ;
  let noiseVal = noise(xDiff, yDiff);

  return map(noiseVal, 0, 1, 0.8, 1);
}

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.svg");
  }
}
