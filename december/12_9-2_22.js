const blue = "#1f3a52";
const green = "#41a186";
const lime = "#8cca6e";
const limer = "#d3f689";
const colors = [blue, green, lime, limer];

let n = 40;

let side;
function setup() {
  createCanvas(600, 600);
  background(0);
  noFill();
  strokeWeight(2);
  side = width / n;

  let midX = width / 2;
  let midY = height / 2;
  let radius = 100;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      stroke(255);

      let xPos = x * side;
      let yPos = y * side;

      let xDiagPos = (x + 1) * side;
      let yDiagPos = (y + 1) * side;

      let topLeft = createVector(xPos, yPos);
      let topRight = createVector(xDiagPos, yPos);
      let bottomLeft = createVector(xPos, yDiagPos);
      let bottomRight = createVector(xDiagPos, yDiagPos);
      let d = dist(xPos, yPos, midX, midY);

      if (d < radius) {
        stroke(random(colors));
        line(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y);
      } else {
        stroke(255);
        line(topRight.x, topRight.y, bottomLeft.x, bottomLeft.y);
      }
    }
  }
}

function checkRings(rings, d) {
  let valid = false;
  for (let i = 1; i < rings.length; i++) {
    let innerRing = rings[i - 1];
    let outerRing = rings[i];
    if (d > innerRing && d < outerRing) {
      valid = true;
      break;
    }
  }
  return valid;
}
