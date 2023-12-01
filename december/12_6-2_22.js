let height = 100;
let width = 100;

let midW = width / 2;
let midH = height / 2;

function setup() {
  createCanvas(600, 600);
  background(0);

  // for (let x = 100; x < 500; x += 100) {
  //   for (let y = 100; y < 500; y += 100) {
  //     rect(x, y, 100);
  //     let shape = random([
  //       right,
  //       up,
  //       turnLeftUp,
  //       turnLeftDown,
  //       turnUpRight,
  //       turnDownRight,
  //     ]);
  //     // let shape2 = random([right, up, turnLeftUp, turnLeftDown]);
  //     shape(x, y);
  //     // shape2(x, y);
  //     // right(x, y);
  //     // turnRight(x, y);
  //   }
  // }

  let shape = random([
    right,
    up,
    turnLeftUp,
    turnLeftDown,
    turnUpRight,
    turnDownRight,
  ]);

  // noFill();

  fill("red");
  stroke(255);

  let curX = 100;
  let curY = 100;
  let curShape = { fn: right, label: "right" };
  for (let i = 0; i < 3; i++) {
    let nextX, nextY;
    if (curShape.label === "right") {
      nextX = curX + width;
    }
    curShape.fn(curX, curY);
    curX = nextX;
  }

  curShape = random([
    { fn: right, label: "right" },
    // { fn: up, label: "up" },
    // { fn: turnLeftUp, label: "turnLeftUp" },
    // { fn: turnLeftDown, label: "turnLeftDown" },
    // { fn: turnUpRight, label: "turnUpRight" },
    // { fn: turnDownRight, label: "turnDownRight" },

    // up,
    // turnLeftUp,
    // turnLeftDown,
    // turnUpRight,
    // turnDownRight,
  ]);
}

const right = function (x, y) {
  push();
  strokeWeight(10);

  line(x, y + midH, x + width, y + midH);
  pop();
};

const up = function (x, y) {
  push();
  strokeWeight(10);

  line(x + midW, y, x + midW, y + height);
  pop();
};

const turnLeftDown = function (x, y) {
  push();
  strokeWeight(10);

  arc(x, y + height, width, height, (PI * 3) / 2, 0);
  pop();
};

const turnLeftUp = function (x, y) {
  push();
  strokeWeight(10);

  arc(x, y, width, height, 0, PI / 2);
  pop();
};

const turnUpRight = function (x, y) {
  push();
  strokeWeight(10);

  arc(x + width, y, width, height, PI / 2, PI);
  pop();
};

const turnDownRight = function (x, y) {
  push();
  strokeWeight(10);

  arc(x + width, y + height, width, height, PI, (PI * 3) / 2);
  pop();
};
