'use strict';

const newGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerScore_1 = document.querySelector('#score--0');
const playerScore_2 = document.querySelector('#score--1');
const playerCurrent_1 = document.querySelector('#current--0');
const playerCurrent_2 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const effect1 = document.querySelector(".player--0");
const effect2 = document.querySelector(".player--1");

let currentScore = [0, 0];
let globalScore = [0, 0];
let CurrentPlayer = 0;
let statusGame = true;
let click = 1;

btnRoll.addEventListener("click", roll);
btnHold.addEventListener("click", hold);
newGame.addEventListener("click", restGame);

function roll() {
  click == 1 ? dice.classList.remove("hidden") : "";
  if (statusGame) {
    let number = getRndInteger(1, 6);
    dice.src = `dice-${number}.png`;
    if (number != 1) {
      currentScore[CurrentPlayer] += number;
      document.querySelector(`#current--${CurrentPlayer}`).textContent = currentScore[CurrentPlayer]
    } else {
      switchPlayer();
    }
  }
  click++;
}

function switchPlayer() {
  document.querySelector(`#current--${CurrentPlayer}`).textContent = 0;
  currentScore[CurrentPlayer] = 0;
  document.querySelector(`.player--${CurrentPlayer}`).classList.toggle('player--active');
  CurrentPlayer = CurrentPlayer ? 0 : 1;
  document.querySelector(`.player--${CurrentPlayer}`).classList.toggle('player--active');
}

function hold() {
  if (statusGame) {
    globalScore[CurrentPlayer] += currentScore[CurrentPlayer];
    document.querySelector(`#score--${CurrentPlayer}`).textContent = globalScore[CurrentPlayer];
  }
  checkWinner();
}

function checkWinner() {
  if (globalScore[1] >= 100 || globalScore[0] >= 100) {
    statusGame = false;
    document.querySelector(`.player--${CurrentPlayer}`).classList.add('player--winner');
  } else {
    switchPlayer();
  }
}

function restGame() {
  document.querySelector(`.player--${CurrentPlayer}`).classList.remove('player--winner');
  CurrentPlayer = 0;
  statusGame = true;
  currentScore = [0, 0];
  globalScore = [0, 0];
  dice.classList.add("hidden");
  playerScore_1.textContent = playerScore_2.textContent = playerCurrent_1.textContent = playerCurrent_2.textContent = 0;
  effect1.classList.add('player--active');
  effect2.classList.remove('player--active');
  click = 1;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}