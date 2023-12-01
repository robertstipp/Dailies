const yellow = "#F2CC0C";
const white = "#FAF9F6";
const blue = "#05AFF2";
const orange = "#F29F05";
const red = "#F23545";
const green = "#038C4C";

const purple1 = "#FFABE1";
const purple0 = "#FFE6E6";
const purple2 = "#A685E2";
const purple3 = "#6155A6";

// const colors = [white, blue, red, orange];
const colors = [purple0, purple1, purple2, purple3];
const shapes = [
  "square",
  "square",
  "square",
  "circle",
  "circle",
  "circle",
  "side-rect",
  "tri",
  "tri",
  "tri",
  "vert-rect",
];

function setup() {
  createCanvas(1000, 1100);
  background(white);
  strokeWeight(8);

  // arr setup
  const arr = Array(9)
    .fill()
    .map(() => Array(9).fill(0));

  let rows = arr.length;
  let cols = arr[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let shape = random(shapes);
      if (!arr[i][j]) {
        if (shape === "square" || shape === "tri" || shape === "circle") {
          arr[i][j] = shape;
        }
        if (shape === "side-rect" && j < cols - 1 && !arr[i][j + 1]) {
          arr[i][j] = shape;
          arr[i][j + 1] = "side-rect-r";
        } else if (shape === "side-rect" && !j < cols - 1) {
          arr[i][j] = random(["square", "tri"]);
        }
        if (shape === "vert-rect" && i < rows - 1) {
          arr[i][j] = shape;
          arr[i + 1][j] = "vert-rect-b";
        } else if (shape === "vert-rect" && !i < rows - 1) {
          arr[i][j] = random(["square", "tri"]);
        }
      }
    }
  }

  // grid setup
  // for (let y = 100; y <= 500; y += 100) {
  //   for (let x = 50; x <= 350; x += 100) {
  //     let num = random();
  //     fill(random(colors));
  //     if (num < 0.5) rect(x, y, 100);
  //   }
  // }

  let yStart = 100;
  let yStep = 100;
  let xStart = 50;
  let xStep = 100;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      fill(random(colors));
      let xPos = xStart + j * xStep;
      let yPos = yStart + i * yStep;
      let shape = arr[i][j];
      if (shape === "circle") {
        ellipse(xPos + xStep / 2, yPos + yStep / 2, 100);
      }
      if (shape === "square") {
        rect(xPos, yPos, 100);
      }
      if (shape === "side-rect") {
        rect(xPos, yPos, 200, 100);
      }
      if (shape === "vert-rect") {
        rect(xPos, yPos, 100, 200);
      }
      if (shape === "tri") {
        let triFun = random([vTri, hTri]);
        triFun(xPos + xStep / 2, yPos + yStep / 2, 100);
      }
    }
  }
}

function vTri(x, y, size) {
  strokeJoin(BEVEL);
  beginShape();
  vertex(x - size / 2, y + size / 2);
  vertex(x, y - size / 2.2);
  vertex(x + size / 2, y + size / 2);
  endShape(CLOSE);
}

function hTri(x, y, size) {
  strokeJoin(BEVEL);
  beginShape();
  vertex(x - size / 2, y + size / 2);
  vertex(x + size / 2, y - size / 2);
  vertex(x + size / 2, y + size / 2);
  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_29_22.jpeg");
  }
}
