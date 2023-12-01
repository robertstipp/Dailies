function setup() {
  createCanvas(600, 600);
  background(0);
  // stroke(255);
  // strokeWeight(8);
  noStroke();

  let numVertex = 6;

  for (let i = 0; i < 10; i++) {
    let startAngle = random(TAU);
    let c = color("white");
    c.setAlpha(100);
    fill(c);
    beginShape();
    for (
      let angle = startAngle;
      angle < TAU + startAngle;
      angle += TAU / numVertex
    ) {
      let x = 300 + 100 * Math.cos(angle);
      let y = 300 + 100 * Math.sin(angle);

      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
function draw() {}
