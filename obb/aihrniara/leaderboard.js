  // === 1. I CONFIG KHA HETAH PASTE RAWH ===
const firebaseConfig = {
  apiKey: "AIzaSyBQklt54Dxx2-41OrElTRAZU1gBoKDgl7M",
  authDomain: "aihniara-7ed40.firebaseapp.com",
  databaseURL: "https://aihniara-7ed40-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aihniara-7ed40",
  storageBucket: "aihniara-7ed40.firebasestorage.app",
  messagingSenderId: "146883671382",
  appId: "1:146883671382:web:a628e58d3d63e513b652f7",
  measurementId: "G-HFRZZJRMM2"
};
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // === 2. SEASON LOGIC ===
  function getCurrentSeasonName(){
    let vawiin = new Date();
    let thla = vawiin.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    let kum = vawiin.getFullYear();
    return `${thla} ${kum} SEASON`;
  }
  function getSeasonKey(){
    let vawiin = new Date();
    return (vawiin.getMonth()+1) + "-" + vawiin.getFullYear();
  }

  function checkNewSeason(){
    document.getElementById("seasonName").innerText = "🏹 " + getCurrentSeasonName();
  }

  function updateSeasonTimer(){
    let tunah = new Date();
    let thlaLeh = new Date(tunah.getFullYear(), tunah.getMonth() + 1, 1);
    let diff = thlaLeh - tunah;
    let ni = Math.floor(diff / (1000 * 60 * 60 * 24));
    let darkar = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seasonTimer").innerText = 
      `⏳ Season tawp nan: ${ni} day, ${darkar} hour, ${minute} Minute`;
    if(ni < 3){
      document.getElementById("seasonTimer").style.background = "#8B0000";
      document.getElementById("seasonTimer").style.color = "white";
    }
  }

  // === 3. FIREBASE A SCORE DAH - localStorage AIAWH ===
  function addNewPerson(){
    let hming = document.getElementById("nameInput").value;
    let score = document.getElementById("gameScore").textContent;
    if(hming === ""){ hming = "no name"; }

    let seasonKey = getSeasonKey();
    db.ref('leaderboard/' + seasonKey).push({
      name: hming,
      score: Number(score),
      date: Date.now()
    });
    document.getElementById("nameInput").value = "";
    document.getElementById("gameScore").textContent = "0";
  }

  // === 4. FIREBASE ATANGA LEADERBOARD EN - A LIVE IN ===
  function showLeaderboard(){
    let seasonKey = getSeasonKey();
    db.ref('leaderboard/' + seasonKey).on('value', (snap)=>{
console.log("mi eng zat nge:",snap.numChildren());
      let list = [];
      snap.forEach(c => list.push(c.val()));
      list.sort((a,b) => b.score - a.score); 

       list = list.slice(0, 20);

      let html = "";
      list.forEach((p, i) => {
        html += `<div class='board'><span>${i+1}. ${p.name}</span> <b>${p.score}</b></div>`;
      });
      document.getElementById("leaderboard").innerHTML = html || "Tumah an la awm lo";
    });
  }

  // TAN TIRH
  checkNewSeason();
  showLeaderboard();
  updateSeasonTimer();
  setInterval(updateSeasonTimer, 60000);
