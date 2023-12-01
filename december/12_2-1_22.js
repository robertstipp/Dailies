function setup() {
  createCanvas(600, 600);
  background(0);
  noStroke();

  rect(130, 150, 20, 20, 2, 2, 0, 2);
  rect(150, 150, 20, 20, 0, 0, 0, 0);
  rect(150, 170, 20, 20, 0, 2, 2, 2);

  fill("white");
  rect(130, 170, 20, 20, 0, 0, 0, 0);
  fill("black");
  rect(130, 170, 20, 20, 0, 0, 0, 0);

  const arr = Array(2)
    .fill()
    .map(() => Array(2).fill(0));

  arr[0][0] = 1;
  arr[0][1] = 1;
  arr[1][1] = 1;

  console.log(arr);
}

function draw() {}

function shape() {
  // bottom
  //
}

class Square {}
