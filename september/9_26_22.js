function setup() {
  createCanvas(600, 600);
  background(0);

  for (let i = 0; i < 10; i++) {
    let prevX = 0;
    let prevY = random(200, 400);
    while (prevX < width) {
      let nextX = prevX + random(100);
      let angle = map(prevX, 0, width, 0, Math.PI);
      let yRange = Math.abs(Math.cos(angle)) * 100;
      let nextY = random(-yRange + 300, yRange + 300);
      stroke(255);
      line(prevX, prevY, nextX, nextY);
      prevX = nextX;
      prevY = nextY;
    }
  }

  console.log(Math.abs(cos(PI)));
}
function draw() {}
