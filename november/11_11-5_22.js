let step = 400;

let t = 0;
function setup() {
  createCanvas(600, 600);
  background(0);

  for (let i = 0; i < 300; i++) {
    stroke(255);
    band(300, 300, (TAU / 300) * i);
  }
}
function draw() {
  // background(255);
  // for (let i = 0; i < 100; i++) {
  //   band(300, 300, (TAU / 100) * i);
  //   band(100, 100, (TAU / 100) * i);
  // }
  // t += 0.001;
}

function band(originX, originY, angleOriginal) {
  let x1 = originX;
  let y1 = originY;
  let angleDir = angleOriginal;
  noiseSeed(Math.floor(random(2000)));
  while (!checkBounds(x1, y1, originX, originY)) {
    let angle = map(
      noise(x1 / 10, y1 / 10, t / 100),
      0,
      1,
      angleDir - PI / 4,
      angleDir + PI / 4
    );
    let len = noise(x1 / 10, y1 / 10, t) * 2;
    let x2 = x1 + len * Math.cos(angle);
    let y2 = y1 + len * Math.sin(angle);

    line(x1, y1, x2, y2);
    [x1, y1] = [x2, y2];
  }
}

function checkBounds(x, y, xOrigin, yOrigin) {
  return (
    x < xOrigin - step / 2 ||
    x > xOrigin + step / 2 ||
    y < yOrigin - step / 2 ||
    y > yOrigin + step / 2
  );
}
