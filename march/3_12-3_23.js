let song;
let mic, fft, spectrum, filter, recorder, level;
let TWO_PI = Math.PI * 2;
let origin;
let angleStep = TWO_PI / 1024;
let baseRad = 100;
let angleOffset = 0;
function preload() {
  song = loadSound("../media/01 Let You Know (feat. London Gramma.mp3");
}

function setup() {
  createCanvas(800, 800);
  mic = new p5.AudioIn();
  mic.start();

  // mic.connect(filter);

  fft = new p5.FFT();
  fft.setInput(mic);
  origin = createVector(width / 2, height / 2);
  // noLoop();
}

function draw() {
  spectrum = fft.analyze();
  level = mic.getLevel();
  let innerRadius = map(level * level, 0, 1, 50, 100);
  console.log(innerRadius);
  let bgColor = 0;
  let stColor = 255;
  background(bgColor, 30);
  stroke(stColor);
  let len = spectrum.length;
  let numRings = 4;
  for (let ring = 0; ring < numRings; ring++) {
    let shift = (ring * TAU) / numRings;
    let direction = ring % 2 == 0 ? 1 : -1;
    beginShape();
    for (let i = 0; i < len; i++) {
      let angle = i * angleStep + shift - direction * angleOffset;
      let effRad = map(noise(cos(angle) / 100), 0, 1, innerRadius, 100);
      let effBoost = map(spectrum[i], 0, 255, 0, 200);
      let pos = origin
        .copy()
        .add(p5.Vector.fromAngle(angle).mult(effBoost + effRad));

      // fill(255, 10, 20, 10);

      // rect(x, height, width / len, -h);
      vertex(pos.x, pos.y);
      // ellipse(pos.x, pos.y, 10, 10);
    }
    endShape();
  }

  // beginShape();
  // for (let i = 0; i < len; i++) {
  //   let angle = i * angleStep + Math.PI / 2 - angleOffset;
  //   let effRad = map(noise(cos(angle) / 100), 0, 1, innerRadius, 100);
  //   let effBoost = map(spectrum[i], 0, 255, 0, 200);
  //   let pos = origin
  //     .copy()
  //     .add(p5.Vector.fromAngle(angle).mult(effBoost + effRad));
  //   let h = map(spectrum[i], 0, 255, 0, height);
  //   noFill();

  //   // rect(x, height, width / len, -h);
  //   vertex(pos.x, pos.y);
  //   // ellipse(pos.x, pos.y, 10, 10);
  // }
  // endShape();

  // beginShape();
  // for (let i = 0; i < len; i++) {
  //   let angle = i * angleStep + Math.PI + angleOffset;
  //   let effRad = map(noise(cos(angle) / 100), 0, 1, innerRadius, 100);
  //   let effBoost = map(spectrum[i], 0, 255, 0, 200);
  //   let pos = origin
  //     .copy()
  //     .add(p5.Vector.fromAngle(angle).mult(effBoost + effRad));
  //   let h = map(spectrum[i], 0, 255, 0, height);
  //   noFill();

  //   // rect(x, height, width / len, -h);
  //   vertex(pos.x, pos.y);
  //   // ellipse(pos.x, pos.y, 10, 10);
  // }
  // endShape();

  beginShape();
  for (let i = 0; i < len; i++) {
    let angle = i * angleStep + (Math.PI * 3) / 2 - angleOffset;
    let effRad = map(noise(cos(angle) / 100), 0, 1, innerRadius, 100);
    let effBoost = map(spectrum[i], 0, 255, 0, 200);
    let pos = origin
      .copy()
      .add(p5.Vector.fromAngle(angle).mult(effBoost + effRad));
    let h = map(spectrum[i], 0, 255, 0, height);
    noFill();

    // rect(x, height, width / len, -h);
    vertex(pos.x, pos.y);
    // ellipse(pos.x, pos.y, 10, 10);
  }
  endShape();
  angleOffset += 0.01;
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
