const xOrigin = 200;
const yOrigin = 200;
let angle = 0;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);

  const xOff = 100 * Math.cos(angle);
  const yOff = 100 * Math.sin(angle);

  const xPos = xOrigin + xOff;
  const yPos = yOrigin + yOff;
  ellipse(xPos, yPos, 10);
}
