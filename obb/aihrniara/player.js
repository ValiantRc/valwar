const playerImg = new Image()
playerImg.src = 'player.png'

const rollImg = new Image()
rollImg.src = 'roll.png'

const blinkImg = new Image()
blinkImg.src = 'blink.png'

const slashImg = new Image()
slashImg.src = 'slash.png'

let player = {
  x: canvas.width / 20,
  y: canvas.height - 200,
  w: 50,
  h: 80,
  vy: 0,
  gravity: 0.7,
  onGround: true,
  isDuck: false,
  isBlink: false,
  state: 'run',
  frame: 0,
  frameCount: 0,
}

let loaded = 0;
function startIfReady(){
  loaded++;
  if(loaded === 2){
    spriteW = playerImg.width / spriteCols;
    spriteH = playerImg.height / spriteRows;
    player.y = canvas.height - 200;
    gameLoop();
  }
}
playerImg.onload = startIfReady;
groundImg.onload = startIfReady;

let spriteCols = 5
let spriteRows = 3
let spriteW, spriteH
let cutOffset = 18
let padding = 4

let attackTimer = 0;
player.jumpCount = 0;
player.maxJump = 2;

let slash = {
active: false,
x:0, y:0,
frame:0,
timer:0,
maxFrame:5,
}

function triggerSlash(){
slash.active= true;
slash.frame= 0;
slash.timer= 0;
slash.x = player.x - 10;
slash.y = player.y - 5;
}

function updateSlash(){
if(!slash.active)return;
slash.timer++;
if(slash.timer > 5){
slash.frame++;
slash.timer = 0;
}
if(slash.frame >= slash.maxFrame){
slash.active = false;
}
}

function drawSlash(ctx){
if(!slash.active)return;
let fw = slashImg.width / 5;
let fh = slashImg.height;

ctx.save();

ctx.drawImage(slashImg, slash.frame * fw, 0, fw, fh, slash.x, slash.y, fw / 5, fh / 5);
ctx.restore();
}

function draw() {
  // Gravity
  if(!player.onGround) {
    player.vy += player.gravity
    player.y += player.vy
    if(player.y >= ground.y - 30) {
      player.y = ground.y - 30
      player.vy = 0
      player.onGround = true
      player.jumpCount = 0
      player.state = 'run'
    }
  }

  let maxFrame = 5;
 let sheetToUse = playerImg;

  if(player.state === 'jump') {
    row = 1
    player.frame = Math.min(Math.floor(Math.abs(player.vy)/4), 4)
  }
  else if(player.state === 'duck') {
    row = 2
    player.frameCount++
    if(player.frameCount > 7) {
      player.frame = (player.frame + 1) % maxFrame
      player.frameCount = 0
    }
  }
  else {
    row = 0
    player.frameCount++
    if(player.frameCount > 6) {
      player.frame = (player.frame + 1) % maxFrame
      player.frameCount = 0
      spriteW = playerImg.width / 5;
      spriteH = playerImg.height / 3;
    }
  }
  
if(attackTimer > 0){
  if(attackTimer == 18){
    triggerSlash();
    slashSound();
}
attackTimer--;
}
else if(player.state === 'blink'){
sheetToUse = blinkImg;
spriteW = blinkImg.width / 5;
spriteH = blinkImg.height / 1;
}
else if(player.state === 'doublejump'){
sheetToUse = rollImg;
spriteW = rollImg.width / 5;
spriteH = rollImg.height / 1;
}
else if(player.state === 'role'){
sheetToUse = rollImg;
spriteW = rollImg.width / 5;
spriteH = rollImg.height / 1;
}

  let sx = player.frame * spriteW + padding
  let sy = row * spriteH + cutOffset // ← Chunglam 18px kan skip
  let sw = spriteW - padding*2
  let sh = spriteH - padding*2 - cutOffset

  // Duck lai a hniam dan
  let drawH = player.state === 'duck'? player.h * 0.6 : player.h
  let drawY = player.state === 'duck'? player.y + player.h*0.4 : player.y - 16

  ctx.drawImage(sheetToUse, sx, sy, sw, sh, player.x, drawY, player.w, drawH)
}
