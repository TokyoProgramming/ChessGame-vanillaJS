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
        console.log(data);
        // cell is empty
        if (data.cell.children[0] !== undefined) {
          if (data.cell.lastChild.tagName === 'IMG') {
            if (data.cell.lastChild.id.split('-')[0] === `${getPlayer}`) {
              console.log('1');
              console.log(data.cell.lastChild.id);
              break;
            } else {
              console.log('2');
              console.log(data.cell.lastChild.id);

              newArr.push(data);
              break;
            }
          }
        } else {
          console.log('3');
          newArr.push(data);
        }
      }
    }

    arr = newArr;
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
      // cell is empty
    } else {
      return el;
    }
  });
  return filteredArr;
};

export { movementsCtr };
