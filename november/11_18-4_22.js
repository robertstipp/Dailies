let puck, target;
let goalReached = false;
function setup() {
  createCanvas(600, 600);
  target = new Target(300, 300);
  fill("red");
  ellipse(target.x, target.y, 100);
  puck = new Puck(100, 100);
}
function draw() {
  background(255);

  target.show();
  puck.show();
  if (puck.checkGoal()) goalReached = true;
  if (goalReached) printGoal();
}
function mouseDragged() {
  puck.move();
}

class Puck {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 50;
    this.c = "red";
  }

  move() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r / 2) {
      this.x = mouseX;
      this.y = mouseY;
    }
    let dGoal = dist(mouseX, mouseY, target.x, target.y);
    if (dGoal < 10) {
      this.r = 20;
      this.c = "green";
      printGoal();
    }
  }

  checkGoal() {
    let dGoal = dist(mouseX, mouseY, target.x, target.y);
    return dGoal < 10;
  }

  show() {
    fill(this.c);
    ellipse(this.x, this.y, this.r);
  }
}

class Target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 50;
  }
  show() {
    fill("green");
    ellipse(this.x, this.y, 50);
  }
}

function printGoal() {
  textSize(32);
  text("GOAL", 300, 100);
}
