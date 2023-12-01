let e, g;
let easeFuncOption;
let nodes = [];
function setup() {
  createCanvas(1080, 1080);
  background(0);
  e = new p5.Ease();
  easeFuncOption = [e.cubicInOut];
  noLoop();
}
function draw() {
  let cols = 10;
  let rows = 10;
  let margin = 100;
  let effWidth = width - 2 * margin;
  let effHeight = height - 2 * margin;
  // let func = random(easeFuncOption);
  // rect(margin, margin, effWidth, effHeight);
  for (let i = 0; i < cols; i++) {
    let func = random(easeFuncOption);
    for (let h = 0; h < rows; h++) {
      let start = i / cols;
      let end = (i + 1) / cols;
      let starVal = func(start) * effWidth;
      let endVal = func(end) * effWidth;
      let startXPos = margin + starVal;
      let endXPos = margin + endVal;
      let startY = h / rows;
      let endY = (h + 1) / rows;

      let startYVal = func(startY) * effHeight;

      let endYVal = func(endY) * effHeight;
      let startYPos = margin + startYVal;
      let endYPos = margin + endYVal;
      let steps = 10;
      func = random(easeFuncOption);
      for (let j = 0; j <= steps; j++) {
        for (let k = 0; k <= steps; k++) {
          let xInt = j / steps;
          let xVal = func(xInt) * (endXPos - startXPos);
          let xSize = func(xInt) * (endXPos - startXPos);
          let xPos = startXPos + xVal;
          let yInt = k / steps;
          let ySize = func(yInt) * (endYPos - startYPos);
          let yVal = func(yInt) * (endYPos - startYPos);
          let yPos = startYPos + yVal;
          // noStroke();
          nodes.push(new Node(xPos, yPos));
        }
      }
    }
  }
  nodes.forEach((node) => {
    node.show();
    node.connect();
  });
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  connect() {
    for (let i = 0; i < nodes.length; i++) {
      let curNode = this;
      let otherNode = nodes[i];
      if (curNode === otherNode) continue;
      let d = dist(curNode.x, curNode.y, otherNode.x, otherNode.y);
      if (d < 10) {
        stroke(255, 100);
        line(curNode.x, curNode.y, otherNode.x, otherNode.y);
      }
    }
  }

  show() {
    stroke(255);
    noFill();
    rect(this.x, this.y, 5, 5);
  }
}
