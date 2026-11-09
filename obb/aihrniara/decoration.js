const gameContainer = document.getElementById('gameContainer');
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

function resizeCanvas(){
canvas.width = gameContainer.clientWidth;
canvas.height = gameContainer.clientHeight;
}

const sunImg = new Image();
sunImg.src = 'ni.png';
const thlamImg = new Image();
thlamImg.src = 'thlam.png';

function drawSun() {
  // Chung lam ding lam ah
  ctx.drawImage(sunImg, canvas.width - 200, 10, 45, 45);
}

const birdSheet = new Image();
birdSheet.src = 'sava.png';

let birdFrame = 0;
let birdFrameTimer = 0;
let birdX = canvas.width;
let birdY = 0.5;
let birdTimer = 0;
let birdScore = false;

function drawBird() {
  birdFrameTimer++;
  if (birdFrameTimer > 10) { // A thla hlap chak dan
    birdFrame = (birdFrame + 1) % 2; // 0,1,0,1
    birdFrameTimer = 0;
  }

  // Sprite sheet a tang a cut
  // Image hi a zau zawng 2 a then - veilam frame 0, dinglam frame 1
  let frameWidth = birdSheet.width / 2;
  
  ctx.drawImage(
    birdSheet,
    birdFrame * frameWidth, 0, frameWidth, birdSheet.height, // cut
    birdX, birdY, 17, 11 // draw
  );
   let isBirdColliding = player.x < birdX + 17 &&
                         player.x + player.w > birdX &&
                         player.y < birdY + 11 &&
                         player.y + player.h > birdY;

  if(isBirdColliding){
              score += 20;
              birdScore = true;
              addFloatText(player.x + 20, player.y - 10, "+20");
              attackTimer = 18;
              
              birdX = canvas.width + Math.random() * 500;
              birdY = Math.random() * 100 + 2;
              birdScore = false;
              return;
      }
  birdX -= speed - 5.4; // Thlawk kal zel
  if (birdX < -50) {
    birdX = canvas.width;
    birdY = Math.random() * 100 + 2;
    birdScore = false;
  }
}
// Chhum siam

let clouds = [];
let cloudTimer = 0;

function createCloud() {
  clouds.push({
    x: canvas.width + 100,
    y: Math.random() * 70 + 9, // Chung lam ah chauh
    w: Math.random() * 50 + 30,  // A lian leh te
    h: Math.random() * 15 + 10,
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

let groundImg = new Image()
groundImg.src = 'ground.png'
let backImg = new Image()
backImg.src = 'background.png'

let ground = {
  x:0,
  y:canvas.height - 30,
  height:40,
}


function drawGround() {
  ground.x -= speed;
  if(ground.x <= -canvas.width){
    ground.x = 0;
  }
  
  ctx.drawImage(groundImg,ground.x,ground.y,canvas.width,ground.height)
  ctx.drawImage(groundImg,ground.x + canvas.width,ground.y,canvas.width,ground.height);
  ctx.drawImage(groundImg,ground.x - canvas.width,ground.y,canvas.width,ground.height);
}

let background = {
  x:0,
}

function drawBack() {
  background.x -= speed - 5.5;
  if(background.x <= -canvas.width){
    background.x = 0;
  }
  ctx.drawImage(backImg,background.x,canvas.height-75,canvas.width,50);
  ctx.drawImage(backImg,background.x + canvas.width,canvas.height-75,canvas.width,50);
}

 let thlamsp = 0;
 let thlamspt = 0;
 let thlamobs = [];

function createThlam(){
thlamobs.push({
x:canvas.width,
y:canvas.height - 70,
w:50,
h:50,
});
}

function drawThlam() {
  thlamsp++;
  if (thlamsp > thlamspt) { // A thla hlap chak dan
    if(Math.random() < 0.4){
      createThlam();
      }
     thlamsp = 0;
     thlamspt = Math.floor(Math.random() * 800) + 300;
}
  for(let i = thlamobs.length - 1; i >= 0; i--){
let obs = thlamobs[i];
obs.x -= speed;
 ctx.drawImage(thlamImg, obs.x, obs.y, obs.w, obs.h);
}
}
const muImg = new Image()
muImg.src = 'mu.png'

let muFrame = 0;
let muFrameTimer = 0;
let muX = canvas.width +800 + Math.random() * 8500;
let muY = Math.random() * 70 + 2;
let muScored = false;
let muWasOff = true;

function drawMu() {
  muFrameTimer++;
  if (muFrameTimer > 10) {
    muFrame = (muFrame + 1) % 4;
    muFrameTimer = 0;
  }
  
let fw = muImg.width / 4;
let y = muY;

if(muX <= canvas.width - 10 && muWasOff){
  muSound();
  muWasOff = false;
}
if(muX > canvas.width){
  muWasOff = true;
}
  
ctx.drawImage(muImg, muFrame * fw, 0, fw, muImg.height, muX, y, 35, 20);

  let isMuColliding = player.x < muX + 35 &&
                         player.x + player.w > muX &&
                         player.y < y + 20 &&
                         player.y + player.h > y;

  if(isMuColliding){
        
              score += 30;
              muScored = true;
              addFloatText(player.x + 20, player.y - 10, "+30");
              attackTimer = 18;
          
       
          muX = canvas.width + 800 + Math.random() * 8500;
          muY = Math.random() * 70 + 2;
          muScored = false;
          return;
      }muX -= speed + 1;
    if(muX < -50){
    muX = canvas.width +800 + Math.random() * 8500;
    muY = Math.random() * 70 + 2;
    muScored = false;
  }
}

function drawDeco(){
  drawSun();
  updateAndDrawClouds();
  drawBack();
  drawThlam();
  drawBird();
  drawMu();
}
