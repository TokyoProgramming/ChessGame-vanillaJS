import { piecesMovements } from './movements.js';

const movementsCtr = async (e) => {
  let movements = await piecesMovements(e);
  let piecesType = movements[1];
  let newArr = [];
  let arr = [];

  console.log(piecesType);

  console.log(movements.length);

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
        newArr.push(data);
        if (arr[j].cell.children[0] !== undefined) {
          break;
        }
      }
    }
    // filtering the newArr
    arr = filteringArr(newArr, piecesType);
  }

  // show result
  console.log('result');
  if (arr.length !== 0) {
    arr.forEach((el) => {
      console.log(el.cell);
    });
  } else {
    console.log('empty');
  }
  return arr;
};

// array filtering function
const filteringArr = (arr, piecesType) => {
  let filteredArr = [];
  filteredArr = arr.filter((el) => {
    if (el.cell.children[0] !== undefined) {
      let data = el.cell.children[0].id;
      let piecesColor = data.split('-')[0];
      return piecesColor !== `${piecesType}`;
    } else {
      return el;
    }
  });
  return filteredArr;
};

export { movementsCtr };
