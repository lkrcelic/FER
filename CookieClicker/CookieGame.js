class Utils {
  static setDummyHighscores() {
    if (!localStorage.getItem("highscores")) {
      let setDummyHighscores = [
        { highscore: 50, username: "Mate" },
        { highscore: 30, username: "Nikola" },
        { highscore: 52, username: "Frane" },
      ];
      localStorage.setItem("highscores", JSON.stringify(setDummyHighscores));
    }
  }
  static formatTwoDigits(number) {
    return number < 10 ? "0" + number : number;
  }

  static formatTime(time) {
    const minutes = Utils.formatTwoDigits(parseInt(time / 60, 10));
    const seconds = Utils.formatTwoDigits(parseInt(time % 60, 10));

    return minutes + ":" + seconds;
  }
}

class HighScoreManager {
  static getHighScores() {
    const highscores = localStorage.getItem("highscores");
    if (!highscores) {
      throw new Error("Highscores not set!");
    }
    return JSON.parse(highscores);
  }
  static updateHighScore(user, score) {
    const highscores = HighScoreManager.getHighScores();
    let foundentry = highscores.findIndex(
      (oneEntry) => oneEntry.username == user
    );
    if (foundentry != -1) {
      highscores.splice(foundentry, 1);
    }
    highscores.push({ highscore: score, username: user });
    highscores.sort(function (a, b) {
      return b.highscore - a.highscore;
    });
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}

class CookieGame {
  cookieCount = 0;
  gameIntervalTimer = null;
  updateTimerUI = null;
  resetGameUI = null;
  updateHighScoreListUI = null;

  constructor(updateTimerUI, resetGameUI, updateHighScoreListUI) {
    this.updateTimerUI = updateTimerUI;
    this.resetGameUI = resetGameUI;
    this.updateHighScoreListUI = updateHighScoreListUI;
  }

  startGame(duration) {
    let countdown = duration;
    this.cookieCount = 0;
    this.updateTimerUI(Utils.formatTime(duration));
    this.gameIntervalTimer = setInterval(() => {
      countdown--;
      if (countdown < 0) {
        const username = prompt(
          `Your score was ${this.cookieCount}. Please enter your username:`
        );
        HighScoreManager.updateHighScore(username, this.cookieCount);
        this.updateHighScoreListUI();
        this.resetGame(duration);
      } else {
        this.updateTimerUI(Utils.formatTime(countdown));
      }
    }, 1000);
  }
  resetGame(duration) {
    if (!gameStarted) return;

    this.updateTimerUI(Utils.formatTime(duration));
    clearInterval(this.gameIntervalTimer);
    this.cookieCount = 0;
    this.resetGameUI();
  }
}

function updateHighScoreListUI() {
  let highscoreList = document.querySelector(".highscore--list");
  if (!highscoreList) {
    console.log("TU sam");
    throw new Error("Cannot find highscore list!");
  } else {
    while (highscoreList.firstChild) {
      highscoreList.firstChild.remove();
    }
    const highscores = HighScoreManager.getHighScores();
    highscores.forEach((score) => {
      let listItem = document.createElement("li");
      listItem.textContent = `${score.username}: ${score.highscore}`;
      highscoreList.appendChild(listItem);
    });
  }
}

function resetGameUI() {
  gameStarted = false;
  cookieCountDisplay.textContent = 0;
  btnStart.textContent = "START";
}

//MAIN
let cookie = document.getElementById("img--cookie");
let cookieCountDisplay = document.querySelector("#click-count");
let btnStart = document.querySelector(".btn--start");
let timer = document.getElementById("timer");
let gameStarted = false;

if (!cookie || !cookieCountDisplay || !btnStart || !timer) {
  console.log(cookie);
  console.log(cookieCountDisplay);
  console.log(btnStart);
  console.log(timer);

  alert("UI not loaded");
} else {
  Utils.setDummyHighscores();
  const cookieGame = new CookieGame(
    (timeString) => (timer.textContent = timeString),
    resetGameUI,
    updateHighScoreListUI
  );

  cookie.onclick = (event) => {
    cookieCountDisplay.textContent = ++cookieGame.cookieCount;
  };

  btnStart.onclick = (event) => {
    const tenSeconds = 3;
    if (!gameStarted) {
      cookieGame.startGame(tenSeconds);
      btnStart.textContent = "RESET";
      gameStarted = true;
      cookieCountDisplay.textContent = 0;
    } else {
      cookieGame.resetGame(tenSeconds);
    }
  };
}
