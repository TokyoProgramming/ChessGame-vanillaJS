import { rows } from './boardCoordinate.js';
let row = 0;
let col = 0;
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

// create MovementsArr
const createMovementsArr = (cell) => {
  if (cell !== undefined) {
    // console.log(cell);
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
  let cell = [];
  piecesType = e.target.id;
  let piecesColor = piecesType.split('-')[0];

  if (piecesType.length < 4) {
    return;
  } else {
    switch (piecesType) {
      case 'white-pawn':
        let wPRow = row;
        let wPCol = col;
        // one row up
        try {
          cell = rows[wPRow - 2][wPCol - 1];
          console.log(cell);
        } catch (error) {}
        // two rows up
        try {
          cell = rows[wPRow - 3][wPCol - 1];
          console.log(cell);
        } catch (error) {}

        try {
          cell = rows[wPRow - 2][wPCol - 2];
          let checkLeftCell = cell.children[0].id;
          let checkLeftBP = checkLeftCell.split('-')[0];
          if (checkLeftBP === 'black') {
            console.log('left-black');
            console.log(cell);
          }
        } catch (error) {}

        try {
          cell = rows[wPRow - 2][wPCol];
          let checkRightCell = cell.children[0].id;
          let checkRightBP = checkRightCell.split('-')[0];
          if (checkRightBP === 'black') {
            console.log('right-black');
            console.log(cell);
          }
        } catch (error) {}

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
        return [movementsArr, piecesColor];
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
        return [movementsArr, piecesColor];

        break;
      case 'black-pawn':
        let bPRow = row;
        let bPCol = col;
        // one row up
        try {
          cell = rows[bPRow][bPCol - 1];
          console.log(cell);
        } catch (error) {}
        // two rows up
        try {
          cell = rows[bPRow + 1][bPCol - 1];
          console.log(cell);
        } catch (error) {}

        try {
          cell = rows[bPRow][bPCol - 2];
          let checkLeftCell = cell.children[0].id;
          let checkLeftWP = checkLeftCell.split('-')[0];
          if (checkLeftWP === 'white') {
            console.log('left-white');
            console.log(cell);
          }
        } catch (error) {}

        try {
          cell = rows[bPRow][bPCol];
          let checkRightCell = cell.children[0].id;
          let checkRightWP = checkRightCell.split('-')[0];
          if (checkRightWP === 'white') {
            console.log('right-white');
            console.log(cell);
          }
        } catch (error) {}

      default:
        return;
    }
  }
};

export { piecesMovements };
