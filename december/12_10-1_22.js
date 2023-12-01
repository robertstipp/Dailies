const colors = ["#4DF8C8", "#43D984", "#56F06D", "#5CD943", "#A5F84D"];

const colors2 = ["#ff99c8", "#fcf6bd", "#d0f4de", "#a9def9", "#e4c1f9"];
let opennoise;
let radii;
const white = "#FFFFFF";
const black = "#000000";
function setup() {
  radiiBands = Array(40)
    .fill(0)
    .map((_, i) => 50 + i * map(i, 0, 40, 20, 10));
  createCanvas(1080, 1080);

  background(black);
  opennoise = new openSimplexNoise(Date.now());

  noFill();
  strokeWeight(1);
  // for (let r = 200; r <= 200; r += 10) {
  //   beginShape();
  //   for (let a = 0; a <= TAU + 0.01; a += 0.1) {
  //     let tangent = a + PI / 2;

  //     let x = 300 + r * Math.cos(a);
  //     let y = 300 + r * Math.sin(a);

  //     let tangentOffset = map(
  //       opennoise.noise4D(x, y, Math.cos(a), Math.sin(a)),
  //       -1,
  //       1,
  //       -0.1,
  //       0.1
  //     );
  //     let x1 = x + 10 * Math.cos(tangent + tangentOffset);
  //     let y1 = y + 10 * Math.sin(tangent + tangentOffset);
  //     curveVertex(x1, y1);
  //   }
  //   endShape(CLOSE);
  // }
  let midX = 540;
  let midY = 540;
  for (let j = 0; j < 50000; j++) {
    let radIndex = floor(random(radiiBands.length));
    let rad = radiiBands[radIndex];
    if (rad < 200 && random() < 0.5) continue;
    let startAngle = random(TAU);
    let curx = midX + rad * Math.cos(startAngle);
    let cury = midY + rad * Math.sin(startAngle);
    let cIndex = Math.floor(
      map(
        opennoise.noise3D(curx / 1000, cury / 100, rad),
        -1,
        1,
        0,
        colors.length
      )
    );

    let c = color(colors[cIndex]);
    let c2 = colors2[cIndex];
    let maxInt = Math.floor(random(10, 300));
    for (let i = 0; i < maxInt; i++) {
      let sw = map(i, 0, maxInt, 2, 1);

      strokeWeight(sw);
      c.setAlpha(10);
      stroke(c);

      let targetAngle = atan2(cury - midX, curx - midY);
      let tangent = targetAngle + PI / 2;

      let tangentOffset = map(
        opennoise.noise4D(
          curx / 1000,
          cury / 1000,
          Math.cos(targetAngle) / 1,
          Math.sin(targetAngle) / 10
        ),
        -1,
        1,
        -0.5,
        0.5
      );

      let effAngle;
      let d = dist(curx, cury, midX, midY);
      if (d < 200) {
        effAngle = tangent + tangentOffset;
      } else if (d < 450) {
        effAngle = noise(curx / 100, cury / 100) * 1.5 * TAU;
      } else {
        effAngle = tangent;
      }
      let nextX = curx + 1 * Math.cos(effAngle);
      let nextY = cury + 1 * Math.sin(effAngle);

      line(curx, cury, nextX, nextY);
      curx = nextX;
      cury = nextY;
    }
  }
  // border(100);
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_9_22.jpeg");
  }
}

function border(thick) {
  noStroke();
  fill("black");
  rect(0, 0, width, thick); // top
  rect(0, 0, thick, height); // left
  rect(0, height - thick, width, thick); // bottom
  rect(width - thick, 0, thick, height); // right
}
