function setup() {}
function draw() {}

function makeRect(posx, posy, wid, hei, angle) {
  this.posx = posx;
  this.posy = posy;
  this.wid = wid;
  this.hei = hei;

  this.angle = angle;
  this.vertices = [];

  this.makeCoordinates = function () {
    this.vertices = [];

    this.vertices.push(
      { x: this.wid / 2, y: this.hei / 2 },
      { x: -this.wid / 2, y: this.hei / 2 },
      { x: -this.wid / 2, y: -this.hei / 2 },
      { x: this.wid / 2, y: -this.hei / 2 }
    );
  };

  this.makeCoordinates();
}
