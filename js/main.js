import { setChessPieces } from './setPieces.js';
import {
  movePiece,
  cellActivate,
  removeCirclesClassList,
  addColor,
  removeColor,
} from './controllers/cellController.js';

import {
  gameCtr,
  playerController,
  switchPlayer,
} from './controllers/gameController.js';

import {
  getPiecesPositions,
  getWhiteCanMoveNext,
  getBlackCanMoveNext,
  checkKingStatus,
} from './controllers/checkController.js';

import { logCtr } from './controllers/logController.js';

const chessBoard = document.querySelector('.chess-board');

let activeCellsArr = [];
let pieceInfoArr = [];
let player = 'player1';
let opponentPlayer = '';
let toCell = '';

const main = async (e) => {
  let targetCell = e.target;
  let getPlayer = playerController(player);
  if (getPlayer === 'white') {
    opponentPlayer = 'black';
  } else {
    opponentPlayer = 'white';
  }

  gameCtr(getPlayer);

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
      movePiece(pieceInfoArr, activeCellsArr, toCell, opponentPlayer);
      logCtr(toCell, getPlayer);
      await checkKingStatus(getPlayer);

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

document.addEventListener('DOMContentLoaded', setChessPieces);
chessBoard.addEventListener('click', main);
