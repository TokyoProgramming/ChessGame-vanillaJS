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

// const main = async (e) => {
//   let positionArr = [];
//   const data = await piecesMovements(e);

//   if (data !== undefined && data[0].length !== 0 && data[1].length !== 0) {

//     let row = data[0];
//     let col = data[1];
//     for (let j = 0; j < row.length; j++) {
//       for (let i = 0; i < col.length; i++) {
//         let targetRow = row[j] - 1;
//         let targetCol = col[i] - 1;
//         let targetPosition = rows[targetRow][targetCol];
//         positionArr.push(targetPosition);
//       }
//     }
//     let positionObj = {
//       id: Math.round(Math.random() * 1000),
//       positionArr,
//     };

//     positionObjArr.push(positionObj);
//     console.log(positionObjArr);

//     positionArr.forEach((el) => {
//       el.classList.add('active');
//       if (el.children.length === 0) {
//         const circleDiv = document.createElement('div');
//         circleDiv.classList.add('circle');
//         el.appendChild(circleDiv);
//       }
//     });
//   }

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
// };
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

const checkMovements = (e) => {
  movementsCtr(e);
  for (let i = 0; i < 0; i++) {
    console.log('hi');
  }
};

// what you need
// current location
// where piece can go
// on the way is there any other pieces ??

document.addEventListener('DOMContentLoaded', setChessPieces);
chessBoard.addEventListener('click', checkMovements);
// chessBoard.addEventListener('click', main);
