let origin;
let nodes = [];
let e, g;
function setup() {
  pixelDensity(1);
  createCanvas(750, 900, SVG);
  noFill();
  noLoop();
  stroke(0);
  e = new p5.Ease();
  g = new p5.Gen();
  origin = createVector(width / 2, height / 2);
}
function draw() {
  let startRadius = 100;
  let endRadius = 300;
  for (let r = startRadius; r < endRadius; r += 10) {
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let x = origin.x + r * cos(a);
      let y = origin.y + r * sin(a);
      nodes.push(createVector(x, y));
    }
  }

  nodes.forEach((node) => connectNodes(node, random(10, 30)));
}

function keyPressed() {
  if (key == "s") {
    save("2021-01-23.svg");
  }
}

function connectNodes(node, dist) {
  for (let i = 0; i < nodes.length; i++) {
    let d = node.dist(nodes[i]);
    if (d < dist && d > 0) {
      line(node.x, node.y, nodes[i].x, nodes[i].y);
    }
  }
}
