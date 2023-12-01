let sun;
const suns = [];
function setup() {
  pixelDensity(4);
  createCanvas(1080, 1080);
  background(0);
  stroke(255);
  let origin = createVector(540, 540);
  for (let i = 0; i < 10; i++) {
    let r = map(i, 0, 1, 50, 100);
    let angle = map(i, 0, 10, 0, 6 * PI);
    let x = random(width);
    let y = random(height);
    suns.push(new Sun(x, y, random(150, 200)));
  }

  // for (let x = 0; x < height; x += 10) {
  //   for (let y = 0; y <= height; y += 10) {
  //     let xPos = x;
  //     let yPos = y;

  //     flowLine(x, y, 20);
  //   }
  // }

  for (let i = 0; i < 300; i++) {
    let xPos = random(-200, width + 200);
    let yPos = random(-200, height + 200);
    if (suns.some((sun) => sun.checkSun(xPos, yPos))) {
      continue;
    }
    flowLine(xPos, yPos, 100);
  }
  stroke(255);
  noFill();

  // suns.forEach((sun) => sun.display());
}

function draw() {}

function drawVect(x, y) {
  let mag1 = 2;
  let mag2 = map(dist(x, y, sun.xPos, sun.yPos), 0, 300, 40, 0);
  let angle1 = noise(x / 100, y / 100) * TWO_PI;
  let angle2 = atan2(sun.yPos - y, sun.xPos - x);
  let vec1 = p5.Vector.fromAngle(angle1, mag1);
  let vec2 = p5.Vector.fromAngle(angle2, mag2);
  let vec3 = p5.Vector.add(vec1, vec2);
  line(x, y, x + vec3.x, y + vec3.y);
}

class Sun {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.origin = createVector(300, 300);
    this.startAngle = 0;
    this.speed = 0.1;
    this.orbitRadius = 100;

    this.currentAngle = this.startAngle;
    this.xPos = this.origin.x + this.orbitRadius * Math.cos(this.startAngle);
    this.yPos = this.origin.y + this.orbitRadius * Math.sin(this.startAngle);
  }

  orbit() {
    this.currentAngle += this.speed;
    this.xPos = this.origin.x + this.orbitRadius * Math.cos(this.currentAngle);
    this.yPos = this.origin.y + this.orbitRadius * Math.sin(this.currentAngle);
  }

  checkSun(x, y) {
    let d = dist(x, y, this.x, this.y);
    if (d < this.r / 2) {
      return true;
    }
  }
  display() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, this.r);
  }
}

function flowLine(x, y, steps, resolution) {
  let curX = x;
  let curY = y;

  for (let i = 0; i < steps; i++) {
    let noiseAngle = noise(curX / 1000, curY / 1000) * TWO_PI;
    let noiseMag = 1;
    let noiseVec = p5.Vector.fromAngle(noiseAngle, noiseMag);

    let totalSunVec = createVector(0, 0);

    for (let i = 0; i < suns.length; i++) {
      let sun = suns[i];
      let sunVec = createVector(curX - sun.x, curY - sun.y);
      sunVec.mult(map(sunVec.mag(), 0, sun.r / 2, 1, 0));
      sunVec.normalize();
      totalSunVec.add(sunVec);
    }
    let len;
    if (
      suns.some((sun) => {
        return sun.checkSun(curX, curY);
      })
    ) {
      len = 1;
      stroke("red");
    } else {
      len = 1;
      stroke("white");
    }

    nextX = curX + len * (noiseVec.x + totalSunVec.x);
    nextY = curY + len * (noiseVec.y + totalSunVec.y);
    line(curX, curY, nextX, nextY);
    curX = nextX;
    curY = nextY;
  }
}

function keyPressed() {
  if (keyCode == 83) {
    console.log("saved");
    save("12_13_22.jpeg");
  }
}
