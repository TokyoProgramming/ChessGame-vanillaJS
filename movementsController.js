import { piecesMovements } from './movements.js';

const movementsCtr = async (e) => {
  let movements = await piecesMovements(e);
  let filteredArr = [];
  let piecesType = movements[1];
  let newArr = [];

  console.log(piecesType);

  // King && Knight movements
  if (movements.length === 2) {
    let movementsArr = movements[0];

    // filtering the movementsArr
    filteredArr = movementsArr.filter((el) => {
      if (el.cell.children[0] !== undefined) {
        let data = el.cell.children[0].id;
        let piecesColor = data.split('-')[0];
        piecesColor !== `${piecesType}`;
      } else {
        return el;
      }
    });
    // console.log(filteredArr);

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
    // filtering the movementsArr
    filteredArr = newArr.filter((el) => {
      if (el.cell.children[0] !== undefined) {
        let data = el.cell.children[0].id;
        let piecesColor = data.split('-')[0];
        piecesColor !== `${piecesType}`;
      } else {
        return el;
      }
    });
  }

  // show result
  console.log('result');
  if (filteredArr.length !== 0) {
    filteredArr.forEach((el) => {
      console.log(el.cell);
    });
  } else {
  }
};

export { movementsCtr };
