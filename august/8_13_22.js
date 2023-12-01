const dias = [10, 20, 30];
const stk = [2, 3, 5];
const colors = ["#F65A83", "#FF87B2", "#FFE898", "#FFF8BC"];
let arrows = [];

function setup() {
  createCanvas(1080, 1920);
  background(255);
  noFill();
  stroke(255);

  for (i = 0; i < 50; i++) {
    arrows.push(new Arrow());
  }
  arrows.forEach((arrow) => arrow.show());
}
function draw() {}

class Arrow {
  constructor() {
    this.points = Array(4)
      .fill()
      .map((n) => {
        return createVector(random(width), random(height));
      });
    this.stk = random(stk);
    this.dia = random(dias);
    this.c = color(random(colors));
  }

  show() {
    push();
    stroke(this.c);
    strokeWeight(this.stk);
    beginShape();
    for (const p of this.points) {
      push();
      fill(this.c);
      ellipse(p.x, p.y, this.dia);
      pop();
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}

function keyPressed() {
  // 83 is key code for key "s"s
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save("aug_13_22.jpeg");
  }
}
