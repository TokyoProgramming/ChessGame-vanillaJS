import { setChessPieces } from '../settings/setPieces.js';
import { rows } from '../settings/boardCoordinate.js';

const startGame = document.getElementById('start-button');
const deleteBtn = document.getElementById('delete-btn');

// player Control
const playerController = (currentPlayer) => {
  if (currentPlayer === 'player1') {
    return 'white';
  } else if (currentPlayer === 'player2') {
    return 'black';
  } else {
    return currentPlayer;
  }
};

// switch player
const switchPlayer = (currentPlayer) => {
  if (currentPlayer === 'player1') {
    let str = currentPlayer;
    let res = str.replace('player1', 'player2');
    return res;
  } else if (currentPlayer === 'player2') {
    let str = currentPlayer;
    let res = str.replace('player2', 'player1');
    return res;
  }
};

// check game status && add loser name
const gameStatusCtr = async (gameStatus, deleteBtn) => {
  try {
    if (gameStatus.split(' ')[1] === 'lose') {
      let pTag = document.createElement('p');
      pTag.innerHTML = `${gameStatus}`;
      pTag.classList.add('loser-name');
      deleteBtn.prepend(pTag);
    }
  } catch (error) {}

  return gameStatus;
};

// start Game
const gameStart = () => {
  game.classList.remove('before-start');
  const playGame = startGame.parentElement;
  playGame.classList.add('game-started');
  initPieces(rows);
  setChessPieces();
  try {
    if (deleteBtn.firstChild.tagName === 'P') {
      console.log(deleteBtn);
      let gameRes = deleteBtn.firstChild;
      gameRes.remove();
    }
  } catch (error) {}
};

// end Game
const gameEnd = (game, deleteBtn) => {
  game.classList.add('before-start');
  deleteBtn.classList.remove('game-started');
};

// initialize Pieces
const initPieces = (rows) => {
  let targetRow;

  for (let i = 0; i < 8; i++) {
    targetRow = rows[i];
    targetRow.forEach((el) => {
      try {
        if (el.lastChild.tagName === 'IMG') {
          el.lastChild.remove();
        }
      } catch (error) {}
    });
  }
};

export {
  playerController,
  switchPlayer,
  gameStatusCtr,
  gameStart,
  gameEnd,
  initPieces,
};
