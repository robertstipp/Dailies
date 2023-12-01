const blue = "#1f3a52";
const green = "#41a186";
const lime = "#8cca6e";
const limer = "#d3f689";
const colors = [blue, green, lime, limer];

function setup() {
  createCanvas(600, 600);
  background(0);

  noFill();
  stroke(255);

  for (let x = 0; x <= width - 100; x += 100) {
    for (let y = 0; y <= height - 100; y += 100) {
      let w = random(50, 100);
      let h = random(50, 100);
      let c = random(colors);
      stroke(c);
      myBox(x, y, w, h);
    }
  }
}

function myBox(x, y, w, h) {
  for (let i = 0; i < 100; i++) {
    let stripeStartX = random(x, x + w);
    let stripeEndX = random(stripeStartX, x + w);
    let stripeY = random(y, y + h);
    line(stripeStartX, stripeY, stripeEndX, stripeY);
  }

  for (let i = 0; i < 100; i++) {
    let stripeStartY = random(y, y + h);
    let stripeEndY = random(stripeStartY, y + h);
    let stripeX = random(x, x + w);
    line(stripeX, stripeStartY, stripeX, stripeEndY);
  }
}
