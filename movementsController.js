import { piecesMovements } from './movements.js';

const movementsCtr = async (e, getPlayer) => {
  let movements = await piecesMovements(e);
  let piecesType = movements[1];
  let newArr = [];
  let arr = [];

  // King && Knight movements
  if (movements.length === 2) {
    let movementsArr = movements[0];
    // filtering the movementsArr
    arr = filteringArr(movementsArr, piecesType);

    // Rook, Bishop, Queen, Pawn Movements
  } else if (movements.length === 3) {
    let movementsLoopArr = movements[2];
    for (let i = 0; i < movementsLoopArr.length; i++) {
      let arr = movementsLoopArr[i];

      for (let j = 0; j < arr.length; j++) {
        let data = arr[j];
        // cell is empty
        if (data.cell.children[0] !== undefined) {
          if (data.cell.lastChild.tagName === 'IMG') {
            break;
            let pieceColor = data.cell.lastChild.id.split('-')[0];
            if (pieceColor === `${getPlayer}`) {
              break;
            }
          }
        }
        newArr.push(data);
      }
    }
    // filtering the newArr
    // arr = filteringArr(newArr, piecesType);
    arr = newArr;
    console.log(arr);
  }

  return arr;
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
      // cell is emtpy
    } else {
      return el;
    }
  });
  return filteredArr;
};

export { movementsCtr };
