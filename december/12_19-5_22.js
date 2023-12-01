function setup() {
  createCanvas(1080, 1080);

  background("#2B3467");

  let count = 0;
  for (let r = 1000; r > 100; r -= 100) {
    let colors;
    colors = ["#000", "#FCFFE7"];
    if (count % 2 === 0) {
      colors = ["#2B3467", "#FCFFE7"];
    }

    shape(r, colors[0], colors[1]);
    count++;
  }
  // textureBackground(width, height);
}

function textureBackground(width, height) {
  for (let y = 0; y <= height; y++) {
    for (let x = 0; x <= width; x++) {
      let angle = random(-PI / 6, PI / 12);

      let len = map(noise(x / 100, y / 100), 0, 1, 0, 1.1);
      let point0 = createVector(x, y);
      let point1 = createVector(
        point0.x + len * cos(angle),
        point0.y + len * sin(angle)
      );
      stroke("#FCFFE7");
      line(point0.x, point0.y, point1.x, point1.y);
    }
  }
}

function shape(r, mainClr, accentClr) {
  let cnv1 = createGraphics(width, height);
  let ctx1 = cnv1.canvas.getContext("2d");
  cnv1.fill(mainClr);
  cnv1.noStroke();
  cnv1.ellipse(540, 540, r);
  ctx1.clip();
  textureCanvas(cnv1, accentClr, width, height);
  image(cnv1, 0, 0);
}

function textureCanvas(cnv, accentClr, width, height) {
  for (let y = 0; y <= height; y++) {
    for (let x = 0; x <= width; x++) {
      let angle = random(-PI / 6, PI / 12);

      let len = map(noise(x / 100, y / 100), 0, 1, 0, 1.1);
      let point0 = createVector(x, y);
      let point1 = createVector(
        point0.x + len * cos(angle),
        point0.y + len * sin(angle)
      );
      cnv.stroke(accentClr);
      cnv.line(point0.x, point0.y, point1.x, point1.y);
    }
  }
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_17_22.jpeg");
  }
}
