function setup() {
  createCanvas(1080, 1080);
  background(0);
  stroke(255);
  var scribble = new Scribble();
  strokeWeight(5);

  let midX = width / 2;
  let midY = height / 2;

  let curX = midX;
  let curY = midY;

  for (let i = 0; i < 100; i++) {
    let a = noise(curX / 100, curY / 100) * TAU;
    let len = 1;

    let nextX = curX + len * Math.cos(a);
    let nextY = curY + len * Math.sin(a);

    scribble.roughness = 20;
    scribble.scribbleLine(curX, curY, nextX, nextY);
    curX = nextX;
    curY = nextY;
  }
}
