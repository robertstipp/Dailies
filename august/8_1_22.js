let c;

function setup() {
  createCanvas(600, 600);
  background(0);
  noFill();
  stroke(255);
  strokeWeight(1);
}
function draw() {
  background(0);
  // for (x = 0; x <= width; x += 20) {
  //   for (y = 0; y <= height; y += 20) {
  //     line(x, y, y, x);
  //   }
  // }
  // circle
  translate(0, 0);

  drawComp();

  // push();
  // translate(150, 150);
  // stroke("#4700D8");
  // strokeWeight(4);
  // let h = 100;
  // for (let y = -h; y <= h; y += 10) {
  //   line(-h, y, h, y);
  //   line(-h, y, -150, y - 50);
  //   line(600, y + 200, 100, y);
  // }
  // pop();

  // push();
  // translate(500, 400);
  // c = color("#F900BF");
  // c.setAlpha(200);
  // stroke(c);
  // strokeWeight(3);
  // let sl = 100;
  // let p0 = createVector(-sl, 0);
  // let p1 = createVector(0, -2 * sl);
  // let p2 = createVector(sl, 0);
  // for (t = 0; t < 1.01; t += 0.05) {
  //   let p01 = createVector(lerp(p0.x, p1.x, t), lerp(p0.y, p1.y, t));
  //   let p12 = createVector(lerp(p2.x, p1.x, t), lerp(p2.y, p1.y, t));
  //   point(p01);
  //   point(p12);
  //   line(p01.x, p01.y, p12.x, p12.y);
  //   line(600, p01.y - 500, p12.x, p12.y);
  //   line(p01.x, p01.y, p12.x - 600, p12.y + 300);
  // }
  // pop();

  // ellipse;
  // push();
  // translate(150, 500);

  // let a = 100;
  // let b = 50;
  // for (let angle = PI / 2; angle <= (PI * 3) / 2; angle += 0.2) {
  //   let x1 = a * cos(angle);
  //   let y1 = b * sin(angle);
  //   let x2 = -a * cos(angle);
  //   let y2 = b * sin(angle);
  //   line(x1, y1, x2, y2);
  // }

  push();
  c = color("#F7FD04");
  c.setAlpha(200);
  stroke(c);
  strokeWeight(2);
  translate(300, 300);
  let r = 200;
  for (let angle = 0; angle <= PI; angle += 0.05) {
    let x1 = r * cos(angle);
    let y1 = r * sin(angle);
    let x2 = r * cos(-angle);
    let y2 = r * sin(-angle);
    line(x1, y1, x2, y2);

    // if (angle < PI / 2) {
    //   line(x1, y1, 600, y1 + 100);
    //   line(x1 + 600, y1 - 500, x2, y2);
    // }

    // if (angle > PI / 2) {
    //   push();
    //   line(x1, y1, -600, y1 + 400);
    //   line(x1 - 600, y1 - 600, x2, y2);
    //   pop();
    // }
  }
  pop();

  noLoop();
}

function keyPressed() {
  // 83 is key code for key "s"s
  // http://keycode.info/
  if (keyCode == 83) {
    console.log("got here");
    save("aug_1_22.jpeg");
  }
}

function drawComp() {
  push();
  translate(150, 150);
  stroke("#4700D8");
  strokeWeight(4);
  let h = 100;
  for (let y = -h; y <= h; y += 10) {
    line(-h, y, h, y);
    line(-h, y, -150, y - 50);
    line(600, y + 200, 100, y);
  }
  pop();

  push();
  translate(500, 400);
  c = color("#F900BF");
  c.setAlpha(200);
  stroke(c);
  strokeWeight(3);
  let sl = 100;
  let p0 = createVector(-sl, 0);
  let p1 = createVector(0, -2 * sl);
  let p2 = createVector(sl, 0);
  for (t = 0; t < 1.01; t += 0.05) {
    let p01 = createVector(lerp(p0.x, p1.x, t), lerp(p0.y, p1.y, t));
    let p12 = createVector(lerp(p2.x, p1.x, t), lerp(p2.y, p1.y, t));
    point(p01);
    point(p12);
    line(p01.x, p01.y, p12.x, p12.y);
    line(600, p01.y - 500, p12.x, p12.y);
    line(p01.x, p01.y, p12.x - 600, p12.y + 300);
  }
  pop();

  // push();
  // translate(400, 500);
  // c = color("#F900BF");
  // c.setAlpha(200);
  // stroke(c);
  // strokeWeight(2);
  // sl = 100;
  // p0 = createVector(-sl, 0);
  // p1 = createVector(0, -2 * sl);
  // p2 = createVector(sl, 0);
  // for (t = 0; t < 1.01; t += 0.05) {
  //   let p01 = createVector(lerp(p0.x, p1.x, t), lerp(p0.y, p1.y, t));
  //   let p12 = createVector(lerp(p2.x, p1.x, t), lerp(p2.y, p1.y, t));
  //   point(p01);
  //   point(p12);
  //   line(p01.x, p01.y, p12.x, p12.y);
  //   line(600, p01.y - 500, p12.x, p12.y);
  //   line(p01.x, p01.y, p12.x - 600, p12.y + 300);
  // }
  // pop();
}
