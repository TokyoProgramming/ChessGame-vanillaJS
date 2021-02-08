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
import {
  checkKingStatus,
  getKingPosition,
} from './controllers/checkController.js';
import { logCtr } from './controllers/logController.js';
import { promotion, selectPiece } from './specialMove/pawnPromotion.js';
import { castling, getCastlingCell } from './specialMove/kingRookCastling.js';
import { rows } from './settings/boardCoordinate.js';

const chessBoard = document.querySelector('.chess-board');
const game = document.getElementById('game');
const deleteBtn = document.getElementById('delete-btn');
const startGame = document.getElementById('start-button');

let activeCellsArr = [];
let fromCell = [];
let player = 'player1';
let opponentPlayer = '';
let toCell = '';
let gameStatus = '';
let log = [];
let logRes = [];
let logResult = [];
let castlingRes = [];
let castlingResult = false;
let castlingCell = '';

const main = async (e) => {
  let targetCell = e.target;
  let getPlayer = playerController(player);

  if (getPlayer === 'white') {
    opponentPlayer = 'black';
  } else if (getPlayer === 'black') {
    opponentPlayer = 'white';
  }
  if (getPlayer === 'white' || getPlayer === 'black') {
    // choose piece
    if (activeCellsArr.length === 0) {
      if (targetCell.id.split('-')[0] === `${getPlayer}`) {
        activeCellsArr = await cellActivate(e, getPlayer);

        if (activeCellsArr.length !== 0) {
          fromCell = [targetCell.parentElement][0];
          addColor(targetCell.parentElement);
        }
      }
      // select toCell
    } else if (activeCellsArr.length !== 0) {
      if (
        targetCell.classList[1] === 'active' ||
        targetCell.className === 'circle' ||
        targetCell.parentElement.classList[1] === 'active'
      ) {
        if (targetCell.classList[1] === 'active') {
          toCell = targetCell;
          // opponent piece in the cell
        } else if (targetCell.id.split('-')[0] === `${opponentPlayer}`) {
          toCell = targetCell.parentElement;
          // empty cell
        } else {
          toCell = targetCell.parentElement;
        }

        // move piece
        movePiece(fromCell, activeCellsArr, toCell, opponentPlayer);

        // Get Castling Result
        castlingRes = [];
        castlingRes = await castling(getPlayer);
        castlingResult = false;
        try {
          if (toCell.id === castlingRes.id) {
            console.log('king moved to castling cell');
            castlingResult = true;
          } else {
            castlingResult = false;
          }
        } catch (error) {}
        castlingCell = '';
        // castling = true
        if ((castlingResult = true)) {
          // get to cell

          castlingCell = await getCastlingCell(toCell, getPlayer);

          if (castlingCell !== undefined) {
            toCell = '';
            toCell = castlingCell;
          }
        }

        // manage log
        logRes = await logCtr(fromCell, toCell, getPlayer, log);
        logResult = logRes[logRes.length - 1];
        gameStatus = '';
        gameStatus = await checkKingStatus(getPlayer, log);
        // promotion check
        const checkPromotion = promotion(player, e);
        // checkmate
        let checkmateRes = await gameStatusCtr(gameStatus, deleteBtn);
        // if game checkmates
        try {
          if (checkmateRes.split(' ')[1] === 'lose') {
            setTimeout(() => {
              gameEnd(game, deleteBtn);
            }, 3000);
            removeColor(fromCell);

            // await initPieces(rows);
            init();
            return;
          }
        } catch (error) {}
        // init classList
        initClassList();
        // removeColor
        removeColor(fromCell);
        // init activeCellsArr
        activeCellsArr = [];

        if (checkPromotion === false) {
          // switchPlayer
          player = switchPlayer(player);
        } else {
          player = `${player}-promotion`;
        }
        const kingInfo = await getKingPosition(opponentPlayer);
        kingInfo.parentElement.classList.remove('checked');
        // there isn't the piece in the cell
      } else if (targetCell.classList[1] === undefined) {
        removeCirclesClassList(activeCellsArr, opponentPlayer);
        removeColor(fromCell);
        // init activeCellsArr
        activeCellsArr = [];
      }
    }
  } else {
    player = await selectPiece(e);
    const currentPlayer = log[log.length - 1].player;
    const logPromoRes = await logCtr(fromCell, toCell, currentPlayer, log);
    await checkKingStatus(currentPlayer, logPromoRes);
  }
};

// initialize
const init = () => {
  activeCellsArr = [];
  fromCell = [];
  player = 'player1';
  opponentPlayer = '';
  toCell = '';
  gameStatus;
  log = [];
  logRes = [];
  logResult = [];
};
// initialize classList
const initClassList = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let classListCell = rows[i][j];

      try {
        classListCell.classList.remove('white-kingSide');
        classListCell.classList.remove('black-kingSide');
        classListCell.classList.remove('white-queenSide');
        classListCell.classList.remove('black-queenSide');
      } catch (error) {
        console.log(error);
      }
    }
  }
};

// document.addEventListener('DOMContentLoaded', setChessPieces);
startGame.addEventListener('click', gameStart);
chessBoard.addEventListener('click', main);

export { logRes, logResult };
