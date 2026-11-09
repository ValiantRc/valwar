const jumpS = new Audio()
jumpS.src = 'jump.mp3'
jumpS.loop = false;
jumpS.volume = 0.8;

const muS = new Audio()
muS.src = 'mu.mp3'
muS.loop = false;
muS.volume = 0.6;

const deerS = new Audio()
deerS.src = 'deer.mp3'
deerS.loop = false;
deerS.volume = 0.6;

const snakeS = new Audio()
snakeS.src = 'snake.mp3'
snakeS.loop = false;
snakeS.volume = 0.6;

const bullS = new Audio()
bullS.src = 'bull.mp3'
bullS.loop = false;
bullS.volume = 0.6;

const slashS = new Audio()
slashS.src = 'slash.mp3'
slashS.loop = false;
slashS.volume = 0.7;

const blinkS = new Audio()
blinkS.src = 'blink.mp3'
blinkS.loop = false;
blinkS.volume = 0.7;

const bgMusic = new Audio()
bgMusic.src = 'bgmusic.mp3'
bgMusic.loop = true;
bgMusic.volume = 0.6;

const gOverS = new Audio()
gOverS.src = 'dead.mp3'
gOverS.volume = 0.8;

const menuS = new Audio()
menuS.src = 'menu.mp3'
menuS.volume = 0.7;

let musicStart = false;

function startMusic(){
  if(!musicStart){
    bgMusic.play().then(() => {
      musicStart = true;
    }).catch(e =>{
      console.log(e);
    });
  }
}

function jumpSound(){
jumpS.currentTime = 0;
jumpS.play().catch(e =>{});
}


function muSound(){
muS.currentTime = 0;
muS.play().catch(e =>{});
}

function deerSound(){
deerS.currentTime = 0;
deerS.play().catch(e =>{});
}

function bullSound(){
bullS.currentTime = 0;
bullS.play().catch(e =>{});
}

function snakeSound(){
snakeS.currentTime = 0;
snakeS.play().catch(e =>{});
}

function slashSound(){
slashS.currentTime = 0;
slashS.play().catch(e =>{});
}

function blinkSound(){
blinkS.currentTime = 0;
blinkS.play().catch(e =>{});
}

function gOverSound(){
bgMusic.pause();
bgMusic.currentTime = 0;
musicStart = false;

gOverS.currentTime = 0;
gOverS.play().catch(e => {});
}

function menuSound(){
menuS.currentTime = 0;
menuS.play().catch(e => {});
}
