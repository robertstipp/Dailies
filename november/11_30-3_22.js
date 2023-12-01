const bounds = [];
function setup() {
  createCanvas(600, 600);

  background(0);

  const cloud = new Cloud(50, 50, 300, 100);
  cloud.generateStructure();
  console.log(cloud);

  let origin = createVector(300, 300);

  const bound = new Bound(300, 300, 100);
}

class Bound {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r / 2;
  }
  checkBound(point) {
    let d = dist(this.x, this.y, point.x, point.y);
    return d <= this.r;
  }
}

class Cloud {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bounds = [];
    this.structure = [];
  }

  generateStructure() {
    for (let i = 0; i < 40; i++) {
      let xPos = random(this.x, this.x + this.width);
      let yPos = random(this.y, this.y + this.height);
      let radius = random(50, 100);
      this.bounds.push(new Bound(xPos, yPos, radius));
      noStroke();
      ellipse(xPos, yPos, radius);
    }
  }

  display() {
    rect(this.x, this.y, this.width, this.height);
  }
}
