function setup() {
  createCanvas(600, 800);

  let grad = drawingContext.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "black");
  grad.addColorStop(1, "white");
  drawingContext.save();
  drawingContext.fillStyle = grad;

  for (let x = 100; x <= 500; x += 100) {
    for (let y = 100; y <= 500; y += 100) {
      ellipse(x, y, 50);
    }
  }
  drawingContext.restore();
}
function draw() {}
