function setup() {
  createCanvas(600, 600);
  background(200);

  let origin = createVector(width / 2, height / 2);
  let size = 100;
  let c = color("#8479e1");
  let c1 = color("#fff798");
  let c3 = color("#fd7e89");
  let c4 = color("#cf1b1b");
  for (let i = 0; i < 20; i++) {
    let pos = origin
      .copy()
      .add([random(-width / 2, width / 2), random(-height / 2, height / 2)]);

    let c2 = lerpColor(c, random([c1, c3]), pos.y / height);
    c2.setAlpha(10);
    stroke(c2);
    cloud(pos, size, size, 10);
  }

  strokeWeight(2);
  noFill();
  stroke(0);
  ellipse(origin.x, origin.y, size, size);
}
function draw() {}

function cloud(origin, cloudWidth, cloudHeight, thickness) {
  strokeWeight(thickness);
  let pos = origin.copy();
  line(pos.x - cloudWidth / 2, pos.y, pos.x + cloudWidth / 2, pos.y);

  for (let i = 0; i < 200; i++) {
    pos.add(
      createVector(
        random(-cloudWidth / 2, cloudWidth / 2),
        random(-thickness / 2, thickness / 2)
      )
    );
    line(pos.x - cloudWidth / 2, pos.y, pos.x + cloudWidth / 2, pos.y);
  }
}
function clouds() {
  let origin = createVector(width / 2, height / 2);
  let size = 100;
  let c = color("#8479e1");
  let c1 = color("#fff798");
  let c3 = color("#fd7e89");
  let c4 = color("#cf1b1b");
  for (let i = 0; i < 200; i++) {
    let pos = origin
      .copy()
      .add([random(-width / 2, width / 2), random(-height / 2, height / 2)]);

    let c2 = lerpColor(c, random([c1, c3]), pos.y / height);
    c2.setAlpha(10);
    stroke(c2);
    cloud(pos, size, size, 10);
  }
}
