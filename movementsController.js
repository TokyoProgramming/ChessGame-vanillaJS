import { piecesMovements } from './movements.js';

const movementsCtr = async (e) => {
  let movements = await piecesMovements(e);
};

export { movementsCtr };
