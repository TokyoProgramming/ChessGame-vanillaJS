import { logResult } from '../main.js';
import { rows } from '../settings/boardCoordinate.js';
import { createMovementsArr } from '../settings/movements.js';

const enPassant = async (piecesType, cell) => {
  let log = logResult;
  let fromCell = log.fromCell;
  let toCell = log.toCell;
  let fromCellRow,
    fromCellCol,
    toCellRow,
    toCellCol,
    enPassantLeftCol,
    enPassantRightCol,
    passantCell;
  let passantArr = [];
  let createdArr = [];

  let opponentPieceType = log.pieceType;

  try {
    fromCellRow = fromCell.id[1];
    fromCellCol = fromCell.id[2];
    toCellRow = toCell.id[1];
    toCellCol = toCell.id[2];
    enPassantLeftCol = +toCellCol + 1;
    enPassantRightCol = +toCellCol - 1;
  } catch (error) {}

  //  * condition
  // white pawn is in 4th row
  if (
    (cell[0] == 4) === true &&
    piecesType == 'white-pawn' &&
    opponentPieceType == 'black-pawn' &&
    (fromCellRow == 2) == true &&
    enPassantLeftCol == cell[1]
  ) {
    // one row up && same col
    passantCell = rows[toCellRow - 2][toCellCol - 1];
    console.log(passantCell);
    passantCell.classList.add('passant-move');
    toCell.classList.add('passant-piece');
    createdArr = createMovementsArr(passantCell);
    passantArr.push(createdArr);
  } else if (
    (cell[0] == 4) === true &&
    piecesType == 'white-pawn' &&
    opponentPieceType == 'black-pawn' &&
    (fromCellRow == 2) == true &&
    enPassantRightCol == cell[1]
  ) {
    // one row up && same col
    passantCell = rows[toCellRow - 2][toCellCol - 1];
    console.log(passantCell);
    passantCell.classList.add('passant-move');
    toCell.classList.add('passant-piece');
    createdArr = createMovementsArr(passantCell);
    passantArr.push(createdArr);

    // black pawn is in the 5th row
  } else if (
    (cell[0] == 5) === true &&
    piecesType == 'black-pawn' &&
    opponentPieceType == 'white-pawn' &&
    (fromCellRow == 7) == true &&
    enPassantRightCol == cell[1]
  ) {
    // one row down && same col
    passantCell = rows[toCellRow][toCellCol - 1];
    passantCell.classList.add('passant-move');
    toCell.classList.add('passant-piece');
    createdArr = createMovementsArr(passantCell);
    passantArr.push(createdArr);
  } else if (
    (cell[0] == 5) === true &&
    piecesType == 'black-pawn' &&
    opponentPieceType == 'white-pawn' &&
    (fromCellRow == 7) == true &&
    enPassantLeftCol == cell[1]
  ) {
    // one row down && same col
    passantCell = rows[toCellRow][toCellCol - 1];
    passantCell.classList.add('passant-move');
    toCell.classList.add('passant-piece');
    createdArr = createMovementsArr(passantCell);
    passantArr.push(createdArr);
  }

  return passantArr;
};

export { enPassant };
