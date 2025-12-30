const noTexts = ["Hayır", "Emin misin?", "Gerçekten mi?", "Lütfen... 🥺", "Son kararın mı?"];
let noCount = 0;

// Elementlerin Seçilmesi
const passwordInput = document.getElementById("password");
const answer1Input = document.getElementById("answer1");
const passwordBox = document.getElementById("passwordBox");
const q1 = document.getElementById("q1");
const q2 = document.getElementById("q2");
const q3 = document.getElementById("q3");
const final = document.getElementById("final");
const bgMusic = document.getElementById("bgMusic");

function checkPassword() {
    if (passwordInput.value === "21.08.2025") {
        passwordBox.classList.add("hidden");
        q1.classList.remove("hidden");
        // Müzik hazırlığı (bazı tarayıcılar için ilk etkileşimde başlar)
        bgMusic.src = "music.mp3"; 
        bgMusic.load();
    } else {
        alert("Şifre yanlış Melike Hanım! 🙄");
    }
}

function checkQ1() {
    // Küçük/büyük harf duyarlılığını kaldırmak için toLowerCase kullanıyoruz
    if (answer1Input.value === "Melike.") {
        q1.classList.add("hidden");
        q2.classList.remove("hidden");
    } else {
        alert("Bunu bilmen gerekiyordu... 🫵🏻");
    }
}

function wrong() {
    alert("Ya senden sıkılır mıyım hiç! ❤️");
}

function right() {
    q2.classList.add("hidden");
    q3.classList.remove("hidden");
}

function noClick() {
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");

    noCount++;
    
    // Hayır butonunu rastgele bir yere ışınla
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    
    // Metni değiştir
    noBtn.innerText = noTexts[Math.min(noCount, noTexts.length - 1)];
    
    // Evet butonunu devasa yap
    yesBtn.style.transform = `scale(${1 + noCount * 0.8})`;
    yesBtn.style.zIndex = "999";

    // 7 kereden fazla hayır derse tam ekran evet butonu çıkar
    if (noCount >= 7) {
        const fullBtn = document.createElement("div");
        fullBtn.className = "fullscreen";
        fullBtn.innerHTML = "TAMAM EVET! 💚";
        fullBtn.onclick = yesClick;
        document.body.appendChild(fullBtn);
    }
}

function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.backgroundColor = ["#ff4d6d", "#ffd6e0", "#ffafcc", "#cdb4db"][Math.floor(Math.random() * 4)];
        c.style.top = "-10px";
        c.style.position = "fixed";
        document.body.appendChild(c);

        const animation = c.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], { duration: 2000 + Math.random() * 3000 });

        animation.onfinish = () => c.remove();
    }
}

function yesClick() {
    launchConfetti();
    bgMusic.play().catch(e => console.log("Müzik için etkileşim bekleniyor."));
    
    // Tüm soruları gizle, finali göster
    [passwordBox, q1, q2, q3].forEach(el => el.classList.add("hidden"));
    final.classList.remove("hidden");

    // Varsa tam ekran butonunu kaldır
    const fs = document.querySelector(".fullscreen");
    if (fs) fs.remove();
}

// Enter tuşu desteği
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (!passwordBox.classList.contains("hidden")) checkPassword();
        else if (!q1.classList.contains("hidden")) checkQ1();
    }
});

