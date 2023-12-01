let margin = 100;

const pink = "#FF82D7";
const green = "#1AF065";

function setup() {
  createCanvas(2500, 3500);
  background("beige");
  noStroke();
  fill("black");

  let rectW = 50;
  for (let x = margin; x <= width - margin; x += 2 * rectW) {
    rect(x, margin, rectW, height - 2 * margin);
  }
  let start = 1000;
  let end = 500;
  for (let radius = start; radius >= end; radius -= 100) {
    let i = map(radius, start, end, 0, 1);
    let c = lerpColor(color(pink), color(green), i);
    fill(c);
    ellipse(1250, 1570, 2 * radius);
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_23_22.jpeg");
  }
}
