let margin = 100;

let nodes = [];
const numNodes = 5;
const maxDist = 200;
let centerX = 300;
let centerY = 300;

let mic, fft, song, bass, mid;

function preload() {
  song = loadSound("./media/17. Flume - Holdin On (Hermitude Remix).mp3");
}

function setup() {
  createCanvas(600, 600);
  background(0);
  stroke(255, 50);
  strokeWeight(1);

  // Audio
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  for (let radius = 0; radius < 300; radius += 10) {
    for (let angle = 0; angle < TAU; angle += TAU / numNodes) {
      let angleOffset = random() < 0.4 ? TAU / numNodes / 2 : 0;
      let x = centerX + radius * Math.cos(angle + angleOffset);
      let y = centerY + radius * Math.sin(angle + angleOffset);
      point(x, y);
      nodes.push(new Node(x, y));
    }
  }

  nodes.forEach((node) => node.show());
  nodes.forEach((node) => node.addNeighbors());
  console.log(nodes);
  nodes.forEach((node) => node.connectNeigbors());
}
function draw() {
  background(0);

  let spectrum = fft.analyze();
  // console.log(getFrameRate());
  bass = fft.getEnergy("bass");
  treble = fft.getEnergy("treble");
  mid = fft.getEnergy("mid");

  nodes.forEach((node) => node.connectNeigbors());
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.c = color("white");
    this.r = 2;
    this.neighbors = [];
  }

  addNeighbors() {
    this.neighbors = findNeighbors(this, nodes);
  }
  connectNeigbors() {
    this.neighbors.forEach((neighbor) => {
      if (neighbor.d > bass / 4 && neighbor.d < bass / 2) {
        line(this.x, this.y, neighbor.x, neighbor.y);
      }
    });
  }

  show() {
    fill(this.c);
    ellipse(this.x, this.y, this.r);
  }
}

function findNeighbors(node, nodes) {
  const myNode = node;
  const neighbors = [];
  nodes.forEach((n) => {
    const otherNode = n;

    if (otherNode !== myNode) {
      let d = dist(otherNode.x, otherNode.y, myNode.x, myNode.y);
      if (d < 255) {
        const neighbor = {
          ...otherNode,
          d,
        };
        neighbors.push(neighbor);
      }
    }
  });
  return neighbors;
}

function distCheck(x, y) {
  return dist(x, y, 300, 300) < maxDist;
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
