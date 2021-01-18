import {
  row1,
  row2,
  row3,
  row4,
  row5,
  row6,
  row7,
  row8,
  rows,
} from './boardCoordinate.js';

import { piecesMovements } from './movements.js';
import { setChessPieces } from './setPieces.js';
import { movementsCtr } from './movementsController.js';

const chessBoard = document.querySelector('.chess-board');

let targetArr = [];
let deleteArr = [];
let target = '';
let positionObjArr = [];
let newArr = {};

let activeCellsArr = [];
let pieceInfoArr = [];
let cellNum = '';
const main = async (e) => {
  let targetCell = e.target;

  if (activeCellsArr.length === 0) {
    if (targetCell.tagName === 'IMG') {
      activeCellsArr = await cellActivate(e);
      pieceInfoArr = [targetCell.parentElement][0];
      addColor(targetCell.parentElement);
    }
  } else if (activeCellsArr.length !== 0) {
    if (
      targetCell.classList[1] === 'active' ||
      targetCell.className === 'circle'
    ) {
      if (targetCell.classList[1] === 'active') {
        cellNum = targetCell;
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

  //   let positionArr = [];

  //   // target == Image
  //   if (e.target.tagName === 'IMG') {
  //     target = e.target;
  //     let number = target.parentElement.id.slice(1);
  //     // targetArr !== empty
  //     if (targetArr.length !== 0) {
  //       if (targetArr[0].arrNumber === number) {
  //         target.className = '';
  //         // // target.classList.remove('clicked-1') ||
  //         // //   target.classList.remove('clicked-2');
  //         chessBoard.className = '';
  //         positionArr.forEach((el) => {
  //           el.classList.remove('active');
  //           el.children[0].remove();
  //         });
  //         positionArr = [];
  //         targetArr = [];
  //         return;
  //       }
  //     }
  //     newArr = {
  //       target,
  //       arrNumber: number,
  //     };
  //     targetArr.push(newArr);
  //     targetArr.forEach((element) => {
  //       let one = String(element.arrNumber).charAt(0);
  //       let two = String(element.arrNumber).charAt(1);
  //       let firstNumber = Number(one);
  //       let SecondNumber = Number(two);
  //       chessBoard.classList.toggle('board-opacity');
  //       // Add colors && selected
  //       if (firstNumber % 2 == true) {
  //         if (SecondNumber % 2 == true) {
  //           element.target.classList.toggle('clicked-1');
  //           element.target.classList.add('selected');
  //         } else {
  //           element.target.classList.toggle('clicked-2');
  //           element.target.classList.add('selected');
  //         }
  //       } else {
  //         if (SecondNumber % 2 == true) {
  //           element.target.classList.toggle('clicked-2');
  //           element.target.classList.add('selected');
  //         } else {
  //           element.target.classList.toggle('clicked-1');
  //           element.target.classList.add('selected');
  //         }
  //       }
  //     });
  //     // check Arr length
  //     let arrLength = targetArr.length;
  //     if (arrLength > 1) {
  //       deleteArr = positionObjArr[0].positionArr;
  //       deleteArr.forEach((el) => {
  //         el.classList.remove('active');
  //         console.log(el);
  //         el.children[0].remove();
  //       });
  //       positionObjArr.shift();
  //       targetArr.shift();
  //     } else if (arrLength > 0) {
  //       chessBoard.classList.add('board-opacity');
  //     } else {
  //       chessBoard.classList.remove('board-opacity');
  //     }
  //   } else if (
  //     e.target.tagName !== 'IMG' &&
  //     e.target.parentElement.classList[1] === 'active'
  //   ) {
  //     let moveTo = '';
  //     moveTo = e.target.parentElement;
  //     movePiece(moveTo);
  //     positionObjArr = [];
  //     target.className = '';
  //     chessBoard.className = '';
  //     targetArr = [];
  //     // Target !== Image
  //   } else {
  //     if (targetArr.length > 0) {
  //       target = targetArr[0].target;
  //       if (positionObjArr.length !== 0) {
  //         deleteArr = positionObjArr[0].positionArr;
  //         deleteArr.forEach((el) => {
  //           el.classList.remove('active');
  //           el.children[0].remove();
  //         });
  //         positionObjArr = [];
  //       }
  //       targetArr = [];
  //       target.className = '';
  //       chessBoard.className = '';
  //     }
  //   }
};
// // get current location row && col
// // if white pieces minus row number => if it is 7 check row 6 && row 5
// //check row6 array col-1 && row 5 col-1

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
};

// remove color
const removeColor = (cell) => {
  // cell.classList.remove('clicked-1')
  cell.classList.remove('clicked-1') || cell.classList.remove('clicked-2');
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
    }
  });
  return dataArr;
};

// active piece
const pieceActivate = () => {};

document.addEventListener('DOMContentLoaded', setChessPieces);
chessBoard.addEventListener('click', main);
