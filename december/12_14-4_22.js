let numCols = 10;
let numRows = 10;
let simplexNoise;
function setup() {
  createCanvas(600, 600);
  background(255);
  strokeWeight(10);
  noFill();
  simplexNoise = new openSimplexNoise(Date.now());
  for (let startX = -400; startX <= width + 400; startX += width / numCols) {
    let curX = startX;
    let curY = 0;
    beginShape();
    while (curY <= height + 100) {
      let angle = map(
        simplexNoise.noise3D(curX / 1000, curY / 1000),
        -1,
        1,
        PI / 3,
        (PI * 2) / 3
      );
      let len = 1;

      let nextX = curX + len * Math.cos(angle);
      let nextY = curY + len * Math.sin(angle);

      vertex(nextX, nextY);
      curX = nextX;
      curY = nextY;
    }
    endShape();
  }

  for (let startY = -400; startY <= height + 300; startY += height / numRows) {
    let curX = 0;
    let curY = startY;

    beginShape();
    while (curX <= width + 100) {
      let d = dist(curX, curY, width / 2, height / 2);
      let angle = map(
        simplexNoise.noise3D(curX / 1000, curY / 1000, d / 10),
        -1,
        1,
        -PI / 3,
        PI / 3
      );
      let len = 1;

      let nextX = curX + len * Math.cos(angle);
      let nextY = curY + len * Math.sin(angle);
      console.log(curX, curY);
      vertex(nextX, nextY);
      curX = nextX;
      curY = nextY;
      // break;
    }
    endShape();
  }
}
