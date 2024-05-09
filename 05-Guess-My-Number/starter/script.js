'use strict';

let message = document.querySelector('.message');
let numberSecret = document.querySelector('.number');
let score = document.querySelector('.score');
let input = document.querySelector('.guess');
let button = document.querySelector('.check');
let again = document.querySelector('.again');
let highScore = document.querySelector('.highscore');
let randomValue = getRndInteger(1, 20);

button.addEventListener("click", function () {
  if (input.value && input.value > 1 && input.value <= 20) {
    if (score.textContent > 0) {
      if (input.value > randomValue) {
        message.textContent = "Too High";
        score.textContent -= 1;
      } else if (input.value < randomValue) {
        message.textContent = "Too low";
        score.textContent -= 1;
      } else {
        message.textContent = "Winner 🏆";
        document.querySelector('body').style.background = "#60b347";
        numberSecret.textContent = input.value;
        highScore.textContent = highScore.textContent < score.textContent ? score.textContent : highScore.textContent;
      }
    } else {
      message.textContent = "Lose";
      document.querySelector('body').style.background = "red";
    }
  } else {
    message.textContent = "Wrong Input";
  }
});
again.addEventListener("click", reset);

function reset() {
  message.textContent = "Start guessing...";
  document.querySelector('body').style.background = "#222";
  numberSecret.textContent = "?";
  input.value = "";
  score.textContent = 20
  randomValue = getRndInteger(1, 20);
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}