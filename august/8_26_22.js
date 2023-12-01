let colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];

let mic;
let song;
let fft;
let bass;
let mid;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(600, 600);
  background(0);
  noFill();
  stroke(255);

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  // drawHexagon(300, 300, 100);
  recursiveHexagon(300, 300, 3, 200);
}
function draw() {
  background(0);
  console.log(getFrameRate());
  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  recursiveHexagon(300, 300, 1, bass);
}

function drawHexagon(cX, cY, r) {
  // let counter = 0;

  let point0 = createVector(cX, cY);

  let pointA = createVector(
    cX + r * cos((3 * PI) / 2),
    cY + r * sin((3 * PI) / 2)
  );
  let pointB = createVector(
    cX + r * cos((11 * PI) / 6),
    cY + r * sin((11 * PI) / 6)
  );

  let pointC = createVector(cX + r * cos(PI / 6), cY + r * sin(PI / 6));

  let pointD = createVector(cX, cY + r);

  let pointF = createVector(
    cX + r * cos((7 * PI) / 6),
    cY + r * sin((7 * PI) / 6)
  );

  let pointE = createVector(
    cX + r * cos((5 * PI) / 6),
    cY + r * sin((5 * PI) / 6)
  );

  // line(cX, cY, pointA.x, pointA.y);
  // line(cX, cY, pointB.x, pointB.y);
  // line(cX, cY, pointC.x, pointC.y);
  // line(cX, cY, pointD.x, pointD.y);
  // line(cX, cY, pointE.x, pointE.y);
  // line(cX, cY, pointF.x, pointF.y);

  lerpLines(point0, pointB, pointD, pointC);
  lerpLines(point0, pointF, pointB, pointA);
  lerpLines(point0, pointF, pointD, pointE);

  // line(cX, cY, cX + r * cos((5 * PI) / 6), cY + r * sin((5 * PI) / 6));

  // beginShape();
  // for (let a = TAU / 12; a < TAU + TAU / 12; a += TAU / 6) {
  //   let x1 = cX + r * cos(a);
  //   let y1 = cY + r * sin(a);

  //   vertex(x1, y1);
  //   // counter++;
  // }

  // endShape(CLOSE);
}

function recursiveHexagon(cX, cY, depth, r) {
  if (depth == 0) {
    drawHexagon(cX, cY, r);
  } else {
    recursiveHexagon(cX, cY, depth - 1, r / 2);
    for (let a = 0; a < TAU; a += TAU / 6) {
      var x = cX + r * cos(a);
      var y = cY + r * sin(a);

      if (depth > 0) {
        recursiveHexagon(x, y, depth - 1, r / 2);
      }
    }
  }
}

function lerpLines(p1, p2, p3, p4) {
  for (let t = 0; t <= 1.05; t += 0.05) {
    let x1 = lerp(p1.x, p2.x, t);
    let y1 = lerp(p1.y, p2.y, t);
    let x2 = lerp(p3.x, p4.x, t);
    let y2 = lerp(p3.y, p4.y, t);

    push();
    let colorIndex = Math.floor(noise(x1 / 20, y1 / 20) * colors.length);
    stroke(colors[colorIndex]);
    strokeWeight(2);
    line(x1, y1, x2, y2);

    // for (let t = 0; t <= 1.05; t += 0.1) {
    //   let xInt = lerp(x1, x2, t);
    //   let yInt = lerp(y1, y2, t);
    //   ellipse(xInt, yInt, 2);
    // }

    pop();
  }
}

function keyPressed() {
  if (keyCode == "83") {
    console.log("saved");
    save("aug_26_22.jpeg");
  }
}
function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
