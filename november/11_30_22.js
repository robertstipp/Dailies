const yellow = "#fac901";
const white = "#000";
const blue = "#225095";
const red = "#dd0100";

const colors = [yellow, blue, red];

const shapes = ["bigCircle", "smallCircle", "roundedRect"];

function setup() {
  createCanvas(1100, 1100);
  background(255);
  let rows = 10;
  let cols = 10;
  const arr = new Array(rows).fill().map(() => Array(cols).fill(0));

  let xStart = 50;
  let yStart = 50;
  let xStep = 100;
  let yStep = 100;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!arr[i][j]) {
        let shape = random(shapes);
        noStroke();
        if (shape === "bigCircle" && i < rows - 1 && j < cols - 1) {
          noFill();
          strokeWeight(10);
          stroke(random(colors));
          ellipse(xStart + xStep * i + xStep, yStart + yStep * j + yStep, 190);
          arr[i][j] = 2;
          arr[i + 1][j] = 2;
          arr[i][j + 1] = 2;
          arr[i + 1][j + 1] = 2;
        } else if (shape === "smallCircle") {
          fill(random(colors));
          ellipse(
            xStart + xStep * i + xStep / 2,
            yStart + yStep * j + yStep / 2,
            100
          );
        } else if (shape === "roundedRect") {
          fill(random(colors));
          rect(xStart + xStep * i, yStart + yStep * j, 100);
        } else {
          fill(random(colors));
          ellipse(
            xStart + xStep * i + xStep / 4,
            yStart + yStep * j + yStep / 4,
            50
          );
          fill(random(colors));
          ellipse(
            xStart + xStep * i + (xStep * 3) / 4,
            yStart + yStep * j + (yStep * 3) / 4,
            50
          );
          fill(random(colors));
          ellipse(
            xStart + xStep * i + (xStep * 3) / 4,
            yStart + yStep * j + (yStep * 1) / 4,
            50
          );
          fill(random(colors));
          ellipse(
            xStart + xStep * i + (xStep * 1) / 4,
            yStart + yStep * j + (yStep * 3) / 4,
            50
          );
        }
      }
    }
  }
  console.log(arr);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_30_22.jpeg");
  }
}
