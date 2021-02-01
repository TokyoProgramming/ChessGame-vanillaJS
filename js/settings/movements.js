import { rows } from './boardCoordinate.js';
import { logRes } from '../main.js';
import { enPassant } from '../specialMove/pawnEnPassant.js';

let row = 0;
let col = 0;
let movementsArr = [];
let movementsObj = {};

// get first number and second number
const getFirstSecondNumber = (element) => {
  let newElement = element.slice(1);
  let one = String(newElement).charAt(0);
  let two = String(newElement).charAt(1);
  let firstNumber = Number(one);
  let SecondNumber = Number(two);
  let numberArr = [];
  numberArr = [firstNumber, SecondNumber];
  return numberArr;
};

const createMovementsArr = (cell) => {
  if (cell !== undefined) {
    movementsObj = {
      id: Math.round(Math.random() * 1000),
      cell,
    };
    movementsArr.push(movementsObj);
  }
  return movementsArr;
};

let piecesType = '';
let location = '';

// Pieces movements
const piecesMovements = async (e, diagonal = false) => {
  try {
    location = e.target.parentElement.id;
  } catch (error) {
    location = e.parentElement.id;
  }

  location = getFirstSecondNumber(location);
  let nextRow = true;
  row = location[0];
  col = location[1];
  movementsArr = [];
  movementsObj = {};
  let cell = [];

  try {
    piecesType = e.target.id;
  } catch (error) {
    piecesType = e.id;
  }

  let piecesColor = piecesType.split('-')[0];

  if (piecesType.length < 4) {
    return;
  } else {
    switch (piecesType) {
      case 'white-pawn':
        let wPRow = row;
        let wPCol = col;
        let wPArr = [];
        // move pawn from first row
        if (location[0] === 7) {
          // one row up
          try {
            if (diagonal === false) {
              cell = rows[wPRow - 2][wPCol - 1];
              // if cell is empty or number
              if (
                cell.children[0] === undefined ||
                cell.children[0].tagName === 'SPAN'
              ) {
                createMovementsArr(cell);
                // if there is piece
              } else {
                nextRow = false;
              }
            }
          } catch (error) {}
          // check two rows up
          let checkCell = rows[wPRow - 3][wPCol - 1];
          // if it's not empty && piece in it
          if (checkCell.children.length >= 1) {
            if (checkCell.lastChild.tagName === 'IMG') {
              nextRow = false;
            }
          }
          if (diagonal === true) {
            nextRow = false;
          }
          if (nextRow === true) {
            // two rows up
            try {
              cell = rows[wPRow - 3][wPCol - 1];
              createMovementsArr(cell);
            } catch (error) {}
          }
          let wPData1 = movementsArr;
          wPArr.push(wPData1);
          // not in the first row
        } else {
          if (location[0] === 4) {
            let enArr = await enPassant(piecesType, location);
            // console.log(enArr);
            try {
              if (enArr.length !== 0) {
                wPArr = enArr;
              }
            } catch (error) {}
          }

          if (location[0] === 4) {
            console.log(wPArr);
          }

          movementsArr = [];
          // one row up
          try {
            if (diagonal === false) {
              cell = rows[wPRow - 2][wPCol - 1];
              // empty cell
              if (cell.children[0] === undefined) {
                createMovementsArr(cell);
                let wPData = movementsArr;
                wPArr.push(wPData);
                // piece in the cell
              } else if (cell.lastChild.tagName === 'IMG') {
                // number in the cell
              } else {
                createMovementsArr(cell);
                let wPData = movementsArr;
                wPArr.push(wPData);
              }
            }
          } catch (error) {}
        }
        if (location[0] === 4) {
          console.log(wPArr);
        }

        movementsArr = [];
        // check one row up && one col left
        try {
          if (diagonal === false) {
            cell = rows[wPRow - 2][wPCol - 2];
            let checkLeftCell = cell.lastChild.id;
            let checkLeftBP = checkLeftCell.split('-')[0];
            if (checkLeftBP === 'black') {
              createMovementsArr(cell);
            }
          } else if (diagonal === true) {
            cell = rows[wPRow - 2][wPCol - 2];
            createMovementsArr(cell);
          }
        } catch (error) {}
        let wPData2 = movementsArr;
        wPArr.push(wPData2);
        movementsArr = [];
        // check one row up && one col right
        try {
          if (diagonal === false) {
            cell = rows[wPRow - 2][wPCol];
            let checkRightCell = cell.lastChild.id;
            let checkRightBP = checkRightCell.split('-')[0];
            if (checkRightBP === 'black') {
              createMovementsArr(cell);
            }
          } else if (diagonal === true) {
            cell = rows[wPRow - 2][wPCol];
            createMovementsArr(cell);
          }
        } catch (error) {}
        let wPData3 = movementsArr;
        wPArr.push(wPData3);

        return [movementsArr, piecesColor, wPArr, piecesType];
        break;
      case 'black-pawn':
        let bPRow = row;
        let bPCol = col;
        let bPArr = [];
        // first row
        if (location[0] === 2) {
          // one row down
          try {
            if (diagonal === false) {
              cell = rows[bPRow][bPCol - 1];
              if (
                cell.children[0] === undefined ||
                cell.children[0].tagName === 'SPAN'
              ) {
                createMovementsArr(cell);
              } else {
                nextRow = false;
              }
            }
          } catch (error) {}
          let checkCell = rows[bPRow + 1][bPCol - 1];
          if (checkCell.children.length >= 1) {
            if (checkCell.lastChild.tagName === 'IMG') {
              nextRow = false;
            }
          }
          if (diagonal === true) {
            nextRow = false;
          }
          if (nextRow === true) {
            // two rows down
            try {
              cell = rows[bPRow + 1][bPCol - 1];
              createMovementsArr(cell);
            } catch (error) {}
          }
          let bPData1 = movementsArr;
          bPArr.push(bPData1);
        } else {
          console.log(location[0]);
          if (location[0] === 5) {
            let enArr = await enPassant(piecesType, location);
            try {
              if (enArr.length !== 0) {
                bPArr = enArr;
              }
            } catch (error) {}
          }

          movementsArr = [];
          // one row down
          try {
            if (diagonal === false) {
              cell = rows[bPRow][bPCol - 1];
              // empty cell
              if (cell.children[0] === undefined) {
                createMovementsArr(cell);
                let bPData = movementsArr;
                bPArr.push(bPData);
                // piece in the cell
              } else if (cell.lastChild.tagName === 'IMG') {
                // number in the cell
              } else {
                createMovementsArr(cell);
                let bPData = movementsArr;
                bPArr.push(bPData);
              }
            }
          } catch (error) {}
        }

        movementsArr = [];
        // one row down && one col left

        try {
          if (diagonal === false) {
            cell = rows[bPRow][bPCol - 2];
            let checkLeftCell = cell.lastChild.id;
            let checkLeftWP = checkLeftCell.split('-')[0];
            if (checkLeftWP === 'white') {
              createMovementsArr(cell);
            }
          } else if (diagonal === true) {
            cell = rows[bPRow][bPCol - 2];
            createMovementsArr(cell);
          }
        } catch (error) {}
        let bPData2 = movementsArr;
        bPArr.push(bPData2);
        movementsArr = [];
        // one row down && one col right
        try {
          if (diagonal === false) {
            cell = rows[bPRow][bPCol];
            let checkRightCell = cell.lastChild.id;
            let checkRightWP = checkRightCell.split('-')[0];
            if (checkRightWP === 'white') {
              createMovementsArr(cell);
            }
          } else if (diagonal === true) {
            cell = rows[bPRow][bPCol];
            createMovementsArr(cell);
          }
        } catch (error) {}
        let bPData3 = movementsArr;
        bPArr.push(bPData3);

        return [movementsArr, piecesColor, bPArr, piecesType];

      case 'black-rook':
      case 'white-rook':
        let leftRookCol = col;
        let leftRookRow = row;
        while (leftRookCol > 1) {
          cell = rows[leftRookRow - 1][leftRookCol - 2];
          leftRookCol--;
          createMovementsArr(cell);
        }
        let rookData1 = movementsArr;
        let rookArr = [];
        rookArr.push(rookData1);

        movementsArr = [];
        let rightRookCol = col;
        let rightRookRow = row;
        while (rightRookCol < 8) {
          cell = rows[rightRookRow - 1][rightRookCol];
          rightRookCol++;
          createMovementsArr(cell);
        }
        let rookData2 = movementsArr;
        rookArr.push(rookData2);

        movementsArr = [];
        let upRookCol = col;
        let upRookRow = row;
        while (upRookRow > 1) {
          cell = rows[upRookRow - 2][upRookCol - 1];
          upRookRow--;
          createMovementsArr(cell);
        }
        let rookData3 = movementsArr;
        rookArr.push(rookData3);

        movementsArr = [];
        let downRookCol = col;
        let downRookRow = row;
        while (downRookRow < 8) {
          cell = rows[downRookRow][downRookCol - 1];
          downRookRow++;
          createMovementsArr(cell);
        }
        let rookData4 = movementsArr;
        rookArr.push(rookData4);

        return [movementsArr, piecesColor, rookArr, piecesType];

        break;
      case 'black-knight':
      case 'white-knight':
        //   up && left
        try {
          cell = rows[row - 3][col - 2];
          createMovementsArr(cell);
        } catch (error) {}
        // up && right
        try {
          cell = rows[row - 3][col];
          createMovementsArr(cell);
        } catch (error) {}
        //   left && up
        try {
          cell = rows[row - 2][col - 3];
          createMovementsArr(cell);
        } catch (error) {}
        // left && down
        try {
          cell = rows[row][col - 3];
          createMovementsArr(cell);
        } catch (error) {}
        //   down && left
        try {
          cell = rows[row + 1][col - 2];
          createMovementsArr(cell);
        } catch (error) {}
        // down && right
        try {
          cell = rows[row + 1][col];
          createMovementsArr(cell);
        } catch (error) {}
        //   right && up
        try {
          cell = rows[row - 2][col + 1];
          createMovementsArr(cell);
        } catch (error) {}
        // right && down
        try {
          cell = rows[row][col + 1];
          createMovementsArr(cell);
        } catch (error) {}
        return [movementsArr, piecesColor, piecesType];
        break;
      case 'black-bishop':
      case 'white-bishop':
        // up && left
        let bUpLeftRow = row;
        let bUpLeftCol = col;
        let bishopArr = [];

        while (bUpLeftRow > 1 && bUpLeftCol > 1) {
          bUpLeftRow = bUpLeftRow - 1;
          bUpLeftCol = bUpLeftCol - 1;
          cell = rows[bUpLeftRow - 1][bUpLeftCol - 1];
          createMovementsArr(cell);
        }
        let bishopData1 = movementsArr;
        bishopArr.push(bishopData1);

        // up && right
        movementsArr = [];
        let bUpRightRow = row;
        let bUpRightCol = col;

        while (bUpRightRow > 1 && bUpRightCol < 8) {
          bUpRightRow = bUpRightRow - 1;
          bUpRightCol = bUpRightCol + 1;
          cell = rows[bUpRightRow - 1][bUpRightCol - 1];
          createMovementsArr(cell);
        }
        let bishopData2 = movementsArr;
        bishopArr.push(bishopData2);

        // down && left
        movementsArr = [];
        let bDownLeftRow = row;
        let bDownLeftCol = col;
        while (bDownLeftRow < 8 && bDownLeftCol > 1) {
          bDownLeftRow = bDownLeftRow + 1;
          bDownLeftCol = bDownLeftCol - 1;
          cell = rows[bDownLeftRow - 1][bDownLeftCol - 1];
          createMovementsArr(cell);
        }
        let bishopData3 = movementsArr;
        bishopArr.push(bishopData3);

        // down && right
        movementsArr = [];
        let bDownRightRow = row;
        let bDownRightCol = col;
        while (bDownRightRow < 8 && bDownRightCol < 8) {
          bDownRightRow = bDownRightRow + 1;
          bDownRightCol = bDownRightCol + 1;
          cell = rows[bDownRightRow - 1][bDownRightCol - 1];
          createMovementsArr(cell);
        }
        let bishopData4 = movementsArr;
        bishopArr.push(bishopData4);
        return [movementsArr, piecesColor, bishopArr, piecesType];
        break;
      case 'black-queen':
      case 'white-queen':
        // up && left
        let qUpLeftRow = row;
        let qUpLeftCol = col;
        let queenArr = [];

        while (qUpLeftRow > 1 && qUpLeftCol > 1) {
          qUpLeftRow = qUpLeftRow - 1;
          qUpLeftCol = qUpLeftCol - 1;
          cell = rows[qUpLeftRow - 1][qUpLeftCol - 1];
          createMovementsArr(cell);
        }
        let queenData1 = movementsArr;
        queenArr.push(queenData1);

        // up && right
        let qUpRightRow = row;
        let qUpRightCol = col;
        movementsArr = [];
        while (qUpRightRow > 1 && qUpRightCol < 8) {
          qUpRightRow = qUpRightRow - 1;
          qUpRightCol = qUpRightCol + 1;
          cell = rows[qUpRightRow - 1][qUpRightCol - 1];
          createMovementsArr(cell);
        }
        let queenData2 = movementsArr;
        queenArr.push(queenData2);

        // down && left
        let qDownLeftRow = row;
        let qDownLeftCol = col;
        movementsArr = [];

        while (qDownLeftRow < 8 && qDownLeftCol > 1) {
          qDownLeftRow = qDownLeftRow + 1;
          qDownLeftCol = qDownLeftCol - 1;
          cell = rows[qDownLeftRow - 1][qDownLeftCol - 1];
          createMovementsArr(cell);
        }
        let queenData3 = movementsArr;
        queenArr.push(queenData3);

        // down && right
        let qDownRightRow = row;
        let qDownRightCol = col;
        movementsArr = [];

        while (qDownRightRow < 8 && qDownRightCol < 8) {
          qDownRightRow = qDownRightRow + 1;
          qDownRightCol = qDownRightCol + 1;
          cell = rows[qDownRightRow - 1][qDownRightCol - 1];
          createMovementsArr(cell);
        }
        let queenData4 = movementsArr;
        queenArr.push(queenData4);

        let leftQueenCol = col;
        let leftQueenRow = row;
        movementsArr = [];

        while (leftQueenCol > 1) {
          cell = rows[leftQueenRow - 1][leftQueenCol - 2];
          createMovementsArr(cell);
          leftQueenCol--;
        }
        let queenData5 = movementsArr;
        queenArr.push(queenData5);

        let rightQueenCol = col;
        let rightQueenRow = row;
        movementsArr = [];

        while (rightQueenCol < 8) {
          cell = rows[rightQueenRow - 1][rightQueenCol];
          createMovementsArr(cell);
          rightQueenCol++;
        }
        let queenData6 = movementsArr;
        queenArr.push(queenData6);

        let upQueenCol = col;
        let upQueenRow = row;
        movementsArr = [];

        while (upQueenRow > 1) {
          cell = rows[upQueenRow - 2][upQueenCol - 1];
          createMovementsArr(cell);
          upQueenRow--;
        }
        let queenData7 = movementsArr;
        queenArr.push(queenData7);

        let downQueenCol = col;
        let downQueenRow = row;
        movementsArr = [];

        while (downQueenRow < 8) {
          cell = rows[downQueenRow][downQueenCol - 1];
          createMovementsArr(cell);
          downQueenRow++;
        }
        let queenData8 = movementsArr;
        queenArr.push(queenData8);
        return [movementsArr, piecesColor, queenArr, piecesType];

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
          //   left
          cell = rows[row - 1][col - 2];
          createMovementsArr(cell);
        } catch (error) {}
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

        return [movementsArr, piecesColor, piecesType];
        break;

      default:
        return piecesType;
    }
  }
};

export { piecesMovements, getFirstSecondNumber, createMovementsArr };
