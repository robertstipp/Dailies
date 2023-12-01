let vertices;
function setup() {
  createCanvas(600, 600);
  background(0);

  vertices = new Vertices();
  vertices.show();
}
function draw() {}

class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    noFill();
    ellipse(this.x, this.y, 10);
  }
}

class Vertices {
  constructor() {
    this.vertices = [];

    for (let i = 0; i < 100; i++) {
      this.vertices.push(new Vertex(random(width), random(height)));
    }
  }

  connect() {
    for (let i = 0; i < this.vertices.length; i++) {
      for (let j = 0; j < this.vertices.length; j++) {
        if (i !== j) {
          let vertex1 = this.vertices[i];
          let vertex2 = this.vertices[j];
          let distance = dist(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
          if (i !== j && distance < 250 && noise(distance / 100) < 0.3) {
            stroke(255);
            line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
          }
        }
      }
    }
  }

  show() {
    this.vertices.forEach((vertex) => vertex.show());
    this.connect();
  }
}
