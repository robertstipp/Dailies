const colors = ["#DC0000", "#850000", "#FFDB89", "#FFF6C3"];
function setup() {
  pixelDensity(4);
  createCanvas(1080, 1080);

  background(220);

  cnv1 = createGraphics(width, height);
  cnv2 = createGraphics(width, height);
  ctx1 = cnv1.canvas.getContext("2d");
  ctx2 = cnv2.canvas.getContext("2d");

  let x = 540;
  let y = 540;
  let size = 300;
  let size2 = size * 3;
  let color1 = random(colors);
  let color2 = random(colors.filter((c) => c !== color1));
  let color3 = random(colors.filter((c) => c !== color1 && c !== color2));
  let color4 = random(
    colors.filter((c) => c !== color1 && c !== color2 && c !== color3)
  );

  cnv1.push();
  cnv1.translate(x, y);
  cnv1.noStroke();
  cnv1.fill(color2);
  cnv1.fill(color3);
  cnv1.ellipse(0, 0, size2);
  ctx1.clip();
  cnv1.fill(color1);
  let dotSize = random(10, 20);
  polkaDot(cnv1, size2, dotSize, color1);
  cnv1.fill(color2);

  image(cnv1, 0, 0);
  cnv1.pop();
}

function genTriangle(x, y, size) {
  let points = [];
  points.push([x, y]);
  points.push([x + size, y]);
  points.push([x + size / 1, y + size]);
  return points;
}

function polkaDot(canvas, size, dotSize, clr) {
  for (let y = -size; y < size; y += dotSize) {
    for (let x = -size; x < size; x += dotSize) {
      if (noise(x / 100, y / 100) < 0.5) {
        let c = color(clr);
        canvas.fill(clr);
        canvas.ellipse(x, y, dotSize * 0.8);
        c = color("black");
        canvas.fill(c);
        canvas.ellipse(x + 2, y + 2, dotSize * 0.8);
      }
    }
  }
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_14_22.jpeg");
  }
}
