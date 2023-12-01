let dimmer;
let brightness = 100;
function setup() {
  createCanvas(600, 800);

  colorMode(HSB);
}
function draw() {
  background(255);

  noStroke();
  for (let sat = 0; sat <= 100; sat++) {
    for (let angle = 0; angle <= 359; angle += 1) {
      let c = color(angle, sat, brightness);
      let x = 300 + sat * Math.cos(radians(angle));
      let y = 300 + sat * Math.sin(radians(angle));
      fill(c);
      ellipse(x, y, 10);
    }
  }

  dimmer = new Dimmer();
  dimmer.show();
}

function mouseDragged() {
  dimmer.move();
}

function mouseClicke

class Dimmer {
  constructor() {
    this.x = 400;
    this.y = 400;
    this.r = 30;
  }

  move() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r) {
      console.log("hello");
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  show() {
    ellipse(this.x, this.y, this.r);
  }
}
