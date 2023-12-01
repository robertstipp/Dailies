const points = [];

function setup() {
  createCanvas(1080, 1080);
  background("#FF5858");
  // beginShape();
  for (let x = 100; x < width - 100; x += 100) {
    for (let y = 100; y < height - 100; y += 100) {
      trapezoid(x, y, 70, 70, map(noise(x / 100, y / 100), 0, 1, 1, 10));
    }
  }
  // endShape();
}

function trapezoid(x, y, w, h, factor) {
  stroke("#F8FFDB");
  strokeWeight(3);
  function xDispl(w, factor) {
    return random(-w / factor, w / factor);
  }
  function yDispl(h, factor) {
    return random(-h / factor, h / factor);
  }
  beginShape();
  vertex(x + xDispl(w, factor), y + yDispl(h, factor));

  vertex(x + w + xDispl(w, factor), y + yDispl(h, factor));
  vertex(x + h + xDispl(w, factor), y + h + yDispl(h, factor));
  vertex(x + w - h + xDispl(w, factor), y + h + yDispl(h, factor));

  endShape(CLOSE);
}
