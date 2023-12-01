function setup() {
  createCanvas(1200, 1200);
  background(0);

  let midX = width / 2;
  let midY = height / 2;

  let circles = [];
  noFill();
  stroke(255);
  for (let angle = 0; angle <= TAU; angle += TAU / 6) {
    let xPos = midX + cos(angle) * 200;
    let yPos = midY + sin(angle) * 200;
    circles.push(new subCircle(xPos, yPos, 400));
  }

  // circles.forEach((subCircle) => subCircle.display());

  let arcInt = TAU - (2 * PI) / 3;
  circles.forEach((subCircle) => {
    let x = subCircle.x;
    let y = subCircle.y;
    strokeWeight(5);

    arc(x, y, subCircle.r, subCircle.r, arcInt, arcInt + (4 * PI) / 3);
    arcInt += PI / 3;
  });
}
class subCircle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  display() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, this.r);
  }
}
