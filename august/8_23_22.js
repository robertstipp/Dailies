let margin = 100;

let swatches = [];
let rows = [];

let colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];
// let colors = ["#44af69", "#f72585", "#fcab10", "#2b9eb3"];
let numRows = colors.length;

function setup() {
  createCanvas(600, 600);
  background(255);
  rectMode(CENTER);
  let colorIndex = 0;
  for (let y = 100; y <= 500; y += 100) {
    console.log(colorIndex);
    rows.push(new SwatchRow(y, colors[colorIndex]));
    colorIndex += 1;
  }

  rows.forEach((swatchRow) => swatchRow.show());
}
function draw() {}

class Swatch {
  constructor(x, y, c, t) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.gray = color(100);
    this.t = t;
  }

  scaleColor() {
    this.c = lerpColor(this.gray, this.c, this.t);
  }

  show() {
    noStroke();
    this.scaleColor();
    fill(this.c);
    rect(this.x, this.y, 75);
  }
}

class SwatchRow {
  constructor(y, c) {
    this.y = y;
    this.numSwathes = 5;
    this.c = color(c);
    let t = 0.1;
    this.swatches = [];
    for (let x = 100; x <= 500; x += 100) {
      this.swatches.push(new Swatch(x, y, this.c, t));
      t += 0.9 / this.numSwathes;
    }
  }

  show() {
    this.swatches.forEach((swatch) => swatch.show());
  }
}
