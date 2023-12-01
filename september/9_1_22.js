const w = 640;
const h = 480;
const margin = h * 0.05;
const lineCnt = 40;
const colorAry = new Array(lineCnt);

function setup() {
  createCanvas(w, h);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  let hueVal = 0;
  for (let l = 0; l < lineCnt; l++) {
    if (l % 4 == 0) {
      hueVal = random(240);
    }
    colorAry[l] = createVector(
      hueVal, // hue
      60, // sat
      80 // bri
    );
  }

  colorAry.sort((a, b) => a.x - b.x);

  background(0, 0, 90, 100);

  translate(0, margin);
  noFill();
  strokeWeight(h * 0.005);
  for (let l = 0; l < lineCnt; l++) {
    let lRatio = l / lineCnt;
    let lY = (h - margin * 2) * lRatio;
    let lC = colorAry[l];
    push();
    translate(0, lY);
    fill(lC.x % 360, lC.y, lC.z);

    drawWave(PI * lRatio, 5 * (1 + lRatio));
    pop();
  }
}
function draw() {}

function drawWave(_phase, _cycle) {
  const amp = h * 0.02;
  beginShape();
  for (let x = 0; x < width; x++) {
    let xRatio = x / width;
    let y = amp * xRatio * sin(_phase + PI * _cycle * xRatio);
    vertex(x, y);
  }
  endShape();
}
