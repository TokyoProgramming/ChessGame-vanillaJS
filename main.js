import { setChessPieces } from './setPieces.js';
import { movementsCtr } from './movementsController.js';

const chessBoard = document.querySelector('.chess-board');

let activeCellsArr = [];
let pieceInfoArr = [];
let cellNum = '';

const main = async (e) => {
  let targetCell = e.target;

  // let pieceColor = targetCell.id.split('-')[0];
  if (activeCellsArr.length === 0) {
    if (targetCell.id.split('-')[0] === 'white') {
      activeCellsArr = await cellActivate(e);
      pieceInfoArr = [targetCell.parentElement][0];
      addColor(targetCell.parentElement);
    }
  } else if (activeCellsArr.length !== 0) {
    if (
      targetCell.classList[1] === 'active' ||
      targetCell.className === 'circle' ||
      targetCell.parentElement.classList[1] === 'active'
    ) {
      if (targetCell.classList[1] === 'active') {
        cellNum = targetCell;
      } else if (targetCell.id.split('-')[0] === 'black') {
        cellNum = targetCell.parentElement;
      } else {
        cellNum = targetCell.parentElement;
      }
      movePiece(pieceInfoArr, activeCellsArr, cellNum);
      removeColor(pieceInfoArr);
      // init activeCellsArr
      activeCellsArr = [];
    } else if (targetCell.classList[1] === undefined) {
      activeCellsArr.forEach((el) => {
        if (el.cell.children[0].tagName !== 'IMG') {
          el.cell.children[0].remove();
        }
        el.cell.classList.remove('active');
      });
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
  console.log(toCellData);

  // remove circle && classList === 'active'
  toCellData.children[0].remove();

  toCellData.classList.remove('active');

  // move the piece
  toCellData.appendChild(pieceData);

  // remove circles && classList === 'active'
  activeCellsArr.forEach((el) => {
    if (el.cell.children[0].tagName !== 'IMG') {
      el.cell.children[0].remove();
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
  // chessBoard.classList.add('board-opacity');
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
      console.log('opponent piece here ');
    }
  });
  return dataArr;
};

document.addEventListener('DOMContentLoaded', setChessPieces);
chessBoard.addEventListener('click', main);
