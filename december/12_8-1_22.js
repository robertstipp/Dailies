function setup() {
  createCanvas(600, 600);
  background(0);

  stroke(255);

  for (let x = 0; x <= 600; x += 100) {
    for (let y = 0; y <= 600; y += 100) {
      for (let theta = 0; theta <= TAU; theta += TAU / 20) {
        let curX = x + 10 * Math.cos(theta);
        let curY = y + 10 * Math.sin(theta);
        for (let i = 0; i < 100; i++) {
          let startAngle = PI / 2;
          let d = dist(curX, curY, x, y);
          let angle = map(
            noise(curX / 100, curY / 10000, d / 100),
            0,
            1,
            0,
            PI
          );
          let len = 10;
          let effAngle = map(i, 0, 10, angle, angle);

          let nextX = curX + len * Math.cos(angle);
          let nextY = curY + len * Math.sin(angle);

          line(curX, curY, nextX, nextY);

          curX = nextX;
          curY = nextY;
        }
      }
    }
  }
}
