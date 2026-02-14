
/*countdown*/
function startLoveTimer() {
  const startDate = new Date("2024-05-10T00:00:00");

  setInterval(() => {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const d = document.getElementById("days");
    const h = document.getElementById("hours");
    const m = document.getElementById("minutes");
    const s = document.getElementById("seconds");

    if (d) {
      d.textContent = days;
      h.textContent = hours.toString().padStart(2, "0");
      m.textContent = minutes.toString().padStart(2, "0");
      s.textContent = seconds.toString().padStart(2, "0");
    }
  }, 1000);
}

startLoveTimer();


// =================== MUSIC ===================
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

if (audio && playBtn && progress) {
  playBtn.onclick = () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸";
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  };

  audio.ontimeupdate = () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
  };

  progress.oninput = () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  };
}

// =================== LOGIN ===================
const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("error");

const correctUsername = "nonglear";
const correctPassword = "240510";

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === correctUsername && password === correctPassword) {
      // ✅ จำว่า Login แล้ว
      localStorage.setItem("isLogin", "true");

      // 👉 ไปหน้าเว็บหลัก
      window.location.href = "index.html";
    } else {
      errorMsg.style.display = "block";
    }
  });
}
function logout() {
  localStorage.removeItem("isLogin");
  window.location.href = "login.html";
}
function showHint() {
  alert("ヒント 💕\n\nUsername = 私たちの子供の名前 🐻\nPassword = 大切な日 💖");
}
/*game */
const board = document.getElementById("board");
const piecesContainer = document.getElementById("pieces");
const winMessage = document.getElementById("winMessage");

let correctCount = 0;

// สร้างช่อง 16 ช่อง
for (let i = 0; i < 16; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
  });

    cell.addEventListener("drop", (e) => {
  e.preventDefault();

  const pieceIndex = e.dataTransfer.getData("text");
  const piece = document.querySelector(`[data-piece='${pieceIndex}']`);

  // ถ้าช่องมีของอยู่แล้ว ให้เอาของเก่ากลับไปด้านล่าง
  if (cell.firstChild) {
    piecesContainer.appendChild(cell.firstChild);
  }

  cell.appendChild(piece);
  checkWin();
});

  

    board.appendChild(cell);
}

// สร้างชิ้นภาพ
let indexes = [...Array(16).keys()];
indexes.sort(() => Math.random() - 0.5);

indexes.forEach(i => {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.draggable = true;
    piece.dataset.piece = i;

    let row = Math.floor(i / 4);
    let col = i % 4;

    piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

    piece.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", i);
    });

    piecesContainer.appendChild(piece);
});
piecesContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});

piecesContainer.addEventListener("drop", (e) => {
  e.preventDefault();

  const pieceIndex = e.dataTransfer.getData("text");
  const piece = document.querySelector(`[data-piece='${pieceIndex}']`);

  piecesContainer.appendChild(piece);
});


function checkWin() {
  const allPieces = document.querySelectorAll(".piece");
  let correct = 0;

  allPieces.forEach(p => {
      const parent = p.parentElement;
      if (parent && parent.dataset.index == p.dataset.piece) {
          correct++;
      }
  });

  if (correct === 16) {
    showPopup("すごい！💖 完成したよ！");
  }
}

// ================= MEMORY GAME =================

const memoryBoard = document.getElementById("memoryBoard");
const memoryWin = document.getElementById("memoryWin");

if (memoryBoard) {

  const images = [
    "images/pic1.jpg",
    "images/pic2.jpg",
    "images/pic3.jpg",
    "images/pic4.jpg",
    "images/pic5.jpg",
    "images/pic6.jpg"
  ];

  let cardsArray = [...images, ...images]; // ทำให้เป็นคู่
  cardsArray.sort(() => Math.random() - 0.5);

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matched = 0;

  cardsArray.forEach(img => {
    const card = document.createElement("div");
    card.classList.add("memory-card");

    card.innerHTML = `
      <div class="front">🌹</div>
      <div class="back" style="background-image:url('${img}')"></div>
    `;

    card.addEventListener("click", () => {
      if (lockBoard || card === firstCard) return;

      card.classList.add("flip");

      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;
      lockBoard = true;

      const img1 = firstCard.querySelector(".back").style.backgroundImage;
      const img2 = secondCard.querySelector(".back").style.backgroundImage;

      if (img1 === img2) {
        matched++;
        resetTurn();

        if (matched === images.length) {
          showPopup("すごいよ〜💕全部クリアしたね！");

        }

      } else {
        setTimeout(() => {
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          resetTurn();
        }, 1000);
      }
    });

    memoryBoard.appendChild(card);
  });

  function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }
}
// =================== LEVEL 3 CATCH HEART ===================
const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");

if (gameArea) {
  let score = 0;

  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "💖";

    // ใหญ่ขึ้น
    heart.style.fontSize = "50px";

    // ตำแหน่งสุ่ม
    heart.style.left = Math.random() * 80 + "%";

    // ตกช้าลง
    heart.style.animationDuration = "4s";
    heart.style.animationName = "gameFall"; // <-- ใส่ตรงนี้


    heart.onclick = () => {
      heart.remove();
      score++;
      scoreText.textContent = "Score: " + score;

      if (score === 15) {
        showPopup("さすがだね💕りりーのハート全部取られちゃったよ🫣");
      }
    };

    gameArea.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }

  // โผล่ช้าลง
  setInterval(createHeart, 1200);
}

const questions = [
  {
    question: "私たちはいつ付き合い始めた？",
    answers: ["2024年5月10日", "2024年1月3日", "2024年1月13日"],
    correct: 0
  },
  {
    question: "どっちが甘えん坊？",
    answers: ["ギア", "リリー", "二人とも"],
    correct: 1
  },
  {
    question: "どっちがもっと愛してる？",
    answers: ["ギア", "りりー", "同じくらい"],
    correct: 2
  },
  {
    question: "初デートはどこ？",
    answers: ["水族館", "海", "カフェ"],
    correct: 0
  },
  {
    question: "私たちの未来はどこ？",
    answers: ["日本", "タイ", "一緒にいられる場所ならどこでも"],
    correct: 2
  },

  {
    question: "最初に好きと言ったのはどっち？",
    answers: ["ギア", "りりー", "同時だった"],
    correct: 0
  },
  {
    question: "ケンカしても最後はどうなる？",
    answers: ["もっと仲良くなる", "無視する", "すぐ別れる"],
    correct: 0
  },
  {
    question: "記念日は大事？",
    answers: ["とても大事", "普通", "忘れがち"],
    correct: 0
  },
  {
    question: "りりーのことどれくらい好き？",
    answers: ["めちゃくちゃ好き", "まあまあ好き", "秘密"],
    correct: 0
  },
  {
    question: "子供の名前は？",
    answers: ["のんういあ", "ハム太郎", "のんりあ"],
    correct: 2
  },
  {
    question: "ずっと一緒にいる？",
    answers: ["たぶん", "もちろん", "考え中"],
    correct: 1
  }
];

let currentQuestion = 0;
let quizScore = 0;

const questionText = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const quizScoreText = document.getElementById("quizScore");

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  answersDiv.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");

    button.onclick = () => {
      if (index === q.correct) {
        quizScore++;
        quizScoreText.textContent = "Score: " + quizScore;
      } else {
        showPopup("違うよ〜😝");
      }

      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        endGame();
      }
    };

    answersDiv.appendChild(button);
  });
}

function endGame() {
  if (quizScore >= 11) {
    questionText.textContent = "やったね〜💖凄い！！💕";
  } else {
    questionText.textContent = "もっと愛してね〜😏";
  }
  answersDiv.innerHTML = "";
}

showQuestion();
//popup
function showPopup(message) {
  const popup = document.getElementById("popupWin");
  const text = document.getElementById("popupText");

  text.textContent = message;
  popup.style.display = "flex";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}
// ===== Heart Rain Effect =====
document.addEventListener("DOMContentLoaded", () => {
  // ตรวจสอบหน้า
  if (!window.location.href.includes("music.html")) return;

});

