let cols = 10;
let rows = 10;

function setup() {
  createCanvas(1080,1080);
  noLoop()
  strokeWeight(10)
  stroke(255)
  noFill()
}
function draw() {
  background(0);
  let cellW = width / cols;
  let cellH = height / rows;
  let arcfunctions = [arc1,arc2,arc3,arc4]
  for (let i = 1; i< cols-1; i++) {
    for (let j = 1; j< rows-1; j++) {
      let x = i * cellW;
      let y = j * cellH;
      arcfunctions.forEach((arcfunc)=>{
        if (random(1) > 0.25){
          arcfunc(x,y,cellW)
        }
      })
      if (random(1) > 0.5){
      squareFunc(x,y,cellW)
      } else {
      dotFunc(x,y,cellW)
      }
      
    }
  }
}

function arc1 (x,y,cellW){
  arc(x,y,cellW,cellW,0,PI/2)
}

function arc2 (x,y,cellW){
  arc(x+cellW,y,cellW,cellW,PI,PI+PI/2)
}
function arc3 (x,y,cellW) {
  arc(x+cellW,y,cellW,cellW,PI/2,PI)
}
function arc4 (x,y,cellW) {
  arc(x,y+cellW,cellW,cellW,PI/2+PI,TAU)
}

function dotFunc(x,y,cellW){
  let pos = createVector(x,y)
  push()
  fill(255)
  ellipse(pos.x,pos.y,cellW/1.8)
  pop()
}

function squareFunc(x,y,cellW){
  let pos = createVector(x,y)
  push()
  fill(255)
  rectMode(CENTER)
  rect(pos.x,pos.y,cellW/2)
  pop()
}