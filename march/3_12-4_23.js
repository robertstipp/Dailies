// Create a new neural network
const net = new brain.NeuralNetwork();

// Train the neural network

let [pos1x, pos1y, size1] = getParams();
let [pos2x, pos2y, size2] = getParams();
let [pos3x, pos3y, size3] = getParams();

// Scale factors for normailzation
let minX = 0;
let maxX = 800;
let minY = 0;
let maxY = 800;
let minSize = 40;
let maxSize = 120;

function getParams() {
  let pos1x = Math.random() * 800;
  let pos1y = Math.random() * 800;
  let size1 = Math.random() * 40 + 80;
  return [pos1x, pos1y, size1];
}

function normalizeParams(pos1x, pos1y, size1, pos2x, pos2y, size2) {
  let normPos1x = (pos1x - minX) / (maxX - minX);
  let normPos1y = (pos1y - minY) / (maxY - minY);
  let normSize1 = (size1 - minSize) / (maxSize - minSize);
  let normPos2x = (pos2x - minX) / (maxX - minX);
  let normPos2y = (pos2y - minY) / (maxY - minY);
  let normSize2 = (size2 - minSize) / (maxSize - minSize);
  return [normPos1x, normPos1y, normSize1, normPos2x, normPos2y, normSize2];
}

let s1 = function (sketch) {
  sketch.setup = function () {
    let canvas = sketch.createCanvas(800, 800);
    canvas.parent("sketch-holder");
  };
  sketch.draw = function () {
    sketch.background(220);
    sketch.ellipse(pos1x, pos1y, size1);
  };
};

let s2 = function sketch(sketch) {
  sketch.setup = function () {
    let canvas = sketch.createCanvas(800, 800);
    canvas.parent("sketch-holder2");
  };
  sketch.draw = function () {
    sketch.background(0);
    sketch.ellipse(pos2x, pos2y, size2);
  };
};

let s3 = function sketch(sketch) {
  sketch.setup = function () {
    let canvas = sketch.createCanvas(800, 800);
    canvas.parent("sketch-holder3");
  };
  sketch.draw = function () {
    sketch.background(200);
    sketch.ellipse(pos3x, pos3y, size3);
  };
};

let sketch1 = new p5(s1, "sketch-holder");
let sketch2 = new p5(s2, "sketch-holder2");
let sketch3 = new p5(s3, "sketch-holder3");

// Neural Network
const trainButton = document.getElementById("train");
const option1Button = document.getElementById("option_1");
const option2Button = document.getElementById("option_2");
const predictButton = document.getElementById("predict");

let demoInput = [pos1x, pos1y, size1, pos2x, pos2y, size2];

const trainingData = [{ input: [0, 0, 0, 0, 0, 0], output: [0] }];

trainButton.addEventListener("click", () => {
  console.log("training");
  console.log(trainingData);
  net.train(trainingData);

  // Use the neural network to make preidctions

  let outputs = [];
  for (let i = 0; i < 100; i++) {
    let sample = [...getParams(), ...getParams()];
    let normSample = normalizeParams(...sample);
    const output = net.run(normSample); // [0.987]
    let sampleOutput = { sample: sample, output: output };
    outputs.push(sampleOutput);
  }

  // const output = net.run(normSample); // [0.987]
  // let predictedX, predictedY, predictedSize;
  // if (output > 0.5) {
  //   predictedX = sample[0];
  //   predictedY = sample[1];
  //   predictedSize = sample[2];
  // } else {
  //   predictedX = sample[3];
  //   predictedY = sample[4];
  //   predictedSize = sample[5];
  // }

  let sortedOutputs = outputs.sort((a, b) => {
    return a.output[1] - b.output[1];
  });
  let mostLikeLower = sortedOutputs[sortedOutputs.length - 1];
  let mostLikeHigher = sortedOutputs[0];

  let selected = Math.random() > 0.5 ? mostLikeLower : mostLikeHigher;
  let predictedX = selected.sample[0];
  let predictedY = selected.sample[1];
  let predictedSize = selected.sample[2];
  pos3x = predictedX;
  pos3y = predictedY;
  size3 = predictedSize;
});

predictButton.addEventListener("click", () => {
  console.log("predicting");

  for (let i = 0; i < 100; i++) {
    let [posx, posy, size] = getParams();
    let normInput = normalizeParams(posx, posy, size, posx, posy, size);
    let output = net.run(normInput);
    console.log(output);
    console.log(posx, posy, size);
    break;
  }
});

option1Button.addEventListener("click", () => {
  console.log("Option 1 Selected");

  // The Output is 0 because option 1 is selected
  let demoOutput = [0];

  // Normalize input
  // Use the min and max values to normalize the input
  // Using the spread operator to pass the array as individual arguments
  let normInput = normalizeParams(...demoInput);

  // console.log("demoInput", demoInput);
  // console.log("normInput", normInput);
  // console.log("demoOutput", demoOutput);

  let trainingObj = { input: normInput, output: demoOutput };
  trainingData.push(trainingObj);

  // Select new parameters
  [pos1x, pos1y, size1] = getParams();
  [pos2x, pos2y, size2] = getParams();
});
option2Button.addEventListener("click", () => {
  console.log("Option 2 Selected");
  let demoOutput = [1];

  // Normalize input
  // Use the min and max values to normalize the input
  // Using the spread operator to pass the array as individual arguments
  let normInput = normalizeParams(...demoInput);

  // console.log("demoInput", demoInput);
  // console.log("normInput", normInput);
  // console.log("demoOutput", demoOutput);

  let trainingObj = { input: normInput, output: demoOutput };
  trainingData.push(trainingObj);
  // Select new parameters
  [pos1x, pos1y, size1] = getParams();
  [pos2x, pos2y, size2] = getParams();
});
