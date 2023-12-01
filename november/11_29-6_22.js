const red = "#F23545";

function setup() {
  createCanvas(600, 900);
  background(255);
  stroke(0);

  strokeWeight(3);

  arc(150, 300, 200, 200, 0, PI);
  let smallR = 100;
  let bigR = 150;
  for (let angle = 0; angle <= PI; angle += PI / 12) {
    let x1 = 150 + smallR * Math.cos(angle);
    let y1 = 300 + smallR * Math.sin(angle);
    let x2 = 150 + bigR * Math.cos(angle);
    let y2 = 300 + bigR * Math.sin(angle);
    line(x1, y1, x2, y2);
  }
  fill("black");
  ellipse(400, 300, 100, 100);
  for (let angle = PI; angle <= TAU + PI / 2; angle += PI / 12) {
    let x1 = 400 + smallR * Math.cos(angle);
    let y1 = 300 + smallR * Math.sin(angle);
    let x2 = 400 + bigR * Math.cos(angle);
    let y2 = 300 + bigR * Math.sin(angle);
    line(x1, y1, x2, y2);
  }

  ellipse(250, 600, 20);
  ellipse(300, 600, 20);
  fill(red);
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_29_22.jpeg");
  }
}
