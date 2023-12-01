let colors = ["#5f0f40", "#9a031e", "#fb8b24", "#e36414", "#0f4c5c"];

let bass;
let mic;
let song;
let fft;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(1080, 1920);
  background(0);
  noFill();
  stroke(255);
  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  // beginShape();
  // for (x = 0; x < width; x++) {
  //   if (x > 50 && x < 100) {
  //     vertex(x, 100);
  //   } else {
  //   }
  // }
  // endShape();
}

function draw() {
  background(0);

  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");

  for (let y = 0; y < height; y += 50) {
    line(0, y, width, y);

    beginShape();

    strokeWeight(map(bass, 0, 255, 2, 5));
    for (x = 0; x < width; x++) {
      let y0 = y;
      let amplitude = noise(y, bass / 100) * 100;
      let xShift = noise(y / 10) * 50;
      let xMid = 0.5;
      let xStart = width * (xMid - 0.1) + xShift;
      let xStop = width * (xMid + 0.1) + xShift;

      if (x > xStart && x < xStop) {
        let angle = map(x, xStart, xStop, 0, 360);
        let yOff = y0 + amplitude * cos(radians(angle));
        vertex(x, yOff);
      } else {
        vertex(x, y0 + amplitude);
      }
    }
    endShape();
  }
}

function keyPressed() {
  // 83 is key code for key "s"s
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save("aug_10_22.jpeg");
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
