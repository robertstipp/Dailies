function setup() {
  createCanvas(1080, 1080);
  pixelDensity(2);
  background(0);
  let midX = width / 2;
  let midY = height / 2;

  stroke(255);
  noFill();

  let step = 20;
  let stop = 800;
  let stop2 = 200;
  let xOff = 0;

  for (let radius = 1000; radius > stop; radius -= step) {
    ellipse(midX + xOff, midY, radius);
    xOff += step / 2;
  }
  fill(0);
  step = 30;

  for (let radius = stop; radius >= stop2; radius -= step) {
    let sw = map(radius, stop, stop2, 8, 1);
    strokeWeight(sw);
    ellipse(midX + xOff, midY, radius);
    xOff -= step / 2;
  }

  stroke(255, 0, 0);
  strokeWeight(1);

  noStroke();
  fill("black");
  // ellipse(midX + xOff + 10, midY, 10);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_5_22.jpeg");
  }
}
