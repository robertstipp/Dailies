const squares = [];
let t = 0;

let backgroundColor = 0;
function setup() {
  createCanvas(600, 600);
  background(0);
  stroke(255);
  noFill();
  rectMode(CENTER);

  const arr = [10, 0, 0, 0];

  // for (let x = -50; x <= 700; x += 50) {
  //   shuffle(arr, true);
  //   for (let y = -550; y <= 700; y += 50) {
  //     strokeWeight(10);
  //     squares.push(new mySquare(x, y, 50, 50));
  //   }
  // }

  for (let i = 0; i < 1000; i++) {
    let x = random(width);
    let y = random(height);

    squares.push(new mySquare(x, y, 50, 50));
  }

  squares.forEach((square) => square.display());
}
function draw() {
  background(squares[0].hDirection === -1 ? 255 : 0);
  squares.forEach((square) => {
    square.round();
    square.shrinkW();
    square.shrinkH();
    square.moveH();
    square.moveV();
    square.display();
  });
  t += 0.1;
}

function getCorners() {
  const arr = [10, 0, 0, 0];
  const result = 0;
}

class mySquare {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.xPos = x;
    this.yPos = y;
    this.currentW = w;
    this.currentH = h;
    this.corners = [0, 0, 0, 0];
    this.currentRound = 0;
    this.maxRound = this.h;
    this.minRound = 1;
    this.roundDirection = 1;
    this.roundStep = 1;
    this.wDirection = -1;
    this.hDirection = -1;
    this.noiseVal = noise(this.x, this.y);

    this.moveXDirection = this.noiseVal < 0.5 ? -1 : 1;
    this.moveYDirection = this.noiseVal < 0.5 ? -1 : 1;
    this.xStep = random(0, 1);
    this.yStep = random(0, 1);
    this.fillC = "black";
  }

  shrinkW() {
    if (this.wDirection === 1) {
      this.currentW++;
    }
    if (this.wDirection === -1) {
      this.currentW--;
    }
    if (this.currentW <= 0) {
      this.wDirection *= -1;
    }
    if (this.currentW >= this.w) {
      this.wDirection *= -1;
    }
  }

  shrinkH() {
    if (this.hDirection === 1) {
      this.currentH++;
    }
    if (this.hDirection === -1) {
      this.currentH--;
    }
    if (this.currentH <= 0) {
      this.hDirection *= -1;
    }
    if (this.currentH >= this.h) {
      this.hDirection *= -1;
    }
  }

  round() {
    for (let i = 0; i < this.corners.length; i++) {
      if (this.roundDirection === 1) {
        this.corners[i] += this.roundStep;
      } else {
        this.corners[i] -= this.roundStep;
      }
    }

    if (this.roundDirection === 1) {
      this.currentRound += this.roundStep;
    } else {
      this.currentRound -= this.roundStep;
    }

    if (this.currentRound >= this.maxRound) {
      this.roundDirection = -1;
      this.fillC = "white";
    }
    if (this.currentRound <= this.minRound) {
      this.roundDirection = 1;
      this.fillC = "black";
    }
  }

  move() {}

  moveH() {
    if (this.moveXDirection === 1) {
      this.xPos += this.xStep;
    }
    if (this.moveXDirection === -1) {
      this.xPos -= this.xStep;
    }
    if (this.xPos >= this.x + this.w * 2) {
      this.moveXDirection *= -1;
    }
    if (this.xPos <= this.x - this.w * 2) {
      this.moveXDirection *= -1;
    }
  }
  moveV() {
    if (this.moveYDirection === 1) {
      this.yPos += this.yStep;
    }
    if (this.moveYDirection === -1) {
      this.yPos -= this.yStep;
    }
    if (this.yPos >= this.y + this.h * 2) {
      this.moveYDirection *= -1;
    }
    if (this.yPos <= this.y - this.h * 2) {
      this.moveYDirection *= -1;
    }
  }

  display() {
    noStroke();
    fill(this.fillC === "black" ? "white" : "black");
    // rect(this.x, this.y, this.w, this.h);
    fill(this.fillC);
    // stroke(this.fillC === "black" ? "white" : "black");
    noStroke();
    push();
    translate(this.xPos, this.yPos);
    rotate(t);
    rect(0, 0, this.currentW, this.currentH, ...this.corners);
    pop();
  }
}
