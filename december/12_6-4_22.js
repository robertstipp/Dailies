const colors = ["#fdfce0", "#f0eeb1", "#dad773", "#b1ad25"];
const colors2 = ["#439A97", "#62B6B7", "#97DECE", "#CBEDD5"];
let t = 0;

function setup() {
  createCanvas(1080, 1080);
  background(0);

  for (let theta = 0; theta <= TAU; theta += 0.012) {
    let radius = 200;
    let curX = 500 + radius * Math.cos(theta);
    let curY = 500 + radius * Math.sin(theta);

    // beginShape();

    noFill();
    // stroke(255);
    let dev = random(0, 10);
    stroke(random(colors2));
    for (let i = 0; i < 1000; i++) {
      let d = dist(curX, curY, 500, 500);
      let res = map(d, 120, 1000, 1000, 500);
      let targetAngle = map(i, 0, 105, theta, 0);
      let dev = map(i, 0, 1000, 1, 10);
      let angle = map(
        noise(curX / res, curY / res),
        0,
        1,
        targetAngle - dev,
        targetAngle + dev
      );
      let len = 9;
      let nextX = curX + len * Math.cos(angle);
      let nextY = curY + len * Math.sin(angle);

      // ellipse(nextX, nextY, 10);
      let sw = map(d, radius, 500, 2, 0.1);
      strokeWeight(sw);
      line(curX, curY, nextX, nextY);
      // vertex(curX, curY);
      curX = nextX;
      curY = nextY;

      if (
        curX < 0 ||
        curX > 1080 ||
        curY < 0 ||
        curY > 1080 ||
        d < radius - 10 ||
        d > 500
      ) {
        break;
      }
    }

    // endShape();
  }
}

function draw() {}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_6_22.jpeg");
  }
}
