const jumpS = new Audio()
jumpS.src = 'jump.mp3'
jumpS.loop = false;
jumpS.volume = 1;

const scoreS = new Audio()
scoreS.src = 'score.mp3'
scoreS.loop = false;
scoreS.volume = 0.9;

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

function scoreSound(){
scoreS.currentTime = 0;
scoreS.play().catch(e =>{});
}

function gOverSound(){
bgMusic.pause();
bgMusic.currentTime = 0;
musicStart = false;

gOverS.currentTime = 0;
gOverS.play().catch(e => {});
}
