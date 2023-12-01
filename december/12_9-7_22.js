let charcoal = "#424949";
``;
function setup() {
  createCanvas(600, 600);
  background(255);

  const point0 = createVector(200, 300);
  const point1 = createVector(400, 300);

  fill(255);
  connectNodes(point0, point1);
  ellipse(point0.x, point0.y, 10);
  ellipse(point1.x, point1.y, 10);
}

function connectNodes(node1, node2) {
  let yOff = 30;

  line(node1.x, node1.y, node1.x, node2.y - yOff);
  line(node1.x, node2.y - yOff, node2.x, node2.y - yOff);
  line(node2.x, node2.y - yOff, node2.x, node2.y);
}
