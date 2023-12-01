const green = "#3fa796";
const brown = "#fec260";
const red = "#a10035";

const blue1 = "#002E94";
const blue2 = "#083AA9";
const blue3 = "#083AA9";
const blue4 = "#5F9DF7";
const oranges = [
  "#ff4800",
  "#ff5400",
  "#ff6000",
  "#ff6d00",
  "#ff7900",
  "#ff8500",
  "#ff9100",
  "#ff9e00",
  "#ffaa00",
  "#ffb600",
];

const colors = oranges;
function setup() {
  createCanvas(1080, 1080);
  background(0);

  let midX = width / 2;
  let midY = height / 2;

  let radStart = 100;
  let radEnd = 500;
  var scribble = new Scribble();
  for (let angle = 0; angle < TAU; angle += TAU / 500) {
    let c = color(random(colors));
    c.setAlpha(100);
    stroke(c);
    for (let radius = radStart; radius <= radEnd; radius += 5) {
      let xPos = midX + radius * Math.cos(angle);
      let yPos = midY + radius * Math.sin(angle);

      let curX = xPos;
      let curY = yPos;

      let angle0 = atan2(yPos - midY, xPos - midX);
      for (let i = 0; i < 100; i++) {
        let a = noise(curX / 100, curY / 100) * TAU;

        let d = dist(curX, curY, midX, midY);
        let dFact = constrain(map(d, radStart, 200, 1, 0), 0, 1);
        let effAngle = dFact * angle0 + (1 - dFact) * a;
        let len = 1;

        let nextX = curX + len * Math.cos(effAngle);
        let nextY = curY + len * Math.sin(effAngle);
        scribble.roughness = 3;
        scribble.bowing = 2;
        scribble.scribbleLine(curX, curY, nextX, nextY);
        curX = nextX;
        curY = nextY;
      }
    }
  }
}

function eclipse() {
  fill("black");
  ellipse(300, 550, 100);
  noStroke();
  fill("white");
  ellipse(300, 530, 100);
}

function sparkle(x, y, size) {
  strokeWeight(1);
  for (let angle = 0; angle < TAU; angle += TAU / 40) {
    let rad = random(size / 5, size);
    let xPos = x + rad * Math.cos(angle);
    let yPos = y + rad * Math.sin(angle);
    line(x, y, xPos, yPos);
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_8_22.jpeg");
  }
}
