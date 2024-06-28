'use strict';

// Selectig elements
const scoreFirPlayerEl = document.querySelector('#score--0');
const scoreSecPlayerEl = document.getElementById('score--1');
const FirstPlayerEl = document.querySelector('.player--0');
const SecondPlayerEl = document.querySelector('.player--1');
const FirPlayerCurrScore = document.getElementById('current--0');
const SecPlayerCurrScore = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

// Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, isGameStillActive;

// Starting conditions
const init = function () {
  // Score array of player 1 and Player 2
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isGameStillActive = true;

  scoreFirPlayerEl.textContent = 0;
  scoreSecPlayerEl.textContent = 0;
  FirPlayerCurrScore.textContent = 0;
  SecPlayerCurrScore.textContent = 0;

  FirstPlayerEl.classList.remove('player--winner');
  SecondPlayerEl.classList.remove('player--winner');
  FirstPlayerEl.classList.add('player--active');
  SecondPlayerEl.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (isGameStillActive) {
    // Generating random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check if rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding score functionality
btnHold.addEventListener('click', function () {
  if (isGameStillActive) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      isGameStillActive = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // If active player is 0 (player1) switch to 1 (player2)
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  FirstPlayerEl.classList.toggle('player--active');
  SecondPlayerEl.classList.toggle('player--active');
};
