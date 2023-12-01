let cols = 10;
let rows = 10;
let colSpacing, rowSpacing;
let effWidth, effHeight;
let margin = 100;
let visited = [];
let grids = [
  [20, 20],
  [40, 40],
  [60, 60],
];
function setup() {
  createCanvas(1080, 1080, SVG);

  stroke(0);
  noLoop();
  noFill();
}
function draw() {
  for (let k = 0; k < 3; k++) {
    cols = grids[k][0];
    rows = grids[k][1];
    effWidth = width - 2 * margin;
    effHeight = height - 2 * margin;
    colSpacing = effWidth / cols;
    rowSpacing = effHeight / rows;

    let curX = Math.floor(random(cols));
    let curY = Math.floor(random(rows));

    let endX = Math.floor(random(cols));
    let endY = Math.floor(random(rows));

    for (let i = 0; i < 2000; i++) {
      let posX = curX * colSpacing + margin;
      let posY = curY * rowSpacing + margin;

      // ellipse(posX, posY, 10, 10);
      let nextX = curX + Math.floor(random(-1, 2));
      let nextY = curY + Math.floor(random(-1, 2));
      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) {
        continue;
      }
      let nextXPos = nextX * colSpacing + margin;
      let nextYPos = nextY * rowSpacing + margin;
      line(posX, posY, nextXPos, nextYPos);
      curX = nextX;
      curY = nextY;
    }
  }
}
function keyPressed() {
  if (key == "s") {
    save("1_18_23.svg");
  }
}
