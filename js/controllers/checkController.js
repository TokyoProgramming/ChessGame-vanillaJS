import { rows } from '../boardCoordinate.js';
import { movementsCtr } from './movementsController.js';

// get pieces positions
const getPiecesPositions = async () => {
  let whitePiecesPositions = [];
  let blackPiecesPositions = [];

  rows.forEach((row) => {
    row.forEach((el) => {
      try {
        if (el.lastChild.tagName === 'IMG') {
          if (el.lastChild.id.split('-')[0] === 'black') {
            let blackPiecesObj = {
              name: el.lastChild,
              position: el.id,
            };
            blackPiecesPositions.push(blackPiecesObj);
          } else if (el.lastChild.id.split('-')[0] === 'white') {
            let whitePiecesObj = {
              name: el.lastChild,
              position: el.id,
            };
            whitePiecesPositions.push(whitePiecesObj);
          }
        }
      } catch (error) {}
    });
  });

  //   console.log(blackPiecesPositions);
  //   console.log(whitePiecesPositions);
  return [blackPiecesPositions, whitePiecesPositions];
};

// get pieces canMoveCellNext
const getCanMoveCellNext = async () => {
  const data = await getPiecesPositions();
  const blackData = data[0];
  const whiteData = data[1];
  let resBlackArr = [];
  let resWhiteArr = [];

  //   const res = await movementsCtr();

  // const movements = await movementsCtr();
  await blackData.forEach(async (el) => {
    const resBlack = await movementsCtr(el.name, 'black');
    resBlackArr.push(resBlack);
  });

  await whiteData.forEach(async (el) => {
    const resWhite = await movementsCtr(el.name, 'white');
    resWhiteArr.push(resWhite);
  });

  return [resBlackArr, resWhiteArr];
};

// check king's Status
const checkKingStatus = async () => {
  const kingStatus = await getCanMoveCellNext();
  const blackPieces = kingStatus[0];
  const whitePieces = kingStatus[1];

  blackPieces.forEach((bP) => {
    bP.forEach((el) => {
      try {
        if (el.cell.lastChild.tagName === 'IMG') {
          let pieceColor = el.cell.lastChild.id.split('-')[0];
          let pieceName = el.cell.lastChild.id.split('-')[1];
          if (pieceColor === 'white' && pieceName === 'king') {
            console.log('check white king');
          }
        }
      } catch (error) {}
    });
  });

  whitePieces.forEach((wP) => {
    wP.forEach((el) => {
      try {
        if (el.cell.lastChild.tagName === 'IMG') {
          let pieceColor = el.cell.lastChild.id.split('-')[0];
          let pieceName = el.cell.lastChild.id.split('-')[1];
          if (pieceColor === 'black' && pieceName === 'king') {
            console.log('check black king');
          }
        }
      } catch (error) {}
    });
  });
};

// check king can move cell

// check allies can protect king

// check allies or king can get checking piece

export { getPiecesPositions, getCanMoveCellNext, checkKingStatus };
