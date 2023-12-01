let mobilenet;

let puffin;

function modelReady() {
  console.log("Model is ready!!!");
}

function imageReady() {
  image(puffin, 0, 0, width, height);
  mobilenet.predict(puffin, gotResults);
  // mobilenet.predict(puffin, gotResult);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
    const { label, confidence } = results[0];
    textSize(32);
    fill(255);
    text(label, 10, 20);
    text(`${confidence.toFixed(2) * 100}%`, 10, 50);
  }
}

function setup() {
  createCanvas(640, 480);
  puffin = createImg("../MLimages/puffin.jpeg", imageReady);
  puffin.hide();
  background(0);

  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}
function draw() {}
