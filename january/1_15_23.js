let margin = 100;
let myfont;
function preload() {
  myfont = loadFont("assets/blackberryJam.ttf");
}
function setup() {
  pixelDensity(1);
  createCanvas(888, 1215, SVG);
  fill(0);
  noLoop();
  stroke(0);
}
function draw() {
  textSize(40);
  textFont(myfont);
  text(quotes, margin, margin, width - margin * 2, height - margin * 2);
}

const quotes =
  "The truth Has to be melted out of our stubborn lives By suffering. Nothing speaks the truth, Nothing tells us how things really are, Nothing forces us to know What we do not want to know Except pain. And this is how the gods declare their love.  When we sleep the soul is lit up... by many eyes, and with them, we can see everything that we cannot see in the daytime. The reward of pain is experience. For the poison of hatred seated near the heart doubles the burden for the one who suffers the disease; he is burdened with his own sorrow, and groans on seeing another's happiness. God loves to help him who strives to help himself. It is in the character of very few men to honor without envy a friend who has prospered.";

function keyPressed() {
  if (keyCode == 83) {
    save("1_15_23.svg");
  }
}
