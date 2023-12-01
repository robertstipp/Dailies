function setup() {
  createCanvas(600, 600);
  background(0);

  const grid = new Grid();
  const orb = new Orb(300, 300);

  blendMode(SCREEN);
  grid.display();
  orb.display();
}
function draw() {}

class Grid {
  constructor() {
    this.spacing = 40;
    this.size = 40;
    this.color = "#1F51FF";
    this.margin = this.spacing;
  }

  display() {
    for (let x = this.margin; x < width - this.margin; x += this.spacing) {
      for (let y = this.margin; y < height - this.margin; y += this.spacing) {
        noFill();
        stroke(this.color);
        strokeWeight(4);
        rect(x, y, this.size);
      }
    }
  }
}

class Orb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 200;
    this.color = "#f72585";
    this.color2 = "#b5179e";

    this.colors = [this.color, this.color2];
  }
  display() {
    for (let i = 0; i < 100000; i++) {
      let r = random(100);
      let theta = random(TAU);
      let x = this.x + r * Math.cos(theta);
      let y = this.y + r * Math.sin(theta);
      let c = color(random(this.colors));
      let alpha = noise(x / 10000, y / 1000) * 100;
      c.setAlpha(alpha);
      stroke(c);
      point(x, y);
    }
  }
}
