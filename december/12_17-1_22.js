const colors = ["#00FFF6", "#00E7FF", "#009EFF", "#0014FF"];
const colors2 = ["#FFCB0D", "#E8A20C", "#FF9400", "#E86C0C", "#FF530D"];

let cnv = [];
let items = [];
let size1;

function setup() {
  pixelDensity(8);
  createCanvas(1080, 1080);
  cnv = [];
  items = [];
  background(255);
  itemNum = 50;
  for (let i = 0; i < itemNum; i++) {
    cnv[i] = createGraphics(width, height);
    cnv[i].noStroke();
    ctx = cnv[i].canvas.getContext("2d");
    cnv[i].rectMode(CENTER);
    size1 = random(100, 300);
    x = random(width);
    y = random(height);
    type = random(2);
    rot = random(PI);
    cnv[i].fill(random(colors));
    cnv[i].push();
    cnv[i].translate(x, y);
    cnv[i].rotate(rot);
    if (type < 1) {
      cnv[i].rect(0, 0, size1, size1, 10);
    } else if (type < 2) {
      cnv[i].ellipse(0, 0, size1, size1, 10);
    }
    cnv[i].pop();
    ctx.clip();
    items.push(size1, x, y, type, rot);
  }

  for (k = 0; k < itemNum; k++) {
    for (j = 0; j < items.length; j += 5) {
      if (k != j / 5) {
        cnv[k].fill(random(colors2));
        size1 = items[j];
        x = items[j + 1];
        y = items[j + 2];
        type = items[j + 3];
        rot = items[j + 4];
        cnv[k].push();
        cnv[k].translate(x, y);
        cnv[k].rotate(rot);
        if (type < 1) {
          cnv[k].rect(0, 0, size1, size1, 10);
        } else if (type < 2) {
          cnv[k].ellipse(0, 0, size1, size1, 10);
        }
        cnv[k].pop();
      }
    }
    image(cnv[k], 0, 0);
  }
}
function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_14_22.jpeg");
  }
}
