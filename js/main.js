import {
  movePiece,
  cellActivate,
  removeCirclesClassList,
  addColor,
  removeColor,
} from './controllers/cellController.js';
import {
  playerController,
  switchPlayer,
  gameStatusCtr,
  gameStart,
  gameEnd,
} from './controllers/gameController.js';
import { checkKingStatus } from './controllers/checkController.js';
import { logCtr } from './controllers/logController.js';

const chessBoard = document.querySelector('.chess-board');
const game = document.getElementById('game');
const deleteBtn = document.getElementById('delete-btn');
const startGame = document.getElementById('start-button');

let activeCellsArr = [];
let pieceInfoArr = [];
let player = 'player1';
let opponentPlayer = '';
let toCell = '';
let gameStatus;
let log = [];
let logRes = [];

const main = async (e) => {
  let targetCell = e.target;
  let getPlayer = playerController(player);
  if (getPlayer === 'white') {
    opponentPlayer = 'black';
  } else {
    opponentPlayer = 'white';
  }

  if (activeCellsArr.length === 0) {
    if (targetCell.id.split('-')[0] === `${getPlayer}`) {
      activeCellsArr = await cellActivate(e, getPlayer);
      if (activeCellsArr.length !== 0) {
        pieceInfoArr = [targetCell.parentElement][0];
        addColor(targetCell.parentElement);
      }
    }
  } else if (activeCellsArr.length !== 0) {
    if (
      targetCell.classList[1] === 'active' ||
      targetCell.className === 'circle' ||
      targetCell.parentElement.classList[1] === 'active'
    ) {
      if (targetCell.classList[1] === 'active') {
        toCell = targetCell;
      } else if (targetCell.id.split('-')[0] === `${opponentPlayer}`) {
        toCell = targetCell.parentElement;
      } else {
        toCell = targetCell.parentElement;
      }
      // move piece
      movePiece(pieceInfoArr, activeCellsArr, toCell, opponentPlayer);

      // manage log
      logRes = await logCtr(toCell, getPlayer, log);
      gameStatus = await checkKingStatus(getPlayer, logRes);

      console.log(logRes);

      let checkmateRes = await gameStatusCtr(gameStatus, deleteBtn);

      // if game checkmates
      try {
        if (checkmateRes.split(' ')[1] === 'lose') {
          setTimeout(() => {
            gameEnd(game, deleteBtn);
          }, 3000);
          removeColor(pieceInfoArr);

          // await initPieces(rows);
          init();
          return;
        }
      } catch (error) {}

      removeColor(pieceInfoArr);
      // init activeCellsArr
      activeCellsArr = [];
      // switchPlayer
      player = switchPlayer(player);
    } else if (targetCell.classList[1] === undefined) {
      removeCirclesClassList(activeCellsArr, opponentPlayer);
      removeColor(pieceInfoArr);
      // init activeCellsArr
      activeCellsArr = [];
    }
  }
};

// initialize
const init = () => {
  activeCellsArr = [];
  pieceInfoArr = [];
  player = 'player1';
  opponentPlayer = '';
  toCell = '';
  gameStatus;
  log = [];
  logRes = [];
};

// document.addEventListener('DOMContentLoaded', setChessPieces);
startGame.addEventListener('click', gameStart);
chessBoard.addEventListener('click', main);
