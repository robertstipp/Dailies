let peak = 100;
let flat = 5;
let mid = 2;
function setup() {
  createCanvas(1080, 1920);
  background(0);
  stroke(255);
  strokeWeight(2);
  let start = 0;
  let h;

  fill(0);
  for (let y = 100; y <= height - 40; y += 32) {
    let angle = map(y, 100, height - 40, 0, TAU);
    let mid = (sin(angle * 2) * width) / 4 + width / 2;
    let left = mid - width / 4;
    let right = mid + width / 4;
    beginShape();
    for (let x = -1; x < width + 2; x++) {
      if (x < left || x > right) {
        h = flat;
      } else {
        if (x < mid) {
          h = map(x, left, mid, flat, peak);
        } else {
          h = map(x, mid, right, peak, flat);
        }
      }

      vertex(x, y - h * noise(start));

      start += 0.038;
    }
    vertex(width + 1, height + 1);
    vertex(-1, height + 1);
    endShape(CLOSE);
  }
}

function keyPressed() {
  if (key == "s") {
    save("2023_03_05.png");
  }
}
