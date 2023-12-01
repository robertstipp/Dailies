const red = "#F23545";

function setup() {
  createCanvas(600, 900);
  background("beige");
  noStroke();
  fill(red);
  arc(300, 300, 300, 300, PI - PI / 8, TAU + PI / 8, CHORD);

  let x1 = 300 + 150 * Math.cos(PI - PI / 6);
  let y1 = 300 + 150 * Math.sin(PI - PI / 6);

  let x2 = 300 + 150 * Math.cos(TAU + PI / 6);
  let y2 = 300 + 150 * Math.sin(TAU + PI / 6);
  strokeCap(SQUARE);
  stroke(0);
  strokeWeight(13);
  line(x1, y1, x2, y2);
  strokeWeight(26);
  line(x1, 800, x2, 800);

  rectMode(CENTER);
  noStroke();
  fill("black");
  rect(300, 410, 50, 35);
  rect(275, 410, 15, 5);
  for (let y = 410; y <= 600; y += 10) {
    ellipse(262, y, 7);
  }
  ellipse(262, 620, 21);
  rect(300, 460, 40, 33);
  fill(red);
  rect(300, 750, 40, 33);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_29_22.jpeg");
  }
}
