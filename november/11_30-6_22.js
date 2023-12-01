const red = "#F23545";
let t = 0;
function setup() {
  createCanvas(600, 900);
  background("beige");
  stroke(0);

  chord();
  strokeWeight(5);

  fill("beige");

  rect(150, 300, 300, 300, 20, 20, 20, 20);

  rect(100, 350, 50, 20, 5, 0, 0, 5);
  rect(70, 353, 30, 15, 5, 0, 0, 5);
  rect(450, 350, 50, 20, 0, 0, 0, 0);
  strokeWeight(3);
  ellipse(485, 360, 10, 10);
}
function draw() {
  background("beige");
  stroke(0);

  chord();
  strokeWeight(5);

  fill("beige");

  rect(150, 300, 300, 300, 20, 20, 20, 20);

  rect(100, 350, 50, 20, 5, 0, 0, 5);
  rect(70, 353, 30, 15, 5, 0, 0, 5);
  rect(450, 350, 50, 20, 0, 0, 0, 0);
  strokeWeight(3);
  ellipse(485, 360, 10, 10);
  t += 0.01;
}
function chord() {
  let point0 = createVector(70, 360);
  let curX = point0.x;
  let curY = point0.y;
  strokeCap(ROUND);
  strokeWeight(10);
  noFill();
  beginShape();
  for (let i = 0; i < 1000; i++) {
    vertex(curX, curY);
    let angle = map(noise(curX / 1000, curY / 1000, t), 0, 1, 0, TAU);
    let len = 1;
    let nextPoint = createVector(
      curX + len * Math.cos(angle),
      curY + len * Math.sin(angle)
    );
    curX = nextPoint.x;
    curY = nextPoint.y;
  }
  endShape();
}
