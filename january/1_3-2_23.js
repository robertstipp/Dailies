let img;
let simplexNoise;
function preload() {
  img = loadImage("media/graf4.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  pixelDensity(1);
  simplexNoise = new openSimplexNoise(Date.now());
  let d = pixelDensity();
  img.loadPixels();
  let low = random(-360, 0);
  let high = random(0, 360);
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {
      for (let x = 0; x < width; x += 1) {
        for (let y = 0; y < height; y += 1) {
          index = 4 * ((y * d + j) * width * d + (x * d + i));
          let r = img.pixels[index + 0];
          let g = img.pixels[index + 1];
          let b = img.pixels[index + 2];
          let a = img.pixels[index + 3];
          let c = color(r, g, b, a);
          colorMode(HSB);
          let angle = atan2(y - height / 2, x - width / 2);
          let pdist = dist(x, y, width / 2, height / 2);
          let angleShift = map(pdist, 0, width / 2, 0, 2 * TAU);
          let hShift = map(
            simplexNoise.noise3D(
              x / 1000,
              y / 1000,
              Math.pow(cos(angle + angleShift), 2)
            ),
            -1,
            1,
            low,
            high
          );
          c = color((hue(c) + hShift) % 360, 80, brightness(c), a);
          colorMode(RGB);
          r = red(c);
          g = green(c);
          b = blue(c);
          a = alpha(c);
          img.pixels[index + 0] = r;
          img.pixels[index + 1] = g;
          img.pixels[index + 2] = b;
          // img.pixels[index + 3] = a;
        }
      }
    }
  }
  img.updatePixels();
  image(img, 0, 0);
}
function keyPressed() {
  if (keyCode == 83) {
    save("1_2_23.jpg");
  }
}
