let w, h;

let baseC = "#181C47";
function setup() {
  createCanvas(1080, 1920);
  w = width;
  background(baseC);

  noFill();

  noStroke();
  fill("black");

  for (let y = 500; y <= 2100; y += 50) {
    fill(random(0, 200));
    mountain(y, y + 100, 30);
  }

  // orb(540, 200, 600);
}

function mountain(startY, endY, steps) {
  let yDiff = endY - startY;
  let startMidY = startY + random(-200, -100);
  let endMidY = endY + random(-100, -100);
  let startMidX = w / 2 + map(noise(startMidY), 0, 1, -300, 300);
  let endMidX = w / 2 + map(noise(endMidY), 0, 1, -200, 200);
  let dotDiam = map(startY, 900, 2100, 3, 5);

  for (let i = 0; i < 1; i += 1 / steps) {
    let y = lerp(startY, endY, i);
    let midY = lerp(startMidY, endMidY, i);
    let midX = lerp(startMidX, endMidX, i);
    let left = createVector(0, y);
    let right = createVector(1080, y);
    let mid = p5.Vector.lerp(left, right, 0.5);
    mid.y = midY;
    mid.x = midX;

    for (let i = 0; i < 1; i += 0.005) {
      let p = p5.Vector.lerp(left, mid, i);
      let angle = map(i, 0, 1, 0, 3 * PI);

      let yOff = 3 * Math.sin(angle) * -10;
      if (startY < 1200) yOff = 0;
      p.y += yOff;
      if (random() < 0.05) continue;

      ellipse(p.x, p.y, dotDiam);
    }
    for (let i = 0; i < 1; i += 0.005) {
      let p = p5.Vector.lerp(mid, right, i);
      let angle = map(i, 0, 1, 3 * PI, 6 * PI);

      let yOff = 3 * Math.sin(angle) * -10;
      if (startY < 900) yOff = 0;
      p.y += yOff;
      if (random() < 0.05) continue;
      ellipse(p.x, p.y, dotDiam);
    }
  }
}

function orb(x, y, d) {
  let r = d / 2;
  fill(baseC);
  ellipse(x, y, d, d);

  for (let i = 0; i < 100000; i++) {
    let radius = randomGaussian(0, r / 1.7);
    // let radius = random(-r * 0.9, r * 0.9);
    let angle = random(0, 2 * PI);
    fill("black");
    ellipse(x + radius * cos(angle), y + radius * sin(angle), 2, 2);
  }
}
