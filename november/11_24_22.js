const red = "#F52D0A";
const green = "#1af54d";
const orange = "#F58D1D";
function setup() {
  createCanvas(600, 1000);
  background(red);
  // line(width / 2, 0, width / 2, height);
  //left arc
  noFill();
  strokeWeight(3);
  stroke("white");
  for (let rad = 100; rad <= 540; rad += 15) {
    let startX = 0;
    let startY = height / 4;

    arc(startX, startY, rad, rad, 0, PI / 2);
    line(startX + rad / 2, startY, startX + rad / 2, 0);
  }

  for (let rad = 100; rad <= 540; rad += 15) {
    let startX = width;
    let startY = height / 4;

    arc(startX, startY, rad, rad, PI / 2, PI);
    line(startX - rad / 2, startY, startX - rad / 2, 0);
  }

  ellipse(300, 600, 300);
  ellipse(200, 800, 300);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_23_22.jpeg");
  }
}
