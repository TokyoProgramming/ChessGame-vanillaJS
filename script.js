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
  row2,
  row7,
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
} from './piecesInfo.js';

const chessBoard = document.querySelector('.chess-board');

const setChessPieces = () => {
  // white Pawn
  row7.map((el) => {
    let whitePawn = document.createElement('img');
    whitePawn.src = `${wP.imgSrc}`;
    el.appendChild(whitePawn);
  });

  //   white Rook
  let whiteRook_1 = document.createElement('img');
  whiteRook_1.src = `${wR.imgSrc}`;
  X81.appendChild(whiteRook_1);
  let whiteRook_2 = document.createElement('img');
  whiteRook_2.src = `${wR.imgSrc}`;
  X88.appendChild(whiteRook_2);

  //   white Knight
  let whiteKnight_1 = document.createElement('img');
  whiteKnight_1.src = `${wK.imgSrc}`;
  X82.appendChild(whiteKnight_1);
  let whiteKnight_2 = document.createElement('img');
  whiteKnight_2.src = `${wK.imgSrc}`;
  X87.appendChild(whiteKnight_2);

  //   white bishop
  let whiteBishop_1 = document.createElement('img');
  whiteBishop_1.src = `${wB.imgSrc}`;
  X83.appendChild(whiteBishop_1);
  let whiteBishop_2 = document.createElement('img');
  whiteBishop_2.src = `${wB.imgSrc}`;
  X86.appendChild(whiteBishop_2);

  //   white King
  let whiteKing = document.createElement('img');
  whiteKing.src = `${wKing.imgSrc}`;
  X84.appendChild(whiteKing);

  //   white Queen
  let whiteQueen = document.createElement('img');
  whiteQueen.src = `${wQ.imgSrc}`;
  X85.appendChild(whiteQueen);

  //   black Pawn
  row2.map((el) => {
    let blackPawn = document.createElement('img');
    blackPawn.src = `${bP.imgSrc}`;
    el.appendChild(blackPawn);
  });

  //   black Rook
  let blackRook_1 = document.createElement('img');
  blackRook_1.src = `${bR.imgSrc}`;
  X11.appendChild(blackRook_1);
  let blackRook_2 = document.createElement('img');
  blackRook_2.src = `${bR.imgSrc}`;
  X18.appendChild(blackRook_2);

  //   black Knight
  let blackKnight_1 = document.createElement('img');
  blackKnight_1.src = `${bK.imgSrc}`;
  X12.appendChild(blackKnight_1);
  let blackKnight_2 = document.createElement('img');
  blackKnight_2.src = `${bK.imgSrc}`;
  X17.appendChild(blackKnight_2);

  //   black bishop
  let blackBishop_1 = document.createElement('img');
  blackBishop_1.src = `${bB.imgSrc}`;
  X13.appendChild(blackBishop_1);
  let blackBishop_2 = document.createElement('img');
  blackBishop_2.src = `${bB.imgSrc}`;
  X16.appendChild(blackBishop_2);

  //   black King
  let blackKing = document.createElement('img');
  blackKing.src = `${bKing.imgSrc}`;
  X14.appendChild(blackKing);

  //   black Queen
  let blackQueen = document.createElement('img');
  blackQueen.src = `${bQ.imgSrc}`;
  X15.appendChild(blackQueen);
};

let xPosition = 0;
let yPosition = 0;
let chessBoardDiv = '';
let targetArr = [];
let newArr = {};
let arrLength = 0;
let target = '';
let number = '';

const getClickPosition = (e) => {
  xPosition = e.clientX;
  yPosition = e.clientY;

  // target == Image
  if (e.target.tagName === 'IMG') {
    target = e.target;
    number = target.parentElement.id.slice(1);

    // targetArr !== empty
    if (targetArr.length !== 0) {
      if (targetArr[0].arrNumber === number) {
        target.classList.remove('clicked-1') ||
          target.classList.remove('clicked-2');
        chessBoard.classList.remove('board-opacity');
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
      chessBoardDiv = element.target.parentElement.parentElement.parentElement;

      chessBoardDiv.classList.toggle('board-opacity');

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
      console.log(targetArr[0].target);
      target = targetArr[0].target;
      target.classList.remove('clicked-1') ||
        target.classList.remove('clicked-2');
      chessBoard.classList.remove('board-opacity');
      targetArr = [];
    }
  }
};

document.addEventListener('DOMContentLoaded', setChessPieces);
chessBoard.addEventListener('click', getClickPosition);
