const margin = 100;

let mic, fft, song, bass, mid;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

let t = 0;
function setup() {
  createCanvas(600, 600);
  background(0);
  stroke(255);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  for (let y = margin; y <= height - margin; y += 10) {
    beginShape();
    for (let x = margin; x < width - margin; x += 10) {
      vertex(x, y);

      if (noise(x, y) < 0.5) {
        endShape();
        beginShape();
      }
    }
    endShape();
  }
}
function draw() {
  background(0);

  fft.analyze();
  bass = fft.getEnergy("bass");
  treble = fft.getEnergy("treble");
  mid = fft.getEnergy("mid");

  for (let y = margin; y <= height - margin; y += 20) {
    beginShape();
    for (let x = margin; x < width - margin; x += 20) {
      vertex(x, y);

      if (noise(x / 100, y / 100) < Math.abs(sin(100 / bass))) {
        endShape();
        textSize(20);
        if (bass > 200) {
          text("😡", x, y);
        } else {
          text("😊", x, y);
        }

        beginShape();
      }
    }
    endShape();
  }
  t++;
}

function mouseClicked() {
  song.isPlaying() ? song.stop() : song.play();
}
