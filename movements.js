let row = 0;
let col = 0;
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
let piecesType = '';
// Pieces movements
const piecesMovements = async (e) => {
  let location = e.target.parentElement.id;
  location = getFirstSecondNumber(location);
  let cellsArr = [];
  let cellsObj = {};

  row = location[0];
  col = location[1];

  let goRow,
    goCol = [];
  piecesType = e.target.id;

  // let whiteBlack = piecesType.split('-');
  // whiteBlack = whiteBlack[0];

  // if (example === undefined) {
  //   console.log('undefined');
  // } else {
  //   console.log(example.id);
  //   let str = example.id.split('-');
  //   console.log(str[0]);
  // }

  if (piecesType.length < 4) {
    return;
  } else {
    switch (piecesType) {
      case 'white-pawn':
        if (1 < col && col < 8) {
          if (row === 1) {
            break;
          } else if (row === 2) {
            goRow = [row - 1];
            goCol = [col];
          } else {
            goRow = [row - 1, row - 2];
            goCol = [col];
          }
        } else if (col === 1) {
          if (row === 1) {
            goRow = [];
            goCol = [];
          } else if (row === 2) {
            goRow = [row - 1];
            goCol = [col];
          } else {
            goRow = [row - 1, row - 2];
            goCol = [col];
          }
        } else {
          if (row === 1) {
            goRow = [];
            goCol = [];
          } else if (row === 2) {
            goRow = [row - 1];
            goCol = [col];
          } else {
            goRow = [row - 1, row - 2];
            goCol = [col];
          }
        }
        return [goRow, goCol];
        break;
      case 'white-rook':
        return [goRow, goCol];
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
