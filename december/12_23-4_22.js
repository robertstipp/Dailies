const colors = ["#472183", "#4B56D2", "#82C3EC", "#F1F6F5"];

let fromColor1 = colors[0];
let toColor1 = colors[1];
let fromColor2 = colors[2];
let toColor2 = colors[3];

function setup() {
  pixelDensity(1);
  createCanvas(1080, 1080);
  background(0);
  let maxD = dist(0, 0, width / 2, height / 2);
  for (let x = 0; x <= width; x++) {
    for (let y = 0; y <= height; y++) {
      let d = dist(x, y, width / 2, height / 2);
      let angle =
        atan2(y - height / 2, x - width / 2) + map(d, 0, maxD, 0, 20 * PI);
      let xPos = width / 2 + cos(angle) * d;
      let yPos = height / 2 + sin(angle) * d;
      let c1 = lerpColor(
        color(fromColor1),
        color(toColor1),
        noise(xPos / 50, yPos / 50)
      );
      let c2 = lerpColor(
        color(fromColor2),
        color(toColor2),
        noise(xPos / 50, yPos / 50)
      );
      let c3 = lerpColor(c1, c2, noise(xPos / 50, yPos / 50));
      stroke(c3);
      // stroke(c1);
      point(x, y);
    }
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_24_22.jpeg");
  }
}
