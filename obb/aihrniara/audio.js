const jumpS = new Audio()
jumpS.src = 'jump.mp3'
jumpS.loop = false;
jumpS.volume = 0.8;

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
