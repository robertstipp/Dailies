var count = 0;
function setup() {
  createCanvas(1024, 1024);
  //noLoop();
  noStroke();
  colorMode(HSB);
}

function draw() {
  push();
  translate(width / 2, height / 2);
  background(255);
  var r0 = 78;
  var time = count * 0.02;
  var num = 20;
  for(var i = 0; i < num; i++)
  {
    push();
    fill(i % 2 * 255);
    // fill(190, 8*(num-i), i*3 + 50*(i%2));
    rotate(time);
    if(i > 0)
      translate(r0/2, 0);
    
    circle(0, 0, r0*(num-i));
    
  }
  for(var i = 0; i < num; i++)
  {
    pop();
  }
  pop();
  count+=.5;
}



