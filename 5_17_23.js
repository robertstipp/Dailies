let margin = 0
let canvasW = 800;
let canvasH = 1400
let cols = 4
let rows = 8
let effW, effH,cellW, cellH
let t = 0
function setup() {
  createCanvas(canvasW,canvasH)
  effW = width - 2 * margin;
  effH = height - 2 * margin;
  cellW = effW / cols;
  cellH = effH / rows;
  
}
function draw() {
  background("#EADEDE")
  rectMode("CENTER")
  for (let i = -1; i < cols + 1; i ++) {
    for (let j = -1; j < rows +1; j++) {
      let x = i * cellW + margin
      let y = j * cellH + margin
      stroke(0)
      noFill()
      for (let i = 0;  i < 1; i++) {
        push()
        translate(x + cellW/2,y + cellH/2)
        rotate(t)
        
        rect(0,0,cellW * .9,cellH * .9)
        pop()
      }
      
    }
  }
  t+=.01
}