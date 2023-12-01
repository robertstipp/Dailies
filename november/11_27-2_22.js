const yellow = "#fac901";
const white = "#FAF9F6";
const blue = "#225095";
const red = "#dd0100";
const black = "#000";
const colors = [yellow, white, blue, red];

function setup() {
  createCanvas(1100, 1100);

  noStroke();
  // blendMode(DODGE);

  let count = 0;
  for (let x = 0; x <= 1100; x += 100) {
    for (let y = 0; y <= 1100; y += 100) {
      let width = 100;

      const options = shuffleColors(colors);
      let c1 = options.pop();
      let c2 = options.pop();
      let c3 = options.pop();

      fill(c1);
      rect(x, y, 100);
      fill(c3);
      if (count % 2 === 0) {
        arc(x, y + width, width * 2, width * 2, (PI * 3) / 2, TAU);
      } else {
        arc(x + width, y + width, width * 2, width * 2, PI, (PI * 3) / 2);
      }
      fill(c2);
      if (count % 2 === 0) {
        arc(x + width / 2, y + width, width, width, PI, TAU);
      } else {
        arc(x + width, y + width / 2, width, width, PI / 2, (PI * 3) / 2);
      }
      count++;
    }
    count++;
  }
}

function shuffleColors(colors) {
  let result = [];
  let options = colors.slice();
  for (let i = 0; i < colors.length; i++) {
    let selection = random(options);
    result.push(selection);
    options = options.filter((option) => option !== selection);
  }

  return result;
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("11_27_22.jpeg");
  }
}
