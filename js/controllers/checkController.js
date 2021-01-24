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

  return [blackPiecesPositions, whitePiecesPositions];
};

const getWhiteCanMoveNext = async () => {
  const data = await getPiecesPositions();
  const whiteData = data[1];
  let resWhiteArr = [];
  await whiteData.forEach(async (el) => {
    const resWhite = await movementsCtr(el.name, 'white', true);
    resWhiteArr.push(resWhite);
  });

  return resWhiteArr;
};

const getBlackCanMoveNext = async () => {
  const data = await getPiecesPositions();
  const blackData = data[0];
  let resBlackArr = [];
  // const movements = await movementsCtr();
  await blackData.forEach(async (el) => {
    const resBlack = await movementsCtr(el.name, 'black', true);
    resBlackArr.push(resBlack);
  });
  return resBlackArr;
};

// check king's Status
const checkKingStatus = async (getPlayer) => {
  const blackPieces = await getBlackCanMoveNext();
  const whitePieces = await getWhiteCanMoveNext();

  try {
    if (getPlayer === 'white') {
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
    } else if (getPlayer === 'black') {
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
    }
  } catch (error) {}
  return [blackPieces, whitePieces];
};

// king can move cell ??

// allies can protect king ??

// allies or king can get checking piece ??

export {
  getPiecesPositions,
  checkKingStatus,
  getWhiteCanMoveNext,
  getBlackCanMoveNext,
};
