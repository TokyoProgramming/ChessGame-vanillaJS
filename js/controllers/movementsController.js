import { piecesMovements } from '../settings/movements.js';

const movementsCtr = async (e, getPlayer, props) => {
  const movements = await piecesMovements(e, props);
  // piece color
  let piecesColor = movements[1];
  // piece Type
  let piecesType = movements[movements.length - 1];

  let newArr = [];
  let arr = [];

  switch (piecesType) {
    case 'white-king':
    case 'white-knight':
    case 'black-king':
    case 'black-knight':
      let movementsArr = movements[0];
      console.log(movementsArr);
      // filtering the movementsArr
      arr = filteringArr(movementsArr, piecesColor);
      console.log(arr);

      return [arr, piecesType];
      break;
    case 'white-rook':
    case 'white-bishop':
    case 'white-queen':
    case 'white-pawn':
    case 'black-rook':
    case 'black-bishop':
    case 'black-queen':
    case 'black-pawn':
      let movementsLoopArr = movements[2];
      // arr for checkmate
      let checkmateArr = [];
      let checkmateObj = {};

      for (let i = 0; i < movementsLoopArr.length; i++) {
        let arr = movementsLoopArr[i];

        for (let j = 0; j < arr.length; j++) {
          let data = arr[j];
          try {
            // cell is not empty
            if (data.cell.children[0] !== undefined) {
              // in the cell there is a white or black piece
              if (data.cell.lastChild.tagName === 'IMG') {
                // if the piece is player's pice => break;
                if (data.cell.lastChild.id.split('-')[0] === `${getPlayer}`) {
                  break;
                  // if it's opponent piece => add the cell & break;
                } else if (
                  data.cell.lastChild.id.split('-')[0] !== `${getPlayer}`
                ) {
                  checkmateObj = {
                    i,
                    data,
                  };
                  checkmateArr.push(checkmateObj);
                  newArr.push(data);
                  break;
                }
                // if there is a number or numbers in the cell
              } else {
                checkmateObj = {
                  i,
                  data,
                };
                checkmateArr.push(checkmateObj);
                newArr.push(data);
              }
              // cell is empty
            } else {
              checkmateObj = {
                i,
                data,
              };
              checkmateArr.push(checkmateObj);
              newArr.push(data);
            }
          } catch (error) {}
        }
      }

      // console.log(checkmateArr);

      arr = newArr;
      return [arr, piecesType, checkmateArr];
      break;
    default:
      break;
  }
};

// array filtering function
const filteringArr = (arr, piecesType) => {
  let filteredArr = [];
  filteredArr = arr.filter((el) => {
    let data = el.cell;

    // the cell is not empty
    if (data.children[0] !== undefined) {
      let idData = data.lastChild.id;
      let piecesColor = idData.split('-')[0];
      return piecesColor !== `${piecesType}`;
      // cell is empty
    } else {
      return el;
    }
  });
  return filteredArr;
};

export { movementsCtr };
