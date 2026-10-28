let playerImg = new Image()
playerImg.src = 'player.png'

let player = {
  x: 20,
  y: canvas.height - 200,
  w: 50, // Lian tha
  h: 80,
  vy: 0,
  gravity: 0.6,
  onGround: true,
  isDuck: false,
  state: 'run',
  frame: 0,
  frameCount: 0,
}

let spriteCols = 5
let spriteRows = 3
let spriteW, spriteH
let cutOffset = 18
let padding = 4


let loaded = 0;
function startIfReady(){
  loaded++;
  if(loaded === 2){
    spriteW = playerImg.width / spriteCols;
    spriteH = playerImg.height / spriteRows;
    player.y = canvas.height - 200;
    gameLoop(); // Vawi khat chiah!
  }
}
playerImg.onload = startIfReady;
groundImg.onload = startIfReady;

function draw() {
  // Gravity
  if(!player.onGround) {
    player.vy += player.gravity
    player.y += player.vy
    if(player.y >= canvas.height - 200) {
      player.y = canvas.height - 200
      player.vy = 0
      player.onGround = true
      player.state = 'run'
    }
  }

  // Row + Frame thlan
  let row = 0
  let maxFrame = 5

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
  else { // run
    row = 0
    player.frameCount++
    if(player.frameCount > 6) {
      player.frame = (player.frame + 1) % maxFrame
      player.frameCount = 0
    }
  }
  

  // Cut na - Chunglam kan paih
  let sx = player.frame * spriteW + padding
  let sy = row * spriteH + cutOffset // ← Chunglam 18px kan skip
  let sw = spriteW - padding*2
  let sh = spriteH - padding*2 - cutOffset

  // Duck lai a hniam dan
  let drawH = player.state === 'duck'? player.h * 0.6 : player.h
  let drawY = player.state === 'duck'? player.y + player.h*0.4 : player.y - 16

  ctx.drawImage(playerImg, sx, sy, sw, sh, player.x, drawY, player.w, drawH)
}
