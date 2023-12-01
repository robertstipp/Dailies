const baseNodes = [];
const accessoryNodes = [];

function setup() {
  createCanvas(400, 400);
  background(0);
  let y2 = 150;
  let yStep = y2 - 100;
  for (let y1 = 100; y1 <= y2; y1 += yStep) {
    for (let x = 0; x <= width; x += 50) {
      let xOff = 0;
      if (y1 === y2) {
        xOff = 25;
      }
      let node = new BaseNode(x + xOff, y1);
      baseNodes.push(node);
      node.draw();
    }
  }
  baseNodes.forEach((node) => node.connect(baseNodes));

  let count = 0;
  for (let y = 100 + 50 / 3; y <= height; y += 50 / 3) {
    for (let x = 25; x <= width; x += 50) {
      let xOff = 0;
      if (count % 2 === 0) {
        xOff = 25;
      }
      let accessoryNode = new AccessoryNode(x + xOff, y);
      accessoryNodes.push(accessoryNode);
      accessoryNode.draw();
    }
    count++;
  }

  accessoryNodes.forEach((node) => node.connect(baseNodes));
}

class BaseNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.color = color(255);
  }

  connect(baseNodes) {
    for (let node of baseNodes) {
      let d = dist(this.x, this.y, node.x, node.y);
      if (d < 60) {
        stroke(255, 100);
        line(this.x, this.y, node.x, node.y);
      }
    }
  }
  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}

class AccessoryNode extends BaseNode {
  constructor(x, y) {
    super(x, y);
    this.size = 5;
    this.color = color(255, 0, 0);
  }

  connect(baseNodes) {
    for (let node of baseNodes) {
      let d = dist(this.x, this.y, node.x, node.y);
      if (d < 60) {
        stroke(255, 0, 0, 100);
        line(this.x, this.y, node.x, node.y);
      }
    }
  }
}
