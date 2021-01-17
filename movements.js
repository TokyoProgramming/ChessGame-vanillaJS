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
  col1,
  col2,
  col3,
  col4,
  col5,
  col6,
  col7,
  col8,
  cols,
} from './boardCoordinate.js';
let row = 0;
let col = 0;
let rowNum = 0;
let colNum = 0;
let movementsArr = [];
let movementsObj = {};

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

// pawn Diagonally Movement
const pawnDiagonalMove = (row, col) => {
  if (col === 8) {
    let upperRRow = row - 1;
    let upperLCol = col - 1;
    return { upperRRow, upperLCol };
  } else if (col === 1) {
    let upperRRow = row - 1;
    let upperLCol = col + 1;
    return { upperRRow, upperLCol };
  } else if (1 < col && col < 8) {
    let upperRRow = row - 1;
    let upperLCol = col - 1;
    return { upperRRow, upperLCol };
  }

  let target = rows[upperRRow - 1][upperLCol - 1];
  if (target.childNodes[0] === undefined) {
    return;
  } else {
    let opponentId = target.children[0].id;
    let opponentColor = opponentId.split('-')[0];
    return opponentColor;
  }
};

// create MovementsArr
const createMovementsArr = (cell) => {
  movementsObj = {
    id: Math.round(Math.random() * 1000),
    cell,
  };
  movementsArr.push(movementsObj);
  return movementsArr;
};

let piecesType = '';
// Pieces movements
const piecesMovements = async (e) => {
  let location = e.target.parentElement.id;
  location = getFirstSecondNumber(location);

  row = location[0];
  col = location[1];

  movementsArr = [];
  movementsObj = {};

  let goRow,
    goCol = [];
  let cell = [];
  piecesType = e.target.id;

  if (piecesType.length < 4) {
    return;
  } else {
    switch (piecesType) {
      case 'white-pawn':
        let pawnColor = pawnDiagonalMove(row, col);
        if (1 < col && col < 8) {
          if (row === 1) {
            break;
          } else if (row === 2) {
            cell = [row - 1, col];
            createMovementsArr(cell);
          } else {
            cell = [row - 1, col];
            createMovementsArr(cell);
            cell = [row - 2, col];
            createMovementsArr(cell);
          }
        } else if (col === 1) {
          if (row === 1) {
            break;
          } else if (row === 2) {
            if (pawnColor !== 'undefined' && pawnColor === 'black') {
              cell = [row - 1, col];
              createMovementsArr(cell);
              cell = [row - 1, col + 1];
              createMovementsArr(cell);
            } else {
              cell = [row - 1, col];
              createMovementsArr(cell);
            }
          } else {
            if (pawnColor !== 'undefined' && pawnColor === 'black') {
              cell = [row - 1, col];
              createMovementsArr(cell);
              cell = [row - 2, col];
              createMovementsArr(cell);
            } else {
              cell = [row - 1, col];
              createMovementsArr(cell);
              cell = [row - 2, col];
              createMovementsArr(cell);
            }
          }
        } else if (col === 8) {
          if (row === 1) {
            break;
          } else if (row === 2) {
            if (pawnColor !== 'undefined' && pawnColor === 'black') {
              cell = [row - 1, col];
              createMovementsArr(cell);
              cell = [row - 1, col - 1];
              createMovementsArr(cell);
            } else {
              cell = [row - 1, col];
              createMovementsArr(cell);
            }
          } else {
            if (pawnColor !== 'undefined' && pawnColor === 'black') {
              cell = [row - 1, col];
              createMovementsArr(cell);
              cell = [row - 2, col];
              createMovementsArr(cell);
            } else {
              cell = [row - 1, col];
              createMovementsArr(cell);
              cell = [row - 2, col];
              createMovementsArr(cell);
            }
          }
        } else {
        }
        return movementsArr;

        break;
      case 'white-rook':
        console.log('left');
        rowNum = rows[row - 1];
        colNum = cols[col - 1];
        for (let i = 0; i < col - 1; i++) {
          cell = rowNum[i];
          console.log(cell);
        }
        console.log('right');
        for (let j = col; j < 8; j++) {
          cell = rowNum[j];
          console.log(cell);
        }
        console.log('up');
        for (let k = 0; k < row - 1; k++) {
          cell = colNum[k];
          console.log(cell);
        }
        console.log('back');
        for (let l = row; l < 8; l++) {
          cell = colNum[l];
          console.log(cell);
        }
        break;
      case 'white-knight':
        let wKnightLRRow = [row + 1, row - 1];
        let wKnightLeftCol = [col - 2];
        let wKnightRightCol = [col + 2];
        let wKnightForwardRow = [row - 2];
        let wKnightBackRow = [row + 2];
        let wKnightFBCol = [col + 1, col - 1];

        if (2 < col && col < 7 && 2 < row && row < 7) {
          // go ahead
          cellsObj = {
            goRow: wKnightForwardRow,
            goCol: wKnightFBCol,
          };
          cellsArr.push(cellsObj);
          // go to right
          cellsObj = {
            goRow: wKnightLRRow,
            goCol: wKnightRightCol,
          };
          cellsArr.push(cellsObj);
          // go to left
          cellsObj = {
            goRow: wKnightLRRow,
            goCol: wKnightLeftCol,
          };
          cellsArr.push(cellsObj);
          // go back
          cellsObj = {
            goRow: wKnightBackRow,
            goCol: wKnightFBCol,
          };
          cellsArr.push(cellsObj);
          break;
        } else if (row === 8) {
          goRow = [row - 2];
          goCol = [col - 1, col + 1];
        } else if (col === 1 && row > 2 && row < 7) {
          // go ahead
          goCol = [col + 1];
          cellsObj = {
            goRow: wKnightForwardRow,
            goCol,
          };
          cellsArr.push(cellsObj);
          // go back
          goRow = [row + 2];
          goCol = [col + 1];
          cellsObj = {
            goRow,
            goCol,
          };
          cellsArr.push(cellsObj);
          // go to right
          goRow = [row + 1, row - 1];
          goCol = [col + 2];
          cellsObj = {
            goRow,
            goCol,
          };
          cellsArr.push(cellsObj);
          break;
        } else if (col === 8 && row > 2 && row < 7) {
          // go ahead
          goRow = [row - 2];
          goCol = [col - 1];
          cellsObj = {
            goRow,
            goCol,
          };
          cellsArr.push(cellsObj);
          // go back
          goRow = [row + 2];
          goCol = [col - 1];
          cellsObj = {
            goRow,
            goCol,
          };
          cellsArr.push(cellsObj);
          // go to right
          goRow = [row + 1, row - 1];
          goCol = [col - 2];
          cellsObj = {
            goRow,
            goCol,
          };
          cellsArr.push(cellsObj);
        }
        return [goRow, goCol];
        break;
      case 'white-bishop':
        let num = '';

        if (row < col) {
          num = row;
        } else {
          num = col;
        }
        // up && left
        let upLeftRow = row;
        let upLeftCol = col;

        while (upLeftRow > 1 && upLeftCol > 1) {
          upLeftRow = upLeftRow - 1;
          upLeftCol = upLeftCol - 1;
          cell = rows[upLeftRow - 1][upLeftCol - 1];
          console.log(cell);
        }
        // up && right
        let upRightRow = row;
        let upRightCol = col;

        while (upRightRow > 1 && upRightCol < 8) {
          upRightRow = upRightRow - 1;
          upRightCol = upRightCol + 1;
          cell = rows[upRightRow - 1][upRightCol - 1];
          console.log(cell);
        }

        // down && left
        let downLeftRow = row;
        let downLeftCol = col;
        while (downLeftRow < 8 && downLeftCol > 1) {
          downLeftRow = downLeftRow + 1;
          downLeftCol = downLeftCol - 1;
          cell = rows[downLeftRow - 1][downLeftCol - 1];
          console.log(cell);
        }

        // down && right
        let downRightRow = row;
        let downRightCol = col;
        while (downRightRow < 8 && downRightCol < 8) {
          downRightRow = downRightRow + 1;
          downRightCol = downRightCol + 1;
          cell = rows[downRightRow - 1][downRightCol - 1];
          console.log(cell);
        }

        return [goRow, goCol];
        break;
      case 'white-queen':
        return [goRow, goCol];
        break;
      case 'white-king':
        return [goRow, goCol];
        break;
      case 'black-pawn':
        if (row === 8) {
          console.log('you can not go ahead');
        } else if (row === 7) {
          goRow = [row + 1];
          goCol = [col];
        } else {
          goRow = [row + 1, row + 2];
          goCol = [col];
        }
        return [goRow, goCol];
        break;
      case 'black-rook':
        return [goRow, goCol];
        break;
      case 'black-knight':
        return [goRow, goCol];
        break;
      case 'black-bishop':
        return [goRow, goCol];
        break;
      case 'black-queen':
        return [goRow, goCol];
        break;
      case 'black-king':
        return [goRow, goCol];
        break;
      default:
        return;
    }
  }
};

export { piecesMovements };
