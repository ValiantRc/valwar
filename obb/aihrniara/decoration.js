const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = 715

let clouds = [];
let cloudTimer = 0;

const sunImg = new Image();
sunImg.src = 'ni.png';

function drawSun() {
  // Chung lam ding lam ah
  ctx.drawImage(sunImg, canvas.width - 500, 20, 90, 90);
}

const birdSheet = new Image();
birdSheet.src = 'sava.png';

let birdFrame = 0;
let birdFrameTimer = 0;
let birdX = canvas.width;
let birdY = 0.1;
let birdTimer = 0;

function drawBird() {
  birdFrameTimer++;
  if (birdFrameTimer > 10) { // A thla hlap chak dan
    birdFrame = (birdFrame + 1) % 2; // 0,1,0,1
    birdFrameTimer = 0;
  }

  birdX -= 0.3; // Thlawk kal zel
  if (birdX < -50) {
    birdX = canvas.width;
    birdY = Math.random() * 150 + 50;
  }

  // Sprite sheet a tang a cut
  // Image hi a zau zawng 2 a then - veilam frame 0, dinglam frame 1
  let frameWidth = birdSheet.width / 2;
  
  ctx.drawImage(
    birdSheet,
    birdFrame * frameWidth, 0, frameWidth, birdSheet.height, // cut
    birdX, birdY, 50, 40 // draw
  );
}

// Chhum siam
function createCloud() {
  clouds.push({
    x: canvas.width + 100,
    y: Math.random() * 100 + 20, // Chung lam ah chauh
    w: Math.random() * 80 + 60,  // A lian leh te
    h: Math.random() * 30 + 20,
    speed: Math.random() * 0.8 + 0.3 // Muang deuh in - decoration
  });
}

function updateAndDrawClouds() {
  cloudTimer++;
  if (cloudTimer > 180) { // Rei deuh hlek a hnu ah chhum thar
    createCloud();
    cloudTimer = 0;
  }

  for (let i = clouds.length - 1; i >= 0; i--) {
    let c = clouds[i];
    c.x -= c.speed; // Muang te in a kal

    // Chhum lem - circle 3 in zawm
    ctx.fillStyle = "rgba(255, 255, 255, 0.8";
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.w * 0.5, c.h * 0.5, 0, 0, Math.PI * 2);
    ctx.ellipse(c.x + c.w * 0.3, c.y + 10, c.w * 0.4, c.h * 0.4, 0, 0, Math.PI * 2);
    ctx.ellipse(c.x - c.w * 0.3, c.y + 15, c.w * 0.35, c.h * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // A ral bo chuan paih
    if (c.x + c.w < -100) {
      clouds.splice(i, 1);
    }
  }
}

function drawDeco(){
  drawSun();
  updateAndDrawClouds();
  drawBack();
  drawBird();
}