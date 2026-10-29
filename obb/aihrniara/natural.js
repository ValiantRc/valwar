let gameLoopId = null; // A chung ber ah, let dang te bul ah
let spawnInterval = null;

let isGameOver = false;
let obstacle = [];
let  spawnTimer = 0;
let score = 0;
let  nextSpawnTime = 300;
let  speed = 3;

let scoreN = document.getElementById('score');
let scoreInterval = null;

function scoreCount(){
  if(scoreInterval)clearInterval(scoreInterval);
  
  score = 0;
  scoreN.innerText = score;
  
  scoreInterval = setInterval(() => {
    if(isGameOver)return;
    
    score += 1;
    scoreN.innerText = score;
  }, 300);
}

function stopScore() {
  clearInterval(scoreInterval)
}

let lungImg = new Image()
lungImg.src = 'lung.png'
let thingImg = new Image()
thingImg.src = 'thing.png'
let hnahImg = new Image()
hnahImg.src = 'hnah.png'

function createLung() {
  obstacle.push({
    x:canvas.width,
    y:canvas.height - 170,
    w:50,
    h:50,
  });
}

// Obstacle siam - kung leh hnah in zawm
function createThingkungObstacle() {
  obstacle.push({
    x: canvas.width,
    y: canvas.height - 300, // Lei atanga a sang lam - adjust rawh
    kung: { w: 60, h: 130, xOffset: 20, yOffset: 80 }, // Kung position
    hnah: { w: 110, h: 90, xOffset: -10, yOffset: 0 }, // Hnah position - chung lam
    type: "thingkung_full"
  });
}

// Draw + Collision - HNAH CHAUH kan check
function updateAndDrawThingkung() {
  for (let i = obstacle.length - 1; i >= 0; i--) {
    let ob = obstacle[i];
    
    if(ob.type !== "thingkung_full"){
      continue;
    }
    

    // A pahnih in draw - pakhat anga lang
    // 1. Kung - decoration - a hnuai ah
    ctx.drawImage(
      thingImg, 
      ob.x + ob.kung.xOffset, 
      ob.y + ob.kung.yOffset, 
      ob.kung.w, 
      ob.kung.h
    );
    
    // 2. Hnah - chung lam ah - Game Over na
    ctx.drawImage(
      hnahImg, 
      ob.x + ob.hnah.xOffset, 
      ob.y + ob.hnah.yOffset, 
      ob.hnah.w, 
      ob.hnah.h
    );


    // COLLISION - HNAH CHAUH kan en, kung chu decoration
    let hnahHitbox = {
      x: ob.x + ob.hnah.xOffset + 10, // Padding 10px - fair zawk
      y: ob.y + ob.hnah.yOffset + 10,
      w: ob.hnah.w - 20,
      h: ob.hnah.h - 20
    };

    // Player nen hnah chiah check
    if (
      player.x < hnahHitbox.x + hnahHitbox.w &&
      player.x + player.w > hnahHitbox.x &&
      player.y < hnahHitbox.y + hnahHitbox.h &&
      player.y + player.h > hnahHitbox.y
    ) {
      isGameOver = true; // Hnah i tawh = Game Over
    }
  }
}

function updateAndDrawLung() {
  spawnTimer++;

  // A hun a thlen chuan lung siam, a dawt leh hun tur random in siam leh
  if (spawnTimer > nextSpawnTime) {
    if(Math.random() < 0.5) {
    createLung();
    }else{
    createThingkungObstacle();
    }
    spawnTimer = 0;
    // 1 second atanga 3.5 second inkar random
    // 60 = 1 sec, 210 = 3.5 sec
    nextSpawnTime = Math.floor(Math.random() * 200) + 400;
  }
  
  for (let i = obstacle.length - 1; i >= 0; i--) {
    let obs = obstacle[i];
    obs.x -= speed;
    ctx.drawImage(lungImg, obs.x, obs.y, obs.w, obs.h);

    if (
      player.x < obs.x + obs.w - 10 &&
      player.x + player.w - 10 > obs.x &&
      player.y < obs.y + obs.h - 10 &&
      player.y + player.h > obs.y
    ) {
      isGameOver = true;
    }
  }
}

let rulImg = new Image()
rulImg.src = 'rul.png'

let rulSpawnTime = 750;
let rulSpawn = 0;
let rulObstacle = [];
let rulSpeed = 3;
let floatText = []

function createRul(){
rulObstacle.push({
x:canvas.width,
y:canvas.height - 170,
w:50,
h:50,
type:'rul',
scored: false,
});
}

function drawRul(){
rulSpawn++;
if(rulSpawn > rulSpawnTime){
if(Math.random() < 0.4){
createRul();
}
rulSpawn = 0;
rulSpawnTime = Math.floor(Math.random() * 800) + 300;
}
for(let i = rulObstacle.length - 1; i >= 0; i--){
let obs = rulObstacle[i];
obs.x -= rulSpeed;
ctx.drawImage(rulImg, obs.x, obs.y, obs.w, obs.h);

let isColliding = player.x < obs.x + obs.w  &&
player.x + player.w > obs.x &&
player.y < obs.y + obs.h &&
player.y + player.h > obs.y;

if(isColliding){
 if(player.isDuck && obs.type === 'rul'){
  if(!obs.scored){
   score += 10;
   obs.scored = true;
   addFloatText(player.x + 20, player.y - 10, "+10");
   scoreSound();
  }
  rulObstacle.splice(i, 1);
  continue;
 } else{
 isGameOver = true;
 }
}
}
}

function addFloatText(x,y, text){
floatText.push({
x:x,
y:y,
text:text,
life:60,
vy:-2,
});
}

function updateAndDrawFloatText(){
for(let i = floatText.length - 1; i >= 0; i--){
let f = floatText[i];
f.y += f.vy;
f.life--;

ctx.save();
ctx.globalAlpha = f.life / 60;
ctx.fillStyle = "#00ff00";
ctx.font = "bolt 22px Arial";
ctx.fillText(f.text, f.x, f.y);
ctx.restore();

if(f.life <= 0){
floatText.splice(i, 1);
}
}
}

const sakhiImg = new Image()
sakhiImg.src = 'sakhi.png';

let sakhiFrame = 0;
let sakhiFrameTimer = 0;
let sakhiX = canvas.width +1500 + Math.random() * 2000;
let sakhiY = canvas.height - 185;
let sakhiScored = false;

const heightOffset = [0, -10, -45, 0];

function drawSakhi() {
  
  if(!sakhiImg.complete || sakhiImg.naturalWidth === 0) return;
  
  sakhiFrameTimer++;
  if (sakhiFrameTimer > 10) {
    sakhiFrame = (sakhiFrame + 1) % 4;
    sakhiFrameTimer = 0;
  }
  
let fw = sakhiImg.width / 4;
let y = sakhiY + heightOffset[sakhiFrame];

ctx.drawImage(sakhiImg, sakhiFrame * fw, 0, fw, sakhiImg.height, sakhiX, y, 80, 50);

  let isSakhiColliding = player.x < sakhiX + 80 &&
                         player.x + player.w > sakhiX &&
                         player.y < y + 50 &&
                         player.y + player.h > y;

  if(isSakhiColliding){
      // RUL ang chiah kha
      if(player.isDuck){ // Bawk chuan
          if(!sakhiScored){
              score += 5;
              sakhiScored = true;
              addFloatText(player.x + 20, player.y - 10, "+5");
              scoreSound();
          }
          // A sut zawh ah ti bo nghal, a rawn chhuak leh random ang
          sakhiX = canvas.width + 800 + Math.random() * 1000;
          sakhiScored = false;
          return;
      }
    }sakhiX -= 1.5;
  }  if(sakhiX < -50){
    sakhiX = canvas.width + Math.random();
    sakhiScored = false;
}

/* sial chin */

const sialImg = new Image()
sialImg.src = 'sial.png';

let sialFrame = 0;
let sialFrameTimer = 0;
let sialX = canvas.width +1500 + Math.random() * 2000;
let sialY = canvas.height - 185;
let sialScored = false;


function drawSial() {
  
  if(!sialImg.complete || sialImg.naturalWidth === 0) return;
  
  sialFrameTimer++;
  if (sialFrameTimer > 10) {
    sialFrame = (sialFrame + 1) % 4;
    sialFrameTimer = 0;
  }
  
let fw = sialImg.width / 4;
let y = sialY;

ctx.drawImage(sialImg, sialFrame * fw, 0, fw, sialImg.height, sialX, y, 90, 55);

  let isSialColliding = player.x < sialX + 90 &&
                         player.x + player.w > sialX &&
                         player.y < y + 55 &&
                         player.y + player.h > y;

  if(isSialColliding){
      // RUL ang chiah kha
      if(player.isDuck){ // Bawk chuan
          if(!sialScored){
              score += 5;
              sialScored = true;
              addFloatText(player.x + 20, player.y - 10, "+5");
              scoreSound();
          }
          // A sut zawh ah ti bo nghal, a rawn chhuak leh random ang
          sialX = canvas.width + 800 + Math.random() * 1000;
          sialScored = false;
          return;
      }
    }sialX -= 2;
  }  if(sialX < -50){
    sialX = canvas.width + Math.random();
    sialScored = false;
}

function drawNature(){
  updateAndDrawThingkung();
  drawGround();
  drawSakhi();
  drawSial();
  drawRul();
  updateAndDrawLung();
}
