const colors = ["#10A19D", "#540375", "#FF7000", "#FFBF00"];
function setup() {
  pixelDensity(4);
  createCanvas(1080, 1080);
  background(0);
  // fill("red");
  rect(0, 300, 1080, 480);
  strokeWeight(5);
  stripes(this);

  // left circle
  cnv1 = createGraphics(1080, 1080);
  cnv1.fill(0);
  cnv1.stroke(255);
  cnv1.strokeWeight(5);
  cnv1.circle(0, 540, 540);
  ctx1 = cnv1.canvas.getContext("2d");
  ctx1.clip();
  cnv1.fill("white");
  cnv1.rect(0, 300, 1080, 480);
  stripes(cnv1);
  image(cnv1, 0, 0);

  // right circle
  cnv2 = createGraphics(1080, 1080);
  cnv2.fill(0);
  cnv2.stroke(255);
  cnv2.strokeWeight(5);
  cnv2.circle(1080, 540, 540);
  ctx2 = cnv2.canvas.getContext("2d");
  ctx2.clip();
  cnv2.fill("white");
  cnv2.rect(0, 300, 1080, 480);
  stripes(cnv2);
  image(cnv2, 0, 0);

  // middle circle
  cnv3 = createGraphics(1080, 1080);
  cnv3.fill(0);
  cnv3.stroke(255);
  cnv3.strokeWeight(5);
  cnv3.circle(540, 540, 540);
  ctx3 = cnv3.canvas.getContext("2d");
  ctx3.clip();
  cnv3.fill("white");
  cnv3.rect(0, 300, 1080, 480);
  stripes(cnv3);
  image(cnv3, 0, 0);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_14_22.jpeg");
  }
}

function stripes(cnv) {
  for (let y = 310; y < 780; y += 10) {
    if (cnv === this) {
      cnv.stroke(random([0, 255]));
    } else {
      cnv.stroke(random(colors));
    }
    cnv.line(0, y, 1080, y);
  }
}
