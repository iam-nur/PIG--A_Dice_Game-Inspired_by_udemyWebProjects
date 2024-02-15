'use strict';
// DOM MANUPILATION
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
let current = document.querySelectorAll('.current-score');

// switch player function
const switchPlayer = function () {
  document.getElementById(`current--${ActivePlayer}`).textContent = 0;
  ActivePlayer = ActivePlayer === 0 ? 1 : 0; //switching active player
  currentScore = 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

// the starting states
diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;
let ActivePlayer = 0;
let score = [0, 0];
let playing = true;

// rolling dice fuctionality on click
btnRollEl.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; // generating random number b/n 1 and 6

    //displaying the dice images
    diceEl.src = `pictures/dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    //ckech for rolled if the rolled is not 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${ActivePlayer}`).textContent =
        currentScore;
    }
    // if the rolled is 1 the switching the play to another player
    else {
      switchPlayer();
    }
  }
});
//  holdind vpoint functionality
btnHoldEl.addEventListener('click', function () {
  // checking weather the game is not complete
  if (playing) {
    score[ActivePlayer] += currentScore; // add current scoreto active players score
    document.getElementById(`score--${ActivePlayer}`).textContent =
      score[ActivePlayer];
    // checking if the active player is winning if then, setting the game to static state and displaying  a win board for the winning player
    if (score[ActivePlayer] >= 10) {
      playing = false; //setting the game to static state
      // displaying  a win board for the winning player
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.add('player--winner');
      // hidding the dice image
      document.querySelector('.dice').classList.add('hidden');
    }
    // switching player
    else switchPlayer();
  }
});

// to start new game
btnNewEl.addEventListener('click', function () {
  // setting the variables to starting state
  playing = true;
  currentScore = 0;
  score = [0, 0];
  ActivePlayer = 0;

  // setting the value of global(held) score to null
  for (let i = 0; i < score.length; i++) {
    document.querySelector(`#score--${i}`).textContent = score[i];
  }

  // setting the value of not held score to null
  for (let i = 0; i < current.length; i++) {
    current[i].textContent = 0;
  }

  // remoing th black bachground of winning
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.dice').classList.add('hidden');
});
