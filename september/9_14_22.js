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
  stroke(255);
  noFill();

  // AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  // for (let angle = 0; angle <= TAU; angle += 0.1) {
  //   let x = 300 + 100 * Math.cos(angle);
  //   let y = 300 + 100 * Math.sin(angle);
  //   ellipse(x, y, 10);

  //   let increment = 0;
  //   beginShape();
  //   for (let r = 110; r < 300; r += 10) {
  //     let angleOff = 0.1;
  //     if (increment % 2 == 0) {
  //       angleOff = -0.1;
  //     } else {
  //       angleOff = 0.1;
  //     }

  //     let x = 300 + r * Math.cos(angle + angleOff);
  //     let y = 300 + r * Math.sin(angle + angleOff);

  //     // if (random() < 0.5) {
  //     //   endShape();
  //     //   beginShape();
  //     // }

  //     vertex(x, y);
  //     increment++;
  //   }
  //   endShape();
  // }
}
function draw() {
  background(0);

  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  mid = fft.getEnergy("mid");
  bassScl = map(bass, 100, 255, 40, 100);
  midOff = map(mid, 0, 255, -0.2, 0.2);
  for (let angle = 0; angle <= TAU; angle += 0.1) {
    let x1 = 300 + bassScl * Math.cos(angle);
    let y1 = 300 + bassScl * Math.sin(angle);

    let increment = 0;
    beginShape();
    for (let r = 110; r < 300; r += 10) {
      let angleOff = 0.1;

      if (increment % 2 == 0) {
        angleOff = midOff;
      } else {
        angleOff = -midOff;
      }

      let x = 300 + r * Math.cos(angle + angleOff);
      let y = 300 + r * Math.sin(angle + angleOff);

      // if (random() < 0.5) {
      //   endShape();
      //   beginShape();
      // }

      vertex(x, y);
      increment++;
    }
    endShape();
  }
}

function mouseClicked() {
  song.isPlaying() ? song.stop() : song.play();
}
