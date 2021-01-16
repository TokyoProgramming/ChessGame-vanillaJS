import {
  X11,
  X12,
  X13,
  X14,
  X15,
  X16,
  X17,
  X18,
  X21,
  X22,
  X23,
  X24,
  X25,
  X26,
  X27,
  X28,
  X31,
  X32,
  X33,
  X34,
  X35,
  X36,
  X37,
  X38,
  X41,
  X42,
  X43,
  X44,
  X45,
  X46,
  X47,
  X48,
  X51,
  X52,
  X53,
  X54,
  X55,
  X56,
  X57,
  X58,
  X61,
  X62,
  X63,
  X64,
  X65,
  X66,
  X67,
  X68,
  X71,
  X72,
  X73,
  X74,
  X75,
  X76,
  X77,
  X78,
  X81,
  X82,
  X83,
  X84,
  X85,
  X86,
  X87,
  X88,
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

const chessBoard = document.querySelector('.chess-board');
let row = 0;
let col = 0;

let targetArr = [];
let deleteArr = [];
let positionObj = {};
let positionObjArr = [];
let newArr = {};
let arrLength = 0;
let target = '';
let number = '';
let targetPosition,
  targetRow,
  targetCol = '';

const main = async (e) => {
  let positionArr = [];

  const data = await piecesMovements(e);
  // const availableData = availableCells(data);

  if (data !== undefined && data[0].length !== 0 && data[1].length !== 0) {
    row = data[0];
    col = data[1];
    for (let j = 0; j < row.length; j++) {
      for (let i = 0; i < col.length; i++) {
        targetRow = row[j] - 1;
        targetCol = col[i] - 1;
        targetPosition = rows[targetRow][targetCol];
        positionArr.push(targetPosition);
      }
    }
    positionObj = {
      id: Math.random() * 100,
      positionArr,
    };

    positionObjArr.push(positionObj);
    // positionObjArr[0].positionArr[0].classList.remove('active');

    positionArr.forEach((el) => {
      el.classList.add('active');
      if (el.children.length === 0) {
        const circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');
        el.appendChild(circleDiv);
      }
    });
  }

  // target == Image
  if (e.target.tagName === 'IMG') {
    target = e.target;
    number = target.parentElement.id.slice(1);

    // targetArr !== empty
    if (targetArr.length !== 0) {
      if (targetArr[0].arrNumber === number) {
        target.className = '';

        // // target.classList.remove('clicked-1') ||
        // //   target.classList.remove('clicked-2');
        chessBoard.className = '';
        positionArr.forEach((el) => {
          el.classList.remove('active');
          el.children[0].remove();
        });
        positionArr = [];
        targetArr = [];

        return;
      }
    }

    newArr = {
      target,
      arrNumber: number,
    };

    targetArr.push(newArr);
    targetArr.forEach((element) => {
      let one = String(element.arrNumber).charAt(0);
      let two = String(element.arrNumber).charAt(1);
      let firstNumber = Number(one);
      let SecondNumber = Number(two);

      chessBoard.classList.toggle('board-opacity');

      // Add colors && selected
      if (firstNumber % 2 == true) {
        if (SecondNumber % 2 == true) {
          element.target.classList.toggle('clicked-1');
          element.target.classList.add('selected');
        } else {
          element.target.classList.toggle('clicked-2');
          element.target.classList.add('selected');
        }
      } else {
        if (SecondNumber % 2 == true) {
          element.target.classList.toggle('clicked-2');
          element.target.classList.add('selected');
        } else {
          element.target.classList.toggle('clicked-1');
          element.target.classList.add('selected');
        }
      }
    });

    // check Arr length
    arrLength = targetArr.length;

    if (arrLength > 1) {
      deleteArr = positionObjArr[0].positionArr;
      deleteArr.forEach((el) => {
        el.classList.remove('active');
        el.children[0].remove();
      });
      positionObjArr.shift();
      targetArr.shift();
    } else if (arrLength > 0) {
      chessBoard.classList.add('board-opacity');
    } else {
      chessBoard.classList.remove('board-opacity');
    }
  } else if (
    e.target.tagName !== 'IMG' &&
    e.target.parentElement.classList[1] === 'active'
  ) {
    let moveTo = '';
    moveTo = e.target.parentElement;

    movePiece(moveTo);

    positionObjArr = [];
    target.className = '';
    chessBoard.className = '';
    targetArr = [];

    // Target !== Image
  } else {
    if (targetArr.length > 0) {
      target = targetArr[0].target;

      if (positionObjArr.length !== 0) {
        deleteArr = positionObjArr[0].positionArr;
        deleteArr.forEach((el) => {
          el.classList.remove('active');
          el.children[0].remove();
        });
        positionObjArr = [];
      }

      targetArr = [];

      target.className = '';
      chessBoard.className = '';
    }
  }
};
// // get current location row && col
// // if white pieces minus row number => if it is 7 check row 6 && row 5
// //check row6 array col-1 && row 5 col-1

// get selected && active cells
// Move pieces
const movePiece = (moveTo) => {
  let check = document.querySelectorAll('.active');
  let selected = document.querySelector('.selected');
  let clone = selected.cloneNode(true);
  clone.className = '';
  moveTo.appendChild(clone);
  for (let i = 0; i < check.length; i++) {
    check[i].childNodes[0].remove('div');
    check[i].classList.remove('active');
  }
  selected.remove('img');
  selected.classList.remove('selected');
};

// what you need
// current location
// where piece can go
// on the way is there any other pieces ??

const availableCells = (data) => {};

document.addEventListener('DOMContentLoaded', setChessPieces);
chessBoard.addEventListener('click', main);
