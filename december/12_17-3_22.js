const colors = ["#FFCB0D", "#E8A20C", "#FF9400", "#E86C0C", "#FF530D"];
function setup() {
  pixelDensity(4);
  createCanvas(1080, 1080);
  background(0);
  let midX = width / 2;
  let midY = height / 2;
  noStroke();
  let count = 0;

  for (let r = 2400; r > 100; r -= random(100, 200)) {
    let clr1 = random(colors);
    let clr2 = random(colors.filter((color) => color !== clr1));
    let clrs = [clr1, clr2];
    if (random() < 0.5) {
      clrs = ["white", "black"];
    }

    if (count % 2 === 0) {
      clrs.reverse();
    }

    shape1(r, clrs[0], clrs[1], 10);
    count++;
  }
}

function shape1(r, mainClr, accentClr) {
  let cnv1 = createGraphics(width, height);
  let ctx1 = cnv1.canvas.getContext("2d");
  cnv1.fill(mainClr);
  cnv1.noStroke();
  let midX = width / 2;
  let midY = height / 2;
  cnv1.ellipse(midX, midY, r);
  ctx1.clip();
  shape2(cnv1, accentClr, 90);
  image(cnv1, 0, 0);
}

function shape2(cnv, clr, step) {
  for (let y = 10; y <= height; y += step) {
    for (let x = 10; x <= width; x += step) {
      cnv.fill(clr);
      cnv.noStroke();
      let size = map(y, 10, 1080, step / 2, step);
      cnv.ellipse(x, y, size);
    }
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_17_22.jpeg");
  }
}
