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
const checkKingStatus = async (getPlayer, log) => {
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
                let checkingPiece = log[log.length - 1];
                checkmate(checkingPiece);
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
                let checkingPiece = log[log.length - 1];
                checkmate(checkingPiece);
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

//  !
//  ! <-- create checkmate function -->
//  !

// * get king position
const getKingPosition = async (player) => {
  const positionData = await getPiecesPositions();
  const whitePositionData = positionData[1];
  const blackPositionData = positionData[0];
  let kingInfo = '';

  if (player === 'black') {
    whitePositionData.forEach((el) => {
      if (el.name.id === 'white-king') {
        kingInfo = el.name;
      }
    });
  } else if (player === 'white') {
    blackPositionData.forEach((el) => {
      if (el.name.id === 'black-king') {
        kingInfo = el.name;
      }
    });
  }
  return kingInfo;
};

// * get path
const getPath = async (pathArr) => {
  let arrNum;
  let deleteObj;

  // array Number
  pathArr.forEach((el) => {
    try {
      if (el.data.cell.lastChild.id.split('-')[1] === 'king') {
        arrNum = el.i;

        deleteObj = el;
      }
    } catch (error) {}
  });

  // delete Obj
  let arr;
  arr = pathArr.filter((el) => {
    return deleteObj !== el;
  });

  // remove arr obj
  let filteredPathArr;
  filteredPathArr = arr.filter((el) => {
    return el.i === arrNum;
  });

  return filteredPathArr;
};

// *1  allies can get checking piece ??
const alliesCanGetCheckingPiece = async (player, cell) => {
  let blackData = await getBlackCanMoveNext();
  let whiteData = await getWhiteCanMoveNext();

  // check player === white, checked player === black
  if (player === 'white') {
    blackData.forEach((el) => {
      let ele = el[0];
      ele.forEach((el) => {
        if (cell === el.cell) {
          // black can get the piece
        } else {
          // black cannot get the piece
        }
      });
    });
  } else {
    // check player === black, checked player === white
  }
};

// *2 king can move cell or get the piece ??
const checkedKingMovement = async (player) => {
  // get kingPosition
  const kingInfo = await getKingPosition(player);

  // const whiteKing = await movementsCtr(el.name, 'white', true);
  let king;
  let kingFilter;
  let kingMove;

  if (player === 'white') {
    king = await movementsCtr(kingInfo, 'black', true);
    // call kingMovementFiltering

    kingFilter = await kingMovementFiltering('black', king[0]);
    kingMove = kingFilter.length;
  } else if (player === 'black') {
    king = await movementsCtr(kingInfo, 'white', true);
    // call kingMovementFiltering
    console.log(king[0]);
    kingFilter = await kingMovementFiltering('white', king[0]);
    kingMove = kingFilter.length;
  }
};

// *3 allies can sacrifice itself for king
const canAlliesSacrifice = async (player, cell) => {
  let checkingPiece = cell.lastChild;
  let preventArr = [];
  let checkingPieceMove = await movementsCtr(checkingPiece, 'white', true);
  let path = await getPath(checkingPieceMove[2]);
  path.forEach((el) => {
    let cell = el.data.cell;
    preventArr.push(cell);
  });
  console.log(preventArr);

  // call canMoveNext
  const blackCanMove = await getBlackCanMoveNext();
  blackCanMove.forEach((el) => {
    el[0].forEach((el) => {
      console.log(el.cell);
    });
  });
};

// checkmate
const checkmate = async (checkingPiece) => {
  let player = checkingPiece.player;
  let cell = checkingPiece.cell;

  // *1 call allies can get checking piece
  await alliesCanGetCheckingPiece(player, cell);

  // *2 king can move cell ??
  await checkedKingMovement(player);

  // *3 allies can sacrifice itself for king ??
  await canAlliesSacrifice(player, cell);
};

export {
  getPiecesPositions,
  checkKingStatus,
  getWhiteCanMoveNext,
  getBlackCanMoveNext,
  kingMovementFiltering,
};
