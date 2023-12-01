let hexTiles = [];

let t = 0;

let mic;
let song;
let fft;
let bass;
let mid;

let bassScl;

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

const colors1 = [
  "#f8f9fa",
  "#e9ecef",
  "#dee2e6",
  "#ced4da",
  "#adb5bd",
  "#6c757d",
  "#495057",
  "#343a40",
  "#212529",
];

const colors2 = [
  "#ff0000",
  "#ff8700",
  "#ffd300",
  "#deff0a",
  "#a1ff0a",
  "#0aff99",
  "#0aefff",
  "#147df5",
  "#580aff",
  "#be0aff",
];

const colors3 = [
  "#0b090a",
  "#161a1d",
  "#660708",
  "#a4161a",
  "#ba181b",
  "#e5383b",
  "#b1a7a6",
  "#d3d3d3",
  "#f5f3f4",
  "#ffffff",
];
function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);

  //AUDIO
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  gridWidth = w;
  gridHeight = w;
  hexagonSize = w / 20;

  makeGrid();
}

function drawHexagon(cX, cY, r) {
  beginShape();
  for (let a = 0; a < TAU; a += TAU / 6) {
    vertex(cX + r * cos(a), cY + r * sin(a));
  }
  endShape(CLOSE);
}

function makeGrid() {
  count = 0;
  for (y = 0; y <= gridHeight; y += hexagonSize / 2.3) {
    for (x = 0; x <= gridWidth; x += hexagonSize * 1.5) {
      drawHexagon(
        x + hexagonSize * (count % 2 == 0) * 0.75,
        y,
        hexagonSize / 2
      );
      hexTiles.push(
        new HexTile(
          x + hexagonSize * (count % 2 == 0) * 0.75,
          y,
          hexagonSize / 2
        )
      );
    }
    count++;
  }
}

function draw() {
  console.log(getFrameRate());
  background(0, 10);
  noStroke();
  noFill();
  let spectrum = fft.analyze();
  bass = fft.getEnergy("bass");
  bassScl = map(constrain(bass, 50, 255), 50, 255, 0, 1);

  hexTiles.forEach((hex) => hex.show());
  t += 0.1;
}

class HexTile {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  show() {
    let cIndex = Math.floor(
      noise(this.x / 100, this.y / 100, t / 10) * colors.length
    );

    if (bass > 200) {
      fill(colors3[cIndex]);
    } else {
      fill(colors1[cIndex]);
    }

    drawHexagon(this.x, this.y, this.r * bassScl);
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
