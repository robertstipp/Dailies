let mic;
let song;
let fft;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

let t = 0;
let cIndex = 0;

const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
// const colors = [
//   "#f72585",
//   "#b5179e",
//   "#7209b7",
//   "#560bad",
//   "#480ca8",
//   "#3a0ca3",
//   "#3f37c9",
//   "#4361ee",
//   "#4895ef",
//   " #4cc9f0",
// ];
let period;
function setup() {
  createCanvas(800, 960);
  background(0);
  stroke(255);
  noFill();
  // AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  // Single Line
  // for (y = 0; y < height + 10; y += 10) {
  // if (y % 200 == 0) {
  //   strokeWeight(3);
  //   stroke(color(random(colors)));
  //   period = map(noise(y), 0, 1, 0, 500);
  //   console.log(period);
  // } else {
  //   stroke(color(random(colors)));
  //   strokeWeight(3);
  //   period = 100;
  // }

  // let cIndex = floor(map(y, 0, height, 0, colors.length - 1));

  //   let c = color(colors[cIndex % 9]);

  //   stroke(c);
  //   period = map(noise(y, t), 0, 1, 300, 500);

  //   strokeWeight(50);
  //   beginShape();
  //   for (x = -100; x < width + 100; x++) {
  //     let startx = 0;
  //     let endX = startx + period;
  //     let angle = map(x, startx, endX, 0, 360);
  //     vertex(x, y + 20 * cos(radians(angle)));
  //   }
  //   endShape();
  // }
}
function draw() {
  background(0);
  let xoff = 0;
  // AUDIO
  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");

  let mid = fft.getEnergy("mid");
  // let treble = fft.getEnergy("treble");
  // let highMid = fft.getEnergy("highMid");

  for (y = 0; y < height + 10; y += 20) {
    let cIndex = floor(map(y, 0, height, 0, colors.length - 1));

    let c = color(colors[0]);

    // period = map(noise(bass / 100, t), 0, 1, 300, 500);
    period = 400;
    if (y % 200 == 0) {
      strokeWeight(10);
      let c = color(colors[0]);
      stroke(c);
      amplitude = map(noise(mid / 50), 0.5, 1, 100, 200);
    }

    if (y % 400 == 0) {
      strokeWeight(8);
      let c1 = color(colors[1]);
      stroke(c1);
      amplitude = map(noise(bass / 50), 0.5, 1, 100, 200);
    }

    beginShape();
    for (x = -100; x < width + 100; x += 10) {
      let startx = 0;
      let endX = startx + period;
      let angle = map(x, startx, endX, 0, 360);
      // vertex(xoff + x, y + amplitude * cos(radians(angle)));

      point(xoff + x, y + amplitude * cos(radians(angle)));
    }
    endShape();
  }
}

function keyPressed() {
  // 83 is key code for key "s"s
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save("aug_6_22.jpeg");
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
