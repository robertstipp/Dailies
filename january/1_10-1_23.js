let osc, envelope, fft;
let song;

let widths, spacing;
let tempoSlider;
let scaleArray = Array(20)
  .fill()
  .map((_, i) => i + 60);
let note = 0;
let note1 = 1;
let e, g;
function preload() {
  song = loadSound("media/01 Let You Know (feat. London Gramma.mp3");
}

function setup() {
  createCanvas(710, 200);
  e = new p5.Ease();
  tempoSlider = createSlider(0, 300, 200);
  tempoSlider.position(800, 10);
  tempoSlider.style("width", "80px");
  osc = new p5.SinOsc();

  // Instantiate the envelope
  envelope = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.7, 0.1, 0.5);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

  osc.start();

  fft = new p5.FFT();
  noStroke();
  let arrayLength = 32;
  widths = Array(arrayLength)
    .fill()
    .map((element, i) => {
      let val = map(i, 0, arrayLength, 0, 1);
      let easedVal = e.staircase(val, 10);
      return map(easedVal, 0, 1, 0, 10);
    });

  console.log(widths);
  spacing = width / widths.length;
}

function draw() {
  background(20);
  for (let i = 0; i < widths.length; i++) {
    let x = i * spacing;
    let sw = widths[i];
    strokeWeight(sw);
    stroke(255);
    line(x, 0, x, height);
  }

  let tempo = tempoSlider.value();
  let convertedTempo = tempo / 60;
  let frameBeats = Math.floor(60 / convertedTempo);
  if (frameCount % 1 === 0 || frameCount === 1) {
    let midiValue = Math.floor(widths[note]) + 60;
    let freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);

    envelope.play(osc, 0, 0.1);
    note = (note + 1) % widths.length;
  }
  // if (frameCount % frameBeats === 0 || frameCount === 1) {
  //   let midiValue = Math.floor(widths[note1]) + 60;
  //   let freqValue = midiToFreq(midiValue);
  //   osc.freq(freqValue);

  //   envelope.play(osc, 0, 0.1);
  //   note1 = (note1 + 2) % widths.length;
  // }

  // plot FFT.analyze() frequency analysis on the canvas
  let spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length / 20; i++) {
    fill(spectrum[i], spectrum[i] / 10, 0);
    let x = map(i, 0, spectrum.length / 20, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, spectrum.length / 20, -h);
  }
}
function mouseClicked() {
  if (song.isPlaying()) {
    song.play();
  } else {
    song.stop();
  }
}
