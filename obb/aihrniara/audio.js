const jump = new Audio()
jump.src = 'jump.mp3'
jump.loop = false;
jump.volume = 1;

const bgMusic = new Audio()
bgMusic.src = 'bgmusic.mp3'
bgMusic.loop = true;
bgMusic.volume = 0.4;

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
jump.currentTime = 0;
jump.play().catch(e =>{});
}

function gOverSound(){
bgMusic.pause();
bgMusic.currentTime = 0;
musicStart = false;

gOverS.currentTime = 0;
gOverS.play().catch(e => {});
}