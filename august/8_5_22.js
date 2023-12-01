let mic;
let song;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

const colors = [
  "#f72585",
  "#b5179e",
  "#7209b7",
  "#560bad",
  "#480ca8",
  "#3a0ca3",
  "#3f37c9",
  "#4361ee",
  "#4895ef",
  " #4cc9f0",
];

let delT = 0;
function setup() {
  createCanvas(1080, 1920);
}

function draw() {
  background(255);

  for (x = 140; x < width; x += 200) {
    for (y = 100; y < height; y += 200) {
      drawShape(x, y, 30, delT);
      drawShape(x, y, 60, delT + x);
      drawShape(x, y, 30, delT + y);
    }
  }

  noLoop();
}

function lerpVertex(p1, p2, delT) {
  for (let t = 0; t < 1.01; t += 0.1) {
    let x1 = lerp(p1.x, p2.x, t);
    let y1 = lerp(p1.y, p2.y, t);
    x1 += noise(x1, y1, delT) * 10;
    y1 += noise(x1, y1, delT) * 10;
    vertex(x1, y1);
  }
}

function drawShape(x, y, angle, delT) {
  push();
  translate(x, y);
  rotate(radians(angle));
  stroke(color(random(colors)));
  strokeWeight(60);
  noFill();
  // fill(color(random(colors)));
  let p1 = createVector(-100, -100);
  let p2 = createVector(100, -100);
  let p3 = createVector(100, 100);
  let p4 = createVector(-100, 100);

  beginShape();
  lerpVertex(p1, p2, delT);
  lerpVertex(p2, p3, delT);
  lerpVertex(p3, p4, delT);
  lerpVertex(p4, p1, delT);
  endShape(CLOSE);

  pop();
}

function keyPressed() {
  // 83 is key code for key "s"s
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save("aug_5_22.jpeg");
  }
}
