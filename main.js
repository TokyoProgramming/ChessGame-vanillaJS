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
  let pieceData = fromCell.lastChild;
  let toCellData = toCell;

  // remove circle && classList === 'active'
  toCellData.lastChild.remove();
  toCellData.classList.remove('active');

  // move the piece
  toCellData.appendChild(pieceData);

  // remove Circles && classList 'active' && 'scale-ctr'
  removeCirclesClassList(activeCellsArr);
};

// add circles to available cells
const cellActivate = async (e, getPlayer) => {
  let dataArr = await movementsCtr(e, getPlayer);
  dataArr.forEach((el) => {
    let data = el.cell;
    // console.log(data);
    data.classList.add('active');

    // cell is empty
    if (data.children.length === 0) {
      const circleDiv = document.createElement('div');
      circleDiv.classList.add('circle');
      data.appendChild(circleDiv);

      // cell has piece
    } else if (data.lastChild.tagName === 'IMG') {
      let imgData = data.lastChild;
      imgData.classList.add('scale-ctr');

      // cell has number
    } else if (data.children[0].tagName === 'SPAN') {
      if (data.children.length > 1) {
        if (data.children[1].tagName !== 'IMG') {
          const circleDiv = document.createElement('div');
          circleDiv.classList.add('circle');
          data.appendChild(circleDiv);
        }
      } else {
        const circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');
        data.appendChild(circleDiv);
      }
    }
  });
  return dataArr;
};

// remove circles && classList === 'active' && 'scale-ctr'
const removeCirclesClassList = (activeCellsArr) => {
  activeCellsArr.forEach((el) => {
    let data = el.cell;

    // cell is empty
    if (
      data.children[0].tagName !== 'IMG' &&
      data.children[0].tagName !== 'SPAN'
    ) {
      // remove circles
      data.children[0].remove();

      // cell has opponent piece
    } else if (data.children[0].id.split('-')[0] === `${opponentPlayer}`) {
      let scaleCtrImg = data.children[0];
      scaleCtrImg.classList.remove('scale-ctr');

      // cell has number
    } else if (data.children[0].tagName === 'SPAN') {
      if (data.children[1].tagName === 'DIV') {
        let divData = data.children[1];
        divData.remove();
      } else if (data.children[1].tagName === 'SPAN') {
        let divData = data.children[2];
        divData.remove();
      }
      //  else if (data.children[2].tagName === 'DIV') {
      //   let divData = data.children[2];
      //   divData.remove();
      // }
    }
    data.classList.remove('active');
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
