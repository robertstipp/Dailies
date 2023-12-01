const fancyYellow = "#F9E79F";
const charcoal = "#424949";
function setup() {
  createCanvas(600, 600);
  background(fancyYellow);

  stroke(charcoal);
  for (let x = 100; x <= 500; x += 100) {
    for (let y = 100; y <= 500; y += 100) {
      let size = 90;
      let steps = 9;

      hynoticSq(x, y, size, steps);
    }
  }
}

function hynoticSq(x, y, size, steps) {
  noFill();
  if (steps < 1) return;
  strokeWeight(3);

  rectMode(CENTER);

  if (random() < 0.8 && steps > 5) {
    rect(x, y, size);
  }

  if (steps === 1) {
    let num = random([1, 2, 3, 4]);
    for (let i = 0; i < num; i++) {
      let xOff = random([-1, 1]) * size * 1.5;
      let yOff = random([-1, 1]) * size * 1.5;

      rect(x + xOff, y + yOff, size);
    }
  }

  hynoticSq(x, y, size * 0.7, steps - 1);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_8_22.jpeg");
  }
}
