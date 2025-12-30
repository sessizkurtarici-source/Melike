let noCount = 0;
const noTexts = ["Hayır","Emin misin?","Gerçekten mi?","Son kararın mı?","Olmaz ama 😅"];

function checkPassword() {
  if (password.value === "21.08.2025") {
    passwordBox.classList.add("hidden");
    q1.classList.remove("hidden");
  } else {
    alert("🙄");
  }
}

function checkQ1() {
  if (answer1.value === "Melike.") {
    q1.classList.add("hidden");
    q2.classList.remove("hidden");
  } else {
    alert("🫵🏻🫵🏻🫵🏻");
  }
}

function wrong() { alert("Ya senden sıkılır mıyım hiç?"); }

function right() {
  q2.classList.add("hidden");
  q3.classList.remove("hidden");
}

function noClick() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  noCount++;
  noBtn.innerText = noTexts[Math.floor(Math.random() * noTexts.length)];
  noBtn.style.left = Math.random() * 400 + "px";
  noBtn.style.top = Math.random() * 400 + "px";
  yesBtn.style.transform = `scale(${1 + noCount * 2.25})`;

  if (noCount >= 5) {
    document.body.insertAdjacentHTML("<beforeend>", `<div class='fullscreen' onclick='yesClick()'>EVET 💚</div>`);
  }
}

function launchConfetti() {
  for (let i=0;i<120;i++){
    const c=document.createElement("div");
    c.className="confetti";
    const angle=Math.random()*2*Math.PI;
    const distance=Math.random()*400+100;
    c.style.setProperty("--x",Math.cos(angle)*distance+"px");
    c.style.setProperty("--y",Math.sin(angle)*distance+"px");
    c.style.background=["#ff4d6d","#ffd6e0","#ffafcc","#cdb4db","#ffc8dd"][Math.floor(Math.random()*5)];
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),1200);
  }
}

function yesClick() {
  launchConfetti();
  const music = document.getElementById("bgMusic");
  music.src="music.mp3";
  music.volume=0.5;
  music.play();

  passwordBox.classList.add("hidden");
  q1.classList.add("hidden");
  q2.classList.add("hidden");
  q3.classList.add("hidden");
  final.classList.remove("hidden");

  const fs=document.querySelector(".fullscreen");
  if(fs) fs.remove();
}

document.addEventListener("keydown", function(e){
  if(e.key==="Enter"){
    if(!passwordBox.classList.contains("hidden")){checkPassword(); return;}
    if(!q1.classList.contains("hidden")){checkQ1(); return;}
    if(!q2.classList.contains("hidden")){right(); return;} // checkQ2 yerine right()
    if(!q3.classList.contains("hidden")){yesClick(); return;}
    const fs=document.querySelector(".fullscreen");
    if(fs){yesClick();}
  }
});
