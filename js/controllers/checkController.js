import { rows } from '../settings/boardCoordinate.js';
import { movementsCtr } from './movementsController.js';
let whitePiecesPositions = [];
let blackPiecesPositions = [];
// get pieces positions
const getPiecesPositions = async (except) => {
  let exceptPiece = '';
  try {
    if (typeof except === 'string') {
      exceptPiece = except;
    }
  } catch (error) {}

  whitePiecesPositions = [];
  blackPiecesPositions = [];

  rows.forEach((row) => {
    row.forEach((el) => {
      try {
        if (el.lastChild.tagName === 'IMG') {
          if (el.lastChild.id.split('-')[0] === 'black') {
            if (el.lastChild.id.split('-')[1] !== `${exceptPiece}`) {
              let blackPiecesObj = {
                name: el.lastChild,
                position: el.id,
              };

              blackPiecesPositions.push(blackPiecesObj);
            }
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
let whiteMoveData = '';
let resWhiteArr = [];

const getWhiteCanMoveNext = async (value, except = null, color = 'white') => {
  whiteMoveData = '';
  whiteMoveData = await getPiecesPositions(except);
  const whiteData = whiteMoveData[1];
  resWhiteArr = [];

  await whiteData.forEach(async (el) => {
    // here should be fixed
    const resWhite = await movementsCtr(el.name, `${color}`, value, false);
    resWhiteArr.push(resWhite);
  });

  return resWhiteArr;
};
let blackMoveData = '';
let resBlackArr = [];

const getBlackCanMoveNext = async (value, except = null, color = 'black') => {
  blackMoveData = '';
  blackMoveData = await getPiecesPositions(except);
  const blackData = blackMoveData[0];
  resBlackArr = [];

  // const movements = await movementsCtr();
  await blackData.forEach(async (el) => {
    // here should be fixed
    const resBlack = await movementsCtr(el.name, `${color}`, value, false);
    resBlackArr.push(resBlack);
  });

  return resBlackArr;
};

// check king's Status
const checkKingStatus = async (getPlayer, log) => {
  // check white pieces movements
  const whitePieces = await getWhiteCanMoveNext(true);
  // check black pieces movements
  const blackPieces = await getBlackCanMoveNext(true);

  let blackCheckmate;
  let whiteCheckmate;
  let checked = false;

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
                console.log(checkingPiece);
                console.log('black checked');
                el.cell.classList.add('checked');
                blackCheckmate = checkmate(checkingPiece);
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

                console.log('white checked');
                // add checked classList
                el.cell.classList.add('checked');
                whiteCheckmate = checkmate(checkingPiece);
              }
            }
          } catch (error) {}
        });
      });
    }
  } catch (error) {}

  const checkResBlack = await blackCheckmate;
  const checkResWhite = await whiteCheckmate;
  let checkResult;

  try {
    if (checkResBlack === 'checkmate') {
      checkResult = 'black lose';
      return checkResult;
    } else if (checkResWhite === 'checkmate') {
      checkResult = 'white lose';
      return checkResult;
    } else if (checkResBlack === 'checked') {
      // checkResult = 1;
    } else if (checkResWhite === 'checked') {
      checkResult = 1;
      // return checkResult;
    } else {
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
    const blackData = await getBlackCanMoveNext(true);
    const blackDataArr = await getBlackCanMoveNext(true, null, 'white');
    let bDataArr = blackData.concat(blackDataArr);
    bDataArr.forEach((bD) => {
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
    const whiteData = await getWhiteCanMoveNext(true);
    const whiteDataArr = await getWhiteCanMoveNext(true, null, 'black');
    let wDataArr = whiteData.concat(whiteDataArr);
    wDataArr.forEach((wD) => {
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
let arrNum;
let deleteObj;
// * get path
const getPath = async (pathArr) => {
  arrNum = '';
  deleteObj = '';

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
  let blackData = await getBlackCanMoveNext(true);
  let whiteData = await getWhiteCanMoveNext(true);
  let getArr = [];

  // check player === white, checked player === black
  if (player === 'white') {
    blackData.forEach((el) => {
      let ele = el[0];
      getArr = ele.filter((el) => {
        return el.cell === cell;
      });
    });
  } else {
    whiteData.forEach((el) => {
      let ele = el[0];
      getArr = ele.filter((el) => {
        return el.cell === cell;
      });
    });

    // check player === black, checked player === white
  }

  return getArr.length;
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

    kingFilter = await kingMovementFiltering('white', king[0]);
    kingMove = kingFilter.length;
  }

  return kingMove;
};
let checkingPiece = '';
let preventArr = [];
let checkingPieceMove = [];
let path = [];

// *3 allies can sacrifice itself for king
const canAlliesSacrifice = async (cell) => {
  checkingPiece = '';
  preventArr = [];
  checkingPieceMove = [];
  path = [];

  checkingPiece = cell.lastChild;
  console.log(checkingPiece);

  checkingPieceMove = await movementsCtr(checkingPiece, 'white', true);
  console.log(checkingPieceMove);
  try {
    path = await getPath(checkingPieceMove[2]);
    path = await getPath(checkingPiece[0]);
  } catch (error) {}

  // let protectKingPiecesArr = [];
  path.forEach((el) => {
    let cell = el.data.cell;

    preventArr.push(cell);
  });

  // call canMoveNext
  const blackCanMove = await getBlackCanMoveNext(false, 'king');
  let blackInterferenceArr = [];
  blackCanMove.forEach((el) => {
    el[0].forEach((el) => {
      blackInterferenceArr.push(el.cell);
    });
  });

  // check whether pieces can Interference
  let protectKingPiecesArr = [];

  for (let i = 0; i < preventArr.length; i++) {
    let cell = preventArr[i];

    blackInterferenceArr.forEach((el) => {
      if (el === cell) {
        protectKingPiecesArr.push(el);
      }
    });
  }

  return protectKingPiecesArr.length;
};

// checkmate
const checkmate = async (checkingPiece) => {
  let player = checkingPiece.player;
  let cell = checkingPiece.toCell;
  let result;

  // *1 call allies can get checking piece
  const checkOne = await alliesCanGetCheckingPiece(player, cell);

  // *2 king can move cell ??
  const checkTwo = await checkedKingMovement(player);

  // *3 allies can sacrifice itself for king ??
  const checkThree = await canAlliesSacrifice(cell);
  console.log(checkOne);
  console.log(checkTwo);
  console.log(checkThree);

  if (checkOne === 0 && checkTwo === 0 && checkThree === 0) {
    result = 'checkmate';
  } else {
    result = 'checked';
  }
  console.log(result);
  return result;
};

export {
  getPiecesPositions,
  checkKingStatus,
  getWhiteCanMoveNext,
  getBlackCanMoveNext,
  kingMovementFiltering,
  checkmate,
  getKingPosition,
};
