function setup() {
  w = min(windowWidth, windowHeight);
  wx = w * 1.6;
  wy = w * 0.9;
  createCanvas(wx, wy);

  padding = 30;
  spacing = 5;

  bools = [];
  for (let x = padding; x < w - padding; x += spacing) {
    row = [];
    for (let y = padding; y < w - padding; y += spacing) {
      row.push(0);
      randomRowIndex = int(noise(x * 0.01, y * 0.01) * row.length);
    }

    row[randomRowIndex] = 1;
    bools.push(row);
  }
}

let prevI = 0;
let prevJ = 0;
function draw() {
  for (let i = 0; i < bools.length; i++) {
    for (let j = 0; j < bools[0].length; j++) {
      if (bools[i][j]) {
        if (i > 0) {
          line(
            (i - 1) * spacing + padding,
            j * spacing + padding,
            i * spacing + padding,
            j * spacing + padding
          );

          line(
            (i - 1) * spacing + padding,
            j * spacing + padding,
            prevI * spacing + padding,
            prevJ * spacing + padding
          );
        }
        prevI = i;
        prevJ = j;
        // ellipse(i * spacing + padding, j * spacing + padding, 2);
      } else {
        point(i * spacing + padding, j * spacing + padding);
      }
    }
  }
}
