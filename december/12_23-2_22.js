let e;
function setup() {
  pixelDensity(4);
  createCanvas(1080, 1080);

  background(0);
  noFill();
  stroke(255);
  for (let y = -100; y < height + 100; y += 30) {
    beginShape();
    for (let x = -100; x <= width + 100; x += 1) {
      let amplitudeAng = map(y, -100, height + 100, 0, PI);

      let yOffAngle = map(x, 0, width, 0, TWO_PI);
      let strokeWeightAngle = map(y, -100, height + 100, PI / 2, 0);
      let sw = Math.sin(strokeWeightAngle) * 15;
      strokeWeight(sw);
      let amplitude = Math.sin(amplitudeAng) * 200;
      let y0ff = Math.sin(yOffAngle) * -amplitude;
      vertex(x, y + y0ff);
      // ellipse(x, y + y0ff, 10, 10);
    }
    endShape();
  }
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_23_22.jpeg");
  }
}
