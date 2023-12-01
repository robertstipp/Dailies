// Create a new neural network
const net = new brain.NeuralNetwork();

let slider;
let button;
let voteButton;
let predictButton;

let inputX, inputY, inputR, inputG, inputB;
let inputs = [];

let minX = 0;
let maxX = 400;
let minY = 0;
let maxY = 400;
let minR = 0;
let maxR = 255;
let minG = 0;
let maxG = 255;
let minB = 0;
let maxB = 255;

let prevTrainingLen = 0;
// Training Data
const trainingData = [];

// Train the neural network

// Scale factors for normailzation

// Neural Network

function setup() {
  createCanvas(800, 400);

  slider = createSlider(0, 1, 0.5, 0.01);
  button = createButton("Create");
  voteButton = createButton("Vote");
  predictButton = createButton("Predict");

  noLoop();
}
function draw() {
  background(220);

  button.mousePressed(() => {
    generateCircle();
  });

  voteButton.mousePressed(() => {
    console.log("Voting");
    // This needs to add the inputs and the slider value to the training data
    let normInputs = normalizeInputs(inputs);
    let trainingObj = { input: normInputs, output: [slider.value()] };
    // Then push that to the training data
    trainingData.push(trainingObj);
    console.log(trainingData);
    console.log("Training Data Length: " + trainingData.length);
    console.log("Generating new circle");
    generateCircle();
  });

  predictButton.mousePressed(() => {
    console.log("Predicting");
    // This needs to train the model

    if (trainingData.length > 0) {
      console.log(trainingData);
      net.train(trainingData);
      console.log("Training Complete");

      let best = predictBest();
      let { x, y, r, g, b } = best;
      fill(r, g, b);
      x += width / 2;

      ellipse(x, y, 24);

      // net.train([{input: [0, 0], output: [0]}, {input: [1, 1], output: [1]}]);
    } else {
      console.log("You have no training data");
    }

    // Run 100 simulations
    // Select the circle with the highest probability
  });

  slider.position(10, height);
  button.position(10, height + 20);
  voteButton.position(10, height + 40);
  predictButton.position(10, height + 60);
}

function normalizeInputs(inputs) {
  let normalizedInputs = [];
  normalizedInputs[0] = (inputs[0] - minX) / (maxX - minX);
  normalizedInputs[1] = (inputs[1] - minY) / (maxY - minY);
  normalizedInputs[2] = (inputs[2] - minR) / (maxR - minR);
  normalizedInputs[3] = (inputs[3] - minG) / (maxG - minG);
  normalizedInputs[4] = (inputs[4] - minB) / (maxB - minB);
  return normalizedInputs;
}

function generateCircle() {
  console.log("Generating");

  // Select the inputs that will be used to draw our circle
  inputX = random(400);
  inputY = random(400);
  inputR = random(255);
  inputG = random(255);
  inputB = random(255);

  // Pass inputs into inputs array
  inputs = [inputX, inputY, inputR, inputG, inputB];

  // Draw the circle
  // Only one circle is visible... the background is drawn over previous circles
  background(220);
  stroke(0);
  line(width / 2, 0, width / 2, height);
  fill(inputR, inputG, inputB);
  ellipse(inputX, inputY, 24);
}

function predictBest() {
  let options = [];
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(255);
    let g = random(255);
    let b = random(255);
    let inputs = [x, y, r, g, b];
    let normInputs = normalizeInputs(inputs);
    let output = net.run(normInputs);
    options.push({ x, y, r, g, b, output: output[0] });
  }
  let sorted = options.sort((a, b) => b.output - a.output);
  return sorted[0];
}
