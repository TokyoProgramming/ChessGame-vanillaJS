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
  if (cell !== undefined) {
    console.log(cell);
    movementsObj = {
      id: Math.round(Math.random() * 1000),
      cell,
    };
    movementsArr.push(movementsObj);
  }

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
  console.log(piecesType);

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
      case 'black-rook':
      case 'white-rook':
        console.log('white-rook');
        console.log('left');
        let leftRookCol = col;
        let leftRookRow = row;
        while (leftRookCol > 1) {
          cell = rows[leftRookRow - 1][leftRookCol - 2];
          console.log(cell);
          leftRookCol--;
        }
        console.log('right');
        let rightRookCol = col;
        let rightRookRow = row;
        while (rightRookCol < 8) {
          cell = rows[rightRookRow - 1][rightRookCol];
          console.log(cell);
          rightRookCol++;
        }
        console.log('up');
        let upRookCol = col;
        let upRookRow = row;
        while (upRookRow > 1) {
          cell = rows[upRookRow - 2][upRookCol - 1];
          console.log(cell);
          upRookRow--;
        }
        console.log('down');
        let downRookCol = col;
        let downRookRow = row;
        while (downRookRow < 8) {
          cell = rows[downRookRow][downRookCol - 1];
          console.log(cell);
          downRookRow++;
        }

        break;
      case 'black-knight':
      case 'white-knight':
        //   up && left
        try {
          cell = rows[row - 3][col - 2];
          createMovementsArr(cell);
        } catch (error) {
          console.log('error');
        }
        // up && right
        try {
          cell = rows[row - 3][col];
          createMovementsArr(cell);
        } catch (error) {
          console.log('error');
        }
        //   left && up
        try {
          cell = rows[row - 2][col - 3];
          createMovementsArr(cell);
        } catch (error) {
          console.log('error');
        }
        // left && down
        try {
          cell = rows[row][col - 3];
          createMovementsArr(cell);
        } catch (error) {
          console.log('error');
        }
        //   down && left
        try {
          cell = rows[row + 1][col - 2];
          createMovementsArr(cell);
        } catch (error) {
          console.log('error');
        }
        // down && right
        try {
          cell = rows[row + 1][col];
          createMovementsArr(cell);
        } catch (error) {
          console.log('error');
        }
        //   right && up
        try {
          cell = rows[row - 2][col + 1];
          createMovementsArr(cell);
        } catch (error) {
          console.log('error');
        }
        // right && down
        try {
          cell = rows[row][col + 1];
          createMovementsArr(cell);
        } catch (error) {
          console.log('error');
        }
        break;
      case 'black-bishop':
      case 'white-bishop':
        // up && left
        let bUpLeftRow = row;
        let bUpLeftCol = col;

        while (bUpLeftRow > 1 && bUpLeftCol > 1) {
          bUpLeftRow = bUpLeftRow - 1;
          bUpLeftCol = bUpLeftCol - 1;
          cell = rows[bUpLeftRow - 1][bUpLeftCol - 1];
          console.log(cell);
        }
        // up && right
        let bUpRightRow = row;
        let bUpRightCol = col;

        while (bUpRightRow > 1 && bUpRightCol < 8) {
          bUpRightRow = bUpRightRow - 1;
          bUpRightCol = bUpRightCol + 1;
          cell = rows[bUpRightRow - 1][bUpRightCol - 1];
          console.log(cell);
        }

        // down && left
        let bDownLeftRow = row;
        let bDownLeftCol = col;
        while (bDownLeftRow < 8 && bDownLeftCol > 1) {
          bDownLeftRow = bDownLeftRow + 1;
          bDownLeftCol = bDownLeftCol - 1;
          cell = rows[bDownLeftRow - 1][bDownLeftCol - 1];
          console.log(cell);
        }

        // down && right
        let bDownRightRow = row;
        let bDownRightCol = col;
        while (bDownRightRow < 8 && bDownRightCol < 8) {
          bDownRightRow = bDownRightRow + 1;
          bDownRightCol = bDownRightCol + 1;
          cell = rows[bDownRightRow - 1][bDownRightCol - 1];
          console.log(cell);
        }
        break;
      case 'black-queen':
      case 'white-queen':
        // up && left
        let qUpLeftRow = row;
        let qUpLeftCol = col;

        while (qUpLeftRow > 1 && qUpLeftCol > 1) {
          qUpLeftRow = qUpLeftRow - 1;
          qUpLeftCol = qUpLeftCol - 1;
          cell = rows[qUpLeftRow - 1][qUpLeftCol - 1];
          console.log(cell);
        }
        // up && right
        let qUpRightRow = row;
        let qUpRightCol = col;

        while (qUpRightRow > 1 && qUpRightCol < 8) {
          qUpRightRow = qUpRightRow - 1;
          qUpRightCol = qUpRightCol + 1;
          cell = rows[qUpRightRow - 1][qUpRightCol - 1];
          console.log(cell);
        }

        // down && left
        let qDownLeftRow = row;
        let qDownLeftCol = col;
        while (qDownLeftRow < 8 && qDownLeftCol > 1) {
          qDownLeftRow = qDownLeftRow + 1;
          qDownLeftCol = qDownLeftCol - 1;
          cell = rows[qDownLeftRow - 1][qDownLeftCol - 1];
          console.log(cell);
        }

        // down && right
        let qDownRightRow = row;
        let qDownRightCol = col;
        while (qDownRightRow < 8 && qDownRightCol < 8) {
          qDownRightRow = qDownRightRow + 1;
          qDownRightCol = qDownRightCol + 1;
          cell = rows[qDownRightRow - 1][qDownRightCol - 1];
          console.log(cell);
        }

        console.log('left');
        let leftQueenCol = col;
        let leftQueenRow = row;
        while (leftQueenCol > 1) {
          cell = rows[leftQueenRow - 1][leftQueenCol - 2];
          console.log(cell);
          leftQueenCol--;
        }
        console.log('right');
        let rightQueenCol = col;
        let rightQueenRow = row;
        while (rightQueenCol < 8) {
          cell = rows[rightQueenRow - 1][rightQueenCol];
          console.log(cell);
          rightQueenCol++;
        }
        console.log('up');
        let upQueenCol = col;
        let upQueenRow = row;
        while (upQueenRow > 1) {
          cell = rows[upQueenRow - 2][upQueenCol - 1];
          console.log(cell);
          upQueenRow--;
        }
        console.log('down');
        let downQueenCol = col;
        let downQueenRow = row;
        while (downQueenRow < 8) {
          cell = rows[downQueenRow][downQueenCol - 1];
          console.log(cell);
          downQueenRow++;
        }
        break;
      case 'black-king':
      case 'white-king':
        // if (row > 1 && row < 8 && col > 1 && col < 8) {
        //   // up and left
        //   console.log(rows[row - 2][col - 2]);
        //   //   up
        //   console.log(rows[row - 2][col - 1]);
        //   //   up && right
        //   console.log(rows[row - 2][col]);
        //   //   right row
        //   console.log(rows[row - 1][col]);
        //   //   down && right
        //   console.log(rows[row][col]);
        //   //   down
        //   console.log(rows[row][col - 1]);
        //   //   down && left
        //   console.log(rows[row][col - 2]);
        //   //   left
        //   console.log(rows[row - 1][col - 2]);
        //   //   X11
        // } else if (row === 1 && col === 1) {
        //   console.log(rows[row - 1][col]);
        //   console.log(rows[row][col]);
        //   console.log(rows[row][col - 1]);
        //   //   X18
        // } else if (row === 1 && col === 8) {
        //   console.log(rows[row][col - 1]);
        //   console.log(rows[row][col - 2]);
        //   console.log(rows[row - 1][col - 2]);
        //   //   X88
        // } else if (row === 8 && col === 8) {
        //   console.log(rows[row - 1][col - 2]);
        //   console.log(rows[row - 2][col - 2]);
        //   console.log(rows[row - 2][col - 1]);
        //   //   X81
        // } else if (row === 8 && col === 1) {
        //   console.log(rows[row - 2][col - 1]);
        //   console.log(rows[row - 2][col]);
        //   console.log(rows[row - 1][col]);
        // } else if (col === 1 && row !== 1 && row !== 8) {
        //   console.log(rows[row - 2][col - 1]);
        //   console.log(rows[row - 2][col]);
        //   console.log(rows[row - 1][col]);
        //   console.log(rows[row][col]);
        //   console.log(rows[row][col - 1]);
        // } else if (col === 8 && row !== 1 && row !== 8) {
        //   console.log(rows[row][col - 1]);
        //   console.log(rows[row][col - 2]);
        //   console.log(rows[row - 1][col - 2]);
        //   console.log(rows[row - 2][col - 2]);
        //   console.log(rows[row - 2][col - 1]);
        // } else if (row === 8 && col !== 1 && col !== 8) {
        //   console.log(rows[row - 1][col - 2]);
        //   console.log(rows[row - 2][col - 2]);
        //   console.log(rows[row - 2][col - 1]);
        //   console.log(rows[row - 2][col]);
        //   console.log(rows[row - 1][col]);
        // } else if (row === 1 && col !== 1 && col !== 8) {
        //   console.log(rows[row - 1][col]);
        //   console.log(rows[row][col]);
        //   console.log(rows[row][col - 1]);
        //   console.log(rows[row][col - 2]);
        //   console.log(rows[row - 1][col - 2]);
        // }
        try {
          // up and left
          cell = rows[row - 2][col - 2];
          createMovementsArr(cell);
        } catch (error) {}
        try {
          //   up
          cell = rows[row - 2][col - 1];
          createMovementsArr(cell);
        } catch (error) {}
        try {
          //   up && right
          cell = rows[row - 2][col];
          createMovementsArr(cell);
        } catch (error) {}
        try {
          //   right row
          cell = rows[row - 1][col];
          createMovementsArr(cell);
        } catch (error) {}
        try {
          //   down && right
          cell = rows[row][col];
          createMovementsArr(cell);
        } catch (error) {}
        try {
          //   down
          cell = rows[row][col - 1];
          createMovementsArr(cell);
        } catch (error) {}
        try {
          //   down && left
          cell = rows[row][col - 2];
          createMovementsArr(cell);
        } catch (error) {}
        try {
          //   left
          cell = rows[row - 1][col - 2];
          createMovementsArr(cell);
        } catch (error) {}

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

        return [goRow, goCol];
        break;

      default:
        return;
    }
  }
};

export { piecesMovements };
