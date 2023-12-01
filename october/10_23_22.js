let margin = 50;
const grid = [];
const colors = ["blue", "green"];
let gridResX = 20;
let gridResY = 20;

function setup() {
  createCanvas(600, 600);
  background(0);

  for (let x = margin; x < width - margin; x += gridResX) {
    let row = [];
    for (let y = margin; y < height - margin; y += gridResY) {
      let noiseVal = noise(x, y);
      noiseVal < 0.2 ? fill(colors[0]) : fill(colors[1]);
      row.push(noiseVal < 0.2 ? 0 : 1);
      noStroke();
      rect(x, y, gridResX, gridResY);
    }
    grid.push(row);
  }

  numIslands(grid);
}

function draw() {}

function numIslands(grid) {
  const visited = grid.map((row) => row.map((cell) => false));
  let islandCount = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (dfs(i, j, grid, visited)) islandCount++;
    }
  }
  console.log(islandCount);
  return islandCount;
}
function getAdjNeighbors(i, j, grid, visited) {
  const adjNeighbors = [];

  if (i > 0 && !visited[i - 1][j]) adjNeighbors.push([i - 1, j]);
  if (i < grid.length - 1 && !visited[i + 1][j]) adjNeighbors.push([i + 1, j]);
  if (j < 0 && !visited[i][j - 1]) adjNeighbors.push([i, j - 1]);
  if (j > grid.length[i] - 1 && !visited[i][j + 1])
    adjNeighbors.push([i, j + 1]);

  return adjNeighbors;
}

function dfs(i, j, grid, visited) {
  const stack = [[i, j]];
  let islandSize = 0;

  while (stack.length) {
    let curNode = stack.pop();
    let [i, j] = curNode;

    // check if visited
    if (visited[i][j]) continue;
    visited[i][j] = true;
    // check is cell is an island component
    if (grid[i][j] === "0") continue;
    islandSize++;

    let adjNeighbors = getAdjNeighbors(i, j, grid, visited);
    stack.push(...adjNeighbors);
  }
  return islandSize > 0 ? true : false;
}
