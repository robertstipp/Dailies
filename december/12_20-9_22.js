function setup() {
  createCanvas(400, 400);
  background(0);
  let from = color(255, 0, 0);
  let to = color(255, 255, 255);

  noStroke();
  for (let r = 300; r > 0; r -= 1) {
    let inter = map(r, 0, 300, 0, 1);
    let c = lerpColor(to, from, inter);
    fill(c);
    ellipse(200, 200, r, r);
  }
}
