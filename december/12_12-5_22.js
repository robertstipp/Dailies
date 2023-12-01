let numCols = 20;
let numRows = 2 * numCols;

let clr1 = "#A555EC";
let clr2 = "#D09CFA";

function setup() {
  pixelDensity(4);
  createCanvas(1080, 1920);
  background(220);
  noStroke();
  let colW = width / numCols;
  let colH = height / numRows;
  for (let x = 0; x <= width - colW + 0.01; x += colW) {
    for (let y = 0; y <= height - colH + 0.01; y += colH) {
      let prob = map(y, 0, height, 0, 1);
      if (random() < prob) {
        let bg = clr1;
        fill(bg);
        rect(x, y, colW, colH);
        let prob2 = map(y, 0, height, 0, 1);
        if (random() < prob2) {
          shape1(x + colW / 2, y + colH / 2, colW, bg);
        } else {
          shape2(x + colW / 2, y + colH / 2, colW, bg);
        }
      } else {
        let bg = clr2;
        fill(bg);
        rect(x, y, colW, colH);
        let prob2 = map(y, 0, height, 0, 1);
        if (random() < prob2) {
          shape1(x + colW / 2, y + colH / 2, colW, bg);
        } else {
          shape2(x + colW / 2, y + colH / 2, colW, bg);
        }
      }
      // rect(x, y, 100, 100);
    }
  }
}

function shape1(x, y, size, bg) {
  if (bg === clr1) {
    fill(clr2);
    ellipse(x, y, size / 1.8);
    fill(clr1);
    ellipse(x, y, size / 6);
  } else {
    fill(clr1);
    ellipse(x, y, size / 1.8);
    fill(clr2);
    ellipse(x, y, size / 6);
  }
}

function shape2(x, y, size, bg) {
  push();
  rectMode(CENTER);
  if (bg === clr1) {
    fill(clr2);
    rect(x, y, size / 1.8);
    fill(clr1);
    ellipse(x, y, size / 6);
  } else {
    fill(clr1);
    rect(x, y, size / 1.8);
    fill(clr2);
    ellipse(x, y, size / 6);
  }
  pop();
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_13_22.jpeg");
  }
}
