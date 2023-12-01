function setup() {
  createCanvas(600, 600);
  background(0);

  let curx = 0;
  let cury = 300;

  stroke(255);
  for (let i = 0; i < 100; i++) {
    let angle = noise(curx / 100, cury / 100) * TWO_PI;
    let len = 10;
    let nextx = curx + len * cos(angle);
    let nexty = cury + len * sin(angle);
    line(curx, cury, nextx, nexty);
    curx = nextx;
    cury = nexty;
  }
}
