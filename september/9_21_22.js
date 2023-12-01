let mic, fft, song, bass, mid;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 1.0);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function w(val) {
  if (val == null) return width;
  return width * val;
}

function h(val) {
  if (val == null) return height;
  return height * val;
}

function draw() {
  background(0, 0, 100);
  noFill();
  stroke(0, 0, 0);
  strokeWeight(w(0.001));

  bass = fft.getEnergy("bass");
  treble = fft.getEnergy("treble");
  mid = fft.getEnergy("mid");

  for (let radius = 0.05; radius < 0.8; radius += 0.01) {
    const circle = makeCircle(Math.floor(map(bass, 0, 255, 10, 20)), radius);
    const distortedCircle = distortPolygon(circle);
    const smoothCircle = chaikin(
      distortedCircle,
      Math.floor(map(bass, 0, 255, 0, 5))
    );

    beginShape();
    smoothCircle.forEach((point) => {
      vertex(w(point[0]), h(point[1]));
    });
    endShape(CLOSE);
  }
  // noLoop();
}

function makeCircle(numSides, radius) {
  const points = [];
  const radiansPerStep = (Math.PI * 2) / numSides;
  for (let theta = 0; theta < Math.PI * 2; theta += radiansPerStep) {
    const x = 0.5 + radius * Math.cos(theta);
    const y = 0.5 + radius * Math.sin(theta);

    points.push([x, y]);
  }
  return points;
}

function distortPolygon(polygon) {
  return polygon.map((point) => {
    const x = point[0];
    const y = point[1];
    const distance = dist(0.5, 0.5, x, y);

    const z = frameCount / 500;
    const z2 = frameCount / 200;

    const b1 = map(bass, 0, 255, 0.05, 0.2);

    const noiseFn = (x, y) => {
      const noiseX = (x + 0.31) * distance * 2 + z2;
      const noiseY = (y - 1.73) * distance * 2 + z2;
      return noise(noiseX, noiseY, z);
    };

    const theta = noiseFn(x, y) * Math.PI * 3;

    const amountToNudge = b1 - Math.cos(z) * b1;
    const newX = x + amountToNudge * Math.cos(theta);
    const newY = y + amountToNudge * Math.sin(theta);

    return [newX, newY];
  });
}

function chaikin(arr, num) {
  if (num === 0) return arr;
  const l = arr.length;
  const smooth = arr
    .map((c, i) => {
      return [
        [
          0.75 * c[0] + 0.25 * arr[(i + 1) % l][0],
          0.75 * c[1] + 0.25 * arr[(i + 1) % l][1],
        ],
        [
          0.25 * c[0] + 0.75 * arr[(i + 1) % l][0],
          0.25 * c[1] + 0.75 * arr[(i + 1) % l][1],
        ],
      ];
    })
    .flat();
  return num === 1 ? smooth : chaikin(smooth, num - 1);
}

function mouseClicked() {
  song.isPlaying() ? song.stop() : song.play();
}
