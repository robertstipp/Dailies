const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const text =
  "The truth Has to be melted out of our stubborn lives By suffering. Nothing speaks the truth, Nothing tells us how things really are, Nothing forces us to know What we do not want to know Except pain. And this is how the gods declare their love.  When we sleep the soul is lit up... by many eyes, and with them, we can see everything that we cannot see in the daytime. The reward of pain is experience. For the poison of hatred seated near the heart doubles the burden for the one who suffers the disease; he is burdened with his own sorrow, and groans on seeing another's happiness. God loves to help him who strives to help himself. It is in the character of very few men to honor without envy a friend who has prospered.";
const strings = text.split("");
console.log(strings);

function setup() {
  pixelDensity(1);
  createCanvas(650, 900);
  noFill();
  background(255);
  noLoop();
  stroke(0);
}
function draw() {
  let origin = createVector(width / 2, height / 2);
  let size = 20;
  fill(0);
  let count = 0;
  for (let x = 100; x < width - 100; x += size) {
    if (count > strings.length) break;
    for (let y = 100; y < height - 100; y += size) {
      let char = strings[count % strings.length];
      if (char === " ") {
      } else {
        letter(createVector(x, y), size, char);
      }

      count++;
      if (count > strings.length) break;
    }
  }
}

function letter(origin, size, char) {
  noFill();
  stroke(0);
  strokeWeight(1);
  phylotalix(origin, size, char);
  noFill();
  // ellipse(origin.x, origin.y, size, size);
}

function phylotalix(origin, size = 100, letter) {
  let charCode = letter.charCodeAt(0);

  for (let n = 0; n < 200; n++) {
    let angle = n * radians(charCode);
    let r = Math.pow(n, 0.75) * 1;
    if (r > size / 2) return;
    let pos = createVector(
      origin.x + r * cos(angle),
      origin.y + r * sin(angle)
    );

    fill(0);
    ellipse(pos.x, pos.y, 2, 2);
  }
}
function keyPressed() {
  if (keyCode == 83) {
    save("1_14_23.jpeg");
  }
}
