let cols = 1000;
let rows = 200;
let margin = 300;
let effW, effH;
let cellW, cellH;
let e;
let img;
function preload() {
  img = loadImage("../media/rose.jpg");
}
function setup() {}
function draw() {
  let effW = width - margin * 2;
  let effH = height - margin * 2;
  let cellW = effW / cols;
  let cellH = effH / rows;
  let cell0 = createVector(margin + cellW / 2, margin + cellH / 2);
  let maxD = dist(cell0.x, cell0.y, width / 2, height / 2);
  for (let j = 0; j < rows; j++) {
    beginShape();
    for (let i = 0; i < cols; i++) {
      let cellPos = createVector(i * cellW + margin, j * cellH + margin);

      let corners = [
        createVector(cellPos.x, cellPos.y),
        createVector(cellPos.x + cellW, cellPos.y),
        createVector(cellPos.x + cellW, cellPos.y + cellH),
        createVector(cellPos.x, cellPos.y + cellH),
      ];

      // rect(cellPos.x, cellPos.y, cellW, cellH);
      let cellMid = cellPos.copy().add([cellW / 2, cellH / 2]);
      let d = dist(cellMid.x, cellMid.y, width / 2, height / 2);
      let angle = atan2(cellMid.y - height / 2, cellMid.x - width / 2);
      let magInt = map(d, 0, maxD, 0, 1);
      let mag = e.exponentialEmphasis(magInt, 0.2);
      let shiftVec = p5.Vector.fromAngle(angle, mag * maxD);
      cellMid.add(shiftVec);

      if (
        cellMid.x > 100 &&
        cellMid.x < width - 100 &&
        cellMid.y > 100 &&
        cellMid.y < height - 100
      ) {
        vertex(cellMid.x, cellMid.y);
        // ellipse(cellMid.x, cellMid.y, 10, 10);
      }
    }
    endShape();
  }

  ellipse(width / 2, height / 2, 50, 50);
}
function keyPressed() {
  if (key == "s") {
    save("sketch_2_20_23", "svg");
  }
}
