const colors = ["#18A3F5", "#F5252B", "#F59C25", "#0CF5CE", "#00F541"];

function setup() {
  createCanvas(600, 750);
  background("#FCFDED");
  // grid();

  for (let x = 100; x <= 500; x += 100) {
    for (let y = 100; y <= 600; y += 100) {
      ring(x, y);
    }
  }
}

function grid() {
  for (let x = 50; x <= 500; x += 150) {
    for (let y = 200; y <= 500; y += 200) {
      rect(x, y, 150);
    }
  }
}

function ring(x, y) {
  noStroke();
  let radius = 20;
  let colorOptions = colors;
  for (let i = 4; i > 1; i--) {
    let selectedColor = random(colorOptions);
    let c = color(selectedColor);
    c.setAlpha(i * 75);
    fill(c);
    rectMode(CENTER);
    let rad = i * radius;
    rect(x, y, rad);
    // ellipse(x, y, rad);

    colorOptions = colorOptions.filter((color) => color !== selectedColor);
  }
}
