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

import {
  wP,
  wB,
  wKing,
  wK,
  wQ,
  wR,
  bP,
  bB,
  bKing,
  bQ,
  bR,
  bK,
  pieces,
} from './piecesInfo.js';

const chessBoard = document.querySelector('.chess-board');
let row,
  col = 0;

const setChessPieces = () => {
  // white Pawn
  row7.map((el) => {
    let whitePawn = document.createElement('img');
    whitePawn.src = `${wP.imgSrc}`;
    whitePawn.id = 'white-pawn';
    el.appendChild(whitePawn);
  });

  //   white Rook
  let whiteRook_1 = document.createElement('img');
  whiteRook_1.src = `${wR.imgSrc}`;
  X81.appendChild(whiteRook_1);
  whiteRook_1.id = 'white-rook';
  let whiteRook_2 = document.createElement('img');
  whiteRook_2.src = `${wR.imgSrc}`;
  whiteRook_2.id = 'white-rook';
  X88.appendChild(whiteRook_2);

  //   white Knight
  let whiteKnight_1 = document.createElement('img');
  whiteKnight_1.src = `${wK.imgSrc}`;
  whiteKnight_1.id = 'white-Knight';
  X82.appendChild(whiteKnight_1);
  let whiteKnight_2 = document.createElement('img');
  whiteKnight_2.src = `${wK.imgSrc}`;
  whiteKnight_2.id = 'white-knight';
  X87.appendChild(whiteKnight_2);

  //   white bishop
  let whiteBishop_1 = document.createElement('img');
  whiteBishop_1.src = `${wB.imgSrc}`;
  whiteBishop_1.id = 'white-bishop';
  X83.appendChild(whiteBishop_1);
  let whiteBishop_2 = document.createElement('img');
  whiteBishop_2.src = `${wB.imgSrc}`;
  whiteBishop_2.id = 'white-bishop';
  X86.appendChild(whiteBishop_2);

  //   white King
  let whiteKing = document.createElement('img');
  whiteKing.src = `${wKing.imgSrc}`;
  whiteKing.id = 'white-king';
  X84.appendChild(whiteKing);

  //   white Queen
  let whiteQueen = document.createElement('img');
  whiteQueen.src = `${wQ.imgSrc}`;
  whiteQueen.id = 'white-queen';
  X85.appendChild(whiteQueen);

  //   black Pawn
  row2.map((el) => {
    let blackPawn = document.createElement('img');
    blackPawn.src = `${bP.imgSrc}`;
    blackPawn.id = 'black-pawn';
    el.appendChild(blackPawn);
  });

  //   black Rook
  let blackRook_1 = document.createElement('img');
  blackRook_1.src = `${bR.imgSrc}`;
  blackRook_1.id = 'black-rook';
  X11.appendChild(blackRook_1);
  let blackRook_2 = document.createElement('img');
  blackRook_2.src = `${bR.imgSrc}`;
  blackRook_2.id = 'black-rook';
  X18.appendChild(blackRook_2);

  //   black Knight
  let blackKnight_1 = document.createElement('img');
  blackKnight_1.src = `${bK.imgSrc}`;
  blackKnight_1.id = 'black-knight';
  X12.appendChild(blackKnight_1);
  let blackKnight_2 = document.createElement('img');
  blackKnight_2.src = `${bK.imgSrc}`;
  blackKnight_2.id = 'black-knight';
  X17.appendChild(blackKnight_2);

  //   black bishop
  let blackBishop_1 = document.createElement('img');
  blackBishop_1.src = `${bB.imgSrc}`;
  blackBishop_1.id = 'black-bishop';
  X13.appendChild(blackBishop_1);
  let blackBishop_2 = document.createElement('img');
  blackBishop_2.src = `${bB.imgSrc}`;
  blackBishop_2.id = 'black-bishop';
  X16.appendChild(blackBishop_2);

  //   black King
  let blackKing = document.createElement('img');
  blackKing.src = `${bKing.imgSrc}`;
  blackKing.id = 'black-king';
  X14.appendChild(blackKing);

  //   black Queen
  let blackQueen = document.createElement('img');
  blackQueen.src = `${bQ.imgSrc}`;
  blackQueen.id = 'black-king';
  X15.appendChild(blackQueen);
};

let xPosition = 0;
let yPosition = 0;

let targetArr = [];
let positionArr = [];
let newArr = {};
let arrLength = 0;
let target = '';
let number = '';
let targetPosition,
  targetRow,
  targetCol = '';
const getClickPosition = async (e) => {
  xPosition = e.clientX;
  yPosition = e.clientY;
  const data = await piecesMovements(e);
  if (data !== undefined) {
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
    positionArr.forEach((el) => {
      el.classList.add('active');
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

      if (firstNumber % 2 == true) {
        if (SecondNumber % 2 == true) {
          element.target.classList.toggle('clicked-1');
        } else {
          element.target.classList.toggle('clicked-2');
        }
      } else {
        if (SecondNumber % 2 == true) {
          element.target.classList.toggle('clicked-2');
        } else {
          element.target.classList.toggle('clicked-1');
        }
      }
    });
    // check Arr length
    arrLength = targetArr.length;
    if (arrLength > 1) {
      targetArr.shift();
    } else if (arrLength > 0) {
      chessBoard.classList.add('board-opacity');
    } else {
      chessBoard.classList.remove('board-opacity');
    }

    // Target !== Image
  } else {
    if (targetArr.length > 0) {
      target = targetArr[0].target;

      if (positionArr.length !== 0) {
        positionArr.forEach((el) => {
          el.classList.remove('active');
        });

        positionArr = [];
      }

      targetArr = [];
      console.log(target);

      target.className = '';
      chessBoard.className = '';
      targetArr = [];
    }
  }
};
// // get current location row && col
// // if white pieces minus row number => if it is 7 check row 6 && row 5
// //check row6 array col-1 && row 5 col-1

// get first number and second number
const getFirstSecondNumber = (element) => {
  element = element.slice(1);
  let one = String(element).charAt(0);
  let two = String(element).charAt(1);
  let firstNumber = Number(one);
  let SecondNumber = Number(two);
  let numberArr = [];
  numberArr = [firstNumber, SecondNumber];
  return numberArr;
};

// // console.log(getFirstSecondNumber(x46));

let piecesType = '';
// Pieces movements
const piecesMovements = async (e) => {
  // console.log(e.target.parentElement.id);
  let location = e.target.parentElement.id;
  let goRow,
    goCol = [];
  piecesType = e.target.id;
  location = getFirstSecondNumber(location);
  row = location[0];
  col = location[1];
  if (piecesType.length < 4) {
    console.log('there is not chess pieces');
  } else {
    switch (piecesType) {
      case 'white-pawn':
        goRow = [row - 1, row - 2];
        goCol = [col];
        return [goRow, goCol];
        break;
      case 'white-rook':
        console.log(row, col);
        break;
      case 'white-knight':
        console.log(row, col);
        break;
      case 'white-bishop':
        console.log(row, col);
        break;
      case 'white-queen':
        console.log(row, col);
        break;
      case 'white-king':
        console.log(row, col);
        break;
      case 'black-pawn':
        console.log(row, col);
        break;
      case 'black-rook':
        console.log(row, col);
        break;
      case 'black-knight':
        console.log(row, col);
        break;
      case 'black-bishop':
        console.log(row, col);
        break;
      case 'black-queen':
        console.log(row, col);
        break;
      case 'black-king':
        console.log(row, col);
        break;
      default:
        return;
    }
  }
};

document.addEventListener('DOMContentLoaded', setChessPieces);
chessBoard.addEventListener('click', getClickPosition);
