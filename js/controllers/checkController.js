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
  const whitePieces = await getWhiteCanMoveNext();
  const blackPieces = await getBlackCanMoveNext();

  try {
    if (getPlayer === 'white') {
      await whitePieces.forEach((wP) => {
        wP = wP[0];
        wP.forEach((el) => {
          try {
            if (el.cell.lastChild.tagName === 'IMG') {
              let pieceColor = el.cell.lastChild.id.split('-')[0];
              let pieceName = el.cell.lastChild.id.split('-')[1];
              if (pieceColor === 'black' && pieceName === 'king') {
                console.log(el);
                checkmate();
              }
            }
          } catch (error) {}
        });
      });
    } else if (getPlayer === 'black') {
      await blackPieces.forEach((bP) => {
        bP = bP[0];
        bP.forEach((el) => {
          try {
            if (el.cell.lastChild.tagName === 'IMG') {
              let pieceColor = el.cell.lastChild.id.split('-')[0];
              let pieceName = el.cell.lastChild.id.split('-')[1];
              if (pieceColor === 'white' && pieceName === 'king') {
                console.log(el);
                checkmate();
              }
            }
          } catch (error) {}
        });
      });
    }
  } catch (error) {}
  return [blackPieces, whitePieces];
};

// king movement filtering
const kingMovementFiltering = async (getPlayer, dataArr) => {
  let blackMoveArr = [];
  let whiteKingArr = [];
  let whiteMoveArr = [];
  let blackKingArr = [];
  let kingArr = [];
  if (getPlayer === 'white') {
    const blackData = await getBlackCanMoveNext();
    blackData.forEach((bD) => {
      let bDArr = bD[0];
      bDArr.forEach((el) => {
        blackMoveArr.push(el.cell);
      });
    });

    kingArr = dataArr;
    kingArr.forEach((el) => {
      whiteKingArr.push(el.cell);
    });

    whiteKingArr = whiteKingArr.filter((item) => {
      return !blackMoveArr.includes(item);
    });

    let whiteKingObj = {};
    let whiteKingData = [];
    whiteKingArr.forEach((el) => {
      whiteKingObj = {
        id: Math.round(Math.random() * 1000),
        cell: el,
      };
      whiteKingData.push(whiteKingObj);
    });
    return whiteKingData;
  } else if (getPlayer === 'black') {
    const whiteData = await getWhiteCanMoveNext();
    whiteData.forEach((wD) => {
      let wDArr = wD[0];
      wDArr.forEach((el) => {
        whiteMoveArr.push(el.cell);
      });
    });

    kingArr = dataArr;
    kingArr.forEach((el) => {
      blackKingArr.push(el.cell);
    });

    blackKingArr = blackKingArr.filter((item) => {
      return !whiteMoveArr.includes(item);
    });

    let blackKingObj = {};
    let blackKingData = [];
    blackKingArr.forEach((el) => {
      blackKingObj = {
        id: Math.round(Math.random() * 1000),
        cell: el,
      };
      blackKingData.push(blackKingObj);
    });

    return blackKingData;
  }
};

// king can move cell ??
const checkKingCanMove = async () => {};

// allies can protect king ??

// allies or king can get checking piece ??

// checkmate
const checkmate = async () => {
  console.log('checked');
};

export {
  getPiecesPositions,
  checkKingStatus,
  getWhiteCanMoveNext,
  getBlackCanMoveNext,
  kingMovementFiltering,
};
