let painter1;
const painters = [];

function setup() {
  createCanvas(1080, 1920);
  background(0);

  painter1 = new Painter(100, 100, 10, "white");
  painter2 = new Painter(700, 100, 10, "red");
  painters.push(painter1);
  painters.push(painter2);
}

function draw() {
  noStroke();
  painter1.move();
  painter1.display();
  painter2.move();
  painter2.display();
  painter1.checkNeighbors();
  painter2.checkNeighbors();
}

class Painter {
  constructor(x, y, size, clr) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.clr = clr;
    this.xPos = x;
    this.yPos = y;
    this.startAngle = PI / 3;
    this.angle = this.startAngle;
  }

  move() {
    let speed = random(1, 10);
    this.xPos += cos(this.angle) * speed;
    this.yPos += sin(this.angle) * speed;

    if (this.xPos > width) {
      if (this.angle > 0 && this.angle < PI / 2) {
        this.angle += PI / 2;
      } else {
        this.angle -= PI / 2;
      }
    }
    if (this.yPos > height) {
      if (this.angle > PI / 2 && this.angle < PI) {
        this.angle += PI / 2;
      } else {
        this.angle -= PI / 2;
      }
    }

    if (this.xPos < 0) {
      if (this.angle > PI / 2 && this.angle < PI) {
        this.angle += PI / 2;
      } else {
        this.angle -= PI / 2;
      }
    }

    if (this.yPos < 0) {
      if (this.angle > PI && this.angle < (PI * 3) / 2) {
        this.angle += PI / 2;
      } else {
        this.angle -= PI / 2;
      }
    }
  }

  checkNeighbors() {
    for (let i = 0; i < painters.length; i++) {
      if (painters[i] !== this) {
        let distance = dist(
          this.xPos,
          this.yPos,
          painters[i].xPos,
          painters[i].yPos
        );
        if (distance < 200) {
          this.angle += random(TAU);
        }
      }
    }
  }

  display() {
    fill(this.clr);
    ellipse(this.xPos, this.yPos, this.size);
  }
}
