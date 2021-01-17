import { piecesMovements } from './movements.js';

const movementsCtr = async (e) => {
  let movements = await piecesMovements(e);
  let movementsArr = movements[0];
  let piecesType = movements[1];

  let filteredArr = movementsArr.filter((el) => {
    if (el.cell.children[0] !== undefined) {
      let data = el.cell.children[0].id;
      let piecesColor = data.split('-')[0];
      piecesColor !== `${piecesType}`;
    } else {
      return el;
    }
  });

  if (filteredArr.length !== 0) {
    filteredArr.forEach((el) => {
      console.log(el.cell);
    });
  } else {
    console.log(filteredArr);
  }
};

export { movementsCtr };
