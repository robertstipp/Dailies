const colors = ["#afffff", "#74dbef", "#5e88fc", "#264e86"];
let node;
const nodes = [];
let maxSteps = 10;
let stopLimit = 1000;

let radialGrid;
function setup() {
  createCanvas(600, 600);
  background("#ECE8DD");
  node = new Node(300, 300, 50);

  node.show();
  // noLoop();
  let origin = createVector(300, 300);
  radialGrid = new RadialGrid(origin, 200, 100);
}

function draw() {
  radialGrid.display();

  if (frameCount > stopLimit) {
    noLoop();
  }
}

class Node {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velocity = p5.Vector.fromAngle(atan2(this.y - 300, this.x - 300));
    this.maxSteps = maxSteps;
    this.curSteps = 0;
    this.c = color(random(colors));
  }

  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.curSteps++;
  }

  show() {
    if (this.curSteps > this.maxSteps) {
      this.curSteps = 0;
      this.velocity = p5.Vector.random2D();
      this.c = color(random(colors));
    }
    noFill();
    this.c.setAlpha(20);
    stroke(this.c);
    let size = map(this.curSteps, 0, this.maxSteps, this.r, this.r / 2);
    ellipse(this.x, this.y, size);
  }
}

class RadialGrid {
  constructor(origin, diameter, numCells) {
    this.origin = origin;
    this.diameter = diameter;
    this.numCells = numCells;
    this.nodes = [];

    for (let a = 0; a < TAU; a += TAU / this.numCells) {
      let v = origin.copy().add(p5.Vector.fromAngle(a, diameter / 2));
      this.nodes.push(new Node(v.x, v.y, 50));
    }
  }

  display() {
    for (let node of this.nodes) {
      node.move();
      if (random() < 0.5) continue;
      node.show();
      // ellipse(cell.x, cell.y, 10);
    }
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_27_22.jpeg");
  }
}
