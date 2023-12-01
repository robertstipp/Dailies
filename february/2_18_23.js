let colors = [
  "#c30010",
  "#d1001f",
  "#de0a26",
  "#ff2c2c",
  "#ff4d4d",
  "#ff6e6e",
  "#ff8f8f",
  "#ffb0b0",
];
let colorsBlue = [
  "#0700C4",
  "#0000FF",
  "#0052FF",
  "#007AFF",
  "#00A3FF",
  "#00CCFF",
];
let e, g;
let margin = 100;
let cols, rows;
let grid;
let ar;
let effW, effH, cellW, cellH;
let clockArray;
let count = 0;
function setup() {
  pixelDensity(1);
  createCanvas(1080, 1920);
  ar = width / height;
  cols = 4;

  rows = 6;
  grid = Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));
  clockArray = Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));
  background(0);
  effW = width - margin * 2;
  effH = height - margin * 2;
  cellW = effW / cols;
  cellH = cellW;

  noFill();
  // frameRate(1);
  // noLoop();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cellPos = createVector(i * cellW + margin, j * cellH + margin);
      let cellMid = createVector(cellPos.x + cellW / 2, cellPos.y + cellH / 2);
      let digit = 0;
      let selectAnglesIndex = numArrayRep[digit][j][i];
      let selectAngles = lineAngles[selectAnglesIndex];
      clockArray[j][i] = new ClockFace(
        cellMid.x,
        cellMid.y,
        cellW,
        selectAngles,
        digit,
        i,
        j
      );
    }
  }
  stroke(255);
}
function draw() {
  background(0);

  clockArray.forEach((row) => {
    row.forEach((clock) => {
      clock.draw();
      clock.count++;
    });
  });
  count++;
  // console.log(count);
  // for (let i = 0; i < cols; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     let cellPos = createVector(i * cellW + margin, j * cellH + margin);
  //     let cellMid = createVector(cellPos.x + cellW / 2, cellPos.y + cellH / 2);
  //     stroke(255);
  //     let digit = 2;
  //     let selectAnglesIndex = numArrayRep[digit][j][i];
  //     let selectAngles = lineAngles[selectAnglesIndex];

  //     drawLines(cellMid, cellW, selectAngles);
  //     let angle1 = selectAngles[0];
  //     let angle2 = selectAngles[1];
  //     fill(255);
  //     // arc(cellMid.x, cellMid.y, cellW, cellH, angle1, angle2);
  //     noFill();
  //     // rect(cellPos.x, cellPos.y, cellW, cellH);
  //     // ellipse(cellMid.x, cellMid.y, cellW, cellH);
  //     let clockFace = new ClockFace(cellMid.x, cellMid.y, cellW, []);
  //     clockFace.draw();
  //   }
  // }
}

function drawLines(origin, diameter, angles) {
  let r = diameter / 2;
  let x = origin.x;
  let y = origin.y;
  stroke(255);
  angles.forEach((angle) => {
    line(x, y, x + r * cos(angle), y + r * sin(angle));
  });
}

class ClockFace {
  constructor(x, y, d, hands, digit, i, j) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.i = i;
    this.j = j;
    this.duration = 600;
    this.digit = digit;
    this.selectAnglesIndex = numArrayRep[this.digit][j][i];
    this.hands = lineAngles[this.selectAnglesIndex];
    this.target1 = this.hands[0];
    this.current1 = 0;
    this.speed1 = (this.target1 - this.current1) / this.duration;
    this.target2 = this.hands[1];
    this.current2 = 0;
    this.speed2 = (this.target2 - this.current2) / this.duration;
    this.count = 0;
  }
  travel() {
    let reachedTarget1 = false;
    let reachedTarget2 = false;
    if (this.current1 < this.target1) {
      this.current1 += this.speed1;
      if (this.current1 > this.target1) {
        this.current1 = this.target1;
        reachedTarget1 = true;
      }
    } else {
      this.current1 -= this.speed1;
      if (this.current1 < this.target1) {
        this.current1 = this.target1;
        reachedTarget1 = true;
      }
    }
    if (this.current2 < this.target2) {
      this.current2 += this.speed2;
      if (this.current2 > this.target2) {
        this.current2 = this.target2;
        reachedTarget2 = true;
      }
    } else {
      this.current2 -= this.speed2;
      if (this.current2 < this.target2) {
        this.current2 = this.target2;
        reachedTarget2 = true;
      }
    }
    if (reachedTarget1 && reachedTarget2) {
      this.switchHands();
    }
  }

  drawHands() {
    this.travel();
    // hand1
    line(
      this.x,
      this.y,
      this.x + (this.d / 2) * cos(this.current1),
      this.y + (this.d / 2) * sin(this.current1)
    );
    // hand2
    line(
      this.x,
      this.y,
      this.x + (this.d / 2) * cos(this.current2),
      this.y + (this.d / 2) * sin(this.current2)
    );
  }
  drawDigit() {
    textSize(this.d / 2);
    text(`${this.digit}`, this.x, this.y);
  }

  switchHands() {
    if (count % this.duration == 0) {
      this.digit = (this.digit + 1) % 2;

      this.selectAnglesIndex = numArrayRep[this.digit][this.j][this.i];
      this.hands = lineAngles[this.selectAnglesIndex];
      this.current1 = this.target1; // Set the previous target as current
      this.target1 = this.hands[0];
      this.speed1 = (this.target1 - this.current1) / this.duration;
      this.current2 = this.target2; // Set the previous target as current
      this.target2 = this.hands[1];
      this.speed2 = (this.target2 - this.current2) / this.duration;
    }
  }
  draw() {
    stroke(255);
    this.drawHands();
    this.switchHands();
    this.drawDigit();
    ellipse(this.x, this.y, this.d);
  }
}

let numArrayRep = [
  [
    //0
    [0, 5, 5, 1],
    [4, 0, 1, 4],
    [4, 4, 4, 4],
    [4, 4, 4, 4],
    [4, 3, 2, 4],
    [3, 5, 5, 2],
  ],
  [
    //1
    [0, 5, 1, 6],
    [3, 1, 4, 6],
    [6, 4, 4, 6],
    [6, 4, 4, 6],
    [0, 2, 3, 1],
    [3, 5, 5, 2],
  ],
  [
    //2
    [0, 5, 1, 6],
    [3, 1, 4, 6],
    [6, 4, 4, 6],
    [6, 4, 4, 6],
    [0, 2, 3, 1],
    [3, 5, 5, 2],
  ],
];

//0
let bottomRight = [0, Math.PI / 2];
//1
let bottomLeft = [Math.PI / 2, Math.PI];
// 2
let topLeft = [Math.PI, (3 * Math.PI) / 2];
// 3
let topRight = [(3 * Math.PI) / 2, 2 * Math.PI];
//4
let upDown = [(3 * Math.PI) / 2, Math.PI / 2];
//5
let leftRight = [0, Math.PI];
//6
let arb = [Math.PI, Math.PI];

let lineAngles = [
  bottomRight,
  bottomLeft,
  topLeft,
  topRight,
  upDown,
  leftRight,
  arb,
];

function keyPressed() {
  if (key == "s") {
    save("2021-02-23.jpeg");
  }
}
