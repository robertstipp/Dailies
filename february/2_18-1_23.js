let secondCanvas;
let thirdCanvas;
let myCircles = [];
let myCircles2 = [];
let myCircles3 = [];
function setup() {
  pixelDensity(1);
  createCanvas(1080, 1080);
  background(0);

  secondCanvas = createGraphics(1080, 1080);
  thirdCanvas = createGraphics(1080, 1080);
  secondCanvas.noStroke();
  while (myCircles2.length < 40) {
    let c = new Circle(random(width), random(height), random(40, 50));
    let valid = true;
    for (let j = 0; j < myCircles2.length; j++) {
      let other = myCircles2[j];
      let d = dist(c.x, c.y, other.x, other.y);
      if (d < c.r + other.r) {
        valid = false;
        break;
      }
    }
    if (valid) {
      myCircles2.push(c);
      secondCanvas.stroke(0);
      secondCanvas.ellipse(c.x, c.y, c.r * 2);
    }
  }

  while (myCircles3.length < 40) {
    let c = new Circle(random(width), random(height), random(1, 20));
    let valid = true;
    for (let j = 0; j < myCircles3.length; j++) {
      let other = myCircles3[j];
      let d = dist(c.x, c.y, other.x, other.y);
      if (d < c.r + other.r) {
        valid = false;
        break;
      }
    }
    if (valid) {
      myCircles3.push(c);
      thirdCanvas.stroke(0);
      thirdCanvas.ellipse(c.x, c.y, c.r * 2);
    }
  }

  while (myCircles.length < 60) {
    let c = new Circle(random(width), random(height), random(50, 100));
    let valid = true;
    for (let j = 0; j < myCircles.length; j++) {
      let other = myCircles[j];
      let d = dist(c.x, c.y, other.x, other.y);
      if (d < c.r + other.r) {
        valid = false;
        break;
      }
    }
    stroke(0);
    if (valid) {
      myCircles.push(c);
      stroke(0);
      ellipse(c.x, c.y, c.r * 2);
    }
  }

  noFill();

  noLoop();
}

function draw() {
  // image(thirdCanvas, 0, 0);
  secondCanvas.loadPixels();
  thirdCanvas.loadPixels();
  loadPixels();

  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    let a = pixels[i + 3];
    let secondR = secondCanvas.pixels[i];
    let secondG = secondCanvas.pixels[i + 1];
    let secondB = secondCanvas.pixels[i + 2];
    let secondA = secondCanvas.pixels[i + 3];
    let thirdR = thirdCanvas.pixels[i];
    let thirdG = thirdCanvas.pixels[i + 1];
    let thirdB = thirdCanvas.pixels[i + 2];
    let thirdA = thirdCanvas.pixels[i + 3];

    if (r >= 200 && secondR >= 200) {
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
      if (thirdR >= 200) {
        pixels[i] = 255;
        pixels[i + 1] = 255;
        pixels[i + 2] = 255;
      }
    }
  }
  updatePixels();
}
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  draw() {
    ellipse(this.x, this.y, this.r * 2);
  }
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("2-18-2023", "jpeg");
  }
}
