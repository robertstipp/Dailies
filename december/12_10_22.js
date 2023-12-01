let vertices = [];

function setup() {
  createCanvas(600, 600);
  background(255);

  stroke(0, 20);
  let size = width / 2 - width * 0.1;
  for (let i = 1; i < TAU + 1; i += 0.01) {
    vertices.push({
      x: 300 + size * Math.cos(i),
      y: 300 + size * Math.sin(i),
      angle: i,
      noiseVals: [Math.cos(i), Math.sin(i)],
    });
  }
  noise = new OpenSimplexNoise(Date.now());
  console.log(vertices);
  noFill();

  for (let i = 0; i < 10; i++) {
    drawLoop();
  }
}

function draw() {}

function drawLoop() {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < vertices.length; j++) {
      let range = noise(i) * 0.1 + 0.1;
      let xOff = map(random([-1, 1]), -1, 1, -range, range);

      let yOff = map(random([-1, 1]), -1, 1, -range, range);
      vertices[j].x += xOff;
      vertices[j].y += yOff;
    }
  }

  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    curveVertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_9_22.jpeg");
  }
}
