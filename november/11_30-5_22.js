const red = "#F23545";
function setup() {
  createCanvas(600, 900);
  background("beige");
  stroke(0);

  strokeWeight(5);
  noFill();
  rectMode(CENTER);
  rect(300, 500, 200, 400, 5, 5, 5, 5);
  rect(300, 715, 200, 10, 5, 5, 5, 5);
  rect(300, 285, 200, 10, 5, 5, 5, 5);

  rect(300, 250, 35, 40, 5, 5, 5, 5);
  arc(314, 250, 10, 10, PI / 2, (3 * PI) / 2);
  // ellipse(300, 250, 10);
}
