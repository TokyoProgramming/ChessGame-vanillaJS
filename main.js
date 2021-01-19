import { setChessPieces } from './setPieces.js';
import { movementsCtr } from './movementsController.js';
import { gameCtr } from './gameController.js';

const chessBoard = document.querySelector('.chess-board');

let activeCellsArr = [];
let pieceInfoArr = [];
let cellNum = '';
let player = 'player1';

let opponentPlayer = '';

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
      activeCellsArr = await cellActivate(e);
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
        cellNum = targetCell;
      } else if (targetCell.id.split('-')[0] === `${opponentPlayer}`) {
        cellNum = targetCell.parentElement;
      } else {
        cellNum = targetCell.parentElement;
      }
      movePiece(pieceInfoArr, activeCellsArr, cellNum);
      removeColor(pieceInfoArr);
      // init activeCellsArr
      activeCellsArr = [];
      // switchPlayer
      player = switchPlayer(player);
    } else if (targetCell.classList[1] === undefined) {
      removeCirclesClassList(activeCellsArr);
      removeColor(pieceInfoArr);
      // init activeCellsArr
      activeCellsArr = [];
    }
  }
};

// get selected && active cells
// Move pieces
const movePiece = (fromCell, activeCellsArr, toCell) => {
  let pieceData = fromCell.children[0];
  let toCellData = toCell;

  // remove circle && classList === 'active'
  toCellData.children[0].remove();
  toCellData.classList.remove('active');

  // move the piece
  toCellData.appendChild(pieceData);

  // remove Circles && classList 'active' && 'scale-ctr'
  removeCirclesClassList(activeCellsArr);
};

// remove circles && classList === 'active' && 'scale-ctr'
const removeCirclesClassList = (activeCellsArr) => {
  activeCellsArr.forEach((el) => {
    if (el.cell.children[0].tagName !== 'IMG') {
      el.cell.children[0].remove();
    } else if (el.cell.children[0].id.split('-')[0] === `${opponentPlayer}`) {
      let scaleCtrImg = el.cell.children[0];
      // console.log(scaleCtrImg);
      scaleCtrImg.classList.remove('scale-ctr');
    }

    el.cell.classList.remove('active');
  });
};

// add color to the selected piece's cell
const addColor = (selectCell) => {
  let getId = selectCell.id.slice(1);
  let firstNum = String(getId).charAt(0);
  let secondNum = String(getId).charAt(1);

  if (firstNum % 2 == true) {
    if (secondNum % 2 == true) {
      selectCell.classList.add('clicked-1');
    } else {
      selectCell.classList.add('clicked-2');
    }
  } else {
    if (secondNum % 2 == true) {
      selectCell.classList.add('clicked-2');
    } else {
      selectCell.classList.add('clicked-1');
    }
  }
};

// remove color
const removeColor = (cell) => {
  // cell.classList.remove('clicked-1')
  cell.classList.remove('clicked-1') || cell.classList.remove('clicked-2');
  // chessBoard.classList.remove('board-opacity');
};

// add circles to available cells
const cellActivate = async (e) => {
  let dataArr = await movementsCtr(e);
  dataArr.forEach((el) => {
    let data = el.cell;
    data.classList.add('active');
    if (data.children.length === 0) {
      const circleDiv = document.createElement('div');
      circleDiv.classList.add('circle');
      data.appendChild(circleDiv);
    } else {
      let imgData = data.children[0];
      imgData.classList.add('scale-ctr');
    }
  });
  return dataArr;
};

// player Control
const playerController = (currentPlayer) => {
  if (currentPlayer === 'player1') {
    return 'white';
  } else {
    return 'black';
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

document.addEventListener('DOMContentLoaded', setChessPieces);
chessBoard.addEventListener('click', main);
