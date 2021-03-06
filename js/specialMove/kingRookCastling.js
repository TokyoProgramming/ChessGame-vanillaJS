import { logRes, logResult } from '../main.js';
import { row1, row8 } from '../settings/boardCoordinate.js';
import {
  getWhiteCanMoveNext,
  getBlackCanMoveNext,
} from '../controllers/checkController.js';

// // * 1 the king has not previously moved;
// // * 2 rook has not previously moved
// // * 3 king is not currently checked;
// // * 4 the king must not pass through square that is under attack by enemy pieces;
// // * 5 between the king and the rook , there should be empty

let kingLog = [];
let rookLog = [];
let kingSideRookLog = [];
let queenSideRookLog = [];

// get player's log => check 1 && 2
const getPlayerLog = async (getPlayer) => {
  let playerLogArr = logRes.filter((el) => {
    return getPlayer === el.player;
  });

  // get kingLog
  kingLog = playerLogArr.filter((log) => {
    let kingName = `${getPlayer}` + '-' + 'king';
    return log.pieceType === kingName;
  });
  // get rookLog
  rookLog = playerLogArr.filter((log) => {
    let rookName = `${getPlayer}` + '-' + 'rook';
    return log.pieceType === rookName;
  });

  // if rookLog is not empty

  // get King side Rook Log
  kingSideRookLog = rookLog.filter((log) => {
    if (getPlayer === 'white') {
      return log.fromCell.id === 'x88';
    } else if (getPlayer === 'black') {
      return log.fromCell.id === 'x18';
    }
  });

  // get Queen side Rook Log
  queenSideRookLog = rookLog.filter((log) => {
    if (getPlayer === 'white') {
      return log.fromCell.id === 'x81';
    } else if (getPlayer === 'black') {
      return log.fromCell.id === 'x11';
    }
  });

  if (kingLog.length === 0 && rookLog.length === 0) {
    // both side castling
    return 1;
  } else if (kingLog.length === 0 && queenSideRookLog.length === 0) {
    // queen side catling
    return 2;
  } else if (kingLog.length === 0 && kingSideRookLog.length === 0) {
    // king side castling
    return 3;
  } else {
    return false;
  }
};

// check king's move cells are not attacked => check 4
const checkKingMoveCells = async (getPlayer) => {
  let whiteKingCanMove = [];
  let kingMoveCells = [];
  let blackKingCanMove = [];

  if (getPlayer === 'white') {
    const blackMoveCells = await getBlackCanMoveNext(true);
    kingMoveCells = blackMoveCells.map((el) => {
      let data = el[0];
      whiteKingCanMove = data.filter((el) => {
        return el.cell.id[1] === '8';
      });
      return whiteKingCanMove;
    });
  } else if (getPlayer === 'black') {
    const whiteMoveCells = await getWhiteCanMoveNext(true);
    kingMoveCells = whiteMoveCells.map((el) => {
      let data = el[0];
      blackKingCanMove = data.filter((el) => {
        return el.cell.id[1] === '1';
      });
      return blackKingCanMove;
    });
  }

  let kingMoveArr;
  let getUniqueCell = [];
  let uniqueCell = [];

  try {
    // remove empty array
    kingMoveArr = kingMoveCells.filter((el) => {
      return el.length != 0;
    });

    // concat array only unique cell
    for (let i = 0; i < kingMoveArr.length; i++) {
      for (let j = 0; j < kingMoveArr[i].length; j++) {
        kingMoveArr[i][j];
        uniqueCell.push(kingMoveArr[i][j].cell.id);
        // return getUniqueCell;
      }
    }
    // console.log([...new Set(uniqueCell)]);
    // get Unique cell
    getUniqueCell = [...new Set(uniqueCell)];
    getUniqueCell;
  } catch (error) {}

  kingMoveArr = getUniqueCell;

  if (getPlayer === 'white') {
    if (kingMoveArr.length === 0) {
      // both side castling
      return 1;
    } else {
      const wQueenSideFind = kingMoveArr.find(
        (el) => el === 'x82' || el === 'x83' || el === 'x84'
      );

      const wKingSideFind = kingMoveArr.find(
        (el) => el === 'x86' || el === 'x87'
      );

      if (wQueenSideFind === undefined && wKingSideFind === undefined) {
        // both side castling
        return 1;
      } else if (wKingSideFind !== undefined && wQueenSideFind === undefined) {
        // queen side castling
        return 2;
      } else if (wQueenSideFind !== undefined && wKingSideFind === undefined) {
        return 3;
      } else {
        return false;
      }
    }
  } else if (getPlayer === 'black') {
    if (kingMoveArr.length === 0) {
      // both side castling
      return 1;
    } else {
      const bQueenSideFind = kingMoveArr.find(
        (el) => el === 'x12' || el === 'x13' || el === 'x14'
      );

      const bKingSideFind = kingMoveArr.find(
        (el) => el === 'x16' || el === 'x17'
      );

      if (bQueenSideFind === undefined && bKingSideFind === undefined) {
        // both side castling
        return 1;
      } else if (bKingSideFind !== undefined && bQueenSideFind === undefined) {
        // queen side castling
        return 2;
      } else if (bQueenSideFind !== undefined && bKingSideFind === undefined) {
        return 3;
      } else {
        return false;
      }
    }
  }
};

// between king and rook, empty check
const kingAndRookCells = async (getPlayer) => {
  // console.log(getPlayer);
  if (getPlayer === 'white') {
    try {
      const x82 = row8[1].lastChild.tagName;
      const x83 = row8[2].lastChild.tagName;
      const x84 = row8[3].lastChild.tagName;
      const x86 = row8[5].lastChild.tagName;
      const x87 = row8[6].lastChild.tagName;
      if (
        x82 !== 'IMG' &&
        x83 !== 'IMG' &&
        x84 !== 'IMG' &&
        x86 !== 'IMG' &&
        x87 !== 'IMG'
      ) {
        // both side castling
        return 1;
      } else if (x82 !== 'IMG' && x83 !== 'IMG' && x84 !== 'IMG') {
        // queen side castling
        return 2;
      } else if (x86 !== 'IMG' && x87 !== 'IMG') {
        // king side castling
        return 3;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      const x12 = row1[1].lastChild;
      const x13 = row1[2].lastChild;
      const x14 = row1[3].lastChild;
      const x16 = row1[5].lastChild;
      const x17 = row1[6].lastChild;

      if (
        x12 == null &&
        x13 == null &&
        x14 == null &&
        x16 == null &&
        x17 == null
      ) {
        // both side castling
        return 1;
      } else if (x12 == null && x13 == null && x14 == null) {
        // queen side castling
        return 2;
      } else if (x16 == null && x17 == null) {
        // king side castling
        return 3;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }
};
let castlingRes = [];

//  castling function
const castling = async (getPlayer) => {
  castlingRes = [];
  // get player's log  king and rook haven't moved => check 1 && 2
  const castlingSideRes = await getPlayerLog(getPlayer);
  console.log(castlingSideRes);

  // check king will go through cells => check 4
  const kingMoveRes = await checkKingMoveCells(getPlayer);
  console.log(kingMoveRes);

  // check king and rook cells => check 5
  const kingAndRookRes = await kingAndRookCells(getPlayer);
  console.log(kingAndRookRes);

  // king and the both side rooks haven't moved
  if (castlingSideRes === 1) {
    if (kingMoveRes === 1 && kingAndRookRes === 1) {
      // both side castling
      return [kingSideCastling(getPlayer), queenSideCastling(getPlayer)];

      // queen side castling
    } else if (kingMoveRes === 2 && kingAndRookRes === 2) {
      return queenSideCastling(getPlayer);
    } else if (kingMoveRes === 2 && kingAndRookRes === 1) {
      return queenSideCastling(getPlayer);
    } else if (kingMoveRes === 1 && kingAndRookRes === 2) {
      return queenSideCastling(getPlayer);

      // king side catling
    } else if (kingMoveRes === 3 && kingAndRookRes === 3) {
      return kingSideCastling(getPlayer);
    } else if (kingMoveRes === 3 && kingAndRookRes === 1) {
      return kingSideCastling(getPlayer);
    } else if (kingMoveRes === 1 && kingAndRookRes === 3) {
      return kingSideCastling(getPlayer);
    }

    // queen side castling
  } else if (castlingSideRes === 2) {
    if (kingMoveRes === 1 && kingAndRookRes === 1) {
      return queenSideCastling(getPlayer);
    } else if (kingMoveRes === 2 && kingAndRookRes === 2) {
      return queenSideCastling(getPlayer);
    } else if (kingMoveRes === 1 && kingAndRookRes === 2) {
      return queenSideCastling(getPlayer);
    } else if (kingMoveRes === 2 && kingAndRookRes === 1) {
      return queenSideCastling(getPlayer);
    }
    // king side castling
  } else if (castlingSideRes === 3) {
    if (kingMoveRes === 1 && kingAndRookRes === 1) {
      return kingSideCastling(getPlayer);
    } else if (kingMoveRes === 3 && kingAndRookRes === 3) {
      return kingSideCastling(getPlayer);
    } else if (kingMoveRes === 1 && kingAndRookRes === 3) {
      return kingSideCastling(getPlayer);
    } else if (kingMoveRes === 3 && kingAndRookRes === 1) {
      return kingSideCastling(getPlayer);
    }
  } else {
    return castlingRes;
  }

  console.log(castlingRes);
};
let castlingResult = '';

const kingSideCastling = async (getPlayer) => {
  castlingResult = '';
  if (getPlayer === 'white') {
    castlingResult = await whiteKingSideCastling();
  } else if (getPlayer === 'black') {
    castlingResult = await blackKingSideCastling();
  }
  return castlingResult;
};

const queenSideCastling = async (getPlayer) => {
  castlingResult = '';
  if (getPlayer === 'white') {
    castlingResult = await whiteQueenSideCastling();
  } else if (getPlayer === 'black') {
    castlingResult = await blackQueenSideCastling();
  }
  return castlingResult;
};

let castlingKing = '';
let castlingRook = '';
const whiteKingSideCastling = async () => {
  castlingKing = '';
  castlingRook = '';
  castlingKing = row8[6];
  castlingKing.classList.add('white-kingSide');
  castlingRook = row8[5];
  return castlingKing;
};

const whiteQueenSideCastling = async () => {
  castlingKing = '';
  castlingRook = '';
  castlingKing = row8[2];
  castlingKing.classList.add('white-queenSide');
  castlingRook = row8[3];
  return castlingKing;
};

const blackKingSideCastling = async () => {
  castlingKing = '';
  castlingRook = '';
  castlingKing = row1[6];
  castlingKing.classList.add('black-kingSide');
  castlingRook = row1[5];
  return castlingKing;
};

const blackQueenSideCastling = async () => {
  castlingKing = '';
  castlingRook = '';
  castlingKing = row1[2];
  castlingKing.classList.add('black-queenSide');
  castlingRook = row1[3];
  return castlingKing;
};

let castlingToCell = '';
const getCastlingCell = async (toCell, getPlayer) => {
  castlingToCell = '';
  if (getPlayer === 'white') {
    // queen side castling
    if (row8[3].lastChild.id === 'white-rook' && toCell.id === 'x83') {
      castlingToCell = row8[3];
      return castlingToCell;
    } else if (row8[5].lastChild.id === 'white-rook' && toCell.id === 'x87') {
      castlingToCell = row8[5];
      return castlingToCell;
    }

    // king side castling
  } else if (getPlayer === 'black') {
    // queen side castling
    if (row1[3].lastChild !== null) {
      if (row1[3].lastChild.id === 'black-rook' && toCell.id === 'x13') {
        castlingToCell = row1[3];
        return castlingToCell;
      }
    } else if (row1[5].lastChild !== null) {
      if (row1[5].lastChild.id === 'black-rook' && toCell.id === 'x17') {
        castlingToCell = row1[5];
        return castlingToCell;
      }
    } else {
      castlingToCell = toCell;
      return castlingToCell;
    }
  }
};

export { castling, getPlayerLog, getCastlingCell };
