const colors = ["#8B45DE", "#6648E8", "#D1B54B", "#487FE8", "#45A2DE"];

let simplexNoise;

function setup() {
  pixelDensity(4);
  createCanvas(1080, 1080);
  background(0);

  simplexNoise = new openSimplexNoise(Date.now());

  let baseAngle = PI * (1 + Math.sqrt(5)) * 2;
  noFill();
  stroke(255);
  ellipse(width / 2, height / 2, 800);
  noStroke();
  for (let n = 0; n < 100; n++) {
    let angle = baseAngle * n;
    let r = 40 * sqrt(n);

    fill(colors[n % colors.length]);

    let x = width / 2 + r * cos(angle);
    let y = height / 2 + r * sin(angle);
    push();
    translate(x, y);

    rotate(angle);
    let r1 = random(40, 60);
    petal(0, 0, r1, r1 / 3);
    pop();
  }
}

function petal(x, y, r1, r2) {
  beginShape();
  for (let a = 0; a < TAU; a += 0.01) {
    let xPos = x + r1 * cos(a);
    let yPos = y + r2 * sin(a);

    let xOff = map(noise(xPos / 10, yPos / 10, cos(a)), 0, 1, -r1 / 3, r1 / 3);
    let yOff = map(noise(xPos / 10, yPos / 10, sin(a)), 0, 1, -r2 / 3, r2 / 3);
    vertex(xPos + xOff, yPos + yOff);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_14_22.jpeg");
  }
}
